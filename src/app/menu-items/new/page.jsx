'use client';
import Loader from '@/components/common/Loader';
import { useProfile } from '@/components/hooks/useProfile';
import MenuItemForm from '@/components/features/menuItems/MenuItemForm';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const NewMenuItemPage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { loading, data: profileData } = useProfile();
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [defaultCategory, setDefaultCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const catId = params.get('category');
        if (catId) {
            setDefaultCategory(catId);
            fetch('/api/categories')
                .then(r => r.json())
                .then((data) => {
                const cat = data.find(c => c._id === catId);
                if (cat)
                    setCategoryName(cat.name);
            });
        }
    }, []);
    if (status === 'unauthenticated') {
        router.push('/login');
    }
    if (profileData && !isAdmin) {
        router.push('/');
    }
    if (status === 'loading' || (loading && session)) {
        return <Loader className=''/>;
    }
    async function handleFormSubmit(event, data) {
        event.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify({
                    name: data.name,
                    image: data.image,
                    description: data.description,
                    category: data.category,
                    basePrice: data.basePrice,
                    sizes: data.sizes,
                    extraIngredientsPrices: data.extraIngredientsPrices,
                }),
                headers: { 'Content-Type': 'application/json' },
            }).then(r => r.json());
            if (response.errors) {
                reject();
            }
            else {
                resolve(response);
            }
        });
        await toast.promise(creationPromise, {
            loading: 'Creating new item...',
            success: 'Item created!',
            error: 'Error creating item',
        });
        router.push(defaultCategory ? `/menu-items?category=${defaultCategory}` : '/menu-items');
    }
    return (<section className='pt-10 pb-20 container max-w-6xl mx-auto px-4'>

      {profileData && (<>

          <Breadcrumbs size='lg' className='mt-8'>

            <BreadcrumbItem href='/categories'>Categories</BreadcrumbItem>

            {categoryName ? (<BreadcrumbItem href={`/menu-items?category=${defaultCategory}`}>{categoryName}</BreadcrumbItem>) : (<BreadcrumbItem href='/menu-items'>Menu Items</BreadcrumbItem>)}

            <BreadcrumbItem>Add Item</BreadcrumbItem>

          </Breadcrumbs>

          <div className='max-w-4xl mx-auto mt-12'>

            {categoryName && (<p className='text-primary font-semibold mb-6'>

                Adding new item to <span className='text-white'>{categoryName}</span> category

              </p>)}

            <MenuItemForm buttonText='Create Item' menuItem={null} defaultCategory={defaultCategory} onSubmit={handleFormSubmit} onDelete={() => null}/>

          </div>

        </>)}

    </section>);
};
export default NewMenuItemPage;
