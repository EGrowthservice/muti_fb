import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    messageId: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    from: { type: String, required: true },
    fanpage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);