import { Request, Response } from 'express';
import Comment from '../models/comment.model';
import Fanpage from '../models/fanpage.model';
import { FacebookService } from '../services/facebook.service';
import { AppError } from '../utils/error.util';

export class CommentController {
    static async getComments(req: Request, res: Response) {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId });
        res.json(comments);
    }

    static async replyComment(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { commentId, message } = req.body;
        const fanpage = await Fanpage.findOne({ user: req.user.userId });
        if (!fanpage) throw new AppError('Fanpage not found', 404);
        await FacebookService.replyComment(commentId, message, fanpage.accessToken);
        res.json({ message: 'Comment replied' });
    }
}