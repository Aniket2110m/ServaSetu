# ServiraSetu - Integration Status & API Keys Guide

## 🔄 CURRENT INTEGRATION STATUS

### Backend Status
```
✅ Backend Server:           Running on http://localhost:5000
✅ MongoDB Database:         Connected (Atlas Cloud)
✅ API Routes:              All configured (Auth, Services, Bookings, Payment, Users)
✅ Database Seeded:         8 sample services loaded
⚠️  Razorpay Integration:   Configured but needs API keys
```

### Frontend Status
```
⏳ Frontend Server:          Not started yet
🔴 API Connection:          NOT YET CONNECTED
🔴 .env.local file:         NOT YET CREATED
🔴 Environment Variables:   NOT YET CONFIGURED
```

### Integration Status
```
🔴 FRONTEND & BACKEND:      NOT YET INTEGRATED
```

---

## 📋 STEP-BY-STEP INTEGRATION GUIDE

### Phase 1: Backend Setup (✅ COMPLETE)
- [x] Backend server created and running
- [x] Express.js configured
- [x] MongoDB Atlas connected
- [x] API routes implemented
- [x] Database seeded with test data
- [ ] **→ Next: Add API keys**

### Phase 2: Frontend Configuration (🔄 IN PROGRESS)
- [ ] Create `.env.local` file in frontend folder
- [ ] Configure API endpoint
- [ ] Configure Razorpay Key
- [ ] **→ You are here**

### Phase 3: Integration & Testing
- [ ] Start frontend development server
- [ ] Test API connectivity
- [ ] Test authentication flow
- [ ] Test service listing
- [ ] Test booking creation
- [ ] Verify payment integration

---

## 🔑 REQUIRED API KEYS - ACTION PLAN

### 1️⃣ RAZORPAY PAYMENT GATEWAY (CRITICAL)

**Status:** ⚠️ **ACTION REQUIRED - Needed for payment functionality**

#### Get Your Keys:
1. Go to https://razorpay.com/
2. Click "Sign Up" → Create account
3. Verify email & phone
4. Dashboard → Settings → API Keys
5. Copy both keys

#### Keys Needed:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID = Copy from Razorpay Dashboard
RAZORPAY_KEY_SECRET         = Copy from Razorpay Dashboard
```

#### Where to Use:
**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

**Backend** (`backend/.env`):
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=gSh3Pxxxxxxxxxxxx
```

#### Testing:
After adding keys, use these test credentials:
- **Card:** 4111 1111 1111 1111
- **Expiry:** Any future date
- **CVV:** Any 3 digits
- **Amount:** Any amount

---

### 2️⃣ EMAIL SERVICE (OPTIONAL but Recommended)

**Status:** 🟢 **Optional - Needed for booking notifications**

Choose ONE:

#### Option A: SendGrid (RECOMMENDED - Easiest)
- **Sign up:** https://sendgrid.com/free/
- **Free tier:** 100 emails/month
- **Setup:** 5 minutes
- **Key name:** SENDGRID_API_KEY

#### Option B: AWS SES
- **Sign up:** https://aws.amazon.com/ses
- **Free tier:** 62,000 emails/month
- **Setup:** 15 minutes
- **Keys:** AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

#### Option C: Brevo (Sendinblue)
- **Sign up:** https://www.brevo.com
- **Free tier:** 300 emails/day
- **Setup:** 5 minutes
- **Key:** BREVO_API_KEY

---

## 📝 CREATE FRONTEND .env.local FILE

### Step 1: Create the file
Create `frontend/.env.local` with this content:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID_HERE

# Optional: Email Service
# SENDGRID_API_KEY=your_sendgrid_key_here
# AWS_ACCESS_KEY_ID=your_aws_key_here
# AWS_SECRET_ACCESS_KEY=your_aws_secret_here
# BREVO_API_KEY=your_brevo_key_here
```

### Step 2: Add Razorpay Key
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### Step 3: Done!
Save the file, frontend will automatically reload.

---

## 📝 UPDATE BACKEND .env FILE

### Already Configured:
```env
# Database ✅
MONGODB_URI=mongodb+srv://servasetu_db_user:eKgHbwSAwJ2EVNb5@servasetu.xom59cu.mongodb.net/servasetu?retryWrites=true&w=majority&appName=ServaSetu

# JWT ✅
JWT_SECRET=servasetu_jwt_secret_key_change_in_production_2026
JWT_EXPIRE=7d

