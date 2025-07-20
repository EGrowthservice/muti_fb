import { Request, Response } from 'express';
import { PayOSService } from '../services/payos.service';
import Payment from '../models/payment.model';
import User from '../models/user.model';
import { AppError } from '../utils/error.util';

export class PaymentController {
    static async createPayment(req: Request, res: Response) {
        if (!req.user) throw new AppError('User not authenticated', 401);
        const { packageId, amount } = req.body;
        const userId = req.user.userId;
        const paymentLink = await PayOSService.createPaymentLink(userId, packageId, amount);
        const payment = new Payment({ user: userId, package: packageId, payosOrderId: paymentLink.orderCode, amount });
        await payment.save();
        res.json({ paymentLink });
    }

    static async webhook(req: Request, res: Response) {
        const { data, signature } = req.body;
        if (await PayOSService.verifyWebhook(data, signature)) {
            const payment = await Payment.findOneAndUpdate(
                { payosOrderId: data.orderCode },
                { status: data.status },
                { new: true }
            );
            if (payment && data.status === 'PAID') {
                await User.findByIdAndUpdate(payment.user, { package: payment.package });
            }
            res.json({ message: 'Webhook processed' });
        } else {
            res.status(400).json({ message: 'Invalid webhook signature' });
        }
    }
}