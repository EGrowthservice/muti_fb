import { Request, Response } from 'express';
import Message from '../models/message.model';
import Fanpage from '../models/fanpage.model';
import { FacebookService } from '../services/facebook.service';
import { AppError } from '../utils/error.util';

export class MessageController {
    static async getMessages(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { fanpageId } = req.params;
        const messages = await Message.find({ fanpage: fanpageId });
        res.json(messages);
    }

    static async replyMessage(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { messageId, message } = req.body;
        const fanpage = await Fanpage.findOne({ user: req.user.userId });
        if (!fanpage) throw new AppError('Fanpage not found', 404);
        await FacebookService.replyMessage(messageId, message, fanpage.accessToken);
        res.json({ message: 'Message replied' });
    }
}