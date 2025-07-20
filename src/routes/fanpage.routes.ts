import { Router } from 'express';
import { FanpageController } from '../controllers/fanpage.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { packageMiddleware } from '../middleware/package.middleware';

const router = Router();

router.get('/', authMiddleware, FanpageController.getFanpages);
router.post('/connect', authMiddleware, packageMiddleware, FanpageController.connectFanpage);
router.delete('/:pageId', authMiddleware, FanpageController.disconnectFanpage);

export default router;