'use client';
import { Button, Input, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import toast from "react-hot-toast";
const ContactUsForm = () => {
    var _a;
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    useEffect(() => {
        var _a;
        if ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email) {
            setEmailValue(session.user.email);
        }
    }, [(_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email]);
    const validateEmail = (email) => {
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };
    const isInvalid = useMemo(() => {
        if (emailValue === '')
            return false;
        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);
    const form = useRef();
    const sendEmail = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const saveToDb = fetch('/api/contact-messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phoneNumber: formData.get('phoneNumber'),
                message: formData.get('message'),
            }),
        });
        const submitPromise = Promise.all([
            saveToDb,
            emailjs.sendForm('service_de0hxhc', 'template_gjaui9l', form.current, 'QA_Og2366XQeFgVlP'),
        ]).then(([, emailResult]) => {
            if (emailResult.status === 200)
                return emailResult.text;
            throw new Error('Email failed');
        });
        await toast.promise(submitPromise, {
            loading: "Sending message...",
            success: "Message sent successfully!",
            error: "Error sending message"
        });
        e.target.reset();
        setEmailValue('');
        setSubmitting(false);
        window.dispatchEvent(new Event('contact-message-sent'));
    };
    return (<form className="flex flex-col gap-8" ref={form} onSubmit={sendEmail}>
      <div className="grid grid-cols-2 gap-4">
        <Input isRequired label="First Name" labelPlacement="outside" name="firstName" placeholder=" " type="text"/>
        <Input isRequired label="Last Name" labelPlacement="outside" name="lastName" placeholder=" " type="text"/>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input isRequired label="Email" labelPlacement="outside" name="email" placeholder=" " type="email" isInvalid={isInvalid} value={emailValue} onChange={e => setEmailValue(e.target.value)} errorMessage={isInvalid && "Please enter a valid email"}/>
        <Input label="Phone Number" labelPlacement="outside" name="phoneNumber" placeholder=" " type="tel"/>
      </div>
      <Textarea isRequired label="Message" labelPlacement="outside" name="message" placeholder="Enter your inquiry..." rows={3}/>
      <div>
        <Button type="submit" radius="sm" size="md" isLoading={submitting}>Send Inquiry</Button>
        <p className="text-gray-400 mt-3">We&apos;ll get back to you within 24 hours.</p>
      </div>
    </form>);
};
export default ContactUsForm;
