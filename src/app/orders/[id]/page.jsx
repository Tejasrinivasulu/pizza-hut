'use client';
import DeliveryInfoBox from '@/components/common/DeliveryInfoBox';
import CartProduct from '@/components/features/cart/CartProduct';
import OrderSummary from '@/components/features/cart/OrderSummary';
import AdminOrderControls from '@/components/features/orders/AdminOrderControls';
import { useProfile } from '@/components/hooks/useProfile';
import { CartContext, calCartProductPrice } from '@/util/ContextProvider';
import { downloadInvoice } from '@/libs/invoice';
import { calcSubtotal } from '@/libs/orderTotals';
import { TickIcon } from '@/icons/TickIcon';
import { BreadcrumbItem, Breadcrumbs, Button, Chip } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
const OrderDetailPage = () => {
    var _a, _b;
    const { id } = useParams();
    const { clearCart } = useContext(CartContext);
    const { data: profileData } = useProfile();
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [showSuccess, setShowSuccess] = useState(false);
    const [order, setOrder] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.href.includes('success=1')) {
            setShowSuccess(true);
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
    }, [clearCart]);
    useEffect(() => {
        if (id) {
            fetch(`/api/orders?_id=${id}`)
                .then(res => res.json())
                .then(data => { setOrder(data); });
        }
    }, [id]);
    const subtotal = order ? ((_a = order.subtotal) !== null && _a !== void 0 ? _a : calcSubtotal(order.cartProducts)) : 0;
    const isPaid = (order === null || order === void 0 ? void 0 : order.paymentStatus) === 'paid' || (order === null || order === void 0 ? void 0 : order.paid);
    function paymentLabel() {
        if ((order === null || order === void 0 ? void 0 : order.paymentStatus) === 'paid')
            return 'Paid Online';
        if ((order === null || order === void 0 ? void 0 : order.paymentMethod) === 'cod')
            return 'Cash on Delivery';
        return 'Pending';
    }
    return (<section className='pt-10 pb-20 max-w-6xl mx-auto px-4'>
      {showSuccess && (<div className='rounded-2xl bg-primary/10 border-2 border-primary p-8 mb-8 text-center'>
          <p className='text-3xl font-bold text-primary mb-2'>
            {isPaid ? '🎉 Payment Successful' : '✅ Order Placed Successfully'}
          </p>
          <p className='text-lg text-gray-300'>
            {isPaid ? 'Thank you! Your payment was received.' : 'Pay with cash when your order arrives.'}
          </p>
          {(order === null || order === void 0 ? void 0 : order.orderNumber) && (<p className='text-xl font-semibold mt-3'>Order ID: #{order.orderNumber}</p>)}
          <p className='text-primary mt-2'>⏱ Estimated Delivery: 25–30 mins</p>
          {order && (<Button color='primary' className='mt-4 font-bold text-dark' onPress={() => downloadInvoice(order)}>
              Download PDF Invoice
            </Button>)}
        </div>)}

      {!showSuccess && order && (<div className='flex items-center gap-2 mb-6'>
          <TickIcon className='w-10'/>
          <h1 className='text-2xl font-semibold text-primary italic'>Order Details</h1>
        </div>)}

      <Breadcrumbs size='lg'>
        <BreadcrumbItem href='/orders'>Orders</BreadcrumbItem>
        <BreadcrumbItem>#{(order === null || order === void 0 ? void 0 : order.orderNumber) || id}</BreadcrumbItem>
      </Breadcrumbs>

      {order && (<div className='grid lg:grid-cols-5 mt-8 gap-12'>
          <div className='lg:col-span-3'>
            <div className='flex flex-wrap gap-2 mb-4'>
              <Chip color={isPaid ? 'success' : 'warning'} variant='flat'>
                Payment: {paymentLabel()}
              </Chip>
              <Chip color='primary' variant='flat' className='capitalize'>
                Status: {(_b = order.orderStatus) === null || _b === void 0 ? void 0 : _b.replace(/_/g, ' ')}
              </Chip>
            </div>

            <h2 className='border-b-1 font-semibold py-3 text-primary'>Ordered Items</h2>
            {order.cartProducts.map((product, index) => (<CartProduct key={index} product={product} productPrice={calCartProductPrice(product)}/>))}
            <OrderSummary orderId={order._id} subtotal={subtotal} deviveryFee={order.deliveryFee} tax={order.tax} paid={isPaid !== null && isPaid !== void 0 ? isPaid : false}/>

            {!showSuccess && (<Button color='primary' variant='bordered' className='mt-4' onPress={() => downloadInvoice(order)}>
                Download PDF Invoice
              </Button>)}
          </div>

          <div className='lg:col-span-2'>
            <h2 className='font-semibold py-3 text-primary'>Delivery Information</h2>
            <DeliveryInfoBox order={order}/>

            {isAdmin && (<AdminOrderControls order={order} onUpdate={setOrder}/>)}
          </div>
        </div>)}
    </section>);
};
export default OrderDetailPage;
