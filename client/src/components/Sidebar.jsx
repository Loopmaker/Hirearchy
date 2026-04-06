import  { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets';
import { Calendar1Icon, ChevronRightIcon, DollarSign, FileTextIcon, LayoutGridIcon, LogOutIcon, MenuIcon, SettingsIcon, UserIcon, XIcon } from 'lucide-react'
const Sidebar = () => {
  const { pathname } = useLocation();
  const [ userName, setUserName ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() =>{
    setUserName(dummyProfileData.firstName + ' ' + dummyProfileData.lastName);
  }, []);

  useEffect(() =>{
      setMobileOpen(false);
  }, [pathname]);

  const role = 'ADMIN' || "EMPLOYEE"; // Replace with actual role from auth context or state
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGridIcon },
    role === "ADMIN" ?
    { name: 'Employees', href: '/employees', icon: UserIcon } :
    { name: 'Attendance', href: '/attendance', icon: Calendar1Icon },
    { name: 'Leave', href: '/leave', icon: FileTextIcon },
    { name: 'Payslips', href: '/payslips', icon: DollarSign },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const handleLogout = () => {
    window.location.href = '/login';

  };

  const sidebarContent = (
    <aside className="flex flex-col h-full">
      {/* Header */}
      <header className='px-5 pt-6 pb-5 border-b border-white/6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <UserIcon className='text-white size-7'/>
            <div>
              <p className='font-semibold text-[13px] text-white tracking-wide'>Hirearchy</p>
              <p className='text-[11px] text-slate-500 font-medium'>Employee Management System</p>
            </div>
          </div>
          {/* Close Button on mobile */}
          <button className='lg:hidden text-slate-400 hover:text-white p-1' onClick={() => setMobileOpen(false)}>
            <XIcon size={20}/>
          </button>
        </div>
      </header>

      {/* User Profile */}
      {userName && (
        <section className='mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0'>
              <span className='text-slate-400 text-xs font-semibold'>
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className='min-w-0'>
              <p className='text-[13px] font-medium text-slate-200 truncate'>{userName}</p>
              <p className='text-[11px] text-slate-500 truncate'>{role === "ADMIN" ? "Administrator" : "Employee"}</p>
            </div>
          </div>
        </section>
      )}

       {/* Navigation Section */}
    <section className="flex-1 flex flex-col overflow-hidden">
      
      {/* Section label */}
      <header className='px-5 pt-5 pb-2'>
        <h2 className='text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500'>
          Navigation
        </h2>
      </header>

      {/* Navigation */}
      <nav
        aria-label="Main navigation"
        className='flex-1 px-3 space-y-0.5 overflow-y-auto'
      >
        <ul>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center gap-3 px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-150 relative ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-slate-500'></div>
                  )}

                  <item.icon
                    className={`w-[17px] h-[17px] shrink-0 ${
                      isActive
                        ? 'text-slate-500'
                        : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  />

                  <span className='flex-1'>{item.name}</span>

                  {isActive && (
                    <ChevronRightIcon className='w-3.5 h-3.5 text-slate-500/50'/>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>

      {/* Logout */}
      <footer className='p-3 border-t border-white/6'>
        <button onClick={handleLogout} className='flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150 cursor-pointer'>
        <LogOutIcon className='w-[17px] h-[17px]'/>
        <span>Logout</span>
        </button>
      </footer>

    </aside>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10' onClick={() => setMobileOpen(true)}>
        <MenuIcon size={20}/>
      </button>

      {mobileOpen && <div className='lg:hidden fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-sm' onClick={() => setMobileOpen(false)}></div>}

      {/* Desktop Sidebar */}
      <aside className='hidden lg:flex flex-col h-full w-[260px] bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4'>
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        {sidebarContent}
      </aside>

    </>
  )
}

export default Sidebar