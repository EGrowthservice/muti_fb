import Bull from 'bull';
import { FacebookService } from './facebook.service';
import Fanpage from '../models/fanpage.model';

const postQueue = new Bull('post-queue', {
    redis: process.env.REDIS_URL || 'redis://localhost:6379'
});

const messageQueue = new Bull('message-queue', {
    redis: process.env.REDIS_URL || 'redis://localhost:6379'
});

export class QueueService {
    static async addPostSyncJob(fanpageId: string, accessToken: string) {
        await postQueue.add({
            fanpageId,
            accessToken
        });
    }

    static async processPostSyncJob() {
        postQueue.process(async (job) => {
            const { fanpageId, accessToken } = job.data;
            const posts = await FacebookService.getPagePosts(fanpageId, accessToken);
            console.log(`Processed posts for fanpage ${fanpageId}:`, posts);
        });
    }

    static async addMessageProcessingJob(fanpageId: string, senderId: string, message: string) {
        await messageQueue.add({
            fanpageId,
            senderId,
            message
        });
    }

    static async processMessageProcessingJob() {
        messageQueue.process(async (job) => {
            const { fanpageId, senderId, message } = job.data;
            const replyMessage = `Received your message: ${message}`;
            const fanpage = await Fanpage.findOne({ fanpageId });
            if (fanpage) {
                await FacebookService.replyMessage(senderId, replyMessage, fanpage.accessToken);
                console.log(`Processed message for fanpage ${fanpageId} from ${senderId}: ${message}`);
            }
        });
    }
}