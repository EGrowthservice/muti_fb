import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    console.log('Generating token with JWT_SECRET:', process.env.JWT_SECRET);
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    console.log('Verifying token with JWT_SECRET:', process.env.JWT_SECRET);
    console.log('Token:', token);
    return jwt.verify(token, process.env.JWT_SECRET);
};