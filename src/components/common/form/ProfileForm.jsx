import React, { useState } from 'react';
import ImageUploader from '../ImageUploader';
import { Avatar, Button, Checkbox } from '@nextui-org/react';
import { PencilIcon } from '@/icons/PencilIcon';
import { useProfile } from '../../hooks/useProfile';
import AddressInputs from './AddressInputs';
const ProfileForm = ({ user, onSave }) => {
    var _a;
    const [userName, setUserName] = useState((user === null || user === void 0 ? void 0 : user.name) || '');
    const [userImage, setUserImage] = useState((user === null || user === void 0 ? void 0 : user.image) || '');
    const [phone, setPhone] = useState((user === null || user === void 0 ? void 0 : user.phone) || '');
    const [streetAddress, setStreetAddress] = useState((user === null || user === void 0 ? void 0 : user.streetAddress) || '');
    const [city, setCity] = useState((user === null || user === void 0 ? void 0 : user.city) || '');
    const [state, setState] = useState((user === null || user === void 0 ? void 0 : user.state) || '');
    const [postalCode, setPostalCode] = useState((user === null || user === void 0 ? void 0 : user.postalCode) || '');
    const [country, setCountry] = useState((user === null || user === void 0 ? void 0 : user.country) || '');
    const [isAdmin, setIsAdmin] = useState((user === null || user === void 0 ? void 0 : user.isAdmin) || false);
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
    return (<div className='grid grid-cols-6 gap-4'>
      <div className='col-span-2'>
        <ImageUploader setImageLink={setUserImage}>
          <div className='relative'>
            {userImage ? (<Avatar src={userImage} className="w-[160px] h-[160px]"/>) : (<Avatar src='' showFallback className="w-[160px] h-[160px]"/>)}
            <div className='bg-primary text-dark rounded-full p-2 absolute right-11 bottom-6 hover:text-white'>
              <PencilIcon className={'w-5'}/>
            </div>
          </div>
        </ImageUploader>
      </div>
      <form className='col-span-4' onSubmit={(e) => onSave(e, { name: userName, image: userImage, phone, streetAddress, postalCode, city, state, country, isAdmin })}>
        <label> Full name</label>
        <input type="text" placeholder='Full name' value={userName !== null && userName !== void 0 ? userName : ''} onChange={e => setUserName(e.target.value)} className='input'/>
        <label> Email</label>
        <input type="email" placeholder="Email" value={(_a = user === null || user === void 0 ? void 0 : user.email) !== null && _a !== void 0 ? _a : ''} disabled className='input'/>
        <AddressInputs addressProps={{ phone, streetAddress, city, state, country, postalCode }} setAddressProps={(propName, value) => handleAddressChange(propName, value)} disabled={false}/>
        {(loggedInUserData === null || loggedInUserData === void 0 ? void 0 : loggedInUserData.isAdmin) && (<div className='my-2'>
            <Checkbox checked={isAdmin} defaultSelected={isAdmin} value={'1'} onChange={(e) => setIsAdmin(e.target.checked)}>Admin</Checkbox>
          </div>)}
        <Button type='submit' className='mt-2 font-semibold hover:text-white' fullWidth>Save All Changes</Button>
      </form>
    </div>);
};
export default ProfileForm;
