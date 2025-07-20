import mongoose, { Schema } from 'mongoose';

const paymentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    package: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
    payosOrderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);