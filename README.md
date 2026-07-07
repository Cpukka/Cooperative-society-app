# Cooperative Society Management System

## Complete README.md Template

```markdown
# 🏦 CooperativePro - Cooperative Society Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8.0-blue?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-5.0.0--beta-000?style=flat-square)](https://next-auth.js.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A modern, full-featured cooperative society management platform built with Next.js, Prisma, and NextAuth.js.

## ✨ Features

### 👥 Member Management
- Complete member profiles with personal and financial information
- Member status tracking (Active, Inactive, Suspended)
- Member directory with search and filter capabilities
- Member ID generation

### 💰 Contributions & Savings
- Track member contributions and savings
- Multiple contribution types (Monthly, Special, Loan Repayment)
- Contribution history and reporting
- Real-time balance updates

### 🏦 Loan Management
- Loan application workflow (Pending → Approved → Active → Completed)
- Multiple loan types (Emergency, Education, Business, Housing)
- Interest rate calculation
- Loan repayment tracking
- Defaulted loan monitoring

### 📅 Meetings & Attendance
- Meeting scheduling and management
- Attendance tracking
- Meeting minutes and agenda management
- Member participation tracking

### 📊 Reports & Analytics
- Generate comprehensive reports
- Financial performance dashboard
- Member statistics and insights
- Export reports (PDF, Excel)

### 🔐 Security & Authentication
- Role-based access control (Super Admin, Admin, Finance Officer, Loan Officer, Member)
- Secure authentication with NextAuth.js
- Session management
- Password hashing with bcrypt

### 🎨 User Experience
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- ⚡ Real-time updates
- 🎯 Intuitive navigation

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/cooperative-society-app.git
cd cooperative-society-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cooperative_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Set up the database

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed the database
npm run prisma:seed
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔑 Default Login Credentials

After seeding the database, you can use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@cooperative.org | Admin@123 |
| Finance Officer | finance@cooperative.org | Finance@123 |
| Member | john.doe@cooperative.org | Member@123 |
| Member | jane.smith@cooperative.org | Member@123 |

## 📁 Project Structure

```
cooperative-society-app/
├── app/
│   ├── (dashboard)/          # Dashboard routes
│   │   ├── dashboard/       # Dashboard page
│   │   ├── members/         # Members page
│   │   ├── loans/           # Loans page
│   │   ├── contributions/   # Contributions page
│   │   └── settings/        # Settings page
│   ├── auth/                # Authentication routes
│   │   ├── signin/          # Sign in page
│   │   └── register/        # Register page
│   ├── api/                 # API routes
│   │   └── auth/            # NextAuth API
│   ├── components/          # Reusable components
│   │   ├── ui/              # UI components
│   │   └── layout/          # Layout components
│   └── lib/                 # Utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed script
├── public/                  # Static assets
└── package.json
```

## 🎨 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Members Management
![Members](screenshots/members.png)

### Loan Management
![Loans](screenshots/loans.png)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourusername](https://twitter.com/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- All open-source contributors

## 📞 Support

For support, email cpukka2@gmail.com or open an issue in the repository.

---

Made with ❤️ for cooperative societies worldwide.
```

## GitHub Description with Emojis

```
🏦 CooperativePro - A modern cooperative society management platform built with Next.js. Features include member management, contribution tracking, loan processing, meeting scheduling, and comprehensive reporting with dark mode support.
```

## Quick Description for Social Media

```
A full-stack cooperative society management system with role-based authentication, real-time dashboards, and complete CRUD operations for members, loans, and contributions.
```

Choose the option that best fits your repository! I'd recommend using **Option 1** for the short description and adding the **detailed README** for comprehensive documentation.


A comprehensive management platform for thrift societies and unions, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Member Management
- ✅ Register and manage members
- ✅ Track member information and status
- ✅ View member history and activities

### Savings Management
- ✅ Record savings deposits and withdrawals
- ✅ Track individual and society savings
- ✅ Generate savings statements

### Loan Management
- ✅ Apply for loans online
- ✅ Admin approval workflow
- ✅ Track loan repayments
- ✅ Calculate interest and schedules

### Admin Features
- ✅ Dashboard with analytics
- ✅ Approval management
- ✅ User management
- ✅ System configuration

### Reporting
- ✅ Generate PDF statements
- ✅ Export data to CSV/Excel
- ✅ Financial reports

### Mobile Friendly
- ✅ Responsive design
- ✅ Mobile-optimized navigation
- ✅ Touch-friendly interface

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma
- **Authentication:** NextAuth.js
- **Charts:** Recharts
- **PDF Generation:** jsPDF
- **Deployment:** Docker

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/coop-society-app.git
cd coop-society-app
