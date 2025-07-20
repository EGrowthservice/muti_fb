import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { AppError } from '../utils/error.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new AppError('No token provided', 401);
    }

    try {
        const decoded = verifyToken(token) as { userId: string };
        req.user = decoded;
        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
};