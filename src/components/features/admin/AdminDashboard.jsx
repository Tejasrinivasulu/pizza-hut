'use client';
import FoodImage from '@/components/common/FoodImage';
import Loader from '@/components/common/Loader';
import { formatPrice } from '@/libs/currency';
import { countsTowardRevenue, getRevenueDate, sumOrderRevenue } from '@/libs/orderRevenue';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, } from '@nextui-org/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
const TOP_SELLING_NAMES = [
    { name: 'Farmhouse Pizza', emoji: '🍕' },
    { name: 'Zinger Burger', emoji: '🍔' },
    { name: 'Alfredo Pasta', emoji: '🍝' },
    { name: 'Chocolate Ice Cream', emoji: '🍦', fallback: 'Cookies & Cream Ice Cream' },
    { name: 'Mint Mojito', emoji: '🥤', fallback: 'Chocolate Milkshake' },
];
function isToday(dateStr) {
    return new Date(dateStr).toDateString() === new Date().toDateString();
}
function isInLastDays(dateStr, days) {
    const d = new Date(dateStr).getTime();
    const now = Date.now();
    const start = now - days * 24 * 60 * 60 * 1000;
    return d >= start && d <= now;
}
function isInLastDaysRange(dateStr, startDaysAgo, endDaysAgo) {
    const d = new Date(dateStr).getTime();
    const now = Date.now();
    const start = now - startDaysAgo * 24 * 60 * 60 * 1000;
    const end = now - endDaysAgo * 24 * 60 * 60 * 1000;
    return d >= start && d < end;
}
function growthLabel(current, previous) {
    if (previous === 0)
        return current > 0 ? '+100% vs last month' : 'No change';
    const pct = ((current - previous) / previous) * 100;
    const sign = pct >= 0 ? '+' : '';
    return `${sign}${pct.toFixed(0)}% vs last month`;
}
function itemsSummary(order) {
    var _a, _b, _c, _d, _e;
    if (!((_a = order.cartProducts) === null || _a === void 0 ? void 0 : _a.length))
        return '—';
    if (order.cartProducts.length > 1) {
        return `${(_c = (_b = order.cartProducts[0].menuItem) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : 'Item'} + ${order.cartProducts.length - 1} more`;
    }
    return (_e = (_d = order.cartProducts[0].menuItem) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : '—';
}
function StatCard({ icon, label, value, growth, positive = true }) {
    return (<motion.div whileHover={{ y: -6, scale: 1.02 }} className='rounded-2xl border border-gray-700/80 bg-gray-900/60 p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-colors'>
      <div className='flex items-start justify-between mb-4'>
        <span className='text-3xl'>{icon}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {growth}
        </span>
      </div>
      <p className='text-gray-400 text-sm mb-1'>{label}</p>
      <p className='text-2xl md:text-3xl font-bold text-primary'>{value}</p>
    </motion.div>);
}
const STATUS_OPTIONS = [
    { label: 'Pending', status: 'pending' },
    { label: 'Accepted', status: 'accepted' },
    { label: 'Preparing', status: 'preparing' },
    { label: 'Out for Delivery', status: 'out_for_delivery' },
    { label: 'Delivered', status: 'delivered' },
    { label: 'Cancelled', status: 'cancelled' },
];
const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);
    useEffect(() => {
        Promise.all([
            fetch('/api/orders').then(r => r.json()),
            fetch('/api/users').then(r => r.json()),
            fetch('/api/menu-items').then(r => r.json()),
            fetch('/api/contact-messages').then(r => r.json()),
        ])
            .then(([ordersData, usersData, menuData, messagesData]) => {
            if (Array.isArray(ordersData))
                setOrders([...ordersData].reverse());
            if (Array.isArray(usersData))
                setUsers(usersData.filter((u) => !u.isAdmin));
            if (Array.isArray(menuData))
                setMenuItems(menuData);
            if (Array.isArray(messagesData))
                setMessages(messagesData);
        })
            .finally(() => setLoading(false));
    }, []);
    const stats = useMemo(() => {
        const totalOrders = orders.length;
        const totalRevenue = sumOrderRevenue(orders);
        const totalCustomers = users.length;
        const totalMenuItems = menuItems.length;
        const ordersLast30 = orders.filter(o => isInLastDays(o.createdAt, 30)).length;
        const ordersPrev30 = orders.filter(o => isInLastDaysRange(o.createdAt, 60, 30)).length;
        const revenueLast30 = orders
            .filter(o => countsTowardRevenue(o) && isInLastDays(getRevenueDate(o), 30))
            .reduce((s, o) => { var _a; return s + ((_a = o.total) !== null && _a !== void 0 ? _a : 0); }, 0);
        const revenuePrev30 = orders
            .filter(o => countsTowardRevenue(o) && isInLastDaysRange(getRevenueDate(o), 60, 30))
            .reduce((s, o) => { var _a; return s + ((_a = o.total) !== null && _a !== void 0 ? _a : 0); }, 0);
        const customersLast30 = users.filter(u => u.createdAt && isInLastDays(u.createdAt, 30)).length;
        const customersPrev30 = users.filter(u => u.createdAt && isInLastDaysRange(u.createdAt, 60, 30)).length;
        const todayOrders = orders.filter(o => isToday(o.createdAt));
        const deliveriesToday = todayOrders.filter(o => o.orderStatus === 'delivered').length;
        const pendingToday = todayOrders.filter(o => o.orderStatus === 'pending').length;
        const cancelledToday = todayOrders.filter(o => o.orderStatus === 'cancelled').length;
        return {
            totalOrders,
            totalRevenue,
            totalCustomers,
            totalMenuItems,
            ordersGrowth: growthLabel(ordersLast30, ordersPrev30),
            revenueGrowth: growthLabel(revenueLast30, revenuePrev30),
            customersGrowth: growthLabel(customersLast30, customersPrev30),
            menuGrowth: `+${menuItems.length} items live`,
            ordersToday: todayOrders.length,
            deliveriesToday,
            pendingToday,
            cancelledToday,
        };
    }, [orders, users, menuItems]);
    const topSelling = useMemo(() => {
        const map = {};
        orders.filter(countsTowardRevenue).forEach(order => {
            var _a;
            (_a = order.cartProducts) === null || _a === void 0 ? void 0 : _a.forEach(item => {
                var _a, _b, _c;
                const name = (_a = item.menuItem) === null || _a === void 0 ? void 0 : _a.name;
                if (!name)
                    return;
                if (!map[name])
                    map[name] = { orders: 0, revenue: 0 };
                map[name].orders += 1;
                map[name].revenue += (_c = (_b = item.menuItem) === null || _b === void 0 ? void 0 : _b.basePrice) !== null && _c !== void 0 ? _c : 0;
            });
        });
        return TOP_SELLING_NAMES.map(spec => {
            var _a, _b;
            const data = (_b = (_a = map[spec.name]) !== null && _a !== void 0 ? _a : (spec.fallback ? map[spec.fallback] : undefined)) !== null && _b !== void 0 ? _b : { orders: 0, revenue: 0 };
            const menuItem = menuItems.find(m => m.name === spec.name || m.name === spec.fallback);
            return Object.assign(Object.assign(Object.assign({}, spec), data), { image: menuItem === null || menuItem === void 0 ? void 0 : menuItem.image });
        });
    }, [orders, menuItems]);
    const recentOrders = orders.slice(0, 5);
    async function updateOrderStatus(orderId, orderStatus) {
        const res = await fetch('/api/orders/status', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId, orderStatus }),
        });
        const data = await res.json();
        if (!res.ok) {
            toast.error('Failed to update status');
            return;
        }
        setOrders(prev => prev.map(o => (o._id === orderId ? data : o)));
        toast.success(`Order updated to ${orderStatus.replace(/_/g, ' ')}`);
    }
    if (loading)
        return <Loader className='h-screen'/>;
    return (<div className='container py-10 space-y-10'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-gray-900/80 to-gray-900/80 p-8 md:p-10'>
        <p className='text-3xl md:text-4xl font-bold text-white mb-3'>
          👋 Welcome Back, <span className='text-primary'>Admin</span>
        </p>
        <p className='text-gray-300 text-base md:text-lg max-w-3xl'>
          Manage orders, customers, menu items, and restaurant performance from one dashboard.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
        <StatCard icon='📦' label='Total Orders' value={stats.totalOrders.toString()} growth={stats.ordersGrowth}/>
        <StatCard icon='💰' label='Total Revenue' value={formatPrice(stats.totalRevenue)} growth={stats.revenueGrowth}/>
        <StatCard icon='👥' label='Total Customers' value={stats.totalCustomers.toString()} growth={stats.customersGrowth}/>
        <StatCard icon='🍕' label='Total Menu Items' value={stats.totalMenuItems.toString()} growth={stats.menuGrowth}/>
      </div>

      <div>
        <h2 className='text-xl font-bold text-white mb-5 normal-case'>Today&apos;s Overview</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          {[
            { icon: '🛒', label: 'Orders Today', value: stats.ordersToday },
            { icon: '🚚', label: 'Deliveries Completed', value: stats.deliveriesToday },
            { icon: '⏳', label: 'Pending Orders', value: stats.pendingToday },
            { icon: '❌', label: 'Cancelled Orders', value: stats.cancelledToday },
        ].map(card => (<motion.div key={card.label} whileHover={{ y: -4 }} className='rounded-xl border border-gray-700 bg-gray-900/50 p-5 hover:border-primary/40 transition-colors'>
              <span className='text-2xl'>{card.icon}</span>
              <p className='text-gray-400 text-sm mt-3'>{card.label}</p>
              <p className='text-2xl font-bold text-white mt-1'>{card.value}</p>
            </motion.div>))}
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-bold text-white normal-case'>Recent Orders</h2>
          <Button as={Link} href='/orders' size='sm' variant='flat' className='text-primary border border-primary/40'>
            View All
          </Button>
        </div>
        <Table aria-label='Recent orders' classNames={{ th: 'bg-gray-900 text-gray-300', td: 'text-gray-300' }}>
          <TableHeader>
            <TableColumn>Order ID</TableColumn>
            <TableColumn>Customer Name</TableColumn>
            <TableColumn>Items Ordered</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Order Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent='No orders yet'>
            {recentOrders.map(order => {
            var _a, _b, _c;
            return (<TableRow key={order._id}>
                <TableCell className='text-primary font-semibold'>
                  #{order.orderNumber || ((_a = order._id) === null || _a === void 0 ? void 0 : _a.slice(-6))}
                </TableCell>
                <TableCell>{order.customerName || order.userEmail}</TableCell>
                <TableCell>{itemsSummary(order)}</TableCell>
                <TableCell>{formatPrice((_b = order.total) !== null && _b !== void 0 ? _b : 0)}</TableCell>
                <TableCell>
                  <Chip size='sm' variant='flat' className='capitalize'>
                    {((_c = order.orderStatus) === null || _c === void 0 ? void 0 : _c.replace(/_/g, ' ')) || 'pending'}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className='flex gap-2 justify-center flex-wrap'>
                    <Button as={Link} href={`/orders/${order._id}`} size='sm' variant='flat' color='primary'>
                      View Order
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size='sm' variant='bordered' className='border-primary text-primary'>
                          Update Status
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label='Update order status'>
                        {STATUS_OPTIONS.map(opt => (<DropdownItem key={opt.status} onPress={() => order._id && updateOrderStatus(order._id, opt.status)}>
                            {opt.label}
                          </DropdownItem>))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>);
        })}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className='text-xl font-bold text-white mb-5 normal-case'>Top Selling Items</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
          {topSelling.map(item => (<motion.div key={item.name} whileHover={{ y: -6 }} className='rounded-2xl border border-gray-700 bg-gray-900/60 p-5 text-center hover:border-primary/40 transition-colors'>
              {item.image ? (<FoodImage src={item.image} alt={item.name} className='w-20 h-20 rounded-full mx-auto mb-3 border-2 border-primary/50 object-cover'/>) : (<span className='text-4xl block mb-3'>{item.emoji}</span>)}
              <p className='font-semibold text-white text-sm mb-3'>{item.emoji} {item.name}</p>
              <p className='text-xs text-gray-400'>Total Orders: <span className='text-primary font-bold'>{item.orders}</span></p>
              <p className='text-xs text-gray-400 mt-1'>Revenue: <span className='text-primary font-bold'>{formatPrice(item.revenue)}</span></p>
            </motion.div>))}
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between mb-5'>
          <h2 className='text-xl font-bold text-white normal-case'>Help Desk — Customer Messages</h2>
          <Button as={Link} href='/help-center' size='sm' variant='flat' className='text-primary border border-primary/40'>
            Help Desk
          </Button>
        </div>
        <div className='space-y-4'>
          {messages.length === 0 ? (<p className='text-gray-400 text-center py-8 border border-gray-700 rounded-xl'>No customer messages yet.</p>) : (messages.slice(0, 5).map(msg => (<motion.div key={msg._id} whileHover={{ x: 4 }} className='rounded-xl border border-gray-700 bg-gray-900/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 transition-colors'>
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
              </motion.div>)))}
        </div>
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
export default AdminDashboard;
