'use client';
import SectionHeader from '@/components/layout/SectionHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
const OFFERS = [
    {
        badge: 'New User',
        title: '20% OFF First Order',
        description: 'Use code FIESTA20 at checkout on your first order.',
        code: 'FIESTA20',
        cta: 'Order Now',
        href: '/menu',
        gradient: 'from-primary/25 via-orange-500/10 to-transparent',
    },
    {
        badge: 'Weekend',
        title: 'Buy 1 Get 1 Pizza',
        description: 'Every Saturday & Sunday on selected large pizzas.',
        code: 'BOGOPIZZA',
        cta: 'View Pizzas',
        href: '/menu?category=Pizza',
        gradient: 'from-red-500/20 via-primary/10 to-transparent',
    },
    {
        badge: 'Free Delivery',
        title: 'Free Delivery Above ₹499',
        description: 'No delivery charge on orders above ₹499. Limited time.',
        code: null,
        cta: 'Shop Now',
        href: '/menu',
        gradient: 'from-emerald-500/20 via-primary/10 to-transparent',
    },
];
const HomeOffersSection = ({ className }) => {
    return (<section id='offers' className={`scroll-mt-20 bg-gray-900/30 border-y border-gray-800/60 ${className}`}>
      <div className='container py-16'>
        <SectionHeader header='Special Offers' description='Grab these deals before they expire — save more on every order.'/>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {OFFERS.map((offer, index) => (<motion.div key={offer.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.1 }} whileHover={{ y: -6 }} className={`relative overflow-hidden rounded-2xl border border-gray-700/80 bg-gradient-to-br ${offer.gradient} bg-gray-900/70 p-6 flex flex-col hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all`}>
              <span className='inline-block self-start mb-3 px-3 py-1 rounded-full bg-primary text-dark text-xs font-bold uppercase'>
                {offer.badge}
              </span>
              <h3 className='text-xl font-bold text-white mb-2 normal-case'>{offer.title}</h3>
              <p className='text-gray-400 text-sm leading-relaxed mb-4 flex-1'>{offer.description}</p>
              {offer.code && (<p className='text-sm text-gray-300 mb-4'>
                  Code:{' '}
                  <span className='font-mono font-bold text-primary bg-dark/60 px-2 py-0.5 rounded'>
                    {offer.code}
                  </span>
                </p>)}
              <Button as={Link} href={offer.href} color='primary' radius='full' size='sm' className='self-start font-bold text-dark'>
                {offer.cta} →
              </Button>
            </motion.div>))}
        </div>
      </div>
    </section>);
};
export default HomeOffersSection;
