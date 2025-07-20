import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    postId: { type: String, required: true, unique: true },
    fanpage: { type: Schema.Types.ObjectId, ref: 'Fanpage' },
    content: { type: String },
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);