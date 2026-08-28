import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function POST(req) {
    var _a;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const session = await getServerSession(authOptions);
        const userEmail = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!userEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { orderId, onlinePaymentType } = await req.json();
        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        if (order.userEmail !== userEmail) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        const updated = await Order.findByIdAndUpdate(orderId, {
            paid: true,
            paymentStatus: 'paid',
            onlinePaymentType: onlinePaymentType || 'upi',
            isNewOrder: true,
            revenueCountedAt: new Date(),
        }, { new: true });
        return NextResponse.json({
            orderId: updated._id.toString(),
            orderNumber: updated.orderNumber,
            redirect: `/orders?placed=1&paid=1&orderId=${updated._id.toString()}&clear-cart=1`,
        });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
    }
}
