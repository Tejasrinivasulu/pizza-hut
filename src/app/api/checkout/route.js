import { Order } from "@/app/models/Order";
import { generateOrderNumber } from "@/libs/orderNumbers";
import { calcOrderTotal, calcSubtotal, calcTax, DELIVERY_FEE } from "@/libs/orderTotals";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req) {
    var _a;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const authSession = await getServerSession(authOptions);
        const userEmail = (_a = authSession === null || authSession === void 0 ? void 0 : authSession.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!userEmail) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { cartProducts, address, paymentMethod } = await req.json();
        if (!(cartProducts === null || cartProducts === void 0 ? void 0 : cartProducts.length)) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }
        const subtotal = calcSubtotal(cartProducts);
        const tax = calcTax(subtotal);
        const total = calcOrderTotal(subtotal);
        const order = await Order.create({
            orderNumber: await generateOrderNumber(),
            userEmail,
            customerName: address.customerName,
            phone: address.phone,
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state,
            country: address.country,
            postalCode: address.postalCode,
            deliveryInstructions: address.deliveryInstructions || '',
            cartProducts,
            subtotal,
            deliveryFee: DELIVERY_FEE,
            tax,
            total,
            paymentMethod: paymentMethod || 'cod',
            paymentStatus: paymentMethod === 'online' ? 'pending' : 'cod_pending',
            orderStatus: 'pending',
            paid: false,
            isNewOrder: true,
        });
        if (paymentMethod === 'online') {
            return NextResponse.json({
                orderId: order._id.toString(),
                redirect: `/payment/${order._id.toString()}`,
            });
        }
        return NextResponse.json({
            orderId: order._id.toString(),
            orderNumber: order.orderNumber,
            redirect: `/orders?placed=1&orderId=${order._id.toString()}&clear-cart=1`,
        });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
    }
}
