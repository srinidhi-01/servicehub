# ServiceHub 🔧

A MakeMyTrip-style on-demand home services booking platform built with **React + Vite + Supabase + Tailwind CSS**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

> **Note:** Without Supabase, the app still works in **Demo Mode** using localStorage!

### 3. Run Locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Supabase Setup

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql` and run it
4. Go to **Settings → API** and copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

## 📁 Project Structure

```
servicehub/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky premium navbar
│   │   ├── Footer.jsx          # Full footer
│   │   ├── BookingCard.jsx     # Reusable booking card
│   │   └── StatusBadge.jsx     # Status pill badge
│   ├── pages/
│   │   ├── LandingPage.jsx     # MakeMyTrip-style homepage
│   │   ├── CustomerLogin.jsx   # Phone OTP login
│   │   ├── CustomerDashboard.jsx # Book & track services
│   │   ├── VendorLogin.jsx     # Vendor email/password login
│   │   └── VendorDashboard.jsx # Accept & deliver bookings
│   ├── supabase/
│   │   └── client.js           # Supabase client config
│   ├── App.jsx                 # Router setup
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind + custom styles
├── supabase-schema.sql         # DB schema to run in Supabase
├── vercel.json                 # Vercel SPA routing
├── .env.example                # Environment variables template
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🔐 Demo Credentials

### Customer Login
- Any 10-digit phone number
- OTP: **`123456`**

### Vendor Login
- Email: **`vendor@servicehub.com`**
- Password: **`vendor123`**

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (MakeMyTrip-style) |
| `/login` | Customer phone OTP login |
| `/dashboard` | Customer booking dashboard |
| `/vendor/login` | Vendor login |
| `/vendor/dashboard` | Vendor booking management |

---

## 🌐 Deploy to Vercel

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: GitHub Import
1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo
4. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**

---

## ✅ Features

- 📱 Customer phone OTP login (demo: 123456)
- 🔒 Vendor email/password auth
- 📅 Service booking with date, time, address, notes
- 📊 Real-time booking status updates
- ✅ Vendor can accept and mark deliveries
- 💾 localStorage fallback when Supabase not configured
- 🎨 Premium MakeMyTrip-inspired UI
- 📱 Fully responsive mobile + desktop

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router DOM
- **Styling:** Tailwind CSS, Custom CSS
- **Backend:** Supabase (PostgreSQL + Realtime)
- **Icons:** Lucide React
- **Fonts:** Sora + DM Sans (Google Fonts)
- **Hosting:** Vercel-ready
