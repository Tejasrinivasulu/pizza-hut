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
const HomeBestSellersSection = ({ className }) => {
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
    return (<section id='best-sellers' className={`scroll-mt-20 ${className !== null && className !== void 0 ? className : ''}`}>
      <div className='container py-16'>
        <SectionHeader header='Best Sellers' description='Customer favourites — handpicked bestsellers loved by thousands.'/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bestSellingItems.map(({ menuItem, rating }, index) => (<motion.div key={menuItem._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
              <BestSellingCard menuItem={menuItem} rating={rating}/>
            </motion.div>))}
        </div>
      </div>
    </section>);
};
export default HomeBestSellersSection;
