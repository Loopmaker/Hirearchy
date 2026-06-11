import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";
import { useState } from "react"
import api from "../../api/axios";
import toast from "react-hot-toast";

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries())

      try {
        await api.post("/leave", data)
        onSuccess();
        onClose();
      } catch (err) {
        toast.error(err.response?.data?.error || err?.message)
      } finally {
        setLoading(false);
      }
  }

  if(!open) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg rounded-lg bg-(--app-surface) shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-(--app-text)">Apply for Leave</h2>
            <p className="mt-1 text-sm text-(--app-text-muted)">Submit your leave request for approval.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5 cursor-pointer"/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* leave type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <FileText className="w-4 h-4 text-slate-400"/>
                Leave Type
              </label>
              <select name="type" required>
                <option value="SICK">Sick Leave</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="ANNUAL">Annual Leave</option>
              </select>
            </div>

          {/* duration */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <CalendarDays className="w-4 h-4 text-slate-400"/>
                Duration
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-slate-400 mb-1">From</span>
                  <input type="date" name="startDate" required min={minDate}/>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 mb-1">To</span>
                  <input type="date" name="endDate" required min={minDate}/>
                </div>
              </div>
            </div>

          {/* reason */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Reason
              </label>
              <textarea name="reason" required rows={3} className="resize-none" placeholder="Explain why you need this leave..."/>
            </div>

          {/* buttons */}
            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="btn-secondary flex-1 cursor-pointer" type="button">Cancel</button>
              <button className="btn-primary flex-1 flex items-center justify-center gap-2 cursor-pointer" disabled={loading} type="submit">
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}
                {loading ? 'Submitting' : 'Submit'}
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModal