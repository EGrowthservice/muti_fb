import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { AppError } from '../utils/error.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token?.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    console.log('Token:', token);
    if (!token) {
        throw new AppError('No token provided', 401);
    }

    try {
        const decoded = verifyToken(token) as { userId: string };
        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
};