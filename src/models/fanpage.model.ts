import mongoose, { Schema } from 'mongoose';

const fanpageSchema = new Schema({
    pageId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    accessToken: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Fanpage', fanpageSchema);