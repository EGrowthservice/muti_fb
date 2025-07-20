import { Request, Response } from 'express';
import Post from '../models/post.model';
import Fanpage from '../models/fanpage.model';
import { FacebookService } from '../services/facebook.service';
import { AppError } from '../utils/error.util';

export class PostController {
    static async getPosts(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { fanpageId } = req.params;
        const fanpage = await Fanpage.findOne({ pageId: fanpageId, user: req.user.userId });
        if (!fanpage) throw new AppError('Fanpage not found', 404);
        const posts = await Post.find({ fanpage: fanpage._id });
        res.json(posts);
    }

    static async syncPosts(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { fanpageId } = req.params;
        const fanpage = await Fanpage.findOne({ pageId: fanpageId, user: req.user.userId });
        if (!fanpage) throw new AppError('Fanpage not found', 404);
        const posts = await FacebookService.getPagePosts(fanpageId, fanpage.accessToken);
        for (const post of posts) {
            await Post.findOneAndUpdate(
                { postId: post.id },
                { postId: post.id, content: post.message, images: post.attachments?.data.map((a: any) => a.media.image.src), fanpage: fanpage._id },
                { upsert: true }
            );
        }
        res.json({ message: 'Posts synced' });
    }
}