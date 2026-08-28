'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
const HomeCtaSection = ({ className }) => {
    return (<section className={className}>
      <div className='container pb-20'>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='relative overflow-hidden rounded-3xl'>
          <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url('/assets/slider_bg_1.jpg')" }}/>
          <div className='absolute inset-0 bg-dark/80'/>
          <div className='absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent'/>

          <div className='relative px-8 py-16 md:py-20 text-center'>
            <span className='font-nothingYouCouldDo text-primary text-3xl md:text-4xl block mb-2'>
              Hungry?
            </span>
            <h2 className='text-3xl md:text-5xl font-bold text-white mb-4 normal-case'>
              Order Now &amp; Taste the Fiesta
            </h2>
            <p className='text-gray-300 max-w-xl mx-auto mb-8 text-lg'>
              Join thousands of happy customers. Fresh food, fast delivery, unforgettable flavours.
            </p>
            <div className='flex flex-wrap gap-4 justify-center'>
              <Button as={Link} href='/menu' color='primary' radius='full' size='lg' className='px-10 font-bold text-dark'>
                Order Now
              </Button>
              <Button as={Link} href='/help-center' radius='full' size='lg' variant='bordered' className='border-white/40 text-white px-10'>
                Customer Care
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);
};
export default HomeCtaSection;
