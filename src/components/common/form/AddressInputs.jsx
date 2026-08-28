import React from 'react';
const Addressinputs = ({ addressProps, setAddressProps, disabled }) => {
    const { customerName, phone, streetAddress, city, state, country, postalCode, deliveryInstructions } = addressProps;
    return (<>
      <label>Full name</label>
      <input type="text" placeholder='Your full name' disabled={disabled} value={customerName !== null && customerName !== void 0 ? customerName : ''} onChange={e => setAddressProps('customerName', e.target.value)} className='input' required/>
      <label>Phone number</label>
      <input type="tel" placeholder='Phone number' disabled={disabled} value={phone !== null && phone !== void 0 ? phone : ''} onChange={e => setAddressProps('phone', e.target.value)} className='input' required/>
      <label>Street address</label>
      <input type="text" placeholder='Street address' disabled={disabled} value={streetAddress !== null && streetAddress !== void 0 ? streetAddress : ''} onChange={e => setAddressProps('streetAddress', e.target.value)} className='input' required/>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label>City</label>
          <input type="text" placeholder='City' disabled={disabled} value={city !== null && city !== void 0 ? city : ''} onChange={e => setAddressProps('city', e.target.value)} className='input'/>
        </div>
        <div>
          <label>State</label>
          <input type="text" placeholder='State' disabled={disabled} value={state !== null && state !== void 0 ? state : ''} onChange={e => setAddressProps('state', e.target.value)} className='input'/>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <label>Country</label>
          <input type="text" placeholder='Country' disabled={disabled} value={country !== null && country !== void 0 ? country : ''} onChange={e => setAddressProps('country', e.target.value)} className='input'/>
        </div>
        <div>
          <label>Postal code</label>
          <input type="text" placeholder='Postal code' disabled={disabled} value={postalCode !== null && postalCode !== void 0 ? postalCode : ''} onChange={e => setAddressProps('postalCode', e.target.value)} className='input'/>
        </div>
      </div>
      <label>Delivery instructions (optional)</label>
      <textarea placeholder='e.g. Ring the doorbell, leave at door...' disabled={disabled} value={deliveryInstructions !== null && deliveryInstructions !== void 0 ? deliveryInstructions : ''} onChange={e => setAddressProps('deliveryInstructions', e.target.value)} className='input min-h-[80px] resize-none'/>
    </>);
};
export default Addressinputs;
