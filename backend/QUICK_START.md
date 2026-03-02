# ServaSetu Backend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- ✅ Node.js v16+ installed
- ✅ MongoDB installed and running OR MongoDB Atlas account
- ✅ Razorpay account (for payment integration)

---

## 📦 Installation Steps

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
The `.env` file has been created with default values. Update these values:

```env
# Required: Add your Razorpay credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Optional: Update MongoDB URI if using Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/servasetu
```

**Get Razorpay Keys:**
1. Sign up at https://razorpay.com/
2. Go to Settings → API Keys
3. Generate Test/Live Keys
4. Copy Key ID and Key Secret to `.env`

---

## 🗄️ Database Setup

### Option 1: Local MongoDB
Make sure MongoDB is running locally:
```bash
# Windows (if MongoDB is installed)
net start MongoDB

# Check if MongoDB is running
mongo --version
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Seed Database with Sample Services
```bash
npm run seed
```

This will populate your database with 8 sample services (Cleaning, Plumbing, Electrical, etc.)

---

## 🏃‍♂️ Running the Backend

### Development Mode (with hot reload)
```bash
npm run dev
```

Server will start at: **http://localhost:5000**

### Production Mode
```bash
npm run build
npm start
```

---

## ✅ Verify Installation

### 1. Check Health Endpoint
Open browser or use curl:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "success",
  "message": "ServaSetu API is running",
  "timestamp": "2026-03-02T..."
}
```

### 2. Get Services
```bash
curl http://localhost:5000/api/services
```

Should return list of 8 services if you ran the seed script.

---

## 🧪 Testing API Endpoints

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response for authenticated requests.

### Get Services (No Auth Required)
```bash
curl http://localhost:5000/api/services
```

### Create Booking (Requires Auth)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "serviceId": "SERVICE_ID",
    "scheduledDate": "2026-03-15",
    "scheduledTime": "10:00 AM",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    }
  }'
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database & Razorpay config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts (seed, etc.)
│   └── server.ts        # Entry point
├── dist/                # Compiled JavaScript (after build)
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

---

## 🔑 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection | mongodb://localhost:27017/servasetu |
| `JWT_SECRET` | Secret for JWT tokens | random_secret_key |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | rzp_test_... |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret | your_secret |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
❌ MongoDB connection error
```
**Fix:**
- Ensure MongoDB is running: `net start MongoDB`
- Check MONGODB_URI in `.env`
- For Atlas: Check IP whitelist and credentials

### Port Already in Use
```
❌ Port 5000 already in use
```
**Fix:**
- Change `PORT` in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

### TypeScript Errors
```
❌ Cannot find module...
```
**Fix:**
```bash
npm install
npm run build
```

---

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample services |
| `npm run lint` | Run ESLint |

---

## 🔗 Integration with Frontend

1. Make sure backend is running on port 5000
2. Frontend should make API calls to `http://localhost:5000/api/...`
3. Update frontend to use real API endpoints instead of mock data
4. Use the token from login in Authorization header:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

---

## 📝 Next Steps

1. ✅ Install dependencies
2. ✅ Configure `.env` with Razorpay keys
3. ✅ Start MongoDB
4. ✅ Run seed script
5. ✅ Start development server
6. ✅ Test API endpoints
7. 🔗 Connect frontend to backend
8. 🚀 Deploy to production

---

## 🆘 Need Help?

- Check the full [README.md](./README.md) for detailed documentation
- Review API endpoints in the README
- Check server logs for error messages
- Ensure all environment variables are set correctly

---

**Happy Coding! 🎉**
