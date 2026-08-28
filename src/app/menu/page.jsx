'use client';
import Loader from '@/components/common/Loader';
import CategoryTag from '@/components/features/categories/CategoryTag';
import MenuItemCard from '@/components/features/menuItems/MenuItemCard';
import SectionHeader from '@/components/layout/SectionHeader';
import Link from 'next/link';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
function filterBySearch(items, query) {
    const term = query.trim().toLowerCase();
    if (!term)
        return items;
    return items.filter(item => {
        var _a, _b;
        return item.name.toLowerCase().includes(term) ||
            ((_b = (_a = item.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) !== null && _b !== void 0 ? _b : false);
    });
}
const MenuPage = () => {
    var _a;
    const searchParams = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(true);
    const searchQuery = ((_a = searchParams.get('search')) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    const isSearching = searchQuery.length > 0;
    const filteredCategories = categories.filter(category => category.name.includes(tag));
    const displayedItems = useMemo(() => {
        if (isSearching) {
            return filterBySearch(menuItems, searchQuery);
        }
        const category = categories.find(c => c.name === tag);
        if (!category)
            return [];
        return menuItems.filter(item => item.category === category._id);
    }, [isSearching, searchQuery, menuItems, categories, tag]);
    useEffect(() => {
        Promise.all([
            fetch('/api/categories').then(res => res.json()),
            fetch('/api/menu-items').then(res => res.json()),
        ]).then(([categoryData, menuData]) => {
            var _a;
            setCategories(categoryData);
            setMenuItems(menuData);
            const fromUrlSearch = (_a = searchParams.get('search')) === null || _a === void 0 ? void 0 : _a.trim();
            if (fromUrlSearch)
                return;
            const fromUrl = searchParams.get('category');
            const match = fromUrl && categoryData.find(c => c.name === fromUrl);
            if (match) {
                setTag(match.name);
            }
            else if (categoryData.length > 0) {
                setTag(categoryData[0].name);
            }
        }).finally(() => setLoading(false));
    }, [searchParams]);
    if (loading) {
        return <Loader className={''}/>;
    }
    return (<section className="py-12">

      {categories && menuItems && (<>

          <SectionHeader header={isSearching ? 'Search Results' : 'Our Menu'} description={isSearching
                ? `Showing items matching "${searchQuery}"`
                : 'Explore pizza, drinks, burgers, ice-creams, and pasta — something delicious for every craving.'}/>



          {isSearching ? (<div className='text-center mb-8'>

              <Link href='/menu' className='text-primary font-semibold hover:underline'>

                ← Clear search &amp; browse all categories

              </Link>

            </div>) : (<div className='flex gap-3 justify-center mb-12 flex-wrap'>

              {categories.map(category => (<CategoryTag key={category._id} name={category.name} onClick={(name) => setTag(name)} isSelected={tag === category.name}/>))}

            </div>)}



          {displayedItems.length > 0 ? (<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>

              {displayedItems.map(item => (<div className='p-4' key={item._id}>

                  <MenuItemCard menuItem={item}/>

                </div>))}

            </div>) : (<div className='text-center py-16 text-gray-400'>

              <p className='text-lg mb-2'>No items found for &ldquo;{searchQuery}&rdquo;</p>

              <Link href='/menu' className='text-primary font-semibold hover:underline'>

                Browse full menu

              </Link>

            </div>)}



          {!isSearching && filteredCategories.length > 0 && displayedItems.length === 0 && (<div className='text-center py-12 text-gray-400'>

              <p>No items in this category yet.</p>

            </div>)}

        </>)}

    </section>);
};
const MenuPageWrapper = () => (<Suspense fallback={<Loader className=""/>}>

    <MenuPage />

  </Suspense>);
export default MenuPageWrapper;
