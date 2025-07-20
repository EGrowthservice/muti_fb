import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/:fanpageId', authMiddleware, MessageController.getMessages);
router.post('/reply', authMiddleware, MessageController.replyMessage);
router.all('/webhook', MessageController.webhook);
export default router;