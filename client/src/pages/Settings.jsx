import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { LockIcon, ShieldCheckIcon, UserCircleIcon } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
import api from "../api/axios";
import toast from "react-hot-toast";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async()=> {
    try {
      const res = await api.get("/profile");
      const profile = res.data;
      if(profile) setProfile(profile);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    } finally{
      setLoading(false);
    }
  }
  useEffect(() =>{
    fetchProfile()
  },[])

  if(loading) return <Loading/>
  return (
    <main className="animate-fade-in space-y-6">
      <header>
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">
          Manage your profile information and account security.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />

        <aside className="space-y-4">
          <section className="card p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-(--app-primary-soft) text-(--app-primary)">
                <UserCircleIcon className="size-5" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-(--app-text)">Account Type</h2>
                <p className="mt-1 text-sm text-(--app-text-muted)">
                  {profile?.role || profile?.user?.role || "Employee"}
                </p>
              </div>
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-start gap-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-(--app-success-soft) text-(--app-success)">
                <ShieldCheckIcon className="size-5" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-(--app-text)">Security</h2>
                <p className="mt-1 text-sm text-(--app-text-muted)">
                  Keep your password updated to protect your account.
                </p>

                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="btn-secondary mt-4 inline-flex items-center gap-2"
                >
                  <LockIcon className="size-4" />
                  Change Password
                </button>
              </div>
            </div>
          </section>
        </aside>
      </section>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </main>
  );
}

export default Settings