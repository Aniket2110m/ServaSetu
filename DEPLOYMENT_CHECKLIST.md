# ServaSetu Deployment Checklist (Hostinger + servasetu.com)

## 1) Pre-Deploy Validation

- [ ] `npm install` succeeds at repository root
- [ ] `npm run build` succeeds for frontend
- [ ] `backend`: `npm install && npm run build` succeeds
- [ ] Frontend metadata points to `https://servasetu.com`
- [ ] Backend health endpoint works locally: `http://localhost:5000/health`

## 2) Environment Variables

### Frontend (`.env.local` in root)

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
NEXT_PUBLIC_API_URL=https://api.servasetu.com/api
```

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/servasetu
JWT_SECRET=<long-random-secret>
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=<razorpay-secret>
FRONTEND_URLS=https://servasetu.com,https://www.servasetu.com
```

## 3) Hostinger Infrastructure

- [ ] Hostinger VPS active (Node.js capable plan)
- [ ] SSH access enabled
- [ ] Node.js 20+ installed
- [ ] PM2 installed globally: `npm install -g pm2`
- [ ] Nginx installed and running

## 4) DNS Setup for servasetu.com

- [ ] `A` record: `@` -> VPS public IP
- [ ] `A` record: `www` -> VPS public IP
- [ ] `A` record: `api` -> VPS public IP (if using subdomain backend)
- [ ] Wait for DNS propagation

## 5) Deploy Frontend + Backend

- [ ] Clone/pull latest code on VPS
- [ ] Frontend build: `npm install && npm run build`
- [ ] Backend build: `cd backend && npm install && npm run build`
- [ ] Start frontend with PM2 on port `3000`
- [ ] Start backend with PM2 on port `5000`
- [ ] Persist PM2 processes with `pm2 save` and startup command

## 6) Nginx + SSL

- [ ] Nginx site for `servasetu.com` and `www.servasetu.com` -> proxy `127.0.0.1:3000`
- [ ] Nginx site for `api.servasetu.com` -> proxy `127.0.0.1:5000`
- [ ] HTTPS certificates installed using Let's Encrypt
- [ ] HTTP to HTTPS redirect enabled

## 7) Go-Live Verification

- [ ] `https://servasetu.com` opens successfully
- [ ] `https://www.servasetu.com` redirects or serves correctly
- [ ] `https://api.servasetu.com/health` returns success JSON
- [ ] Booking flow works end-to-end
- [ ] Razorpay checkout opens and verifies payment
- [ ] CORS works with both root and `www` domain

## 8) Post-Launch

- [ ] Enable automatic backups for DB
- [ ] Monitor PM2 logs and restart behavior
- [ ] Add uptime monitor for frontend and backend
- [ ] Rotate secrets after launch stabilization

## References

- Hostinger VPS docs: https://support.hostinger.com/en/collections/588619-vps
- Next.js deploy docs: https://nextjs.org/docs/app/building-your-application/deploying
- Razorpay docs: https://razorpay.com/docs
