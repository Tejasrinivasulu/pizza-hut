'use client';
import SectionHeader from '@/components/layout/SectionHeader';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
const STEPS = [
    { step: '01', emoji: '📋', title: 'Browse Menu', description: 'Explore pizzas, burgers, pasta, drinks & more.' },
    { step: '02', emoji: '🛒', title: 'Add to Cart', description: 'Pick your favourites and customise sizes & extras.' },
    { step: '03', emoji: '💳', title: 'Checkout', description: 'Pay online or choose cash on delivery — your choice.' },
    { step: '04', emoji: '🎉', title: 'Enjoy!', description: 'Sit back while we deliver fresh food to your door.' },
];
const HomeHowItWorks = ({ className }) => {
    return (<section className={`bg-gray-900/40 border-y border-gray-800 ${className}`}>
      <div className='container py-20'>
        <SectionHeader header='How It Works' description='Ordering your favourite food is just four simple steps away.'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative'>
          <div className='hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent'/>
          {STEPS.map((item, index) => (<motion.div key={item.step} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className='relative flex flex-col items-center text-center p-6 rounded-2xl border border-gray-700/60 bg-dark/80 hover:border-primary/40 transition-colors'>
              <span className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-dark text-xs font-bold'>
                {item.step}
              </span>
              <span className='text-4xl mb-4 mt-2'>{item.emoji}</span>
              <h3 className='text-lg font-semibold text-white mb-2'>{item.title}</h3>
              <p className='text-gray-400 text-sm leading-relaxed'>{item.description}</p>
            </motion.div>))}
        </div>
        <div className='text-center mt-12'>
          <Button as={Link} href='/menu' color='primary' radius='full' size='lg' className='px-10 font-bold text-dark'>
            Start Ordering
          </Button>
        </div>
      </div>
    </section>);
};
export default HomeHowItWorks;
