'use client';
import UsersTable from '@/components/features/users/UsersTable';
import { useProfile } from '@/components/hooks/useProfile';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loader from '@/components/common/Loader';
const UsersPage = () => {
    const { data: session, status } = useSession();
    const { loading, data: profileData } = useProfile();
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);
    if (status === 'unauthenticated') {
        redirect('/login');
    }
    if (profileData && !isAdmin) {
        redirect('/');
    }
    if (status === 'loading' || loading && session) {
        return <Loader className={""}/>;
    }
    return (<section className='pt-10 pb-20 max-w-6xl mx-auto'>
      {profileData &&
            <>
          <div className="max-w-4xl mx-auto mt-8">
            <UsersTable users={users}/>
          </div>
        </>}
    </section>);
};
export default UsersPage;
