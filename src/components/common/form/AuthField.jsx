const AuthField = ({ label, type = 'text', value, onChange, placeholder, disabled, required, autoComplete, }) => (<div>
    <label htmlFor={label}>{label}</label>
    <input id={label} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} required={required} autoComplete={autoComplete} className='input mb-0 py-2.5 text-sm'/>
  </div>);
export default AuthField;
