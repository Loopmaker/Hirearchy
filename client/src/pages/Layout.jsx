import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext"
import Loading from "../components/Loading";
const Layout = () => {
  const {user, loading} = useAuth();
  if(loading) return <Loading/>
  if(!user) return <Navigate to="/login"/>
  return (
    <div className="flex h-screen bg-(--app-bg) text-(--app-text)">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-360 px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout