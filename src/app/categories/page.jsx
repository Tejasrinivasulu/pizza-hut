'use client';
import AdminCategoriesGrid from '@/components/features/categories/AdminCategoriesGrid';
import ImageUploader from '@/components/common/ImageUploader';
import Loader from '@/components/common/Loader';
import { useProfile } from '@/components/hooks/useProfile';
import { PlusIcon } from '@/icons/PlusIcon';
import { UploadIcon } from '@/icons/UploadIcon';
import { Button, Input, Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
const CategoriesPage = () => {
    const { data: session, status } = useSession();
    const { loading, data: profileData } = useProfile();
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddNewBtn, setShowAddNewBtn] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetchData();
    }, []);
    if (status === 'unauthenticated') {
        redirect('/login');
    }
    if (profileData && !isAdmin) {
        redirect('/');
    }
    if (status === 'loading' || (loading && session)) {
        return <Loader className=''/>;
    }
    function fetchData() {
        fetch('/api/categories')
            .then(r => r.json())
            .then(data => setCategories(data));
        fetch('/api/menu-items')
            .then(r => r.json())
            .then(data => setMenuItems(data));
    }
    async function handleFormSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        setError('');
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName, image: categoryImage };
            if (selectedCategory) {
                data._id = selectedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: selectedCategory ? 'PUT' : 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }).then(r => r.json());
            if (response.error) {
                setError(response.message);
                reject();
            }
            else {
                setShowAddNewBtn(true);
                setSelectedCategory(null);
                setCategoryName('');
                setCategoryImage('');
                fetchData();
                resolve(response);
            }
        });
        setSubmitting(false);
        toast.promise(creationPromise, {
            loading: selectedCategory ? 'Updating category...' : 'Creating new category...',
            success: selectedCategory ? 'Update success!' : 'Category created!',
            error: selectedCategory ? 'Error updating category' : 'Error creating category',
        });
    }
    async function handleDeleteCategory(category) {
        const deletionPromise = new Promise(async (resolve, reject) => {
            const response = await fetch(`/api/categories?_id=${category._id}`, {
                method: 'DELETE',
            }).then(r => r.json());
            if (response.error) {
                reject();
            }
            else {
                fetchData();
                resolve(response);
            }
        });
        toast.promise(deletionPromise, {
            loading: 'Deleting category...',
            success: 'Category deleted!',
            error: 'Error deleting category',
        });
    }
    return (<section className='pt-10 pb-20 container max-w-6xl mx-auto px-4'>

      {profileData && (<div className='space-y-8'>

          <div className='rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-gray-900/90 to-gray-900/90 p-8'>

            <h1 className='text-3xl font-bold text-white normal-case mb-2'>

              🗂️ Categories <span className='text-primary'>Management</span>

            </h1>

            <p className='text-gray-300'>

              Manage food categories. Each box shows item count — click Add Item to manage items in that category.

            </p>

          </div>



          <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between'>

            <input type='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search categories...' className='rounded-full border border-gray-600 bg-dark px-5 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary flex-1 max-w-md'/>

            <Button className={`text-dark font-semibold ${showAddNewBtn ? '' : 'hidden'}`} color='primary' disabled={submitting} endContent={<PlusIcon className='w-6'/>} onPress={() => setShowAddNewBtn(false)}>

              Add New Category

            </Button>

          </div>



          <form className={`${showAddNewBtn ? 'hidden' : 'grid grid-cols-3 gap-6 rounded-2xl border border-gray-700 bg-gray-900/50 p-6'}`} onSubmit={handleFormSubmit}>

            <div className={`relative min-h-[160px] ${categoryImage ? '' : 'bg-blue-100 border-dashed border-3 border-blue-500 rounded-lg flex flex-col text-center justify-center'}`}>

              <label className='cursor-pointer h-full flex flex-col justify-center'>

                {categoryImage ? (<Tooltip content='Click to upload image' placement='bottom'>

                    <span className='h-full relative min-h-[160px] block'>

                      <Image src={categoryImage} alt={categoryImage} className='rounded-xl' fill/>

                    </span>

                  </Tooltip>) : (<>

                    <UploadIcon className='w-14 fill-blue-500 place-self-center'/>

                    Upload Image

                  </>)}

                <ImageUploader setImageLink={setCategoryImage}/>

              </label>

            </div>

            <div className='col-span-2 flex flex-col gap-4 py-2'>

              <Input isRequired type='text' label={selectedCategory ? `Editing: ${selectedCategory.name}` : 'New category name'} labelPlacement='outside' placeholder='Enter category name' value={categoryName} onChange={e => setCategoryName(e.target.value)} isDisabled={submitting}/>

              {error && <div className='text-danger'>{error}</div>}

              <div className='flex gap-2 mt-2'>

                <Button type='submit' color='primary' className='font-semibold text-dark' disabled={submitting}>

                  {selectedCategory ? 'Save Changes' : 'Add Category'}

                </Button>

                <Button color='danger' variant='flat' disabled={submitting} onPress={() => {
                setShowAddNewBtn(true);
                setSelectedCategory(null);
                setCategoryName('');
                setCategoryImage('');
                setError('');
            }}>

                  Cancel

                </Button>

              </div>

            </div>

          </form>



          <AdminCategoriesGrid categories={categories} menuItems={menuItems} search={search} onEdit={category => {
                setShowAddNewBtn(false);
                setSelectedCategory(category);
                setCategoryName(category.name);
                setCategoryImage(category.image);
                setError('');
            }} onDelete={handleDeleteCategory}/>

        </div>)}

    </section>);
};
export default CategoriesPage;
