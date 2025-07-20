import dotenv from 'dotenv';

dotenv.config();

export const facebookConfig = {
    appId: process.env.FB_APP_ID as string,
    appSecret: process.env.FB_APP_SECRET as string,
    redirectUri: process.env.FB_REDIRECT_URI as string,
    verifyToken: process.env.FB_VERIFY_TOKEN as string
};