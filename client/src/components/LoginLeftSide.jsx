import { Building2Icon, Calendar1Icon, DollarSignIcon, FileTextIcon } from "lucide-react"

const features = [
  { icon: Calendar1Icon, label: "Attendance" },
  { icon: FileTextIcon, label: "Leave Management" },
  { icon: DollarSignIcon, label: "Payroll" },
]

const LoginLeftside = () => {
  return (
    <div className="hidden md:flex w-1/2 relative overflow-hidden border-r border-white/5 bg-slate-950">
      {/* Radial glow */}
      <div
        className="absolute -top-32 -right-32 size-112 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--app-primary) 0%, transparent 70%)" }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Bottom fade for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-950 to-transparent" />

      <div className="relative z-10 flex flex-col justify-between w-full h-full p-12 lg:p-20">
        {/* Logo / wordmark */}
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
            <Building2Icon className="size-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">Hirearchy</span>
        </div>

        {/* Main content */}
        <div className="animate-slide-up">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--app-primary) mb-4">
            Workforce Platform
          </p>
          <h1 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight">
            Employee <br /> Management System
          </h1>
          <p className="text-slate-400 text-base lg:text-lg max-w-md leading-relaxed">
            One place to manage attendance, leave, and payroll for your entire organization.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-in">
          {features.map((feature) => (
            <div key={feature.label} className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10 text-(--app-primary)">
                <feature.icon className="size-4" />
              </div>
              <span className="text-sm text-slate-300">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoginLeftside