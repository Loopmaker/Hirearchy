import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2Icon,
  Calendar1Icon,
  DollarSign,
  FileTextIcon,
  LayoutGridIcon,
  Loader2,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      if (data.firstName)
        setUserName(`${data.firstName} ${data.lastName || ""}`.trim());
    });
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = user?.role;
  const roleLabel = role === "ADMIN" ? "Administrator" : "Employee";
  const initials = userName
    ? userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : role === "ADMIN"
      ? "AD"
      : "EM";
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: Calendar1Icon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSign },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const sidebarContent = (
    <aside className="flex flex-col h-full">
      {/* Header */}
      <header className="px-4 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
              <Building2Icon className="size-5 text-white" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Hirearchy
              </p>
              <p className="truncate text-xs text-slate-400">
                Employee Management
              </p>
            </div>
          </div>

          <button
            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <XIcon size={18} />
          </button>
        </div>
      </header>

      {/* User Profile */}
      {userName && (
        <section className="mx-3 rounded-lg border border-white/10 bg-white/4 p-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-xs font-semibold text-slate-200">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-100">
                {userName || "Account"}
              </p>
              <p className="truncate text-xs text-slate-400">{roleLabel}</p>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Section label */}
        <header className="px-5 pt-5 pb-2">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Navigation
          </h2>
        </header>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex-1 px-3 space-y-0.5 overflow-y-auto"
        >
          {loading ? (
            <div className="px-3 py-3 flex items-center gap-2 text-slate-500">
              <Loader2 className="animate-spin w-4 h-4" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : (
            <ul>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white text-slate-950 shadow-sm"
                          : "text-slate-400 hover:bg-white/10 hover:text-slate-100"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon
                        className={`size-4.25 shrink-0 ${
                          isActive
                            ? "text-(--app-primary)"
                            : "text-slate-500 group-hover:text-slate-300"
                        }`}
                      />

                      <span className="flex-1">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </section>

      {/* Logout */}
      <footer className="p-3 border-t border-white/6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
        >
          <LogOutIcon className="w-4.25 h-4.25" />
          <span>Logout</span>
        </button>
      </footer>
    </aside>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-(--app-border) bg-(--app-surface) px-4 shadow-sm lg:hidden">
        <button
          className="rounded-md p-2 text-(--app-text) transition-colors hover:bg-(--app-surface-muted)"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <MenuIcon size={20} />
        </button>

        <div className="flex items-center gap-2">
          <Building2Icon className="size-5 text-(--app-primary)" />
          <span className="text-sm font-semibold text-(--app-text)">
            Hirearchy
          </span>
        </div>

        <div className="size-9" />
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden h-full w-65 shrink-0 flex-col border-r border-white/10 bg-slate-950 text-white lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white   transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
