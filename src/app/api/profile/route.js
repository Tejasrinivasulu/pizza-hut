import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
export async function PUT(req) {
    var _a;
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const data = await req.json();
        if (data._id) { // update other user
            const updatedUser = await User.findByIdAndUpdate({ _id: data._id }, data, { new: true });
            return NextResponse.json(updatedUser);
        }
        else { // update current user
            const session = await getServerSession(authOptions);
            const email = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email;
            const updatedUser = await User.findOneAndUpdate({ email }, data, { new: true });
            return NextResponse.json(updatedUser);
        }
    }
    catch (err) {
        return NextResponse.json(err);
    }
}
export async function GET() {
    var _a;
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const session = await getServerSession(authOptions);
        const email = (_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!email) {
            return NextResponse.json(false);
        }
        const profile = await User.findOne({ email });
        return NextResponse.json(profile);
    }
    catch (err) {
        return NextResponse.json(err);
    }
}
