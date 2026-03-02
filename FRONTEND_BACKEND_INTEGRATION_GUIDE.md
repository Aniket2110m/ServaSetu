# Frontend & Backend Integration Guide

## 📊 CURRENT STATUS

| Component | Status | Details |
|-----------|--------|---------|
| **Backend** | ✅ Running | `http://localhost:5000` |
| **MongoDB** | ✅ Connected | Atlas Cloud Database |
| **Frontend** | 🔴 Not Started | Ready to launch |
| **Integration** | 🔴 Pending | Needs API keys |

---

## ❌ NOT YET INTEGRATED - ACTION NEEDED

Your frontend and backend are **NOT connected yet**. Here's what needs to be done:

### Step 1: Add API Keys ⚠️ CRITICAL

#### Get Razorpay Test Keys:
1. Visit: https://razorpay.com/
2. Sign up (takes 2 minutes)
3. Verify email & phone
4. Go to: Dashboard → Settings → API Keys
5. Copy **Key ID** (starts with `rzp_test_`)

#### Option A: Quick Setup (Recommended)
```env
# frontend/.env.local (ALREADY CREATED - Just update this line)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE

# backend/.env (Update these two lines)
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
```

#### Option B: Skip Razorpay (For Testing Services Without Payment)
- Just use what's already configured
- Payment features will show a message
- Perfect for testing booking flow

---

## 🚀 COMPLETE INTEGRATION IN 5 MINUTES

### Step 1: Setup Environment Variables (2 min)

**Frontend** - Already configured, but add your Razorpay key:
```powershell
# File: frontend/.env.local
# Already exists with:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=YOUR_KEY_HERE  # ← Replace this

# If using email service (optional):
# SENDGRID_API_KEY=your_key_here
```

**Backend** - Add Razorpay keys:
```powershell
# File: backend/.env
# Already has MongoDB configured, add:
RAZORPAY_KEY_ID=YOUR_KEY_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE
```

### Step 2: Start Frontend (1 min)

```powershell
# Open a NEW PowerShell terminal
cd frontend
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.6
- Local:        http://localhost:3000
```

### Step 3: Test Connection (1 min)

Visit: http://localhost:3000

You should see:
- ✅ Services loaded from backend
- ✅ Ability to browse services
- ✅ Registration & Login working
- ✅ Booking creation working

### Step 4: Test Full Flow (1 min)

1. **Register:** Fill signup form
2. **Login:** Use your credentials
3. **Browse:** See services from database
4. **Book:** Create a booking
5. **Payment:** Test with Razorpay (if keys added)

---

## 📚 API CLIENT USAGE

The API client is at `lib/api.ts` and ready to use:

### Example 1: Get All Services
```typescript
import api from '@/lib/api';

const getServices = async () => {
  try {
    const response = await api.services.getAll();
    console.log(response.data); // Array of services
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }
};
```

### Example 2: Register User
```typescript
import api from '@/lib/api';

const register = async () => {
  try {
    const response = await api.auth.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secure123',
      phone: '9876543210',
    });
    
    api.tokens.setToken(response.data.token);
    api.tokens.setUser(response.data.user);
    
    console.log('✅ Registered successfully');
  } catch (error) {
    console.error('❌ Registration failed:', error);
  }
};
```

### Example 3: Create Booking
```typescript
import api from '@/lib/api';

const createBooking = async () => {
  try {
    const response = await api.bookings.create({
      serviceId: '69a50a5dcbe9fb07ca19023b', // Deep Cleaning service ID
      scheduledDate: '2026-03-10',
      scheduledTime: '10:00 AM',
      address: {
        street: '123 Main Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
      },
      notes: 'Please come after 10 AM',
    });
    
    console.log('✅ Booking created:', response.data);
  } catch (error) {
    console.error('❌ Booking failed:', error);
  }
};
```

### Example 4: Process Payment
```typescript
import api from '@/lib/api';

const processPayment = async (bookingId: string, amount: number) => {
  try {
    // Step 1: Create order on backend
    const orderResponse = await api.payment.createOrder({
      amount,
      bookingId,
    });

    // Step 2: Initialize Razorpay
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderResponse.data.amount,
      currency: orderResponse.data.currency,
      order_id: orderResponse.data.orderId,
      handler: async (response: any) => {
        // Step 3: Verify payment on backend
        const verifyResponse = await api.payment.verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        console.log('✅ Payment verified:', verifyResponse.data);
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('❌ Payment failed:', error);
  }
};
```

