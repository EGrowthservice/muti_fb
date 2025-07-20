import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/create', authMiddleware, PaymentController.createPayment);
router.post('/webhook', PaymentController.webhook);

export default router;