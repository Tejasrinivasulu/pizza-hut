'use client';
import ContactUsForm from '@/components/common/form/ContactUsForm';
import AdminHelpDesk from '@/components/features/admin/AdminHelpDesk';
import CustomerQueries from '@/components/features/help/CustomerQueries';
import HelpCenterFaq from '@/components/features/help/HelpCenterFaq';
import Loader from '@/components/common/Loader';
import { useProfile } from '@/components/hooks/useProfile';
import { ClockIcon } from '@/icons/ClockIcon';
import { LocationIcon } from '@/icons/LocationIcon';
import { PhoneIcon } from '@/icons/PhoneIcon';
import { useSession } from 'next-auth/react';
const HelpCenterContent = () => {
    const { status } = useSession();
    const { data: profile, loading } = useProfile();
    if (status === 'loading' || loading) {
        return <Loader className='py-20'/>;
    }
    if (profile === null || profile === void 0 ? void 0 : profile.isAdmin) {
        return (<section className='py-16 container max-w-6xl mx-auto px-4'>
        <AdminHelpDesk />
      </section>);
    }
    return (<section className='py-20 container max-w-6xl mx-auto px-4'>
      <div className='text-center mb-14'>
        <h1 className='text-3xl font-semibold text-primary italic'>Customer Care</h1>
        <p className='text-gray-400 mt-3'>Find answers or reach out — our customer care team is here to help.</p>
      </div>

      <CustomerQueries />

      <div className='grid md:grid-cols-2 gap-2 md:gap-3 items-stretch mb-20'>
        <div className='rounded-2xl border border-gray-700 bg-gray-900/40 p-8 h-full flex flex-col'>
          <h2 className='text-2xl font-semibold text-primary mb-6'>Contact Us</h2>
          <div className='flex flex-col gap-6 text-gray-300 flex-1'>
            <div className='flex gap-4 items-start'>
              <PhoneIcon className='w-8 fill-primary shrink-0 mt-1'/>
              <div>
                <p className='font-semibold text-white'>Phone</p>
                <p className='text-primary mt-1'>+44 168 4892 229</p>
                <p className='text-sm text-gray-500 mt-1'>Call us for order help or urgent issues</p>
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <span className='text-primary text-2xl shrink-0 mt-0.5'>✉️</span>
              <div>
                <p className='font-semibold text-white'>Email</p>
                <p className='text-primary mt-1'>info@pizzafiesta.com</p>
                <p className='text-sm text-gray-500 mt-1'>We reply within 24 hours</p>
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <LocationIcon className='w-8 stroke-primary shrink-0 mt-1'/>
              <div>
                <p className='font-semibold text-white'>Address</p>
                <p className='text-primary mt-1'>20 Graham Rd, Malvern WR14 2HL, United Kingdom</p>
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <ClockIcon className='w-8 stroke-primary shrink-0 mt-1'/>
              <div>
                <p className='font-semibold text-white'>Working Hours</p>
                <p className='text-primary mt-1'>Monday – Friday: 8:00 AM – 9:00 PM</p>
                <p className='text-sm text-gray-500 mt-1'>Weekend hours may vary</p>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-2xl border border-gray-700 bg-gray-900/40 p-8 h-full flex flex-col'>
          <h2 className='text-2xl font-semibold text-primary mb-6'>Send Us a Message</h2>
          <div className='flex-1 flex flex-col'>
            <ContactUsForm />
          </div>
        </div>
      </div>

      <div>
        <div className='text-center mb-10'>
          <h2 className='text-2xl font-semibold text-primary'>Frequently Asked Questions</h2>
          <p className='text-gray-400 mt-2'>Quick answers to common questions about orders, delivery, and payments.</p>
        </div>
        <HelpCenterFaq />
      </div>
    </section>);
};
export default HelpCenterContent;
