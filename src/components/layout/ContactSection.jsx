'use client';
import Map from '../common/Map';
import ContactUsForm from '../common/form/ContactUsForm';
import SectionHeader from '@/components/layout/SectionHeader';
import { ClockIcon } from '@/icons/ClockIcon';
import { LocationIcon } from '@/icons/LocationIcon';
import { PhoneIcon } from '@/icons/PhoneIcon';
import { MailIcon } from '@/icons/MailIcon';
const CONTACT_INFO = [
    {
        icon: PhoneIcon,
        iconClass: 'fill-primary',
        title: '(44) 168 4892 229',
        subtitle: 'Call us anytime',
    },
    {
        icon: LocationIcon,
        iconClass: 'stroke-primary',
        title: '20 Graham Rd',
        subtitle: 'Malvern WR14 2HL, United Kingdom',
    },
    {
        icon: ClockIcon,
        iconClass: 'stroke-primary',
        title: 'Mon – Fri',
        subtitle: '8:00 AM – 9:00 PM',
    },
    {
        icon: MailIcon,
        iconClass: 'stroke-primary',
        title: 'info@pizzafiesta.com',
        subtitle: 'Email us your queries',
    },
];
const ContactSecton = ({ className }) => {
    return (<section id='contact' className={`scroll-mt-20 ${className !== null && className !== void 0 ? className : ''}`}>
      <div className='container py-16'>
        <SectionHeader header='Contact Us' description="We'd love to hear from you — find us on the map or send a message."/>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch'>
          <div className='rounded-2xl overflow-hidden border-2 border-gray-700 min-h-[400px] lg:min-h-[520px] bg-gray-800'>
            <Map />
          </div>

          <div className='rounded-2xl border border-gray-700/80 bg-gray-900/50 p-6 md:p-8 flex flex-col'>
            <h3 className='text-xl font-bold text-white mb-2 normal-case'>Send Us a Message</h3>
            <p className='text-gray-400 text-sm mb-6'>
              Fill out the form and we&apos;ll get back to you within 24 hours.
            </p>
            <ContactUsForm />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10'>
          {CONTACT_INFO.map(item => (<div key={item.title} className='flex gap-4 items-start p-4 rounded-xl border border-gray-700/80 bg-gray-900/50 hover:border-primary/40 transition-colors'>
              <div className='w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0'>
                <item.icon className={`w-5 ${item.iconClass}`}/>
              </div>
              <div>
                <p className='font-semibold text-white text-sm'>{item.title}</p>
                <p className='text-gray-400 text-xs mt-0.5'>{item.subtitle}</p>
              </div>
            </div>))}
        </div>
      </div>
    </section>);
};
export default ContactSecton;
