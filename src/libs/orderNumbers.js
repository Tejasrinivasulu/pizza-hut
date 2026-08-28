import { Order } from '@/app/models/Order';
const PREFIX = 'PF';
const START_NUMBER = 1001;
export async function generateOrderNumber() {
    const orders = await Order.find({ orderNumber: /^PF\d+$/ }).select('orderNumber').lean();
    let max = START_NUMBER - 1;
    for (const order of orders) {
        const num = parseInt(String(order.orderNumber).replace(/^PF/i, ''), 10);
        if (!Number.isNaN(num))
            max = Math.max(max, num);
    }
    return `${PREFIX}${max + 1}`;
}
