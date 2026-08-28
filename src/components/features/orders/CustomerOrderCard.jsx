'use client';
import FoodImage from '@/components/common/FoodImage';
import { formatPrice } from '@/libs/currency';
import { getReadableDateTime } from '@/libs/datetime';
import { Button, Chip } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
function paymentLabel(order) {
    if (order.paymentStatus === 'paid' || order.paid)
        return { text: 'Paid', color: 'success' };
    if (order.paymentMethod === 'cod' || order.paymentStatus === 'cod_pending') {
        return { text: 'COD', color: 'warning' };
    }
    return { text: 'Pending', color: 'danger' };
}
function statusColor(order) {
    const colors = {
        pending: 'warning',
        accepted: 'primary',
        preparing: 'primary',
        out_for_delivery: 'primary',
        delivered: 'success',
        cancelled: 'danger',
    };
    return colors[order.orderStatus || 'pending'];
}
const CustomerOrderCard = ({ order, highlighted, onCancel }) => {
    var _a, _b, _c, _d;
    const [cancelling, setCancelling] = useState(false);
    const payment = paymentLabel(order);
    const items = (_a = order.cartProducts) !== null && _a !== void 0 ? _a : [];
    const displayItems = items.slice(0, 4);
    const extraCount = items.length > 4 ? items.length - 4 : 0;
    const canCancel = order.orderStatus === 'pending' && onCancel;
    async function handleCancel() {
        if (!onCancel || !order._id)
            return;
        if (!window.confirm('Are you sure you want to cancel this order?'))
            return;
        setCancelling(true);
        try {
            await onCancel(order._id);
            toast.success('Order cancelled successfully');
        }
        catch (_a) {
            toast.error('Could not cancel order');
        }
        finally {
            setCancelling(false);
        }
    }
    return (<div className={`rounded-2xl border-2 bg-gray-900/40 overflow-hidden transition-all min-h-[220px] ${highlighted ? 'border-primary ring-2 ring-primary/30' : 'border-gray-700'}`}>
      <div className='flex flex-col sm:flex-row min-h-[220px]'>
        <div className='sm:w-48 md:w-56 shrink-0 bg-gray-800/50 p-5 flex items-center justify-center gap-2 flex-wrap'>
          {displayItems.length > 0 ? (displayItems.map((item, index) => {
            var _a, _b, _c, _d, _e;
            return (<FoodImage key={`${(_b = (_a = item.menuItem) === null || _a === void 0 ? void 0 : _a._id) !== null && _b !== void 0 ? _b : index}-${index}`} src={(_c = item.menuItem) === null || _c === void 0 ? void 0 : _c.image} alt={(_e = (_d = item.menuItem) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : 'Item'} className={`rounded-xl border-2 border-primary/30 object-cover ${displayItems.length === 1 ? 'w-32 h-32' : 'w-[72px] h-[72px]'}`}/>);
        })) : (<div className='w-28 h-28 rounded-xl bg-gray-700 flex items-center justify-center text-gray-500 text-sm'>
              No image
            </div>)}
          {extraCount > 0 && (<span className='text-xs text-primary font-semibold w-full text-center'>
              +{extraCount} more
            </span>)}
        </div>

        <div className='flex-1 p-6 flex flex-col gap-4 min-w-0'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div>
              <p className='text-xs text-gray-500 uppercase tracking-wide'>Order ID</p>
              <p className='text-lg font-bold text-primary'>
                #{order.orderNumber || ((_b = order._id) === null || _b === void 0 ? void 0 : _b.slice(-6))}
              </p>
            </div>
            <p className='text-sm text-gray-400'>{getReadableDateTime(order.createdAt)}</p>
          </div>

          <div className='text-sm text-gray-300 line-clamp-2'>
            {items.map(item => { var _a; return (_a = item.menuItem) === null || _a === void 0 ? void 0 : _a.name; }).filter(Boolean).join(', ') || '—'}
          </div>

          <div className='flex flex-wrap gap-2'>
            <Chip color={payment.color} size='sm' variant='flat'>{payment.text}</Chip>
            <Chip color={statusColor(order)} size='sm' variant='flat' className='capitalize'>
              {((_c = order.orderStatus) === null || _c === void 0 ? void 0 : _c.replace(/_/g, ' ')) || 'pending'}
            </Chip>
          </div>

          <div className='flex flex-wrap items-center justify-between gap-3 mt-auto pt-2 border-t border-gray-700'>
            <div>
              <span className='text-gray-400 text-sm block'>
                {items.length} item{items.length !== 1 ? 's' : ''}
              </span>
              <span className='text-primary font-bold text-lg'>
                {formatPrice((_d = order.total) !== null && _d !== void 0 ? _d : 0)}
              </span>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Button as={Link} href={`/orders/${order._id}`} size='sm' variant='flat' className='font-semibold text-primary border border-primary/40'>
                View Details
              </Button>
              {canCancel && (<Button size='sm' color='danger' variant='flat' isLoading={cancelling} onPress={handleCancel} className='font-semibold'>
                  Cancel Order
                </Button>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default CustomerOrderCard;
