'use client';
import ImageUploader from '@/components/common/ImageUploader';
import AddressInputs from '@/components/common/form/AddressInputs';
import { PencilIcon } from '@/icons/PencilIcon';
import { Avatar, Button, Checkbox } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useProfile } from '@/components/hooks/useProfile';
const CustomerProfileView = ({ user, onSave }) => {
    var _a;
    const [editing, setEditing] = useState(false);
    const [userName, setUserName] = useState(user.name || '');
    const [userImage, setUserImage] = useState(user.image || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [streetAddress, setStreetAddress] = useState(user.streetAddress || '');
    const [city, setCity] = useState(user.city || '');
    const [state, setState] = useState(user.state || '');
    const [postalCode, setPostalCode] = useState(user.postalCode || '');
    const [country, setCountry] = useState(user.country || '');
    const [isAdmin, setIsAdmin] = useState(user.isAdmin || false);
    const { data: loggedInUserData } = useProfile();
    function handleAddressChange(propName, value) {
        if (propName === 'phone')
            setPhone(value);
        if (propName === 'streetAddress')
            setStreetAddress(value);
        if (propName === 'city')
            setCity(value);
        if (propName === 'state')
            setState(value);
        if (propName === 'country')
            setCountry(value);
        if (propName === 'postalCode')
            setPostalCode(value);
    }
    function buildProfileData() {
        return {
            name: userName,
            image: userImage,
            phone,
            streetAddress,
            postalCode,
            city,
            state,
            country,
            isAdmin,
        };
    }
    function handleSubmit(event) {
        onSave(event, buildProfileData());
        setEditing(false);
    }
    const hasAddress = phone || streetAddress || city;
    useEffect(() => {
        if (editing)
            return;
        setUserName(user.name || '');
        setUserImage(user.image || '');
        setPhone(user.phone || '');
        setStreetAddress(user.streetAddress || '');
        setCity(user.city || '');
        setState(user.state || '');
        setPostalCode(user.postalCode || '');
        setCountry(user.country || '');
        setIsAdmin(user.isAdmin || false);
    }, [user, editing]);
    return (<div className='max-w-4xl mx-auto space-y-6'>
      <div className='rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-gray-900/60 to-gray-900/40 p-8'>
        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6'>
          <div className='relative shrink-0'>
            {editing ? (<ImageUploader setImageLink={setUserImage}>
                <div className='relative cursor-pointer'>
                  <Avatar src={userImage || undefined} showFallback className='w-32 h-32 text-large border-4 border-primary'/>
                  <div className='absolute bottom-1 right-1 bg-primary text-dark rounded-full p-2'>
                    <PencilIcon className='w-4'/>
                  </div>
                </div>
              </ImageUploader>) : (<Avatar src={userImage || user.image || undefined} showFallback className='w-32 h-32 text-large border-4 border-primary'/>)}
          </div>

          <div className='flex-1 text-center sm:text-left'>
            <p className='text-sm text-primary font-semibold uppercase tracking-wider mb-1'>My Profile</p>
            <h1 className='text-3xl font-bold text-white mb-1'>{userName || 'Customer'}</h1>
            <p className='text-gray-400 mb-4'>{user.email}</p>
            <div className='flex flex-wrap gap-2 justify-center sm:justify-start'>
              <span className='px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/40'>
                {user.isAdmin ? 'Admin' : 'Customer'}
              </span>
              {user.createdAt && (<span className='px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-400 border border-gray-700'>
                  Member since {user.createdAt.substring(0, 10)}
                </span>)}
            </div>
          </div>

          {!editing && (<Button color='primary' className='font-semibold text-dark shrink-0' onPress={() => setEditing(true)}>
              Edit Profile
            </Button>)}
        </div>
      </div>

      {!editing ? (<div className='grid md:grid-cols-2 gap-5'>
          <div className='rounded-2xl border border-gray-700 bg-gray-900/40 p-6'>
            <h2 className='text-lg font-semibold text-primary mb-4'>Contact Information</h2>
            <div className='space-y-3 text-sm'>
              <div>
                <p className='text-gray-500'>Full Name</p>
                <p className='text-white font-medium'>{userName || '—'}</p>
              </div>
              <div>
                <p className='text-gray-500'>Email</p>
                <p className='text-white font-medium'>{user.email || '—'}</p>
              </div>
              <div>
                <p className='text-gray-500'>Phone</p>
                <p className='text-white font-medium'>{phone || '—'}</p>
              </div>
            </div>
          </div>

          <div className='rounded-2xl border border-gray-700 bg-gray-900/40 p-6'>
            <h2 className='text-lg font-semibold text-primary mb-4'>Delivery Address</h2>
            {hasAddress ? (<div className='text-sm text-gray-300 space-y-1'>
                <p>{streetAddress}</p>
                <p>{[city, state, postalCode].filter(Boolean).join(', ')}</p>
                <p>{country}</p>
              </div>) : (<p className='text-sm text-gray-500'>No delivery address saved yet.</p>)}
          </div>
        </div>) : (<form onSubmit={handleSubmit} className='rounded-2xl border border-gray-700 bg-gray-900/40 p-6 space-y-4'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-semibold text-primary'>Edit Profile</h2>
            <Button type='button' variant='flat' size='sm' onPress={() => setEditing(false)}>
              Cancel
            </Button>
          </div>

          <div>
            <label className='text-gray-400 text-sm'>Full name</label>
            <input type='text' value={userName} onChange={e => setUserName(e.target.value)} className='input' placeholder='Full name'/>
          </div>
          <div>
            <label className='text-gray-400 text-sm'>Email</label>
            <input type='email' value={(_a = user.email) !== null && _a !== void 0 ? _a : ''} disabled className='input'/>
          </div>

          <AddressInputs addressProps={{ phone, streetAddress, city, state, country, postalCode }} setAddressProps={handleAddressChange} disabled={false}/>

          {(loggedInUserData === null || loggedInUserData === void 0 ? void 0 : loggedInUserData.isAdmin) && (<Checkbox isSelected={isAdmin} onValueChange={setIsAdmin}>
              Admin
            </Checkbox>)}

          <Button type='submit' color='primary' className='font-semibold text-dark w-full sm:w-auto'>
            Save Changes
          </Button>
        </form>)}
    </div>);
};
export default CustomerProfileView;
