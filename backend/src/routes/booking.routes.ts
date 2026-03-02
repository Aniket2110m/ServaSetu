import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking,
  getAllBookings
} from '../controllers/booking.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All booking routes require authentication
router.use(authMiddleware);

// User routes
router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);
router.get('/:id', getBooking);
router.patch('/:id/status', updateBookingStatus);
router.patch('/:id/cancel', cancelBooking);

// Admin routes
router.get('/admin/all', getAllBookings);

export default router;
