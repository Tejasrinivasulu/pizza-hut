'use client';
import FoodImage from '@/components/common/FoodImage';
import ModalContainer from '@/components/common/ModalContainer';
import { Button, Chip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
const AdminCategoriesGrid = ({ categories, menuItems, search, onEdit, onDelete, }) => {
    const [deleteTarget, setDeleteTarget] = useState(null);
    const itemCountByCategory = useMemo(() => {
        const map = {};
        menuItems.forEach(item => {
            if (item.category) {
                map[item.category] = (map[item.category] || 0) + 1;
            }
        });
        return map;
    }, [menuItems]);
    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term)
            return categories;
        return categories.filter(c => c.name.toLowerCase().includes(term));
    }, [categories, search]);
    if (filtered.length === 0) {
        return (<p className='text-gray-400 text-center py-16 border border-gray-700 rounded-2xl'>
        {categories.length === 0 ? 'No categories yet. Add your first category above.' : 'No categories match your search.'}
      </p>);
    }
    return (<>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {filtered.map(category => {
            const count = itemCountByCategory[category._id || ''] || 0;
            return (<motion.div key={category._id} whileHover={{ y: -4 }} className='rounded-2xl border border-gray-700 bg-gray-900/60 overflow-hidden hover:border-primary/50 transition-colors flex flex-col min-h-[280px]'>
              <div className='relative h-36 bg-gray-800'>
                <FoodImage src={category.image} alt={category.name} className='w-full h-full object-cover'/>
                <Chip size='sm' color='primary' className='absolute top-3 right-3 text-dark font-bold'>
                  {count} item{count !== 1 ? 's' : ''}
                </Chip>
              </div>

              <div className='p-5 flex flex-col flex-1 gap-4'>
                <h3 className='text-lg font-bold text-white'>{category.name}</h3>

                <Button as={Link} href={`/menu-items?category=${category._id}`} color='primary' size='sm' className='text-dark font-semibold w-full'>
                  Add Item
                </Button>

                <div className='flex gap-2 mt-auto'>
                  <Button size='sm' variant='flat' className='flex-1 text-primary border border-primary/40' onPress={() => onEdit(category)}>
                    Edit
                  </Button>
                  <Button size='sm' color='danger' variant='flat' className='flex-1' onPress={() => setDeleteTarget(category)}>
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>);
        })}
      </div>

      <ModalContainer isOpen={!!deleteTarget} title='Delete category?' content={`Are you sure you want to delete "${deleteTarget === null || deleteTarget === void 0 ? void 0 : deleteTarget.name}"?`} confirmText='Yes, delete' closeText='Cancel' onConfirm={() => {
            if (deleteTarget)
                onDelete(deleteTarget);
            setDeleteTarget(null);
        }} onClose={() => setDeleteTarget(null)}/>
    </>);
};
export default AdminCategoriesGrid;
