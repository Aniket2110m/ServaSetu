# Backend-Frontend Integration Guide

## Overview
This guide explains how to connect your Next.js frontend with the Express backend API.

---

## Backend Setup Checklist

✅ **Before Integration:**
1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure `.env` with Razorpay keys
4. Start MongoDB (local or Atlas)
5. Seed database: `npm run seed`
6. Start backend server: `npm run dev`
7. Verify health check: http://localhost:5000/health

---

## Frontend Integration Steps

### 1. Create API Client (Frontend)

Create a file `frontend/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage or cookie
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export const api = {
  // Auth
  register: (data: any) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  login: (data: any) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Services
  getServices: () => apiRequest('/services', { method: 'GET' }),
  getService: (id: string) => apiRequest(`/services/${id}`, { method: 'GET' }),

  // Bookings
  createBooking: (data: any) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  getUserBookings: () => apiRequest('/bookings/my-bookings', { method: 'GET' }),
  
  getBooking: (id: string) => apiRequest(`/bookings/${id}`, { method: 'GET' }),
  
  cancelBooking: (id: string) => apiRequest(`/bookings/${id}/cancel`, {
    method: 'PATCH',
  }),

  // Payment
  createOrder: (data: any) => apiRequest('/payment/create-order', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  verifyPayment: (data: any) => apiRequest('/payment/verify-payment', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // User
  getProfile: () => apiRequest('/users/profile', { method: 'GET' }),
  
  updateProfile: (data: any) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};
```

### 2. Update Environment Variables (Frontend)

Create/Update `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 3. Replace Mock API Routes

**Delete or update these frontend files:**
- `frontend/app/api/create-order/route.ts` ❌ (Use backend instead)
- `frontend/app/api/verify-payment/route.ts` ❌ (Use backend instead)

### 4. Update Authentication Page

Update `frontend/app/auth/page.tsx`:

```typescript
'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = isLogin 
        ? await api.login({ email: formData.email, password: formData.password })
        : await api.register(formData);
      
      // Save token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message || 'Authentication failed');
    }
  };

  // ... rest of your component
}
```

### 5. Update Booking Flow

Update `frontend/app/booking/page.tsx`:

```typescript
'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function BookingPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch real services from backend
    api.getServices()
      .then(response => setServices(response.data))
      .catch(error => console.error('Failed to fetch services:', error));
  }, []);

  // ... rest of your component
}
```

### 6. Update Payment Integration

Update `frontend/app/payment/page.tsx`:

```typescript
'use client';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  const handlePayment = async (bookingData: any) => {
    try {
      // Create order
      const orderResponse = await api.createOrder({
        amount: bookingData.amount,
        bookingId: bookingData.bookingId,
      });

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        order_id: orderResponse.data.orderId,
        name: 'ServaSetu',
        description: 'Service Booking Payment',
        handler: async function (response: any) {
          // Verify payment
          try {
            await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            router.push('/confirmation');
          } catch (error) {
            alert('Payment verification failed');
          }
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed');
    }
  };

  // ... rest of your component
}
```

---

## CORS Configuration

The backend is already configured to accept requests from `http://localhost:3000`.

If you deploy frontend to a different URL, update `FRONTEND_URL` in backend `.env`:

```env
FRONTEND_URL=https://your-frontend-domain.com
```

---

## Authentication Flow

### 1. Register/Login
```typescript
const response = await api.login({ email, password });
localStorage.setItem('token', response.data.token);
localStorage.setItem('user', JSON.stringify(response.data.user));
```

### 2. Use Token in Requests
The `api` helper automatically includes the token in all authenticated requests.

### 3. Check Authentication
```typescript
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
```

### 4. Logout
```typescript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/auth');
};
```

---

## Testing Integration

### 1. Start Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Test Flow
1. Open http://localhost:3000
2. Register a new user
3. Browse services (from real database)
4. Create a booking
5. Process payment
6. View booking confirmation

---

## API Response Format

All API responses follow this structure:

### Success
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { ... }
}
```

### Error
```json
{
  "status": "error",
  "message": "Error message",
  "statusCode": 400
}
```

---

## Common Integration Issues

### Issue: CORS Error
**Error:** `Access to fetch has been blocked by CORS policy`

**Fix:**
- Ensure backend is running
- Check `FRONTEND_URL` in backend `.env`
- Verify CORS middleware in backend

### Issue: 401 Unauthorized
**Error:** `Authentication required`

**Fix:**
- Ensure token is saved: `localStorage.getItem('token')`
- Check Authorization header is included
- Verify token hasn't expired

### Issue: Network Error
**Error:** `Failed to fetch`

**Fix:**
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Verify both servers are running

---

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use real Razorpay keys (not test)
3. Update `FRONTEND_URL` to production domain
4. Deploy to Render, Railway, or Heroku

### Frontend
1. Update `NEXT_PUBLIC_API_URL` to production backend URL
2. Update `NEXT_PUBLIC_RAZORPAY_KEY_ID` to production key
3. Deploy to Vercel, Netlify, or similar

---

## Next Steps

1. ✅ Start backend server
2. ✅ Create `lib/api.ts` in frontend
3. ✅ Update `.env.local` in frontend
4. ✅ Replace mock API routes
5. ✅ Test authentication flow
6. ✅ Test booking creation
7. ✅ Test payment integration
8. 🚀 Deploy to production

---

**Need Help?**
- Check backend logs for errors
- Use browser DevTools Network tab
- Verify API endpoints in backend README
- Test endpoints with Postman/curl first

**Happy Integrating! 🎉**