# Frontend CORS ✅
FRONTEND_URL=http://localhost:3000
```

### Need to Add - Razorpay:
```env
RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_KEY_SECRET_HERE
```

---

## ✅ QUICK INTEGRATION CHECKLIST

Before connecting frontend to backend:

### Backend Verification
- [x] Backend running on `http://localhost:5000`
- [x] MongoDB connected
- [x] Health check working: `http://localhost:5000/health`
- [x] Services API working: `http://localhost:5000/api/services`
- [ ] **Add Razorpay keys to backend .env**

### Frontend Preparation
- [ ] **Create `frontend/.env.local`**
- [ ] **Add API_URL: `http://localhost:5000/api`**
- [ ] **Add Razorpay Key ID**
- [ ] Start frontend: `npm run dev` (in frontend folder)

### Testing After Integration
- [ ] Access frontend at `http://localhost:3000`
- [ ] See services loaded from backend
- [ ] Register a new user
- [ ] Create a booking
- [ ] Attempt payment (use test card)

---

## 🚀 START FRONTEND

Once `.env.local` is created:

```powershell
# Open new terminal
cd frontend
npm run dev
```

Frontend will start at: http://localhost:3000

---

## 📊 BACKEND API ENDPOINTS (Already Working)

### Health Check
```
GET http://localhost:5000/health
```

### Services (Public)
```
GET  /api/services           - Get all services
GET  /api/services/:id       - Get single service
POST /api/services           - Create service (auth required)
```

### Authentication
```
POST /api/auth/register      - Register new user
POST /api/auth/login         - Login user
```

### Bookings (Auth Required)
```
POST   /api/bookings         - Create booking
GET    /api/bookings/my-bookings - Get user's bookings
GET    /api/bookings/:id     - Get single booking
PATCH  /api/bookings/:id/cancel - Cancel booking
```

### Payment (Auth Required)
```
POST /api/payment/create-order    - Create Razorpay order
POST /api/payment/verify-payment  - Verify payment
GET  /api/payment/:id            - Get payment details
```

### Users (Auth Required)
```
GET  /api/users/profile      - Get user profile
PUT  /api/users/profile      - Update profile
GET  /api/users              - Get all users (admin)
```

---

## 🔐 ENVIRONMENT VARIABLES SUMMARY

### Backend Environment (`backend/.env`)
| Variable | Status | Value |
|----------|--------|-------|
| PORT | ✅ Set | 5000 |
| NODE_ENV | ✅ Set | development |
| MONGODB_URI | ✅ Set | MongoDB Atlas URI |
| JWT_SECRET | ✅ Set | JWT secret key |
| JWT_EXPIRE | ✅ Set | 7d |
| FRONTEND_URL | ✅ Set | http://localhost:3000 |
| RAZORPAY_KEY_ID | 🔴 **NEEDED** | Get from Razorpay |
| RAZORPAY_KEY_SECRET | 🔴 **NEEDED** | Get from Razorpay |

### Frontend Environment (`frontend/.env.local`)
| Variable | Status | Value |
|----------|--------|-------|
| NEXT_PUBLIC_API_URL | 🔴 **NEEDED** | http://localhost:5000/api |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | 🔴 **NEEDED** | Get from Razorpay |

---

## 🎯 NEXT IMMEDIATE ACTIONS

### ⏰ Priority 1 (Do Now):
1. **Get Razorpay Keys:**
   - Visit https://razorpay.com/
   - Sign up and get test keys
   - Copy both keys

2. **Update `backend/.env`:**
   - Add `RAZORPAY_KEY_ID`
   - Add `RAZORPAY_KEY_SECRET`

3. **Create `frontend/.env.local`:**
   - Add `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
   - Add `NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key`

### ⏰ Priority 2 (After Setup):
1. Start frontend: `npm run dev` in frontend folder
2. Test all API endpoints
3. Test booking flow
4. Test payment integration

---

## 🐛 TROUBLESHOOTING

### Frontend can't connect to backend
```
Error: Failed to fetch from http://localhost:5000/api
```
**Fix:**
- Make sure backend is running: `npm run dev` in backend folder
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Frontend needs to restart after .env.local changes

### Razorpay payment not working
```
Error: Cannot find Razorpay key
```
**Fix:**
- Add NEXT_PUBLIC_RAZORPAY_KEY_ID to frontend/.env.local
- Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to backend/.env
- Restart both servers

### MongoDB not connected
```
Error: Connection refused
```
**Fix:**
- Check MONGODB_URI in backend/.env
- Make sure it's the correct Atlas connection string

---

## 📞 SUPPORT

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Make sure both servers are running
4. Check the server logs for errors

---

**Status Updated:** March 2, 2026
**Backend:** ✅ Running & Connected
**Frontend:** ⏳ Ready to connect
