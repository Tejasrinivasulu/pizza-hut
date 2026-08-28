'use client';
import { PizzaIcon } from '@/icons/PizzaIcon';
import { ScooterIcon } from '@/icons/ScooterIcon';
import { ShoppingBagIcon } from '@/icons/ShoppingBagIcon';
import { UsersIcon } from '@/icons/UsersIcon';
import { motion } from 'framer-motion';
const SERVICES = [
    {
        icon: PizzaIcon,
        title: 'Dine-In',
        description: 'Enjoy a warm, welcoming atmosphere with freshly prepared meals served at your table.',
    },
    {
        icon: ShoppingBagIcon,
        title: 'Online Ordering',
        description: 'Browse our full menu, customise your order, and pay securely from any device.',
    },
    {
        icon: ScooterIcon,
        title: 'Home Delivery',
        description: 'Hot food delivered straight to your doorstep — fast, safe, and always on time.',
    },
    {
        icon: UsersIcon,
        title: 'Party Catering',
        description: 'Planning a celebration? We cater birthdays, office events, and family gatherings.',
    },
];
const HomeFeaturesSection = ({ className }) => {
    return (<section id='services' className={`relative overflow-hidden scroll-mt-20 bg-primary ${className !== null && className !== void 0 ? className : ''}`}>
      <div className='absolute inset-0 bg-[url("/assets/bg_wallpaper.png")] bg-repeat opacity-20 pointer-events-none'/>
      <div className='absolute top-0 left-0 right-0 h-1 bg-dark/20'/>
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-dark/20'/>

      <div className='container py-16 md:py-20 relative'>
        <div className='max-w-3xl mx-auto text-center mb-12 md:mb-16'>
          <h2 className='text-2xl md:text-4xl font-bold uppercase tracking-wide text-dark mb-4'>
            Our Services
          </h2>
          <div className='flex justify-center items-center gap-3 mb-5'>
            <hr className='bg-dark h-px w-10 border-none'/>
            <div className='h-2 w-2 bg-dark rotate-45'/>
            <div className='h-4 w-4 bg-dark rotate-45'/>
            <div className='h-2 w-2 bg-dark rotate-45'/>
            <hr className='bg-dark h-px w-10 border-none'/>
          </div>
          <p className='text-dark/80 text-base md:text-lg leading-relaxed font-medium'>
            Dine with us, order online, get delivery, or cater your next big event.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {SERVICES.map((service, index) => (<motion.div key={service.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.03 }} className='group relative rounded-2xl border-2 border-dark/15 bg-dark p-8 text-center shadow-xl shadow-dark/25 hover:shadow-2xl hover:border-dark/40 transition-all duration-300'>
              <div className='relative mx-auto mb-6'>
                <div className='w-24 h-24 mx-auto rounded-2xl bg-primary border-2 border-primary flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-300'>
                  <service.icon className='w-11 h-11 text-dark'/>
                </div>
              </div>

              <h3 className='text-xl font-bold text-primary mb-3 uppercase tracking-wider'>
                {service.title}
              </h3>
              <p className='text-gray-300 leading-relaxed text-sm md:text-base'>
                {service.description}
              </p>

              <div className='mt-6 h-1.5 w-14 mx-auto rounded-full bg-gray-700 group-hover:w-24 group-hover:bg-primary transition-all duration-300'/>
            </motion.div>))}
        </div>
      </div>
    </section>);
};
export default HomeFeaturesSection;
