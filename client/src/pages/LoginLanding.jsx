import { Link, Navigate } from "react-router-dom";
import LoginLeftside from "../components/LoginLeftside"
import {ArrowRightIcon, ShieldIcon, UserIcon} from "lucide-react"
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

const LoginLanding = () => {
  const {user, loading} = useAuth();
  if(loading) return <Loading/>
  if(user) return <Navigate to="/" />
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage your organization",
      icon: ShieldIcon
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "Access your employee resources",
      icon: UserIcon
    },
  ];

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
        <LoginLeftside />
        <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">

          <div className="w-full max-w-md animate-fade-in relative z-10">
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">Welcome Back</h2>
              <p className="text-gray-600 mt-2 mb-6">Please select your login portal</p>
            </div>
          
            <div className="space-y-4">
              {portalOptions.map((portal) =>(
                <Link key={portal.to} to={portal.to} className="group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:bg-slate-100 hover:border-slate-400">
                  <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-5">
                    <h3 className="text-lg text-slate-800 group-hover:text-slate-900 mb-1 transition-colors">{portal.title}</h3>
                    <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300"/>
                  </div>
                </Link>
              ))}
            </div>

            <footer className="mt-5 text-center md:text-left text-sm text-slate-400">
              <p>
                &copy; {new Date().getFullYear()} Hirearchy. All rights reserved.
              </p>
            </footer>
            
          </div>
        </section>
    </main>
  )
}

export default LoginLanding