'use client';
import AdminReportsView from '@/components/features/admin/AdminReportsView';
import Loader from '@/components/common/Loader';
import { useProfile } from '@/components/hooks/useProfile';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
const ReportsPage = () => {
    const { status } = useSession();
    const { data: profileData, loading } = useProfile();
    const [orders, setOrders] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    useEffect(() => {
        fetch('/api/orders')
            .then(res => res.json())
            .then(data => {
            if (Array.isArray(data))
                setOrders([...data].reverse());
        })
            .finally(() => setDataLoading(false));
    }, []);
    if (status === 'loading' || loading || dataLoading)
        return <Loader className='h-screen'/>;
    if (!(profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin))
        redirect('/');
    return (<div className='container py-10'>
      <AdminReportsView orders={orders}/>
    </div>);
};
export default ReportsPage;
