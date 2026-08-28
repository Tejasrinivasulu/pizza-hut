'use client';
import AdminOrdersView from "@/components/features/admin/AdminOrdersView";
import CustomerOrdersList from "@/components/features/orders/CustomerOrdersList";
import { useProfile } from "@/components/hooks/useProfile";
import { CartContext } from "@/util/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
const OrdersPage = () => {
    const { data: session, status } = useSession();
    const { data: profileData, loading } = useProfile();
    const { clearCart } = useContext(CartContext);
    const isAdmin = profileData === null || profileData === void 0 ? void 0 : profileData.isAdmin;
    const [orders, setOrders] = useState([]);
    const [placedOrderId, setPlacedOrderId] = useState(null);
    function loadOrders() {
        return fetch(`/api/orders`)
            .then(res => res.json())
            .then(data => {
            if (Array.isArray(data)) {
                setOrders([...data].reverse());
            }
        });
    }
    async function handleCancelOrder(orderId) {
        const res = await fetch('/api/orders/cancel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Failed to cancel');
        }
        await loadOrders();
    }
    useEffect(() => {
        loadOrders();
    }, []);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const params = new URLSearchParams(window.location.search);
        const placed = params.get('placed');
        const orderId = params.get('orderId');
        const clearCartParam = params.get('clear-cart');
        const paid = params.get('paid');
        if (placed !== '1')
            return;
        if (clearCartParam === '1') {
            clearCart();
        }
        if (orderId) {
            setPlacedOrderId(orderId);
        }
        loadOrders().then(() => {
            if (paid === '1') {
                toast.success('Payment successful! Your order is placed.');
            }
            else {
                toast.success('Order placed successfully! Pay cash on delivery.');
            }
        });
        window.history.replaceState({}, '', '/orders');
    }, [clearCart]);
    if (status === 'unauthenticated') {
        redirect('/login');
    }
    if (status === 'loading' || loading && session) {
        return <Loader className={""}/>;
    }
    const placedOrder = orders.find(o => o._id === placedOrderId);
    return (<section className={`pt-8 pb-20 mx-auto px-4 ${isAdmin ? 'max-w-7xl' : 'max-w-6xl'}`}>
      {profileData &&
            <>
          {!isAdmin && (<div className="text-center mt-4">
              <h1 className="text-primary italic font-semibold">My Orders</h1>
            </div>)}

          {placedOrder && !isAdmin && (<div className='mt-6 p-6 rounded-xl border-2 border-primary bg-primary/10 text-center'>
              <p className='text-2xl font-bold text-primary mb-1'>
                {placedOrder.paymentStatus === 'paid' ? '🎉 Order Placed & Paid' : '✅ Order Placed Successfully'}
              </p>
              <p className='text-gray-300'>
                Order <span className='font-semibold text-primary'>#{placedOrder.orderNumber}</span> is now in your orders.
              </p>
              <p className='text-sm text-gray-400 mt-2'>⏱ Estimated delivery: 25–30 mins</p>
            </div>)}

          <div className={isAdmin ? 'mt-4' : 'mt-6'}>
            {isAdmin ? (<AdminOrdersView orders={orders} highlightOrderId={placedOrderId} onRefresh={loadOrders}/>) : orders.length > 0 ? (<>
                <p className='text-gray-400 text-sm mb-5 text-center'>
                  Total Orders: <span className='text-primary font-semibold'>{orders.length}</span>
                </p>
                <CustomerOrdersList orders={orders} highlightOrderId={placedOrderId} onCancel={handleCancelOrder}/>
              </>) : (<div className='text-center py-12 text-gray-400'>
                <p className='text-lg'>No orders yet.</p>
                <a href='/menu' className='text-primary font-semibold mt-2 inline-block'>Browse Menu</a>
              </div>)}
          </div>
        </>}
    </section>);
};
export default OrdersPage;
