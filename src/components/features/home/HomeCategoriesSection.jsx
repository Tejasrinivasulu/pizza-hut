'use client';
import FoodImage from '@/components/common/FoodImage';
import SectionHeader from '@/components/layout/SectionHeader';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
const POPULAR_CATEGORIES = [
    { emoji: '🍕', label: 'Pizza', slug: 'Pizza', tagline: '10+ Varieties' },
    { emoji: '🍔', label: 'Burgers', slug: 'Burgers', tagline: 'Crispy & Juicy' },
    { emoji: '🍝', label: 'Pasta', slug: 'Pasta', tagline: 'Creamy Italian' },
    { emoji: '🍦', label: 'Ice Creams', slug: 'Ice-creams', tagline: 'Cool Treats' },
    { emoji: '🥤', label: 'Drinks', slug: 'Drinks', tagline: 'Fresh & Chilled' },
];
const FALLBACK_IMAGES = {
    Pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
    Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop',
    Pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop',
    'Ice-creams': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
    Drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop',
};
const HomeCategoriesSection = ({ className }) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
            if (Array.isArray(data))
                setCategories(data);
        });
    }, []);
    const categoryImageMap = useMemo(() => {
        const map = Object.assign({}, FALLBACK_IMAGES);
        categories.forEach(cat => {
            if (cat.name && cat.image)
                map[cat.name] = cat.image;
        });
        return map;
    }, [categories]);
    return (<section id='categories' className={`scroll-mt-20 ${className}`}>
      <div className='container pt-10 pb-16'>
        <SectionHeader header='Categories' description='Pick a category and explore our full menu of delicious options.'/>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6'>
          {POPULAR_CATEGORIES.map((cat, index) => (<motion.div key={cat.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
              <Link href={`/menu?category=${encodeURIComponent(cat.slug)}`} className='group block rounded-2xl border border-gray-700/80 bg-gradient-to-b from-gray-800/80 to-gray-900/80 overflow-hidden hover:border-primary hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-300'>
                <div className='relative p-4 flex justify-center'>
                  <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity'/>
                  <div className='relative'>
                    <div className='absolute -inset-2 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity'/>
                    <FoodImage src={categoryImageMap[cat.slug]} alt={cat.label} className='relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-primary/50 object-cover group-hover:scale-110 group-hover:border-primary transition-all duration-300'/>
                  </div>
                </div>
                <div className='px-4 pb-5 text-center'>
                  <p className='text-2xl mb-1'>{cat.emoji}</p>
                  <h3 className='font-bold text-primary mb-0.5'>{cat.label}</h3>
                  <p className='text-xs text-gray-400'>{cat.tagline}</p>
                </div>
              </Link>
            </motion.div>))}
        </div>
      </div>
    </section>);
};
export default HomeCategoriesSection;
