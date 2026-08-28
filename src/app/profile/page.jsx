'use client';
import { useProfile } from '@/components/hooks/useProfile';
import ProfileForm from '@/components/common/form/ProfileForm';
import CustomerProfileView from '@/components/features/profile/CustomerProfileView';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '@/components/common/Loader';
const ProfilePage = () => {
    const { data: session, status } = useSession();
    const { data: profileData, loading } = useProfile();
    const [profileKey, setProfileKey] = useState(0);
    if (status === 'unauthenticated') {
        redirect('/login');
    }
    if (status === 'loading' || loading && session) {
        return <Loader className={""}/>;
    }
    async function handleProfileUpdate(event, data) {
        event.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                setProfileKey(k => k + 1);
                resolve(response);
            }
            else {
                reject();
            }
        });
        toast.promise(savingPromise, {
            loading: "Saving...",
            success: "Profile saved!",
            error: "Error saving profile"
        });
    }
    return (<section className="pt-10 pb-20 px-4">

      {profileData &&
            <>

          <div className="mt-4 max-w-2xl mx-auto">

            {profileData.isAdmin ? (<ProfileForm user={profileData} onSave={(event, data) => handleProfileUpdate(event, data)}/>) : (<CustomerProfileView key={profileKey} user={profileData} onSave={handleProfileUpdate}/>)}

          </div>

        </>}

    </section>);
};
export default ProfilePage;
