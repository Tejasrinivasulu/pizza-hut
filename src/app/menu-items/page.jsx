'use client';
import Loader from '@/components/common/Loader';
import { useProfile } from '@/components/hooks/useProfile';
import MenuItemsTable from '@/components/features/menuItems/MenuItemsTable';
import RightArrowIcon from '@/icons/RightArrowIcon';
import { Button, Chip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
const MenuItemsPage = () => {
    const router = useRouter();
    const [categoryFilter, setCategoryFilter] = useState(null);
    const { data: session, status } = useSession();
    const { loading, data: profileData } = useProfile();
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    function fetchMenuItems() {
        fetch('/api/menu-items')
            .then(r => r.json())
            .then(data => setMenuItems(data));
    }
    useEffect(() => {
        fetchMenuItems();
        fetch('/api/categories')
            .then(r => r.json())
            .then(data => setCategories(data));
        const params = new URLSearchParams(window.location.search);
        setCategoryFilter(params.get('category'));
    }, []);
    const activeCategory = categories.find(c => c._id === categoryFilter);
    const filteredItems = useMemo(() => {
        const term = search.trim().toLowerCase();
        return menuItems.filter(item => {
            var _a;
            const cat = categories.find(c => c._id === item.category);
            const matchesCategory = !categoryFilter || item.category === categoryFilter;
            const matchesSearch = !term ||
                item.name.toLowerCase().includes(term) ||
                ((_a = item.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) ||
                (cat === null || cat === void 0 ? void 0 : cat.name.toLowerCase().includes(term));
            return matchesCategory && matchesSearch;
        });
    }, [menuItems, categories, categoryFilter, search]);
    if (status === 'unauthenticated') {
        router.push('/login');
    }
    if (profileData && !isAdmin) {
        router.push('/');
    }
    if (status === 'loading' || (loading && session)) {
        return <Loader className=''/>;
    }
    function handleDeleteMenuItem(menuItem) {
        const deletionPromise = new Promise(async (resolve, reject) => {
            const response = await fetch(`/api/menu-items?_id=${menuItem._id}`, {
                method: 'DELETE',
            }).then(r => r.json());
            if (response.error) {
                reject();
            }
            else {
                fetchMenuItems();
                resolve(response);
            }
        });
        toast.promise(deletionPromise, {
            loading: 'Deleting menu item...',
            success: 'Menu item deleted!',
            error: 'Error deleting menu item',
        });
    }
    const newItemHref = categoryFilter
        ? `/menu-items/new?category=${categoryFilter}`
        : '/menu-items/new';
    return (<section className='pt-10 pb-20 container max-w-6xl mx-auto px-4'>
      {profileData && (<div className='space-y-8'>
          <div className='rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-gray-900/90 to-gray-900/90 p-8'>
            <h1 className='text-3xl font-bold text-white normal-case mb-2'>
              🍕 Menu <span className='text-primary'>Items</span>
              {activeCategory && (<span className='text-primary'> — {activeCategory.name}</span>)}
            </h1>
            <p className='text-gray-300'>
              {activeCategory
                ? `Showing all items in ${activeCategory.name}. Add new items or edit existing ones.`
                : 'Manage all menu items across categories.'}
            </p>
          </div>

          <div className='flex flex-col lg:flex-row gap-4 lg:items-center justify-between'>
            <div className='flex flex-wrap gap-3 flex-1'>
              <input type='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search items by name or description...' className='rounded-full border border-gray-600 bg-dark px-5 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary min-w-[220px] flex-1 max-w-md'/>
              <div className='flex flex-wrap gap-2'>
                <Chip variant={!categoryFilter ? 'solid' : 'bordered'} color={!categoryFilter ? 'primary' : 'default'} className='cursor-pointer' onClick={() => router.push('/menu-items')}>
                  All Categories
                </Chip>
                {categories.map(cat => (<Chip key={cat._id} variant={categoryFilter === cat._id ? 'solid' : 'bordered'} color={categoryFilter === cat._id ? 'primary' : 'default'} className='cursor-pointer' onClick={() => router.push(`/menu-items?category=${cat._id}`)}>
                    {cat.name}
                  </Chip>))}
              </div>
            </div>
            <div className='flex gap-2 shrink-0'>
              {categoryFilter && (<Button as={Link} href='/categories' size='sm' variant='flat' className='border border-gray-600'>
                  Back to Categories
                </Button>)}
              <Button href={newItemHref} as={Link} color='primary' className='text-dark font-semibold' endContent={<RightArrowIcon className='w-6'/>}>
                Add Item
              </Button>
            </div>
          </div>

          <p className='text-sm text-gray-400'>
            Showing <span className='text-primary font-semibold'>{filteredItems.length}</span> of{' '}
            <span className='text-white font-semibold'>{menuItems.length}</span> items
          </p>

          <div className='rounded-2xl border border-gray-700/80 bg-gray-900/50 p-4 md:p-6'>
            <MenuItemsTable menuItems={filteredItems} onDelete={handleDeleteMenuItem}/>
          </div>
        </div>)}
    </section>);
};
export default MenuItemsPage;
