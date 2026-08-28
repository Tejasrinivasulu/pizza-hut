import { calcTax, DELIVERY_FEE } from '@/libs/orderTotals';
import { formatPrice } from '@/libs/currency';
const OrderSummary = ({ orderId, subtotal, deviveryFee = DELIVERY_FEE, tax, discount = 0, paid }) => {
    const gst = tax !== null && tax !== void 0 ? tax : calcTax(subtotal);
    const total = subtotal + deviveryFee + gst - discount;
    return (<>
      <div className='grid grid-cols-8 pt-2'>
        <div className='pl-4 col-span-7 flex justify-between font-semibold'>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
      <div className='grid grid-cols-8 pt-1'>
        <div className='pl-4 col-span-7 flex justify-between text-gray-400'>
          <span>Delivery fee</span>
          <span>{formatPrice(deviveryFee)}</span>
        </div>
      </div>
      <div className='grid grid-cols-8 pt-1'>
        <div className='pl-4 col-span-7 flex justify-between text-gray-400'>
          <span>Tax / GST (5%)</span>
          <span>{formatPrice(gst)}</span>
        </div>
      </div>
      {discount > 0 && (<div className='grid grid-cols-8 pt-1 pb-2 border-b border-dashed'>
          <div className='pl-4 col-span-7 flex justify-between text-gray-400'>
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        </div>)}
      <div className='grid grid-cols-8 pt-2 border-t border-dashed mt-1'>
        <div className='pl-4 col-span-7 flex justify-between font-semibold text-primary text-lg'>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      {orderId &&
            <div className='grid grid-cols-8 pt-1'>
          <div className='pl-4 col-span-7 flex justify-between font-semibold'>
            <span>Amount Paid</span>
            <span>{paid ? formatPrice(total) : '₹0'}</span>
          </div>
        </div>}
    </>);
};
export default OrderSummary;
