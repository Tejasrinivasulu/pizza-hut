export function isOnlinePayment(order) {
    return order.paymentMethod === 'online';
}
export function isCodOrder(order) {
    return order.paymentMethod === 'cod' || order.paymentStatus === 'cod_pending';
}
/** Online: count after payment. COD: count only when admin marks delivered. */
export function countsTowardRevenue(order) {
    if (order.orderStatus === 'cancelled')
        return false;
    if (isOnlinePayment(order)) {
        return order.paid === true || order.paymentStatus === 'paid';
    }
    return order.orderStatus === 'delivered';
}
export function sumOrderRevenue(orders) {
    return orders.filter(countsTowardRevenue).reduce((sum, order) => { var _a; return sum + ((_a = order.total) !== null && _a !== void 0 ? _a : 0); }, 0);
}
export function getRevenueDate(order) {
    if (order.revenueCountedAt)
        return order.revenueCountedAt;
    if (isCodOrder(order) && order.orderStatus === 'delivered' && order.updatedAt) {
        return order.updatedAt;
    }
    return order.createdAt;
}
