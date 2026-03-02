import { Router } from 'express';
import { createOrder, verifyPayment, getPaymentDetails } from '../controllers/payment.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All payment routes require authentication
router.use(authMiddleware);

// Create order
router.post('/create-order', createOrder);

// Verify payment
router.post('/verify-payment', verifyPayment);

// Get payment details
router.get('/:paymentId', getPaymentDetails);

export default router;
