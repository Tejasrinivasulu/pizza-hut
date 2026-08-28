'use client';
import { Button } from '@nextui-org/react';
import toast from 'react-hot-toast';
const statusActions = [
    { label: 'Accept Order', status: 'accepted', color: 'primary' },
    { label: 'Start Preparing', status: 'preparing', color: 'warning' },
    { label: 'Out for Delivery', status: 'out_for_delivery', color: 'primary' },
    { label: 'Delivered', status: 'delivered', color: 'success' },
    { label: 'Cancel Order', status: 'cancelled', color: 'danger' },
];
const AdminOrderControls = ({ order, onUpdate }) => {
    var _a;
    async function updateStatus(orderStatus) {
        const promise = fetch('/api/orders/status', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: order._id, orderStatus }),
        }).then(async (res) => {
            if (!res.ok)
                throw new Error();
            return res.json();
        });
        toast.promise(promise, {
            loading: 'Updating order...',
            success: (data) => {
                onUpdate(data);
                return `Order marked as ${orderStatus.replace(/_/g, ' ')}`;
            },
            error: 'Failed to update order',
        });
    }
    return (<div className='rounded-xl p-6 bg-gray-800 mt-4'>
      <h3 className='font-semibold text-primary mb-4'>Order Status Controls</h3>
      <p className='text-sm text-gray-400 mb-4'>
        Current status: <span className='text-white font-semibold capitalize'>{(_a = order.orderStatus) === null || _a === void 0 ? void 0 : _a.replace(/_/g, ' ')}</span>
      </p>
      <div className='flex flex-wrap gap-2'>
        {statusActions.map(({ label, status, color }) => (<Button key={status} size='sm' color={color} variant={order.orderStatus === status ? 'solid' : 'bordered'} onPress={() => updateStatus(status)} isDisabled={order.orderStatus === 'cancelled' || order.orderStatus === 'delivered'}>
            {label}
          </Button>))}
      </div>
    </div>);
};
export default AdminOrderControls;
