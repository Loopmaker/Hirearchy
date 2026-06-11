import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { CheckCircle2Icon,
  CircleXIcon,
  Clock3Icon,
  PalmtreeIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon } from "lucide-react";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Leave = () => {
  const {user} =  useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  const fetchLeaves = useCallback( async () =>{
    try {
      const res = await api.get("/leave");
      setLeaves(res.data.data || []);
      if(res.data.employee?.isDeleted) setIsDeleted(true);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    }finally{
      setLoading(false);
    }
  },[]);

  useEffect(()=>{
    fetchLeaves()
  },[fetchLeaves]);
 
  if(loading) return <Loading />

  const pendingCount = leaves.filter((l) => l.status === "PENDING").length;
  const approvedCount = leaves.filter((l) => l.status === "APPROVED").length;
  const rejectedCount = leaves.filter((l) => l.status === "REJECTED").length;

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annualCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

  const leaveStats = isAdmin
    ? [
        {
          label: "Pending",
          value: pendingCount,
          icon: Clock3Icon,
          tone: "bg-[var(--app-warning-soft)] text-[var(--app-warning)]",
        },
        {
          label: "Approved",
          value: approvedCount,
          icon: CheckCircle2Icon,
          tone: "bg-[var(--app-success-soft)] text-[var(--app-success)]",
        },
        {
          label: "Rejected",
          value: rejectedCount,
          icon: CircleXIcon,
          tone: "bg-[var(--app-danger-soft)] text-[var(--app-danger)]",
        },
      ]
    : [
        {
          label: "Sick Leave",
          value: sickCount,
          icon: ThermometerIcon,
          tone: "bg-[var(--app-danger-soft)] text-[var(--app-danger)]",
        },
        {
          label: "Casual Leave",
          value: casualCount,
          icon: UmbrellaIcon,
          tone: "bg-[var(--app-primary-soft)] text-[var(--app-primary)]",
        },
        {
          label: "Annual Leave",
          value: annualCount,
          icon: PalmtreeIcon,
          tone: "bg-[var(--app-success-soft)] text-[var(--app-success)]",
        },
      ];

    return (
      <main className="animate-fade-in space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="page-title">Leave Management</h1>
            <p className="page-subtitle">
              {isAdmin ? "Review and manage employee leave requests." : "Track leave requests and approved time off."}
            </p>
          </div>

          {!isAdmin && !isDeleted && (
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <PlusIcon className="size-4" />
              Apply for Leave
            </button>
          )}
        </header>

        {isDeleted && (
          <section className="rounded-lg border border-(--app-danger) bg-(--app-danger-soft) p-5 text-center">
            <p className="text-sm font-medium text-(--app-danger)">
              You can no longer apply for leave because your employee record has been marked as deleted.
            </p>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {leaveStats.map((s) => (
            <article key={s.label} className="card card-hover p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-(--app-text-muted)">{s.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-(--app-text)">
                    {s.value}
                  </p>
                </div>

                <div className={`flex size-10 items-center justify-center rounded-lg ${s.tone}`}>
                  <s.icon className="size-5" />
                </div>
              </div>
            </article>
          ))}
        </section>

        <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />

        <ApplyLeaveModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={fetchLeaves}
        />
      </main>
  );
}

export default Leave