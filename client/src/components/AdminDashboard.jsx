import { Building2Icon, CalendarIcon, FileTextIcon, UsersIcon } from 'lucide-react';
import React from 'react'

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UsersIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active Workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Total Departments",
      description: "Active Departments",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      description: "Employees Present Today",
    }, 
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting Approval",
    }
  ];


  return (
    <main className="animate-fade-in">
    <header className="page-header">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        Welcome Back, Admin! Here's a quick overview of your organization's stats.
      </p>
    </header>

    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {stats.map((s) => (
        <article
          key={s.label}
          className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
        >
          <div>
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-300 group-hover:bg-slate-400 transition-colors duration-200" />
            <p className="text-sm font-medium text-slate-700">
              {s.label}
            </p>
            <p className="text-2xl font-bold mt-1 text-slate-900">
              {s.value}
            </p>
          </div>

          <s.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 border border-transparent group-hover:border-slate-300 group-hover:bg-slate-50 transition-all duration-200" />
        </article>
      ))}
    </section>

  </main>
  )
}

export default AdminDashboard