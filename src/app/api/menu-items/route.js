var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { isAdmin } from "../auth/[...nextauth]/route";
export async function POST(req) {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        if (await isAdmin()) {
            const data = await req.json();
            const menuItem = await MenuItem.create(data);
            return NextResponse.json(menuItem);
        }
        return NextResponse.json({});
    }
    catch (err) {
        return NextResponse.json(err);
    }
}
export async function PUT(req) {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        if (await isAdmin()) {
            const _a = await req.json(), { _id } = _a, data = __rest(_a, ["_id"]);
            const updatedMenuItem = await MenuItem.findByIdAndUpdate({ _id }, data, { new: true });
            return NextResponse.json(updatedMenuItem);
        }
        return NextResponse.json({});
    }
    catch (err) {
        return NextResponse.json(err);
    }
}
export async function GET() {
    mongoose.connect(process.env.MONGODB_URI);
    const menuItems = await MenuItem.find();
    return NextResponse.json(menuItems);
}
export async function DELETE(req) {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        if (await isAdmin()) {
            const url = new URL(req.url);
            const _id = url.searchParams.get('_id');
            const deleteResult = await MenuItem.deleteOne({ _id });
            return NextResponse.json(deleteResult);
        }
        return NextResponse.json(true);
    }
    catch (err) {
        return NextResponse.json(err);
    }
}
