'use client';
import { useState } from 'react';
const AuthPasswordField = ({ value, onChange, disabled }) => {
    const [visible, setVisible] = useState(false);
    return (<div>
      <label htmlFor='auth-password'>Password</label>
      <div className='relative'>
        <input id='auth-password' type={visible ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)} placeholder='Enter your password' disabled={disabled} required autoComplete='current-password' className='input mb-0 py-2.5 pr-16 text-sm'/>
        <button type='button' onClick={() => setVisible(v => !v)} className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary font-medium' tabIndex={-1}>
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>);
};
export default AuthPasswordField;
