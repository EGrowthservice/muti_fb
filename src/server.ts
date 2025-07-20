import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/database';
import authRoutes from './routes/auth.routes';
import fanpageRoutes from './routes/fanpage.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import messageRoutes from './routes/message.routes';
import paymentRoutes from './routes/payment.routes';
import { setupSocket } from './socket/message.socket';
import { QueueService } from './services/queue.service';
import { errorMiddleware } from './middleware/error.middleware';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/fanpage', fanpageRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use(errorMiddleware);

setupSocket(io);
QueueService.processPostSyncJob();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();