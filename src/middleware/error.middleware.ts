import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.util';

export const errorMiddleware = (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    console.error('Unexpected error:', error);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};