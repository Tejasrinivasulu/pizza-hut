<div align="center">

# 🍕 Pizza Fiesta

### Full-Stack Online Food Ordering Platform

<p>
Browse Menu • Customize Orders • Pay Online • Track Delivery • Manage Restaurant
</p>

![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

<br>

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=24&pause=1000&color=fac564&center=true&vCenter=true&width=900&lines=Order+Delicious+Pizzas+Online;Browse+50%2B+Menu+Items;Secure+Checkout+with+Stripe;Real-Time+Order+Tracking;Full+Admin+Dashboard+Included">

</div>

---

# 📖 About Pizza Fiesta

Pizza Fiesta is a modern full-stack food ordering web application that lets customers explore menus, customize items, place orders, and track deliveries — while giving restaurant admins full control over menu items, categories, users, orders, and reports. Built with Next.js 14, MongoDB, and Tailwind CSS, it delivers a fast, responsive, and production-ready ordering experience.

---

# ✨ Key Features

## 🏠 Public & Customer Experience

| Module | Description |
|--------|-------------|
| 🏠 Home | Hero banner, best sellers, categories, reviews, and offers |
| 🍕 Menu | Browse items by category with search and add-to-cart |
| 🛒 Cart | Customize sizes & extras, review totals, and checkout |
| 💳 Payment | Online payment via Stripe or Cash on Delivery |
| 📦 Orders | View order history, status updates, and invoice download |
| 👤 Profile | Manage personal info, address, and account settings |
| 📞 Contact | Contact form with EmailJS integration |
| ❓ Help Center | FAQs and customer support queries |

---

## 🔐 Authentication

| Module | Description |
|--------|-------------|
| 🔑 Login / Register | Email & password authentication with NextAuth |
| 🌐 Google OAuth | Sign in with Google (optional, via env config) |
| 🔒 Protected Routes | Role-based access for customers and admins |

---

## 👨‍💼 Admin Dashboard

| Module | Description |
|--------|-------------|
| 📊 Dashboard | Revenue stats, recent orders, and quick overview |
| 🏷️ Categories | Create, edit, and delete food categories |
| 🍽️ Menu Items | Full CRUD with image upload via Cloudinary |
| 📋 Orders | Accept, prepare, deliver, or cancel orders |
| 👥 Users | View and manage registered customers |
| 📈 Reports | Download sales and revenue PDF reports |
| 💬 Help Desk | Reply to customer contact messages |

---

# 🛠 Technology Stack

<div align="center">

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Frontend | React 18 |
| Language | JavaScript (JSX) |
| Styling | Tailwind CSS + NextUI + Preline |
| Database | MongoDB + Mongoose |
| Authentication | NextAuth.js |
| Payments | Stripe |
| Image Storage | Cloudinary |
| Email | EmailJS |
| Maps | Google Maps API |
| PDF | jsPDF |
| State | React Context API |
| Notifications | React Hot Toast |
| Animation | Framer Motion |
| Deploy | Netlify / Vercel |

</div>
---

# 📂 Project Structure

```bash
foodpizza/
│
├── public/
│   ├── assets/menu/          # Menu item images
│   ├── home.png
│   ├── menu.png
│   └── admin-dashboard.png
│
├── scripts/
│   └── seed.mjs              # Database seeding script
│
├── src/
│   ├── app/
│   │   ├── api/              # REST API routes
│   │   │   ├── auth/
│   │   │   ├── categories/
│   │   │   ├── checkout/
│   │   │   ├── menu-items/
│   │   │   ├── orders/
│   │   │   ├── profile/
│   │   │   ├── register/
│   │   │   ├── upload/
│   │   │   ├── users/
│   │   │   └── webhook/
│   │   │
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── contact/
│   │   ├── help-center/
│   │   ├── login/
│   │   ├── menu/
│   │   ├── menu-items/
│   │   ├── orders/
│   │   ├── payment/
│   │   ├── profile/
│   │   ├── register/
│   │   ├── reports/
│   │   ├── services/
│   │   ├── users/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── features/
│   │   ├── hooks/
│   │   └── layout/
│   │
│   ├── icons/
│   ├── libs/
│   ├── models/
│   └── util/
│
├── .env.example
├── jsconfig.json
├── netlify.toml
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Tejasrinivasulu/pizza-hut.git
```

## Open Project

```bash
cd pizza-hut
```

## Install Dependencies

```bash
npm install
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `SECRET` | NextAuth secret key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret (optional) |
| `STRIPE_SECRET_KEY` | Stripe secret key (optional) |
| `STRIPE_SIGNING_SECRET` | Stripe webhook secret (optional) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (optional) |
| `CLOUDINARY_API_KEY` | Cloudinary API key (optional) |
| `CLOUDINARY_SECRECT` | Cloudinary API secret (optional) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key (optional) |

## Seed Database

```bash
npm run seed
```

## Run Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:3000
```

---

# 🔑 Demo Credentials

```text
Admin:
  Email:    admin@pizzafiesta.com
  Password: admin12345

Customer:
  Email:    customer@test.com
  Password: user12345
```

---

# 🌐 Deployment

## Netlify

```bash
npm run build
```

Connect your GitHub repo or upload the build output.

### Netlify Deploy

https://app.netlify.com

Build command: `npm run build`  
Publish directory: `.next`  
Node version: `20`

`netlify.toml` is already included with the Next.js plugin.

---

## Vercel

```bash
npm run build
vercel --prod
```

### Vercel Deploy

https://vercel.com

Framework: Next.js  
Output: `.next`

Add all environment variables from `.env.example` in the Vercel dashboard.

Automatic deployment supported through GitHub.

---

<div align="center">

# 🍕 Pizza Fiesta

### Full-Stack Food Ordering Platform

### Fast • Delicious • Secure • Admin-Ready

Made with ❤️ Pizza Fiesta

⭐ Star this Repository if you like the project ⭐

</div>
