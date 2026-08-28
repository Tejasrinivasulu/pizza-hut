import mongoose, { models } from 'mongoose';
const ContactMessageSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    subject: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'replied'], default: 'pending' },
    adminReply: { type: String },
    repliedAt: { type: Date },
}, { timestamps: true });
export const ContactMessage = (models === null || models === void 0 ? void 0 : models.ContactMessage) || mongoose.model('ContactMessage', ContactMessageSchema);
