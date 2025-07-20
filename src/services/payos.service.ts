import axios from 'axios';
import { payosConfig } from '../config/payos';
import { AppError } from '../utils/error.util';

export class PayOSService {
    static async createPaymentLink(userId: string, packageId: string, amount: number) {
        const url = 'https://api.payos.vn/v2/payment-requests';
        const orderCode = Math.floor(Math.random() * 1000000);
        const data = {
            orderCode,
            amount,
            description: `Payment for package ${packageId}`,
            buyerEmail: userId,
            returnUrl: 'https://mutifacebook.pro.vn/payment/success',
            cancelUrl: 'https://mutifacebook.pro.vn/payment/cancel',
            signature: this.generateSignature(orderCode, amount)
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'x-client-id': payosConfig.clientId,
                    'x-api-key': payosConfig.apiKey
                }
            });
            return response.data.data;
        } catch {
            throw new AppError('Failed to create payment link', 500);
        }
    }

    static generateSignature(orderCode: number, amount: number) {
        const crypto = require('crypto');
        const data = `${orderCode}|${amount}|${payosConfig.clientId}`;
        return crypto
            .createHmac('sha256', payosConfig.checksumKey)
            .update(data)
            .digest('hex');
    }

    static async verifyWebhook(data: any, signature: string) {
        const crypto = require('crypto');
        const calculatedSignature = crypto
            .createHmac('sha256', payosConfig.checksumKey)
            .update(JSON.stringify(data))
            .digest('hex');
        return calculatedSignature === signature;
    }
}