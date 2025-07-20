import axios from 'axios';
import { facebookConfig } from '../config/facebook';
import { AppError } from '../utils/error.util';

export class FacebookService {
    static async getUserAccessToken(code: string) {
        const url = `https://graph.facebook.com/23.0/oauth/access_token?client_id=${facebookConfig.appId}&client_secret=${facebookConfig.appSecret}&redirect_uri=${facebookConfig.redirectUri}&code=${code}`;
        try {
            const response = await axios.get(url);
            return response.data.access_token;
        } catch {
            throw new AppError('Failed to get Facebook access token', 500);
        }
    }

    static async getUserFanpages(accessToken: string) {
        const url = `https://graph.facebook.com/23.0/me/accounts?access_token=${accessToken}`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch {
            throw new AppError('Failed to get fanpages', 500);
        }
    }

    static async getPagePosts(pageId: string, accessToken: string) {
        const url = `https://graph.facebook.com/23.0/${pageId}/posts?fields=message,attachments&access_token=${accessToken}`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch {
            throw new AppError('Failed to get posts', 500);
        }
    }

    static async getPostComments(postId: string, accessToken: string) {
        const url = `https://graph.facebook.com/23.0/${postId}/comments?fields=message&access_token=${accessToken}`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch {
            throw new AppError('Failed to get comments', 500);
        }
    }

    static async getPageMessages(pageId: string, accessToken: string) {
        const url = `https://graph.facebook.com/23.0/${pageId}/conversations?fields=messages{message,from}&access_token=${accessToken}`;
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch {
            throw new AppError('Failed to get messages', 500);
        }
    }

    static async replyComment(commentId: string, message: string, accessToken: string) {
        const url = `https://graph.facebook.com/23.0/${commentId}/comments`;
        try {
            await axios.post(url, { message }, { params: { access_token: accessToken } });
        } catch {
            throw new AppError('Failed to reply comment', 500);
        }
    }

    static async replyMessage(messageId: string, message: string, accessToken: string) {
        const url = `https://graph.facebook.com/23.0/${messageId}/messages`;
        try {
            await axios.post(url, { message }, { params: { access_token: accessToken } });
        } catch {
            throw new AppError('Failed to reply message', 500);
        }
    }
}