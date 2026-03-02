import { Router } from 'express';
import { getUserProfile, updateUserProfile, getAllUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All user routes require authentication
router.use(authMiddleware);

// User profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Admin routes
router.get('/', getAllUsers);

export default router;
