# Hostinger Deployment Guide for ServaSetu (servasetu.com)

This guide deploys:
- Frontend Next.js app on `servasetu.com` and `www.servasetu.com`
- Backend Node API on `api.servasetu.com`

## 1. Recommended Hosting Model

Use a Hostinger VPS plan (not static/shared-only hosting), because:
- Next.js app uses server runtime and API routes
- Backend API needs a persistent Node process

## 2. Server Bootstrap (VPS)

SSH into VPS and install core tools.

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Verify versions:

```bash
node -v
npm -v
pm2 -v
```

## 3. DNS Records in Hostinger

In Hostinger DNS Zone for `servasetu.com`:

- `A` -> Host `@` -> Value `<VPS_PUBLIC_IP>`
- `A` -> Host `www` -> Value `<VPS_PUBLIC_IP>`
- `A` -> Host `api` -> Value `<VPS_PUBLIC_IP>`

Wait for propagation (usually minutes, sometimes up to 24h).

## 4. Pull Code and Configure Environment

```bash
cd /var/www
sudo mkdir -p servasetu
sudo chown -R $USER:$USER /var/www/servasetu
cd /var/www/servasetu
git clone <YOUR_REPO_URL> .
```

Create frontend env (`/var/www/servasetu/.env.local`):

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
NEXT_PUBLIC_API_URL=https://api.servasetu.com/api
```

Create backend env (`/var/www/servasetu/backend/.env`):

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

## 5. Build and Run with PM2

### Frontend

```bash
cd /var/www/servasetu
npm install
npm run build
pm2 start npm --name servasetu-frontend -- start
```

### Backend

```bash
cd /var/www/servasetu/backend
npm install
npm run build
pm2 start dist/server.js --name servasetu-backend
```

Persist PM2 after reboot:

```bash
pm2 save
pm2 startup
```

Run the command PM2 prints after `pm2 startup`.

## 6. Nginx Reverse Proxy

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/servasetu
```

Paste:

```nginx
server {
  listen 80;
  server_name servasetu.com www.servasetu.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}

server {
  listen 80;
  server_name api.servasetu.com;

  location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/servasetu /etc/nginx/sites-enabled/servasetu
sudo nginx -t
sudo systemctl restart nginx
```

## 7. Enable SSL (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d servasetu.com -d www.servasetu.com -d api.servasetu.com
```

Choose redirect to HTTPS when prompted.

## 8. Verification Commands

```bash
curl -I https://servasetu.com
curl -I https://www.servasetu.com
curl https://api.servasetu.com/health
pm2 status
pm2 logs servasetu-frontend --lines 100
pm2 logs servasetu-backend --lines 100
```

Expected:
- Frontend responses are HTTP 200 or 301/308 to HTTPS
- Health endpoint returns JSON success
- PM2 shows both processes online

## 9. Deployment Updates (Future)

For every new release:

```bash
cd /var/www/servasetu
git pull
npm install
npm run build
pm2 restart servasetu-frontend

cd /var/www/servasetu/backend
npm install
npm run build
pm2 restart servasetu-backend
```

## 10. Important Known Gap Before Payments Go Live

Current frontend API routes are placeholders:
- `app/api/create-order/route.ts`
- `app/api/verify-payment/route.ts`

Before accepting real payments, implement real Razorpay order creation and signature verification logic (or switch frontend to backend payment endpoints directly).
