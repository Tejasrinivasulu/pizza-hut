'use client';
import DeliveryInfoBox from '@/components/common/DeliveryInfoBox';
import FoodImage from '@/components/common/FoodImage';
import { calcOrderTotal, calcSubtotal } from '@/libs/orderTotals';
import { calCartProductPrice } from '@/util/ContextProvider';
import { Button } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { formatPrice } from '@/libs/currency';
const PaymentPage = () => {
    var _a, _b, _c, _d;
    const { orderId } = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [paymentType, setPaymentType] = useState('upi');
    const [paying, setPaying] = useState(false);
    useEffect(() => {
        if (orderId) {
            fetch(`/api/orders?_id=${orderId}`)
                .then(res => res.json())
                .then(data => setOrder(data));
        }
    }, [orderId]);
    if (!order) {
        return <p className='text-center py-20'>Loading payment page...</p>;
    }
    const subtotal = (_a = order.subtotal) !== null && _a !== void 0 ? _a : calcSubtotal(order.cartProducts);
    const total = (_b = order.total) !== null && _b !== void 0 ? _b : calcOrderTotal(subtotal);
    async function handleProceedToPay() {
        setPaying(true);
        try {
            const res = await fetch('/api/orders/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, onlinePaymentType: paymentType }),
            });
            const data = await res.json();
            if (!res.ok)
                throw new Error();
            toast.success('Payment successful!');
            router.push(data.redirect);
        }
        catch (_a) {
            toast.error('Payment failed. Please try again.');
            setPaying(false);
        }
    }
    return (<section className='pt-10 pb-20 max-w-4xl mx-auto px-4'>
      <h1 className='text-3xl font-semibold text-primary italic text-center mb-8'>💳 Payment Page</h1>

      <div className='grid md:grid-cols-2 gap-8'>
        <div className='rounded-xl bg-gray-800 p-6'>
          <h2 className='text-xl font-semibold text-primary mb-4'>Order Summary</h2>
          <div className='space-y-3 mb-4'>
            <div className='grid grid-cols-4 text-sm text-gray-400 font-semibold border-b border-gray-600 pb-2'>
              <span className='col-span-2'>Ordered Items</span>
              <span className='text-center'>Qty</span>
              <span className='text-right'>Price</span>
            </div>
            {order.cartProducts.map((item, i) => (<div key={i} className='grid grid-cols-4 items-center gap-2 text-sm'>
                <div className='col-span-2 flex items-center gap-2'>
                  <FoodImage src={item.menuItem.image} alt={item.menuItem.name} className='w-10 h-10 rounded-lg'/>
                  <span>{item.menuItem.name}</span>
                </div>
                <span className='text-center'>1</span>
                <span className='text-right'>{formatPrice(calCartProductPrice(item))}</span>
              </div>))}
          </div>
          <div className='space-y-1 text-sm border-t border-gray-600 pt-3'>
            <div className='flex justify-between'><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className='flex justify-between text-gray-400'><span>Delivery Fee</span><span>{formatPrice((_c = order.deliveryFee) !== null && _c !== void 0 ? _c : 40)}</span></div>
            <div className='flex justify-between text-gray-400'><span>Tax / GST</span><span>{formatPrice((_d = order.tax) !== null && _d !== void 0 ? _d : 0)}</span></div>
            <div className='flex justify-between font-bold text-primary text-lg pt-2'><span>Total Amount</span><span>{formatPrice(total)}</span></div>
          </div>
        </div>

        <div className='space-y-6'>
          <div>
            <h2 className='text-xl font-semibold text-primary mb-4'>Delivery Details</h2>
            <DeliveryInfoBox order={order}/>
          </div>

          <div className='rounded-xl bg-gray-800 p-6'>
            <h2 className='text-xl font-semibold text-primary mb-4'>Payment Methods</h2>
            <div className='space-y-2'>
              {[
            { id: 'upi', label: 'UPI (Google Pay, PhonePe, Paytm)' },
            { id: 'credit_card', label: 'Credit Card' },
            { id: 'debit_card', label: 'Debit Card' },
        ].map((method) => (<label key={method.id} className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer ${paymentType === method.id ? 'border-primary bg-primary/10' : 'border-gray-600'}`}>
                  <input type='radio' name='payType' checked={paymentType === method.id} onChange={() => setPaymentType(method.id)}/>
                  <span>{method.label}</span>
                </label>))}
            </div>
            <Button color='primary' fullWidth className='mt-6 font-bold text-dark' size='lg' isLoading={paying} onPress={handleProceedToPay}>
              Proceed to Pay — {formatPrice(total)}
            </Button>
          </div>
        </div>
      </div>
    </section>);
};
export default PaymentPage;
