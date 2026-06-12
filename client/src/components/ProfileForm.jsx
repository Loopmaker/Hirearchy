import { AlertCircleIcon, CheckCircle2Icon, Loader2, Save, User } from "lucide-react";
import { useState } from "react"
import api from "../api/axios";

const ProfileForm = ({initialData, onSuccess}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const formData = new FormData(e.currentTarget);
    try {
      await api.post("/profile", formData);
      setMessage("Profile updated successfully")
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally{
      setLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6">
      <header className="mb-6 border-b border-(--app-border) pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-(--app-primary-soft) text-(--app-primary)">
            <User className="size-5" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-(--app-text)">Public Profile</h2>
            <p className="mt-1 text-sm text-(--app-text-muted)">
              Review your account details and update your bio.
            </p>
          </div>
        </div>
      </header>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-(--app-danger)bg-(--app-danger-soft) p-4 text-sm text-(--app-danger)">
          <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-(--app-success) bg-(--app-success-soft) p-4 text-sm text-(--app-success)">
          <CheckCircle2Icon className="mt-0.5 size-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-(--app-text)">Name</label>
            <input disabled value={`${initialData.firstName} ${initialData.lastName}`} className="cursor-not-allowed bg-(--app-surface-muted) text-(--app-text-soft)"/>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-(--app-text)">Email</label>
            <input disabled value={initialData.email} className="cursor-not-allowed bg-(--app-surface-muted) text-(--app-text-soft)"/>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-(--app-text)">Position</label>
            <input disabled value={initialData.position} className="cursor-not-allowed bg-(--app-surface-muted) text-(--app-text-soft)"/>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-(--app-text)">Bio</label>
          <textarea disabled={initialData.isDeleted} name="bio" defaultValue={initialData.bio || ''} placeholder="Write a brief bio..." className={`resize-none ${initialData.isDeleted ? "bg-slate-50 text-slate-400 cursor-not-allowed" : ""}`}/>
          <p className="mt-1.5 text-xs text-(--app-text-muted)">
            This appears on your profile.
          </p>
        </div>
        {initialData.isDeleted ? (
          <div className="pt-2">
            <div className="rounded-lg border border-(--app-danger) bg-(--app-danger-soft) p-4">
              <p className="font-semibold text-(--app-danger)">Account Deactivated</p>
              <p className="mt-1 text-sm text-(--app-danger)">
                You can no longer update your profile.
              </p>
            </div>
          </div>
        ): (
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 justify-center w-full sm:w-auto">
              {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/> }
              Save Changes
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default ProfileForm