import { Request, Response } from 'express';
import User from '../models/user.model';
import Fanpage from '../models/fanpage.model';
import { FacebookService } from '../services/facebook.service';
import { QueueService } from '../services/queue.service';
import { AppError } from '../utils/error.util';

export class FanpageController {
    static async getFanpages(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const user = await User.findById(req.user.userId);
        if (!user || !user.accessToken) throw new AppError('User not authenticated', 401);
        const fanpages = await FacebookService.getUserFanpages(user.accessToken);
        res.json(fanpages);
    }

    static async connectFanpage(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { pageId, name, accessToken } = req.body;
        const userId = req.user.userId;
        const fanpage = new Fanpage({ pageId, name, accessToken, user: userId });
        await fanpage.save();
        await User.findByIdAndUpdate(userId, { $push: { fanpages: fanpage._id } });
        await QueueService.addPostSyncJob(pageId, accessToken);
        res.json({ message: 'Fanpage connected' });
    }

    static async disconnectFanpage(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { pageId } = req.params;
        const userId = req.user.userId;
        await Fanpage.findOneAndDelete({ pageId, user: userId });
        await User.findByIdAndUpdate(userId, { $pull: { fanpages: pageId } });
        res.json({ message: 'Fanpage disconnected' });
    }
}