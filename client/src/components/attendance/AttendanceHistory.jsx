import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets"
import {format} from 'date-fns'
import { CalendarXIcon } from "lucide-react";
const AttendanceHistory = ({history}) => {
  const sortedHistory = [...history].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
  <section className="card overflow-hidden">
    <header className="flex items-center justify-between border-b border-(--app-border) px-5 py-4">
      <div>
        <h2 className="text-base font-semibold text-(--app-text)">Recent Activity</h2>
        <p className="mt-1 text-sm text-(--app-text-muted)">
          Latest attendance records and daily status.
        </p>
      </div>
    </header>

    {sortedHistory.length === 0 ? (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <CalendarXIcon className="mb-3 size-9 text-(--app-text-soft)" />
        <h3 className="text-sm font-semibold text-(--app-text)">No attendance records</h3>
        <p className="mt-1 text-sm text-(--app-text-muted)">
          Your check-ins will appear here.
        </p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="table-modern min-w-205">
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Working Hours</th>
              <th>Day Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sortedHistory.map((record) => {
              const dayType = getDayTypeDisplay(record);

              return (
                <tr key={record._id || record.id}>
                  <td className="font-medium text-(--app-text)">
                    {format(new Date(record.date), "MMM dd, yyyy")}
                  </td>

                  <td>{record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "-"}</td>
                  <td>{record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "-"}</td>
                  <td className="font-medium">{getWorkingHoursDisplay(record)}</td>

                  <td>
                    {dayType.label !== "-" ? (
                      <span className={`badge ${dayType.className}`}>{dayType.label}</span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <span className={`badge ${
                      record.status === "PRESENT"
                        ? "badge-success"
                        : record.status === "LATE"
                          ? "badge-warning"
                          : "badge-danger"
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </section>
);
}

export default AttendanceHistory