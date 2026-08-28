'use client';
import AddressInputs from '@/components/common/form/AddressInputs';
import CartProduct from '@/components/features/cart/CartProduct';
import OrderSummary from '@/components/features/cart/OrderSummary';
import { useProfile } from '@/components/hooks/useProfile';
import { CartContext, calCartProductPrice } from '@/util/ContextProvider';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { Button, Link } from '@nextui-org/react';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { calcOrderTotal, calcSubtotal } from '@/libs/orderTotals';
import { formatPrice } from '@/libs/currency';
const CartPage = () => {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [submitting, setSubmitting] = useState(false);
    const { data: profileData } = useProfile();
    useEffect(() => {
        if (profileData) {
            const { name, phone, streetAddress, city, state, country, postalCode } = profileData;
            setAddress({
                customerName: name || '',
                phone: phone || '',
                streetAddress: streetAddress || '',
                city: city || '',
                state: state || '',
                country: country || '',
                postalCode: postalCode || '',
                deliveryInstructions: '',
            });
        }
    }, [profileData]);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('canceled=1')) {
            toast.error('Payment cancelled');
        }
    }, []);
    const validCartProducts = cartProducts.filter((p) => (p === null || p === void 0 ? void 0 : p.menuItem) && typeof p.menuItem.basePrice === 'number');
    const subtotal = calcSubtotal(validCartProducts);
    const total = calcOrderTotal(subtotal);
    function handleAddressChange(propName, value) {
        setAddress(prev => (Object.assign(Object.assign({}, prev), { [propName]: value })));
    }
    function validateForm() {
        var _a, _b, _c;
        if (!((_a = address.customerName) === null || _a === void 0 ? void 0 : _a.trim())) {
            toast.error('Please enter your name');
            return false;
        }
        if (!((_b = address.phone) === null || _b === void 0 ? void 0 : _b.trim()) || !((_c = address.streetAddress) === null || _c === void 0 ? void 0 : _c.trim())) {
            toast.error('Please fill in phone and delivery address');
            return false;
        }
        return true;
    }
    async function placeOrder(method) {
        if (!validateForm())
            return;
        setSubmitting(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, cartProducts: validCartProducts, paymentMethod: method }),
            });
            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error);
            if (method === 'online') {
                toast.success('Redirecting to payment...');
            }
            else {
                toast.success('Order placed successfully!');
            }
            window.location.href = data.redirect;
        }
        catch (_a) {
            toast.error('Something went wrong. Please try again.');
            setSubmitting(false);
        }
    }
    function handlePlaceOrder(event) {
        event.preventDefault();
        if (paymentMethod === 'cod') {
            placeOrder('cod');
        }
    }
    return (<section className='pt-10 pb-20 max-w-6xl mx-auto px-4'>

      <Link href='/menu' className='text-primary font-semibold inline-flex items-center'>

        <ChevronLeftIcon className='w-4 mr-2'/>

        Continue shopping

      </Link>



      {validCartProducts.length === 0 ? (<div className='my-16 flex flex-col items-center gap-4'>

          <p className='text-3xl font-semibold'>Your Shopping Cart is Empty</p>

          <Link href='/menu' className='text-primary font-semibold'>Browse Menu</Link>

        </div>) : (<div className='grid lg:grid-cols-5 mt-8 gap-12'>

          <div className='lg:col-span-3'>

            <h2 className='border-b-1 font-semibold py-3 text-primary'>Cart</h2>

            <div>

              {cartProducts.map((product, index) => {
                var _a;
                if (!(product === null || product === void 0 ? void 0 : product.menuItem) || typeof product.menuItem.basePrice !== 'number')
                    return null;
                return (<CartProduct key={`${(_a = product.menuItem._id) !== null && _a !== void 0 ? _a : index}-${index}`} product={product} onRemove={() => removeCartProduct(index)} productPrice={calCartProductPrice(product)}/>);
            })}

            </div>

            <OrderSummary subtotal={subtotal} paid={false}/>

          </div>



          <div className='lg:col-span-2'>

            <h2 className='font-semibold py-3 text-primary'>Checkout</h2>

            <div className='rounded-xl p-6 bg-gray-800'>

              <form className='flex flex-col gap-4' onSubmit={handlePlaceOrder}>

                <AddressInputs addressProps={address} setAddressProps={handleAddressChange} disabled={submitting}/>



                <div className='mt-2'>

                  <p className='text-primary font-semibold mb-3'>Payment Method</p>

                  <div className='flex flex-col gap-3'>

                    <label className={`flex items-center justify-between gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/10' : 'border-gray-600'}`}>

                      <div className='flex items-center gap-3'>

                        <input type='radio' name='paymentMethod' checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')}/>

                        <span className='font-semibold'>💵 Cash on Delivery</span>

                      </div>

                    </label>



                    <label className={`flex items-center justify-between gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'online' ? 'border-primary bg-primary/10' : 'border-gray-600'}`}>

                      <div className='flex items-center gap-3'>

                        <input type='radio' name='paymentMethod' checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')}/>

                        <span className='font-semibold'>💳 Online Payment</span>

                      </div>

                      {paymentMethod === 'online' && (<Button type='button' color='primary' size='sm' className='font-bold text-dark' isLoading={submitting} onPress={() => placeOrder('online')}>

                          Pay {formatPrice(total)}

                        </Button>)}

                    </label>

                  </div>

                </div>



                {paymentMethod === 'cod' && (<Button type='submit' color='primary' fullWidth className='font-bold text-dark mt-2' isLoading={submitting}>

                    Place Order — {formatPrice(total)}

                  </Button>)}

              </form>

            </div>

          </div>

        </div>)}

    </section>);
};
export default CartPage;
