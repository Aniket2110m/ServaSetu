# ServaSetu Backend API

Backend API for ServaSetu - A comprehensive home services platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- 🔐 **Authentication**: JWT-based user authentication and authorization
- 💳 **Payment Integration**: Razorpay payment gateway integration
- 📅 **Booking Management**: Complete booking lifecycle management
- 🛠️ **Service Management**: CRUD operations for services
- 👤 **User Management**: User profiles and account management
- 🔒 **Security**: Helmet, CORS, and input validation
- 📊 **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT
- **Payment**: Razorpay
- **Security**: Helmet, bcryptjs
- **Validation**: express-validator

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Razorpay account (for payment integration)

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   FRONTEND_URLS=https://servasetu.com,https://www.servasetu.com
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Keep Render Warm (Optional)
Use this script to ping a health endpoint periodically and reduce cold-start delay:

1. Add to `.env`:
   ```env
   RENDER_KEEP_ALIVE_URL=https://your-backend.onrender.com/health
   RENDER_KEEP_ALIVE_INTERVAL_MINUTES=10
   ```
2. Run:
   ```bash
   npm run keepalive
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `GET /api/users` - Get all users (admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (authenticated)
- `PUT /api/services/:id` - Update service (authenticated)
- `DELETE /api/services/:id` - Delete service (authenticated)

### Bookings
- `POST /api/bookings` - Create booking (authenticated)
- `GET /api/bookings/my-bookings` - Get user's bookings (authenticated)
- `GET /api/bookings/:id` - Get single booking (authenticated)
- `PATCH /api/bookings/:id/status` - Update booking status (authenticated)
- `PATCH /api/bookings/:id/cancel` - Cancel booking (authenticated)
- `GET /api/bookings/admin/all` - Get all bookings (admin)

### Payment
- `POST /api/payment/create-order` - Create Razorpay order (authenticated)
- `POST /api/payment/verify-payment` - Verify Razorpay payment (authenticated)
- `GET /api/payment/:paymentId` - Get payment details (authenticated)

### Health Check
- `GET /health` - API health check

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   └── razorpay.ts          # Razorpay configuration
│   ├── controllers/
│   │   ├── auth.controller.ts   # Authentication logic
│   │   ├── booking.controller.ts
│   │   ├── payment.controller.ts
│   │   ├── service.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts     # Global error handler
│   ├── models/
│   │   ├── Booking.model.ts
│   │   ├── Payment.model.ts
│   │   ├── Service.model.ts
│   │   └── User.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── payment.routes.ts
│   │   ├── service.routes.ts
│   │   └── user.routes.ts
│   └── server.ts                # Entry point
├── dist/                        # Compiled JavaScript
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `RAZORPAY_KEY_ID` | Razorpay key ID | - |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | - |
| `FRONTEND_URLS` | Comma-separated frontend origins for CORS | https://servasetu.com,https://www.servasetu.com |

## API Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error message",
  "statusCode": 400
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses centralized error handling with appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For support, email support@servasetu.com or create an issue in the repository.
