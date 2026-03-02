import { Request, Response } from 'express';
import Booking from '../models/Booking.model';
import Service from '../models/Service.model';
import { AuthRequest } from '../middleware/auth';

// Create booking
export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { serviceId, scheduledDate, scheduledTime, address, notes } = req.body;
    const userId = req.user?.userId;

    // Validate service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
      return;
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      service: serviceId,
      scheduledDate,
      scheduledTime,
      address,
      amount: service.price,
      notes,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await booking.save();
    await booking.populate('service');

    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get user's bookings
export const getUserBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { status, paymentStatus } = req.query;

    const filter: any = { user: userId };
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const bookings = await Booking.find(filter)
      .populate('service')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single booking
export const getBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const booking = await Booking.findOne({ _id: id, user: userId })
      .populate('service')
      .populate('user', '-password');

    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.userId;

    const booking = await Booking.findOneAndUpdate(
      { _id: id, user: userId },
      { status },
      { new: true, runValidators: true }
    ).populate('service');

    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update booking status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Cancel booking
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const booking = await Booking.findOne({ _id: id, user: userId });

    if (!booking) {
      res.status(404).json({
        status: 'error',
        message: 'Booking not found'
      });
      return;
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      res.status(400).json({
        status: 'error',
        message: `Cannot cancel a ${booking.status} booking`
      });
      return;
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to cancel booking',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get all bookings (admin only)
export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, paymentStatus } = req.query;

    const filter: any = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const bookings = await Booking.find(filter)
      .populate('service')
      .populate('user', '-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch bookings',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
