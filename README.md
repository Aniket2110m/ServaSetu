# ServaSetu - Home Services Platform

A modern, responsive home services booking platform built with Next.js 16 and Tailwind CSS 4.

## 🚀 Project Overview

ServaSetu is a professional home services platform that allows users to:
- Browse various home services (Plumbing, Electrical, AC Repair, Cleaning, etc.)
- Book services with a step-by-step flow
- Schedule appointments with date and time selection
- Select payment methods and complete checkout
- View AMC subscription plans

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx                    # Landing page with services and AMC plans
│   ├── booking/
│   │   └── page.tsx               # Service selection page
│   ├── checkout/
│   │   └── page.tsx               # Scheduling and payment page
│   ├── layout.tsx                 # Root layout with Inter font
│   └── globals.css                # Global styles with custom Tailwind theme
├── components/
│   ├── Navbar.tsx                 # Reusable navigation component
│   └── Footer.tsx                 # Reusable footer component
└── package.json                   # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1F4E8C` - Main brand color
- **Accent Teal**: `#1FA37A` - Secondary brand color
- **Saffron**: `#FF9933` - Highlight/accent color
- **Background Light**: `#F8FAFC` - Light background

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript 5
- **Icons**: Material Symbols Outlined

## 📦 Getting Started

1. **Run the development server**:
```bash
npm run dev
```

2. **Open your browser**:
Navigate to `http://localhost:3000`

## 📄 Pages Overview

### 1. Landing Page (`/`)
- Hero section with search functionality
- 8 service categories with hover effects
- "Why Choose Us" section with testimonials
- AMC subscription plans (Essential, Premium, Elite)

### 2. Booking Page (`/booking`)
- Service selection for plumbing tasks
- Interactive service cards with real-time price calculation
- 4 service options: Tap Repair ($29), Pipe Leakage ($49), Full Checkup ($99), Geyser Service ($35)

### 3. Checkout Page (`/checkout`)
- Date selection with calendar interface
- Time slot selection
- Payment method options (UPI, Cards, Net Banking)
- Order summary with pricing breakdown

## 🎯 Features Implemented

✅ Fully responsive design for mobile, tablet, and desktop
✅ Modern UI with smooth animations and transitions
✅ Interactive components (service selection, date picker, payment options)
✅ Client-side state management with React hooks
✅ SEO-optimized with proper meta tags
✅ Material Icons integration
✅ Gradient effects and micro-interactions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deploy on Hostinger

Use `HOSTINGER_DEPLOYMENT_GUIDE.md` in this repository for production deployment to `servasetu.com`.

It includes:
- VPS setup
- DNS records for root + `www`
- SSL and reverse proxy configuration
- PM2 process management for frontend and backend

---

**Built with ❤️ using Next.js and Tailwind CSS**
