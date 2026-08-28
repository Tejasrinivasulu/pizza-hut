import { ClockIcon } from '@/icons/ClockIcon';
import { FaceBookIcon } from '@/icons/FaceBookIcon';
import { InstaIcon } from '@/icons/InstaIcon';
import { LocationIcon } from '@/icons/LocationIcon';
import { PhoneIcon } from '@/icons/PhoneIcon';
import { TwitterIcon } from '@/icons/TwitterIcon';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
const INFO_ITEMS = [
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
        subtitle: 'Malvern WR14 2HL',
    },
    {
        icon: ClockIcon,
        iconClass: 'stroke-primary',
        title: 'Mon – Fri',
        subtitle: '8:00 AM – 9:00 PM',
    },
];
const BusinessInfo = ({ className }) => {
    return (<section className={`relative z-10 -mt-8 md:-mt-12 ${className}`}>
      <div className='container'>
        <div className='rounded-2xl border border-gray-700/80 bg-gray-900/90 backdrop-blur-md shadow-2xl shadow-black/40 overflow-hidden'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
            {INFO_ITEMS.map(item => (<div key={item.title} className='flex gap-4 items-center p-6 border-b sm:border-b-0 sm:border-r border-gray-700/60 last:border-r-0 hover:bg-primary/5 transition-colors'>
                <div className='w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0'>
                  <item.icon className={`w-6 ${item.iconClass}`}/>
                </div>
                <div>
                  <p className='font-semibold text-white'>{item.title}</p>
                  <p className='text-gray-400 text-sm'>{item.subtitle}</p>
                </div>
              </div>))}

            <div className='flex items-center justify-center gap-2 p-6 bg-primary/10'>
              <p className='text-sm text-gray-300 mr-2 hidden lg:block'>Follow us</p>
              <Button as={Link} href='https://twitter.com' isIconOnly variant='light' className='text-white'>
                <TwitterIcon className='w-5 fill-white'/>
              </Button>
              <Button as={Link} href='https://facebook.com' isIconOnly variant='light' className='text-white'>
                <FaceBookIcon className='w-5 fill-white'/>
              </Button>
              <Button as={Link} href='https://instagram.com' isIconOnly variant='light' className='text-white'>
                <InstaIcon className='w-5 stroke-white'/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
export default BusinessInfo;
