import { Response } from 'express';
import crypto from 'crypto';
import razorpayInstance from '../config/razorpay';
import Payment from '../models/Payment.model';
import Booking from '../models/Booking.model';
import { AuthRequest } from '../middleware/auth';

// Create Razorpay order
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, bookingId, receipt } = req.body;

    // Check if Razorpay is configured
    if (!razorpayInstance) {
      res.status(503).json({
        status: 'error',
        message: 'Payment service is not configured. Please contact administrator.'
      });
      return;
    }

    // Validate inputs
    if (!amount || amount <= 0) {
      res.status(400).json({
        status: 'error',
        message: 'Valid amount is required'
      });
      return;
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance!.orders.create(options);

    // Save payment record
    const payment = new Payment({
      booking: bookingId,
      user: req.user?.userId,
      razorpayOrderId: order.id,
      amount: amount,
      currency: 'INR',
      status: 'created',
      receipt: order.receipt
    });

    await payment.save();

    res.status(200).json({
      status: 'success',
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create payment order',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Verify Razorpay payment
export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({
        status: 'error',
        message: 'Missing payment verification parameters'
      });
      return;
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValidSignature = generatedSignature === razorpay_signature;

    if (!isValidSignature) {
      // Update payment status to failed
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed' }
      );

      res.status(400).json({
        status: 'error',
        message: 'Invalid payment signature'
      });
      return;
    }

    // Update payment record
    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'success'
      },
      { new: true }
    );

    if (!payment) {
      res.status(404).json({
        status: 'error',
        message: 'Payment record not found'
      });
      return;
    }

    // Update booking payment status
    await Booking.findByIdAndUpdate(payment.booking, {
      paymentStatus: 'paid',
      paymentId: razorpay_payment_id,
      status: 'confirmed'
    });

    res.status(200).json({
      status: 'success',
      message: 'Payment verified successfully',
      data: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Payment verification failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get payment details
export const getPaymentDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate('booking')
      .populate('user', '-password');

    if (!payment) {
      res.status(404).json({
        status: 'error',
        message: 'Payment not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: payment
    });
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch payment details',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
