'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
const HomePromoBanner = () => {
    return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className='relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/20 via-primary/10 to-orange-600/10 p-8 md:p-12'>
      <div className='absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3'/>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4'/>

      <div className='relative flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='text-center md:text-left'>
          <span className='inline-block mb-2 px-3 py-1 rounded-full bg-primary text-dark text-xs font-bold uppercase tracking-wider'>
            Limited Offer
          </span>
          <h2 className='text-2xl md:text-4xl font-bold text-white mb-2 normal-case'>
            Get <span className='text-primary'>20% OFF</span> on Your First Order
          </h2>
          <p className='text-gray-300'>
            Use code <span className='font-mono font-bold text-primary bg-dark/50 px-2 py-0.5 rounded'>FIESTA20</span> at checkout
          </p>
        </div>
        <Button as={Link} href='/menu' color='primary' radius='full' size='lg' className='shrink-0 px-10 font-bold text-dark shadow-lg shadow-primary/30'>
          Claim Offer →
        </Button>
      </div>
    </motion.div>);
};
export default HomePromoBanner;
