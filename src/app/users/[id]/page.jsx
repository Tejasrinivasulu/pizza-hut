'use client';
import ProfileForm from '@/components/common/form/ProfileForm';
import { useProfile } from '@/components/hooks/useProfile';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Loader from '@/components/common/Loader';
const EditUserPage = () => {
    const { data: session, status } = useSession();
    const { loading, data: profileData } = useProfile();
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [user, setUser] = useState(null);
    const { id } = useParams();
    function fetchUser() {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(users => setUser(users.find((u) => u._id === id)));
    }
    useEffect(() => {
        fetchUser();
    }, [id]);
    if (status === 'unauthenticated') {
        redirect('/login');
    }
    if (profileData && !isAdmin) {
        redirect('/');
    }
    if (status === 'loading' || loading && session) {
        return <Loader className={""}/>;
    }
    async function handleProfileUpdate(event, data) {
        event.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const reqData = data;
            reqData._id = id;
            const response = await fetch('/api/profile', {
                method: 'PUT',
                body: JSON.stringify(reqData),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json());
            if (response.error) {
                reject();
            }
            else {
                fetchUser();
                resolve(response);
            }
        });
        toast.promise(savingPromise, {
            loading: "Saving...",
            success: "User info saved!",
            error: "Error saving user info"
        });
    }
    return (<section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
            <>
          <Breadcrumbs size='lg' className="mt-8">
            <BreadcrumbItem href='/users'>Users</BreadcrumbItem>
            <BreadcrumbItem>Edit </BreadcrumbItem>
          </Breadcrumbs>
          <div className="max-w-2xl mx-auto mt-12">
            {user &&
                    <ProfileForm user={user} onSave={(event, data) => handleProfileUpdate(event, data)}/>}
          </div>
        </>}
    </section>);
};
export default EditUserPage;
