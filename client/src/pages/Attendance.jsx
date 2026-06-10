import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading";
import CheckInButton from '../components/attendance/CheckInButton'
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";
import api from "../api/axios";
import toast from "react-hot-toast";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback( async() =>{
    try {
      const res = await api.get("/attendance");
      const json = res.data;
      setHistory(json.data || []);
      if(json.employee?.isDeleted) setIsDeleted(true);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(() =>{
    fetchData();
  },[fetchData]);

  if(loading) return <Loading/>

  const today = new Date();
  today.setHours(0,0,0,0);
  const todayRecord = history.find((r) => new Date(r.date).toDateString() === today.toDateString());

  return (
  <main className="animate-fade-in space-y-6">
    <header>
      <h1 className="page-title">Attendance</h1>
      <p className="page-subtitle">
        Track today’s workday, check-ins, and attendance history.
      </p>
    </header>

    {isDeleted ? (
      <section className="rounded-lg border border-(--app-danger) bg-(--app-danger-soft) p-5 text-center">
        <p className="text-sm font-medium text-(--app-danger)">
          You can no longer clock in or out because your employee record has been marked as deleted.
        </p>
      </section>
    ) : (
      <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
    )}

    <AttendanceStats history={history} />
    <AttendanceHistory history={history} />
  </main>
);
}

export default Attendance