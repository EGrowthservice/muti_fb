import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    facebookId: { type: String },
    accessToken: { type: String },
    package: { type: Schema.Types.ObjectId, ref: 'Package' },
    fanpages: [{ type: Schema.Types.ObjectId, ref: 'Fanpage' }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);