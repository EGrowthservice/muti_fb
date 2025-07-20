import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { AppError } from '../utils/error.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.query.token && typeof req.query.token === "string") {
        token = req.query.token;
    }

    if (!token) {
        res.status(401).json({ error: "Thiếu hoặc sai định dạng token (yêu cầu Bearer token)" });
        return;
    }

    try {
        const decoded = verifyToken(token) as { userId: string };
        req.user = decoded;
        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
};