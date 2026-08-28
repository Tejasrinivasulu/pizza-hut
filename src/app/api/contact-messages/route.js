import { ContactMessage } from '@/app/models/ContactMessage';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions, isAdmin } from '../auth/[...nextauth]/route';
export async function GET() {
    var _a;
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const session = await getServerSession(authOptions);
        if (await isAdmin()) {
            const messages = await ContactMessage.find().sort({ createdAt: -1 });
            return NextResponse.json(messages);
        }
        if (!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const messages = await ContactMessage.find({ email: session.user.email }).sort({ createdAt: -1 });
        return NextResponse.json(messages);
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
export async function PATCH(req) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        if (!(await isAdmin())) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        const { messageId, status, adminReply } = await req.json();
        if (!messageId) {
            return NextResponse.json({ error: 'Missing messageId' }, { status: 400 });
        }
        const update = {};
        if (status)
            update.status = status;
        if (adminReply !== undefined) {
            update.adminReply = adminReply;
            update.status = 'replied';
            update.repliedAt = new Date();
        }
        if (Object.keys(update).length === 0) {
            return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
        }
        const updated = await ContactMessage.findByIdAndUpdate(messageId, update, { new: true });
        if (!updated) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }
        return NextResponse.json(updated);
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const body = await req.json();
        const { firstName, lastName, email, phoneNumber, message, subject } = body;
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const saved = await ContactMessage.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            message,
            subject: subject || 'General Inquiry',
            status: 'pending',
        });
        return NextResponse.json(saved, { status: 201 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
