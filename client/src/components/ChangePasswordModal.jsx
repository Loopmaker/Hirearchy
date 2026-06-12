import { Loader2Icon, LockIcon, X } from 'lucide-react';
import { useState } from 'react'
import api from '../api/axios';

const ChangePasswordModal = ({open, onClose}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({type: "", text: ""});
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true);
    setMessage({ type: "", text: "" });
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    try {
      const { data } = await api.post("/auth/change-password", {currentPassword, newPassword});
      if(!data.success) throw new Error(data.error || "Failed")
        setMessage({type: "success", text: "Password updated successfully"});
        e.target.reset();
    } catch (error) {
      setMessage({type: "error", text: error.message})
    }finally{
      setLoading(false);
    }
  }
  if(!open) return null;
  
  return (
    <main onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <section
        className="relative w-full max-w-md rounded-lg bg-(--app-surface) shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between border-b border-(--app-border)] p-5">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-(--app-text)">
              <LockIcon className="size-5 text-(--app-primary)" />
              Change Password
            </h2>
            <p className="mt-1 text-sm text-(--app-text-muted)">
              Enter your current password and choose a new one.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-2 text-(--app-text-muted) transition-colors hover:bg-(--app-surface-muted) hover:text-(--app-text)"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </header>
        <form className='p-6 space-y-5' onSubmit={handleSubmit}>
          {message.text && (
            <div className={`flex items-start gap-3 rounded-lg border p-4 text-sm ${
              message.type === "success"
                ? "border-(--app-success) bg-(--app-success-soft) text-(--app-success)"
                : "border-(--app-danger) bg-(--app-danger-soft) text-(--app-danger)"
            }`}>
              <span>{message.text}</span>
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-medium text-(--app-text)">
              Current Password
            </label>
            <input type='password' name='currentPassword' required/>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-(--app-text)">
              New Password
            </label>
            <input type='password' name='newPassword' required/>
          </div>
          <footer className='flex gap-3 pt-2'>
            <button onClick={onClose} type='button' className='btn-secondary flex-1 cursor-pointer'>Cancel</button>
            <button disabled={loading} type='submit' className='btn-primary flex-1 flex justify-center items-center gap-2 cursor-pointer'>
             {loading && <Loader2Icon className='w-4 h-4 animate-spin'/>}
             Update Password
            </button>
          </footer>
        </form>
      </section>
    </main>
  )
}

export default ChangePasswordModal