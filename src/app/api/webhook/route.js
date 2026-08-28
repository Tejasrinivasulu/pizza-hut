import { Order } from "@/app/models/Order";
import { NextResponse } from "next/server";
export async function POST(req) {
    var _a, _b, _c, _d, _e;
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_SIGNING_SECRET;
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature");
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
        if (event.type === "checkout.session.completed") {
            const orderId = (_c = (_b = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.object) === null || _b === void 0 ? void 0 : _b.metadata) === null || _c === void 0 ? void 0 : _c.orderId;
            const isPaid = ((_e = (_d = event === null || event === void 0 ? void 0 : event.data) === null || _d === void 0 ? void 0 : _d.object) === null || _e === void 0 ? void 0 : _e.payment_status) === "paid";
            if (isPaid) {
                await Order.updateOne({ _id: orderId }, { paid: true });
            }
        }
    }
    catch (err) {
        console.log(err);
        return NextResponse.json(`Stripe Webhook Error: ${err.message}`, { status: 400 });
    }
    return NextResponse.json('ok', { status: 200 });
}
