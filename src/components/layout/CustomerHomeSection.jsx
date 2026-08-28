'use client';
import BestSellingCard from '@/components/features/home/BestSellingCard';
import SectionHeader from '@/components/layout/SectionHeader';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
const BEST_SELLING = [
    { name: 'Farmhouse Pizza', rating: 4.8 },
    { name: 'BBQ Chicken Pizza', rating: 4.9 },
    { name: 'Zinger Burger', rating: 4.7 },
    { name: 'Alfredo Pasta', rating: 4.8 },
    { name: 'Cookies & Cream Ice Cream', rating: 4.9 },
    { name: 'Chocolate Milkshake', rating: 4.8 },
];
const REVIEWS = [
    { text: 'The pizza was hot and delicious. Fast delivery too!', author: 'Priya S.', initials: 'PS', color: 'bg-pink-500' },
    { text: 'Best burgers and pasta in town! Will order again.', author: 'Rahul M.', initials: 'RM', color: 'bg-blue-500' },
    { text: 'Amazing taste and affordable prices. Highly recommend!', author: 'Ananya K.', initials: 'AK', color: 'bg-emerald-500' },
];
const CustomerHomeSection = ({ className }) => {
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items')
            .then(res => res.json())
            .then(data => {
            if (Array.isArray(data))
                setMenuItems(data);
        });
    }, []);
    const bestSellingItems = useMemo(() => {
        return BEST_SELLING
            .map(spec => {
            const item = menuItems.find(m => m.name === spec.name);
            return item ? { menuItem: item, rating: spec.rating } : null;
        })
            .filter(Boolean);
    }, [menuItems]);
    return (<section className={className}>
      <div className='container py-16 space-y-24'>
        <div className='relative'>
          <div className='absolute -inset-x-4 inset-y-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl pointer-events-none'/>
          <div className='relative'>
            <SectionHeader header='Best Selling Items' description='Customer favourites — handpicked bestsellers loved by thousands.'/>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {bestSellingItems.map(({ menuItem, rating }, index) => (<motion.div key={menuItem._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
                  <BestSellingCard menuItem={menuItem} rating={rating}/>
                </motion.div>))}
            </div>
          </div>
        </div>

        <div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionHeader header='Customer Reviews' description='Hear what our happy customers have to say about Pizza Fiesta.'/>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {REVIEWS.map((review, index) => (<motion.div key={review.author} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.15 }} whileHover={{ y: -6 }} className='relative rounded-2xl border border-gray-700 bg-gray-900/60 p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all'>
                <span className='absolute top-4 right-5 text-5xl text-primary/20 font-serif leading-none'>&ldquo;</span>
                <div className='flex items-center gap-3 mb-4'>
                  <div className={`w-11 h-11 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {review.initials}
                  </div>
                  <div>
                    <p className='font-semibold text-white'>{review.author}</p>
                    <p className='text-yellow-400 text-sm tracking-wide'>★★★★★</p>
                  </div>
                </div>
                <p className='text-gray-300 leading-relaxed italic'>
                  &ldquo;{review.text}&rdquo;
                </p>
              </motion.div>))}
          </div>
        </div>
      </div>
    </section>);
};
export default CustomerHomeSection;
