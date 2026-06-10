import { useState } from 'react'
import { 
  CheckCircle2Icon,
  Clock3Icon,
  Loader2Icon,
  LogInIcon,
  LogOutIcon } from 'lucide-react'
import api from '../../api/axios';
import toast from 'react-hot-toast';

const CheckInButton = ({todayRecord, onAction}) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
  setLoading(true);

  try {
    await api.post("/attendance");
    onAction();
  } catch (error) {
    toast.error(error?.response?.data?.error || error?.message);
  } finally {
    setLoading(false);
  }
};

const isCheckedIn = !!todayRecord?.checkIn;
const isCompleted = !!todayRecord?.checkOut;

const checkInTime = todayRecord?.checkIn
  ? new Date(todayRecord.checkIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  : "Not started";

const checkOutTime = todayRecord?.checkOut
  ? new Date(todayRecord.checkOut).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  : "Pending";

if (isCompleted) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-(--app-success-soft) text-(--app-success)">
            <CheckCircle2Icon className="size-6" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-(--app-text)">Workday Completed</h2>
            <p className="mt-1 text-sm text-(--app-text-muted)">
              Checked in at {checkInTime}, checked out at {checkOutTime}.
            </p>
          </div>
        </div>

        <span className="badge badge-success">Completed</span>
      </div>
    </section>
  );
}

return (
  <section className="card p-5 sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-lg bg-(--app-primary-soft) text-(--app-primary)">
          <Clock3Icon className="size-6" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-(--app-text)">
            {isCheckedIn ? "You are checked in" : "Ready to start your day"}
          </h2>
          <p className="mt-1 text-sm text-(--app-text-muted)">
            {isCheckedIn ? `Checked in at ${checkInTime}.` : "Clock in when your shift begins."}
          </p>
        </div>
      </div>

      <button
        onClick={handleAttendance}
        disabled={loading}
        className="btn-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : isCheckedIn ? (
          <LogOutIcon className="size-4" />
        ) : (
          <LogInIcon className="size-4" />
        )}

        {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
      </button>
    </div>
  </section>
);
}

export default CheckInButton