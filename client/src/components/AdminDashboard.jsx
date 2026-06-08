import { ArrowRightIcon, Building2Icon, CalendarCheckIcon, FileTextIcon, UsersIcon } from 'lucide-react';
import { Link } from "react-router-dom";

const AdminDashboard = ({ data }) => {
  const attendanceRate = data.totalEmployees
  ? Math.round((data.todayAttendance / data.totalEmployees) * 100)
  : 0;

const stats = [
  {
    icon: UsersIcon,
    value: data.totalEmployees,
    label: "Employees",
    description: "Active workforce",
    tone: "bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
  },
  {
    icon: Building2Icon,
    value: data.totalDepartments,
    label: "Departments",
    description: "Operational teams",
    tone: "bg-slate-100 text-slate-700",
  },
  {
    icon: CalendarCheckIcon,
    value: data.todayAttendance,
    label: "Present Today",
    description: `${attendanceRate}% attendance rate`,
    tone: "bg-[var(--app-success-soft)] text-[var(--app-success)]",
  },
  {
    icon: FileTextIcon,
    value: data.pendingLeaves,
    label: "Pending Leaves",
    description: "Awaiting review",
    tone: "bg-[var(--app-warning-soft)] text-[var(--app-warning)]",
  },
];


  return (
  <main className="animate-fade-in space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Today’s workforce activity and admin priorities.
        </p>
      </div>

      <Link to="/employees" className="btn-secondary inline-flex items-center justify-center gap-2">
        View Employees <ArrowRightIcon className="size-4" />
      </Link>
    </header>

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <article key={s.label} className="card card-hover p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-(--app-text-muted)">{s.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-(--app-text)">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-(--app-text-soft)">{s.description}</p>
            </div>

            <div className={`flex size-10 items-center justify-center rounded-lg ${s.tone}`}>
              <s.icon className="size-5" />
            </div>
          </div>
        </article>
      ))}
    </section>
  </main>
);
}

export default AdminDashboard