---

## 🔌 API ENDPOINTS REFERENCE

### Authentication
```
POST   /api/auth/register     → Register new user
POST   /api/auth/login        → Login user
```

### Services
```
GET    /api/services          → Get all services
GET    /api/services/:id      → Get single service
POST   /api/services          → Create service (admin)
PUT    /api/services/:id      → Update service (admin)
DELETE /api/services/:id      → Delete service (admin)
```

### Bookings
```
POST   /api/bookings          → Create booking
GET    /api/bookings/my-bookings → Get user's bookings
GET    /api/bookings/:id      → Get single booking
PATCH  /api/bookings/:id/status → Update booking status
PATCH  /api/bookings/:id/cancel → Cancel booking
GET    /api/bookings/admin/all → Get all bookings (admin)
```

### Payment
```
POST   /api/payment/create-order      → Create Razorpay order
POST   /api/payment/verify-payment    → Verify payment
GET    /api/payment/:id               → Get payment details
```

### Users
```
GET    /api/users/profile     → Get user profile
PUT    /api/users/profile     → Update profile
GET    /api/users             → Get all users (admin)
```

---

## 🧪 TESTING API ENDPOINTS

### Test Services Endpoint (No Auth Required)
```powershell
(Invoke-WebRequest -Uri http://localhost:5000/api/services -UseBasicParsing).Content | ConvertFrom-Json | ConvertTo-Json
```

### Test Register Endpoint
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "password123"
    phone = "9876543210"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/auth/register `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content
```

---

## 📋 INTEGRATION CHECKLIST

Before you consider integration complete:

### Backend Verification
- [x] Backend running on port 5000
- [x] MongoDB connected and seeded
- [x] Health check endpoint working
- [x] Services API returning 8 services
- [ ] **Razorpay keys added to .env**

### Frontend Preparation
- [x] `.env.local` created
- [x] API URL configured
- [x] API client (`lib/api.ts`) created
- [ ] **Razorpay key added to .env.local**
- [ ] **Frontend server started**

### Integration Testing
- [ ] Frontend loads
- [ ] Can see services from backend
- [ ] Can register user
- [ ] Can login
- [ ] Can create booking
- [ ] Payment works (if keys added)

---

## 🔑 IMMEDIATE NEXT STEPS

### RIGHT NOW (5 minutes):
1. **Get Razorpay keys** from https://razorpay.com/
   - Sign up (or use test keys if already available)
   - Copy Key ID and Secret

2. **Update backend/.env:**
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   ```

3. **Update frontend/.env.local:**
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
   ```

### THEN (Start Frontend):
```powershell
cd frontend
npm run dev
```

### Finally (Test):
1. Open http://localhost:3000
2. Register a user
3. Browse services
4. Create a booking
5. Test payment

---

## 🐛 COMMON ISSUES & FIXES

### Issue: "Cannot connect to http://localhost:5000"
**Reason:** Backend not running
**Fix:** 
```powershell
cd backend
npm run dev
```

### Issue: "Services showing empty array"
**Reason:** Database not seeded
**Fix:**
```powershell
cd backend
npm run seed
```

### Issue: Razorpay button not showing
**Reason:** Key not configured
**Fix:** Add key to both .env files and restart servers

### Issue: Frontend shows "Route not found"
**Reason:** API URL incorrect
**Fix:** Check NEXT_PUBLIC_API_URL in `frontend/.env.local`

---

## 📞 FILES MODIFIED/CREATED

- ✅ `frontend/.env.local` - Created
- ✅ `frontend/lib/api.ts` - Created
- 📝 `backend/.env` - Needs Razorpay keys
- 📝 `INTEGRATION_STATUS_AND_API_KEYS.md` - Created (this file structure)

---

## ✨ YOU'RE READY!

Your backend is fully functional and frontend is ready to connect. The integration is straightforward:

1. **Add 2 environment variables** (Razorpay keys)
2. **Start frontend server**
3. **Test the flow**

You'll have a fully working home services booking platform in about 5 minutes! 🚀

---

**Questions?** Check the troubleshooting section or refer to the main documentation.
