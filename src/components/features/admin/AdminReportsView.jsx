'use client';
import { formatPrice } from '@/libs/currency';
import { downloadReportsPdf } from '@/libs/downloadReports';
import { countsTowardRevenue, getRevenueDate, sumOrderRevenue } from '@/libs/orderRevenue';
import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
function isToday(dateStr) {
    return new Date(dateStr).toDateString() === new Date().toDateString();
}
function isThisMonth(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}
function StatCard({ icon, label, value, sub, }) {
    return (<motion.div whileHover={{ y: -6, scale: 1.02 }} className='rounded-2xl border border-gray-700/80 bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all'>
      <div className='flex items-start justify-between mb-4'>
        <span className='text-3xl'>{icon}</span>
        {sub && (<span className='text-xs font-semibold px-2 py-1 rounded-full bg-primary/20 text-primary'>{sub}</span>)}
      </div>
      <p className='text-gray-400 text-sm'>{label}</p>
      <p className='text-2xl md:text-3xl font-bold text-primary mt-1'>{value}</p>
    </motion.div>);
}
const AdminReportsView = ({ orders }) => {
    const stats = useMemo(() => {
        const totalOrders = orders.length;
        const countableOrders = orders.filter(countsTowardRevenue);
        const totalRevenue = sumOrderRevenue(orders);
        const pending = orders.filter(o => o.orderStatus === 'pending').length;
        const delivered = orders.filter(o => o.orderStatus === 'delivered').length;
        const cancelled = orders.filter(o => o.orderStatus === 'cancelled').length;
        const inProgress = orders.filter(o => ['accepted', 'preparing', 'out_for_delivery'].includes(o.orderStatus || '')).length;
        const ordersToday = orders.filter(o => isToday(o.createdAt)).length;
        const revenueToday = countableOrders
            .filter(o => isToday(getRevenueDate(o)))
            .reduce((s, o) => { var _a; return s + ((_a = o.total) !== null && _a !== void 0 ? _a : 0); }, 0);
        const ordersThisMonth = orders.filter(o => isThisMonth(o.createdAt)).length;
        const revenueThisMonth = countableOrders
            .filter(o => isThisMonth(getRevenueDate(o)))
            .reduce((s, o) => { var _a; return s + ((_a = o.total) !== null && _a !== void 0 ? _a : 0); }, 0);
        const paidOnline = orders.filter(o => o.paymentMethod === 'online' && (o.paid || o.paymentStatus === 'paid')).length;
        const codOrders = orders.filter(o => o.paymentMethod === 'cod' || o.paymentStatus === 'cod_pending').length;
        const avgOrderValue = countableOrders.length > 0 ? totalRevenue / countableOrders.length : 0;
        return {
            totalOrders,
            totalRevenue,
            pending,
            delivered,
            cancelled,
            inProgress,
            ordersToday,
            revenueToday,
            ordersThisMonth,
            revenueThisMonth,
            paidOnline,
            codOrders,
            avgOrderValue,
        };
    }, [orders]);
    const statusBreakdown = [
        { label: 'Pending', count: stats.pending, color: 'bg-yellow-500', pct: stats.totalOrders ? (stats.pending / stats.totalOrders) * 100 : 0 },
        { label: 'In Progress', count: stats.inProgress, color: 'bg-blue-500', pct: stats.totalOrders ? (stats.inProgress / stats.totalOrders) * 100 : 0 },
        { label: 'Delivered', count: stats.delivered, color: 'bg-emerald-500', pct: stats.totalOrders ? (stats.delivered / stats.totalOrders) * 100 : 0 },
        { label: 'Cancelled', count: stats.cancelled, color: 'bg-red-500', pct: stats.totalOrders ? (stats.cancelled / stats.totalOrders) * 100 : 0 },
    ];
    return (<div className='space-y-10'>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className='rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-gray-900/90 to-gray-900/90 p-8 md:p-10'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-white normal-case mb-2'>
              📊 Sales <span className='text-primary'>Reports</span>
            </h1>
            <p className='text-gray-300 text-base md:text-lg'>
              Complete overview of restaurant orders, revenue, and performance metrics.
            </p>
          </div>
          <Button color='primary' className='text-dark font-semibold shrink-0' onPress={() => downloadReportsPdf(orders)}>
            Download Reports PDF
          </Button>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
        <StatCard icon='📦' label='Total Orders' value={stats.totalOrders.toString()} sub='All time'/>
        <StatCard icon='💰' label='Total Revenue' value={formatPrice(stats.totalRevenue)} sub='All time'/>
        <StatCard icon='📅' label='Orders This Month' value={stats.ordersThisMonth.toString()} sub='Current month'/>
        <StatCard icon='💵' label='Revenue This Month' value={formatPrice(stats.revenueThisMonth)} sub='Current month'/>
      </div>

      <div>
        <h2 className='text-xl font-bold text-white mb-5 normal-case'>Today&apos;s Performance</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
          <StatCard icon='🛒' label='Orders Today' value={stats.ordersToday.toString()}/>
          <StatCard icon='💳' label='Revenue Today' value={formatPrice(stats.revenueToday)}/>
          <StatCard icon='📈' label='Avg. Order Value' value={formatPrice(stats.avgOrderValue)}/>
          <StatCard icon='🚚' label='Delivered' value={stats.delivered.toString()}/>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='rounded-2xl border border-gray-700/80 bg-gray-900/60 p-6 md:p-8'>
          <h2 className='text-xl font-bold text-white mb-6 normal-case'>Order Status Breakdown</h2>
          <div className='space-y-5'>
            {statusBreakdown.map(item => (<div key={item.label}>
                <div className='flex justify-between text-sm mb-2'>
                  <span className='text-gray-300'>{item.label}</span>
                  <span className='text-primary font-semibold'>{item.count} ({item.pct.toFixed(0)}%)</span>
                </div>
                <div className='h-3 rounded-full bg-gray-800 overflow-hidden'>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className={`h-full rounded-full ${item.color}`}/>
                </div>
              </div>))}
          </div>
        </div>

        <div className='rounded-2xl border border-gray-700/80 bg-gray-900/60 p-6 md:p-8'>
          <h2 className='text-xl font-bold text-white mb-6 normal-case'>Payment Summary</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='rounded-xl border border-gray-700 bg-dark/80 p-5 text-center'>
              <span className='text-3xl'>💳</span>
              <p className='text-gray-400 text-sm mt-3'>Online / Paid</p>
              <p className='text-3xl font-bold text-primary mt-1'>{stats.paidOnline}</p>
            </div>
            <div className='rounded-xl border border-gray-700 bg-dark/80 p-5 text-center'>
              <span className='text-3xl'>💵</span>
              <p className='text-gray-400 text-sm mt-3'>Cash on Delivery</p>
              <p className='text-3xl font-bold text-primary mt-1'>{stats.codOrders}</p>
            </div>
          </div>

          <div className='mt-6 pt-6 border-t border-gray-700 space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-gray-400'>Pending Orders</span>
              <span className='text-yellow-400 font-bold text-lg'>{stats.pending}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-400'>Cancelled Orders</span>
              <span className='text-red-400 font-bold text-lg'>{stats.cancelled}</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-gray-400'>Success Rate</span>
              <span className='text-emerald-400 font-bold text-lg'>
                {stats.totalOrders > 0
            ? `${((stats.delivered / stats.totalOrders) * 100).toFixed(0)}%`
            : '0%'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>);
};
export default AdminReportsView;
