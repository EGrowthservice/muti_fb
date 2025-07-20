import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    commentId: { type: String, required: true, unique: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);