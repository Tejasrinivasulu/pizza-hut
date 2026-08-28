import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";
import { Order } from "@/app/models/Order";
import { NextResponse } from "next/server";
export async function GET(req) {
    var _a;
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const userEmail = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email;
    const admin = await isAdmin();
    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    if (_id) {
        const order = await Order.findById(_id);
        if (!order) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        if (!admin && order.userEmail !== userEmail) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        if (admin && order.isNewOrder) {
            await Order.findByIdAndUpdate(_id, { isNewOrder: false });
            order.isNewOrder = false;
        }
        return NextResponse.json(order);
    }
    if (admin) {
        return NextResponse.json(await Order.find());
    }
    else {
        return NextResponse.json(await Order.find({ userEmail: userEmail }));
    }
}
