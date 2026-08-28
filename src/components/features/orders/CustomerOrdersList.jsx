import CustomerOrderCard from './CustomerOrderCard';
const CustomerOrdersList = ({ orders, highlightOrderId, onCancel }) => {
    return (<div className='flex flex-col gap-6'>
      {orders.map(order => (<CustomerOrderCard key={order._id} order={order} highlighted={order._id === highlightOrderId} onCancel={onCancel}/>))}
    </div>);
};
export default CustomerOrdersList;
