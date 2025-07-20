export const payosConfig = {
    clientId: process.env.PAYOS_CLIENT_ID as string,
    apiKey: process.env.PAYOS_API_KEY as string,
    checksumKey: process.env.PAYOS_CHECKSUM_KEY as string,
    webhookUrl: 'https://api.mutifacebook.pro.vn/payment/payos/webhook'
};