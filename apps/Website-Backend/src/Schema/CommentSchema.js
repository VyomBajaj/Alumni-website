import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const commentSchema = new Schema({
    text: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Comment = model('Comment', commentSchema);

export default Comment;