import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:postId', authMiddleware, CommentController.getComments);
router.post('/reply', authMiddleware, CommentController.replyComment);

export default router;