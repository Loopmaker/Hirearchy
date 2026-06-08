import { ArrowRightIcon, CalendarCheckIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EmployeeDashboard = ({data}) => {
  const emp = data.employee;

  const cards = [
  {
    icon: CalendarCheckIcon,
    value: data.currentMonthAttendance,
    title: "Days Present",
    subtitle: "This month",
    tone: "bg-[var(--app-success-soft)] text-[var(--app-success)]",
  },
  {
    icon: FileTextIcon,
    value: data.pendingLeaves,
    title: "Pending Leaves",
    subtitle: "Awaiting approval",
    tone: "bg-[var(--app-warning-soft)] text-[var(--app-warning)]",
  },
  {
    icon: DollarSignIcon,
    value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}` : "N/A",
    title: "Latest Payslip",
    subtitle: "Most recent payout",
    tone: "bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
  },
];

  return (
  <main className="animate-fade-in space-y-6">
    <header>
      <h1 className="page-title">Welcome, {emp?.firstName}</h1>
      <p className="page-subtitle">
        {emp?.position} · {emp?.department || "Department not specified"}
      </p>
    </header>

    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="card card-hover p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-(--app-text-muted)">{card.title}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-(--app-text)">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-(--app-text-soft)">{card.subtitle}</p>
            </div>

            <div className={`flex size-10 items-center justify-center rounded-lg ${card.tone}`}>
              <card.icon className="size-5" />
            </div>
          </div>
        </article>
      ))}
    </section>

    <section className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base font-semibold text-(--app-text)">Today’s workday</h2>
        <p className="mt-1 text-sm text-(--app-text-muted)">
          Mark attendance or submit a leave request from here.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/attendance" className="btn-primary inline-flex items-center justify-center gap-2">
          Mark Attendance <ArrowRightIcon className="size-4" />
        </Link>

        <Link to="/leave" className="btn-secondary inline-flex items-center justify-center">
          Apply for Leave
        </Link>
      </div>
    </section>
  </main>
);
}
export default EmployeeDashboard