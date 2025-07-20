import mongoose, { Schema } from 'mongoose';

const packageSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    fanpageLimit: { type: Number, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Package', packageSchema);