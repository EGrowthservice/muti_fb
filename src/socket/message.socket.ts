import { Server } from 'socket.io';
import { FacebookService } from '../services/facebook.service';
import Fanpage from '../models/fanpage.model';

export const setupSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('joinFanpage', async ({ fanpageId, userId }) => {
            const fanpage = await Fanpage.findOne({ pageId: fanpageId, user: userId });
            if (fanpage) {
                socket.join(fanpageId);
                const messages = await FacebookService.getPageMessages(fanpageId, fanpage.accessToken);
                socket.emit('messages', messages);
            }
        });

        socket.on('sendMessage', async ({ fanpageId, messageId, message, userId }) => {
            const fanpage = await Fanpage.findOne({ pageId: fanpageId, user: userId });
            if (fanpage) {
                await FacebookService.replyMessage(messageId, message, fanpage.accessToken);
                io.to(fanpageId).emit('newMessage', { messageId, message });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};