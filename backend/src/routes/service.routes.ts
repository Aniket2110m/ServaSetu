import { Router } from 'express';
import {
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService
} from '../controllers/service.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAllServices);
router.get('/:id', getService);

// Protected routes (require authentication)
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

export default router;
