import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    messageId: { type: String, required: true, unique: true },
    fanpage: { type: Schema.Types.ObjectId, ref: 'Fanpage' },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);