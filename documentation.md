# 🌟 Star Rich - MLM Binary Income Platform

This is a full-stack binary MLM (Multi-Level Marketing) platform built with **Next.js**, **Tailwind CSS**, **MySQL**, and **Prisma**. Developed as part of my internship at **KumarInfotech**, this platform is designed to manage member onboarding, commissions, and a binary income tree structure.

> ⚠️ Project Deadline: **25th August 2025**

---

## 📦 Tech Stack

| Frontend | Backend | Styling | Database | Other |
|----------|---------|---------|----------|-------|
| Next.js  | Node.js (via Next API Routes) | Tailwind CSS | MySQL | Prisma, Postman |

---

## 🚀 Features

- ✅ User registration with referral system
- ✅ Binary-based commission calculation (Level 1 → Level 20)
- ✅ Member Tree View (Left & Right Leg)
- ✅ Dashboard for admins and users
- ✅ Wallet & payout reports
- ✅ Strict KYC verification before payouts
- ✅ Protected routes and session management
- ✅ Fully responsive UI

---

## 🧠 MLM Commission Logic (Binary-Based)

- Member A adds B and C → earns ₹200 per direct = ₹400
- B adds D & E → A earns ₹100 per person = ₹200 (Level 2)
- This continues till Level 20
- KYC must be verified for payout to be processed

---

## 🛠️ Getting Started

```bash
git clone https://github.com/your-username/star-rich.git
cd star-rich
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

Visit http://localhost:3000 🚀

DATABASE_URL="mysql://user:password@localhost:3306/star-rich"
NEXTAUTH_SECRET="supersecret"

star-rich/
├── app/                  # Next.js 14 App Router
│   ├── layout.js
│   ├── page.js
├── components/           # UI Components (Header, Sidebar, etc)
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── styles/               # Tailwind + global CSS
├── utils/                # Helper functions (MLM logic, etc)



12/08/25: worked on login and register pages and api routes and connecting to database database and tables recreated Blockers: xampp servre and alias

19/08/25: worked on user dashboard,added  cookies, login functionality is connected to prisma,editable profile info in frontend, designed team,kyc,wallet,income ui

20/08/25: implemented nextauth.js, removed jwt. 
Blockers: jwt sessions, nextauth.js sessions, providers in nextauth, routing issues(solved it using lib/auth.js)
21/08/25: user details were not fetching properly, so solved it by adding api route of fetch user details and used it in profile section of user dashboard.


🧪 API Testing
This project uses Postman for testing all backend API routes.
Auth APIs
User creation
Commission distribution
Payout release

✨ Author
Tahreem Inamdar
 Full Stack Developer(intern at Kumarinfotech)

📅 Project Status
✅ In Development
📌 Deadline: August 25, 2025

