import Bull from 'bull';
import { FacebookService } from './facebook.service';

const postQueue = new Bull('post-queue', {
    redis: { host: 'localhost', port: 6379 }
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
            // Lưu posts vào database (cần thêm logic lưu vào Post model)
            console.log(`Processed posts for fanpage ${fanpageId}:`, posts);
        });
    }
}