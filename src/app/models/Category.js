import { Schema, model, models } from "mongoose";
const CategorySchema = new Schema({
    name: { type: String, require: true, unique: true },
    image: { type: String },
}, { timestamps: true });
export const Category = (models === null || models === void 0 ? void 0 : models.Category) || model('Category', CategorySchema);
