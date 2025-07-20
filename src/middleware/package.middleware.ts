import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import Fanpage from '../models/fanpage.model';
import Package from '../models/package.model';
import { AppError } from '../utils/error.util';

export const packageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) throw new AppError('User not authenticated', 401);
    const user = await User.findById(req.user.userId).populate('package');
    if (!user) throw new AppError('User not found', 404);

    const fanpageCount = await Fanpage.countDocuments({ user: user._id });
    const packageLimit = user.package ? (user.package as any).fanpageLimit : 1; // Free plan allows 1 fanpage

    if (fanpageCount >= packageLimit) {
        throw new AppError('Fanpage limit reached for your package', 403);
    }

    next();
};