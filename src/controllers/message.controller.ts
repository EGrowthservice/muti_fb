import { Request, Response } from 'express';
import { FacebookService } from '../services/facebook.service';
import { AppError } from '../utils/error.util';
import Message from '../models/message.model';
import Fanpage from '../models/fanpage.model';
import { QueueService } from '../services/queue.service';

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
        const fanpage = await Fanpage.findOne({ user: req.user.userId }); // Sửa fanpageModel thành Fanpage
        if (!fanpage) throw new AppError('Fanpage not found', 404);
        await FacebookService.replyMessage(messageId, message, fanpage.accessToken);
        res.json({ message: 'Message replied' });
    }

    static async webhook(req: Request, res: Response) {
        if (req.method === 'GET') {
            // Xác minh webhook
            const verifyToken = process.env.FB_VERIFY_TOKEN || 'verify';
            const mode = req.query['hub.mode'];
            const token = req.query['hub.verify_token'];
            const challenge = req.query['hub.challenge'];

            if (mode === 'subscribe' && token === verifyToken) {
                res.status(200).send(challenge);
            } else {
                throw new AppError('Invalid verify token', 403);
            }
        } else if (req.method === 'POST') {
            // Xử lý sự kiện webhook
            const body = req.body;
            if (body.object === 'page') {
                for (const entry of body.entry) {
                    for (const messaging of entry.messaging) {
                        const fanpageId = entry.id;
                        const senderId = messaging.sender.id;
                        const messageText = messaging.message?.text;
                        if (messageText) {
                            // Lưu tin nhắn vào database
                            const message = new Message({
                                messageId: messaging.message.mid,
                                message: messageText,
                                from: senderId,
                                fanpage: fanpageId
                            });
                            await message.save();

                            // Thêm job vào queue để xử lý tin nhắn
                            await QueueService.addMessageProcessingJob(fanpageId, senderId, messageText);
                        }
                    }
                }
                res.status(200).json({ message: 'Webhook processed' });
            } else {
                throw new AppError('Invalid webhook event', 400);
            }
        }
    }
}