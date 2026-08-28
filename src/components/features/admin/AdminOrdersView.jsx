'use client';
import OrdersTable from '@/components/features/orders/OrdersTable';
import { formatPrice } from '@/libs/currency';
import { sumOrderRevenue } from '@/libs/orderRevenue';
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
const STATUS_FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
];
function StatCard({ icon, label, value, accent }) {
    return (<motion.div whileHover={{ y: -4 }} className={`rounded-2xl border border-gray-700/80 bg-gray-900/70 p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all ${accent !== null && accent !== void 0 ? accent : ''}`}>
      <span className='text-2xl'>{icon}</span>
      <p className='text-gray-400 text-sm mt-3'>{label}</p>
      <p className='text-2xl font-bold text-primary mt-1'>{value}</p>
    </motion.div>);
}
const AdminOrdersView = ({ orders, highlightOrderId, onRefresh }) => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    useEffect(() => {
        fetch('/api/contact-messages')
            .then(r => r.json())
            .then(data => {
            if (Array.isArray(data))
                setMessages(data);
        })
            .catch(() => { });
    }, []);
    const stats = useMemo(() => {
        const totalRevenue = sumOrderRevenue(orders);
        const pending = orders.filter(o => o.orderStatus === 'pending').length;
        const delivered = orders.filter(o => o.orderStatus === 'delivered').length;
        const cancelled = orders.filter(o => o.orderStatus === 'cancelled').length;
        return { totalRevenue, pending, delivered, cancelled };
    }, [orders]);
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            var _a, _b, _c, _d;
            const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
            const term = search.trim().toLowerCase();
            const matchesSearch = !term ||
                ((_a = order.orderNumber) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(term)) ||
                ((_b = order.customerName) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(term)) ||
                ((_c = order.userEmail) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(term)) ||
                ((_d = order._id) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(term));
            return matchesStatus && matchesSearch;
        });
    }, [orders, statusFilter, search]);
    return (<div className='space-y-8'>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-gray-900/90 to-gray-900/90 p-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-white normal-case mb-2'>
          📦 Orders <span className='text-primary'>Dashboard</span>
        </h1>
        <p className='text-gray-300'>
          Track all customer orders, update statuses, and manage deliveries in one place.
        </p>
      </motion.div>

      <div className='grid grid-cols-2 lg:grid-cols-5 gap-4'>
        <StatCard icon='📋' label='Total Orders' value={orders.length.toString()}/>
        <StatCard icon='💰' label='Total Revenue' value={formatPrice(stats.totalRevenue)}/>
        <StatCard icon='⏳' label='Pending' value={stats.pending.toString()}/>
        <StatCard icon='✅' label='Delivered' value={stats.delivered.toString()}/>
        <StatCard icon='❌' label='Cancelled' value={stats.cancelled.toString()}/>
      </div>

      <div className='rounded-2xl border border-gray-700/80 bg-gray-900/50 p-4 md:p-6 space-y-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-2'>
            {STATUS_FILTERS.map(f => (<Chip key={f.key} variant={statusFilter === f.key ? 'solid' : 'bordered'} color={statusFilter === f.key ? 'primary' : 'default'} className={`cursor-pointer capitalize ${statusFilter === f.key ? 'text-dark font-semibold' : 'border-gray-600'}`} onClick={() => setStatusFilter(f.key)}>
                {f.label}
              </Chip>))}
          </div>
          <div className='flex gap-3'>
            <input type='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search order ID, customer...' className='rounded-full border border-gray-600 bg-dark px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary min-w-[220px]'/>
            <Button size='sm' variant='flat' className='text-primary border border-primary/40' onPress={onRefresh}>
              Refresh
            </Button>
          </div>
        </div>

        <p className='text-sm text-gray-400'>
          Showing <span className='text-primary font-semibold'>{filteredOrders.length}</span> of{' '}
          <span className='text-white font-semibold'>{orders.length}</span> orders
        </p>

        <OrdersTable orders={filteredOrders} isAdmin highlightOrderId={highlightOrderId}/>
      </div>

      <div className='rounded-2xl border border-gray-700/80 bg-gray-900/50 p-4 md:p-6 space-y-5'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h2 className='text-xl font-bold text-white normal-case'>Help Desk Messages</h2>
            <p className='text-sm text-gray-400 mt-1'>Customer inquiries sent from Help Center</p>
          </div>
          <Button as={Link} href='/help-center' size='sm' variant='flat' className='text-primary border border-primary/40'>
            Open Help Desk
          </Button>
        </div>

        {messages.length === 0 ? (<p className='text-gray-400 text-center py-8 border border-gray-700 rounded-xl'>No customer messages yet.</p>) : (<div className='space-y-3'>
            {messages.slice(0, 6).map(msg => (<motion.div key={msg._id} whileHover={{ x: 4 }} className='rounded-xl border border-gray-700 bg-gray-900/60 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 transition-colors min-h-[88px]'>
                <div className='flex-1 min-w-0'>
                  <div className='flex flex-wrap items-center gap-3 mb-2'>
                    <p className='font-semibold text-white'>{msg.firstName} {msg.lastName}</p>
                    <Chip size='sm' color={msg.status === 'replied' ? 'success' : 'warning'} variant='flat' className='capitalize'>
                      {msg.status}
                    </Chip>
                  </div>
                  <p className='text-sm text-primary mb-1'>{msg.subject}</p>
                  <p className='text-sm text-gray-400 line-clamp-2'>{msg.message}</p>
                </div>
                <Button size='sm' color='primary' className='text-dark font-semibold shrink-0' onPress={() => setSelectedMessage(msg)}>
                  View Message
                </Button>
              </motion.div>))}
          </div>)}
      </div>

      <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} size='lg'>
        <ModalContent>
          {selectedMessage && (<>
              <ModalHeader className='flex flex-col gap-1'>
                {selectedMessage.firstName} {selectedMessage.lastName}
                <span className='text-sm font-normal text-gray-400'>{selectedMessage.email}</span>
              </ModalHeader>
              <ModalBody>
                <p className='text-primary font-semibold mb-2'>{selectedMessage.subject}</p>
                <p className='text-gray-300 leading-relaxed whitespace-pre-wrap'>{selectedMessage.message}</p>
                {selectedMessage.phoneNumber && (<p className='text-sm text-gray-400 mt-4'>Phone: {selectedMessage.phoneNumber}</p>)}
              </ModalBody>
              <ModalFooter>
                <Button variant='light' onPress={() => setSelectedMessage(null)}>Close</Button>
                <Button as={Link} href='/help-center' color='primary' className='text-dark' onPress={() => setSelectedMessage(null)}>
                  Open Help Desk
                </Button>
              </ModalFooter>
            </>)}
        </ModalContent>
      </Modal>
    </div>);
};
export default AdminOrdersView;
