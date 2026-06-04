# Employee Management System (EMS)

A comprehensive full-stack Employee Management System for organizations to manage employees, track attendance, handle leave requests, and generate payslips. The system supports both admin and employee roles with authentication and email notifications.

## Features

### Core Features
- **Authentication & Authorization**
  - Secure login with JWT tokens
  - Role-based access control (Admin, Employee)
  - Session management with 7-day token expiration
  - Password change functionality

- **Employee Management** (Admin Only)
  - Create, read, update, and delete employee records
  - Manage employee details (name, email, phone, position, department)
  - Track employment status (Active/Inactive)
  - Manage salary components (basic salary, allowances, deductions)

- **Attendance Tracking**
  - Check-in and check-out functionality
  - Automatic working hours calculation
  - Day type categorization (Full Day, Three Quarter Day, Half Day, Short Day)
  - Attendance status tracking (Present, Absent, Late)
  - Attendance history and summary statistics

- **Leave Management**
  - Submit leave applications (Sick, Casual, Annual)
  - Specify leave type, date range, and reason
  - View leave history with status tracking
  - Admin approval/rejection workflow
  - Email notifications for leave status updates

- **Payslip Generation** (Admin Only)
  - Create payslips with salary breakdowns
  - Calculate net salary (Basic + Allowances - Deductions)
  - View payslip history
  - Print and download payslips as documents

- **Profile Management**
  - View personal profile information
  - Update profile details (name, phone, bio, department)
  - Change password securely
  - View department assignment

- **Dashboards**
  - Admin Dashboard: Organization-wide overview
  - Employee Dashboard: Personal work information
  - Role-based dashboard views

- **Email Notifications**
  - Automated check-out reminders after 9 hours
  - Leave approval/rejection notifications
  - Background job processing via Inngest

## Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **UI Components:** Lucide React (icons), React Hot Toast (notifications)
- **Utilities:** date-fns (date manipulation)

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MongoDB with Mongoose 9
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer
- **Background Jobs:** Inngest
- **File Upload:** Multer
- **CORS:** Express CORS
- **Environment:** dotenv

### Deployment
- Both frontend and backend configured for Vercel deployment

## Project Structure

```
Employee Management System/
├── backend/
│   ├── config/              # Database and email configuration
│   ├── constants/           # Department definitions
│   ├── controllers/         # Route handlers (auth, employees, attendance, etc.)
│   ├── inngest/            # Background job definitions
│   ├── middleware/         # Authentication middleware (protect, protectAdmin)
│   ├── models/             # Mongoose schemas (User, Employee, Attendance, etc.)
│   ├── routes/             # API route definitions
│   ├── server.js           # Express app setup and startup
│   ├── seed.js             # Database initialization script
│   └── package.json        # Backend dependencies
│
└── client/
    ├── public/             # Static assets
    ├── src/
    │   ├── api/           # Axios configuration and API calls
    │   ├── assets/        # Images, styles, templates
    │   ├── components/    # Reusable React components
    │   │   ├── attendance/
    │   │   ├── leave/
    │   │   └── payslip/
    │   ├── context/       # React Context for authentication state
    │   ├── pages/         # Page components (Dashboard, Employees, etc.)
    │   ├── App.jsx        # Main app routing
    │   └── main.jsx       # React entry point
    └── package.json       # Frontend dependencies
```

## Database Schema

**User**
- email (unique)
- password (hashed)
- role (ADMIN or EMPLOYEE)

**Employee**
- userId (reference to User)
- firstName, lastName
- email, phone
- position, department
- basicSalary, allowances, deductions
- employmentStatus (ACTIVE/INACTIVE)
- joinDate, bio

**Attendance**
- employeeId, date
- checkIn, checkOut (timestamps)
- status (PRESENT/ABSENT/LATE)
- workingHours, dayType

**LeaveApplication**
- employeeId
- type (SICK/CASUAL/ANNUAL)
- startDate, endDate
- reason
- status (PENDING/APPROVED/REJECTED)

**Payslip**
- employeeId, month, year
- basicSalary, allowances, deductions
- netSalary

## API Endpoints

### Authentication
- `POST /api/auth/login` — User login
- `GET /api/auth/session` — Get current session
- `POST /api/auth/change-password` — Update password

### Employees (Admin Only)
- `GET /api/employees` — List all employees
- `POST /api/employees` — Create employee
- `PUT /api/employees/:id` — Update employee
- `DELETE /api/employees/:id` — Delete employee

### Attendance
- `POST /api/attendance` — Clock in/out
- `GET /api/attendance` — Get attendance history

### Leave
- `POST /api/leave` — Apply for leave
- `GET /api/leave` — Get leave applications
- `PATCH /api/leave/:id` — Approve/reject leave (Admin)

### Payslips (Admin Creates)
- `POST /api/payslips` — Generate payslip
- `GET /api/payslips` — List payslips
- `GET /api/payslips/:id` — Get payslip details

### Profile
- `GET /api/profile` — Get user profile
- `POST /api/profile` — Update profile

### Dashboard
- `GET /api/dashboard` — Get dashboard data

## Usage

### Admin Workflows
1. **Login** → Admin Portal
2. **Create Employees** → Manage Employee Records
3. **Generate Payslips** → Monthly salary processing
4. **Manage Leave Requests** → Approve/Reject applications
5. **View Dashboard** → Organization metrics

### Employee Workflows
1. **Login** → Employee Portal
2. **Check In/Out** → Track attendance
3. **Apply for Leave** → Submit leave request
4. **View Profile** → Personal information
5. **Download Payslips** → Access salary documents

## Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)
- Environment variables configured

### Backend Setup
```bash
cd backend
npm install
npm run seed          # Initialize admin user
npm run server        # Start with nodemon (dev)
npm start             # Start production server
```

### Frontend Setup
```bash
cd client
npm install
npm run dev           # Start Vite dev server
npm run build         # Build for production
npm run preview       # Preview production build
```

### Environment Variables
Backend requires:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret key for JWT signing
- `ADMIN_EMAIL` — Initial admin email for seeding
- `PORT` — Server port (default: 4000)
- Email configuration for Nodemailer

## Notable Implementation Details

- **Background Jobs:** Inngest handles automated check-out reminders after 9 hours of work
- **Email Notifications:** Nodemailer integration for leave and attendance alerts
- **Protected Routes:** JWT middleware (`protect`, `protectAdmin`) secures all endpoints
- **Database Seeding:** `npm run seed` creates initial admin account
- **Vercel Deployment:** Both frontend and backend configured for serverless deployment

## Author Notes

This project demonstrates:
- Full-stack MERN-like architecture with MongoDB
- Role-based access control and authentication
- Complex business workflows (attendance, leave, payroll)
- Background job processing with Inngest
- Email integration with Nodemailer
- Responsive UI with Tailwind CSS and React components

---

**Live Demo:** https://hirearchy-ems.vercel.app/