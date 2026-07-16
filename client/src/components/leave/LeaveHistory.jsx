import { Check, ClipboardListIcon, Loader2, X } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import api from "../../api/axios";
import toast from "react-hot-toast";
const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);
  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
    try {
      await api.patch(`/leave/${id}`, { status });
      onUpdate();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setProcessing(null);
    }
  };
  const sortedLeaves = [...leaves].sort((a, b) => {
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;
    return (
      new Date(b.createdAt || b.startDate) -
      new Date(a.createdAt || a.startDate)
    );
  });
  return (
    <section className="card overflow-hidden">
      <header className="flex items-center justify-between border-b border-(--app-border) px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-(--app-text)">
            {isAdmin ? "Leave Requests" : "Leave History"}
          </h2>
          <p className="mt-1 text-sm text-(--app-text-muted)">
            {isAdmin
              ? "Pending requests are shown first."
              : "Your submitted and approved leave requests."}
          </p>
        </div>
      </header>

      {sortedLeaves.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <ClipboardListIcon className="mb-3 size-9text-(--app-text-soft)" />
          <h3 className="text-sm font-semibold text-(--app-text)">
            No leave requests
          </h3>
          <p className="mt-1 text-sm text-(--app-text-muted)">
            {isAdmin
              ? "Employee leave requests will appear here."
              : "Your leave applications will appear here."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-modern min-w-215">
            <thead>
              <tr>
                {isAdmin && <th>Employee</th>}
                <th>Type</th>
                <th>Dates</th>
                <th>Reason</th>
                <th>Status</th>
                {isAdmin && <th className="text-right">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {sortedLeaves.map((leave) => {
                const leaveId = leave._id || leave.id;

                return (
                  <tr key={leaveId}>
                    {isAdmin && (
                      <td className="font-medium text-(--app-text)">
                        {leave.employee?.firstName} {leave.employee?.lastName}
                      </td>
                    )}

                    <td>
                      <span className="badge bg-(--app-surface-muted) text-(--app-text-muted)">
                        {leave.type}
                      </span>
                    </td>

                    <td className="text-sm text-(--app-text-muted)">
                      {format(new Date(leave.startDate), "MMM dd")} -{" "}
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    <td
                      className="max-w-xs truncate text-(--app-text-muted)"
                      title={leave.reason}
                    >
                      {leave.reason}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          leave.status === "APPROVED"
                            ? "badge-success"
                            : leave.status === "REJECTED"
                              ? "badge-danger"
                              : "badge-warning"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td>
                        {leave.status === "PENDING" ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(leaveId, "APPROVED")
                              }
                              disabled={!!processing}
                              className="rounded-md p-2 text-(--app-success) transition-colors hover:bg-(--app-success-soft) disabled:opacity-50"
                              aria-label="Approve leave"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Check className="size-4" />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(leaveId, "REJECTED")
                              }
                              disabled={!!processing}
                              className="rounded-md p-2 text-(--app-danger) transition-colors hover:bg-(--app-danger-soft) disabled:opacity-50"
                              aria-label="Reject leave"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <X className="size-4" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="block text-right text-sm text-(--app-text-soft)">
                            Reviewed
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default LeaveHistory;
