import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';

// Import routes
import paymentRoutes from './routes/payment.routes';
import bookingRoutes from './routes/booking.routes';
import serviceRoutes from './routes/service.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const parseAllowedOrigins = (): string[] => {
  const configuredOrigins = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '';
  const origins = configuredOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  // Always allow local development origins unless explicitly disabled.
  const devOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  return Array.from(new Set([...origins, ...devOrigins]));
};

const allowedOrigins = parseAllowedOrigins();

// Initialize express app
const app: Application = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests and health checks without Origin header.
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));
app.use(morgan('dev')); // Request logging
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'ServaSetu API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ServaSetu Backend running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
