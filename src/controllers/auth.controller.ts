import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import { AppError } from '../utils/error.util';
import { FacebookService } from '../services/facebook.service';

export class AuthController {
    static async register(req: Request, res: Response) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        const token = generateToken(user._id.toString());
        res.json({ token });
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Invalid credentials', 401);
        }
        const token = generateToken(user._id.toString());
        res.json({ token });
    }

    static async facebookCallback(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { code } = req.query;
        const accessToken = await FacebookService.getUserAccessToken(code as string);
        const user = await User.findOneAndUpdate(
            { _id: req.user.userId },
            { accessToken },
            { new: true }
        );
        if (!user) throw new AppError('User not found', 404);
        res.redirect('/dashboard');
    }
}