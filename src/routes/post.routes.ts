import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:fanpageId', authMiddleware, PostController.getPosts);
router.post('/:fanpageId/sync', authMiddleware, PostController.syncPosts);

export default router;