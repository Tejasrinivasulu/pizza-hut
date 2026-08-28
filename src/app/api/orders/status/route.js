import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "../../auth/[...nextauth]/route";
export async function PATCH(req) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        if (!(await isAdmin())) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        const { orderId, orderStatus } = await req.json();
        const existing = await Order.findById(orderId);
        if (!existing) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        const update = {
            orderStatus,
            isNewOrder: orderStatus === 'pending',
        };
        if (orderStatus === 'delivered' && existing.paymentMethod === 'cod') {
            update.paid = true;
            update.paymentStatus = 'paid';
            update.revenueCountedAt = new Date();
        }
        const updated = await Order.findByIdAndUpdate(orderId, update, { new: true });
        if (!updated) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json(updated);
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
