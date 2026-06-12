import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { BanknoteIcon, CalendarDaysIcon, ReceiptTextIcon } from "lucide-react";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const fetchPayslips = useCallback(async ()=>{
    try {
      const res = await api.get("/payslips");
      setPayslips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally{
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchPayslips();
  },[fetchPayslips]);

  useEffect(() => {
    if(isAdmin) api.get("/employees").then((res)=>setEmployees(res.data.filter((e) => !e.isDeleted))).catch(()=>{});
  },[isAdmin]);

  const payrollTotal = payslips.reduce((sum, payslip) => sum + Number(payslip.netSalary || 0), 0);

  const latestPayslip = [...payslips].sort((a, b) => {
    const aDate = new Date(a.year, a.month - 1);
    const bDate = new Date(b.year, b.month - 1);
    return bDate - aDate;
  })[0];

  const latestPeriod = latestPayslip
    ? format(new Date(latestPayslip.year, latestPayslip.month - 1), "MMMM yyyy")
    : "No records";

  if(loading) return <Loading/>

  return (
    <main className="animate-fade-in space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin ? "Generate and manage employee payslips." : "View your salary records and payslip history."}
          </p>
        </div>

        {isAdmin && (
          <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips} />
        )}
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="card card-hover p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-(--app-text-muted)">Total Payslips</p>
              <p className="mt-2 text-2xl font-semibold text-(--app-text)">{payslips.length}</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-(--app-primary-soft) text-(--app-primary)">
              <ReceiptTextIcon className="size-5" />
            </div>
          </div>
        </article>

        <article className="card card-hover p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-(--app-text-muted)">Latest Period</p>
              <p className="mt-2 text-2xl font-semibold text-(--app-text)">{latestPeriod}</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-(--app-success-soft) text-(--app-success)">
              <CalendarDaysIcon className="size-5" />
            </div>
          </div>
        </article>

        <article className="card card-hover p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-(--app-text-muted)">
                {isAdmin ? "Payroll Total" : "Latest Net Pay"}
              </p>
              <p className="mt-2 text-2xl font-semibold text-(--app-text)">
                ${(isAdmin ? payrollTotal : latestPayslip?.netSalary || 0).toLocaleString()}
              </p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-(--app-warning-soft) text-(--app-warning)">
              <BanknoteIcon className="size-5" />
            </div>
          </div>
        </article>
      </section>

      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </main>
  );
}

export default Payslips