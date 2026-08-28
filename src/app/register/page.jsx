"use client";
import AuthPageLayout from "@/components/common/AuthPageLayout";
import ModalContainer from "@/components/common/ModalContainer";
import AuthField from "@/components/common/form/AuthField";
import GoogleIcon from "@/icons/GoogleIcon";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    async function handleFormSubmit(event) {
        event.preventDefault();
        setCreatingUser(true);
        setError('');
        const response = await fetch(`/api/register`, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json());
        if (response.error) {
            setError(response.message);
        }
        else {
            setUserCreated(true);
        }
        setCreatingUser(false);
    }
    return (<>
      <AuthPageLayout title="Create Account" subtitle="Join Pizza Fiesta and start ordering" footerText="Already have an account?" footerLinkText="Login" footerLinkHref="/login">
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          <AuthField label="Full name" value={name} onChange={setName} placeholder="Your name" disabled={creatingUser} required autoComplete="name"/>
          <AuthField label="Email address" type="email" value={email} onChange={setEmail} placeholder="Enter your email" disabled={creatingUser} required autoComplete="email"/>
          <AuthField label="Password" type="password" value={password} onChange={setPassword} placeholder="Create a password" disabled={creatingUser} required autoComplete="new-password"/>
          {error && (<div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2">
              {error}
            </div>)}
          <button type="submit" disabled={creatingUser} className="auth-submit-btn w-full rounded-lg bg-primary text-dark font-bold py-2.5 text-sm mt-1 disabled:opacity-60">
            {creatingUser ? 'Creating account...' : 'Sign Up'}
          </button>

          <div className="flex items-center gap-2 my-1">
            <div className="flex-1 h-px bg-gray-700"/>
            <span className="text-gray-500 text-xs uppercase">or</span>
            <div className="flex-1 h-px bg-gray-700"/>
          </div>

          <button type="button" disabled={creatingUser} onClick={() => signIn('google', { callbackUrl: '/' })} className="w-full flex items-center justify-center gap-2 rounded-lg bg-white text-dark font-semibold py-2.5 text-sm border border-gray-300 hover:bg-gray-100 disabled:opacity-60">
            <GoogleIcon className="w-5"/>
            Continue with Google
          </button>
        </form>
      </AuthPageLayout>

      <ModalContainer isOpen={userCreated} title="Registration successful" content="Your account has been created. You can now log in." confirmText="OK" onConfirm={() => setUserCreated(false)} closeText="Login" onClose={() => router.push('/login')}/>
    </>);
};
export default RegisterPage;
