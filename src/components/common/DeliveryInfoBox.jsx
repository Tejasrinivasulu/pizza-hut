const DeliveryInfoBox = ({ order }) => {
    const fullAddress = [
        order.streetAddress,
        order.city,
        order.state,
        order.postalCode,
        order.country,
    ]
        .filter(Boolean)
        .join(', ');
    return (<div className='rounded-xl border border-gray-700 bg-gray-900/60 p-6 space-y-4 text-gray-200 leading-relaxed'>
      <div>
        <p className='text-xs uppercase tracking-wide text-primary font-semibold mb-1'>Customer Name</p>
        <p className='text-white font-medium'>{order.customerName || '—'}</p>
      </div>
      <div>
        <p className='text-xs uppercase tracking-wide text-primary font-semibold mb-1'>Phone Number</p>
        <p>{order.phone || '—'}</p>
      </div>
      <div>
        <p className='text-xs uppercase tracking-wide text-primary font-semibold mb-1'>Email</p>
        <p>{order.userEmail || '—'}</p>
      </div>
      <div>
        <p className='text-xs uppercase tracking-wide text-primary font-semibold mb-1'>Delivery Address</p>
        <p>{fullAddress || '—'}</p>
      </div>
      {order.deliveryInstructions && (<div className='rounded-lg bg-primary/10 border border-primary/30 p-4'>
          <p className='text-xs uppercase tracking-wide text-primary font-semibold mb-1'>Delivery Instructions</p>
          <p className='text-gray-300'>{order.deliveryInstructions}</p>
        </div>)}
    </div>);
};
export default DeliveryInfoBox;
