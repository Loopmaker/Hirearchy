import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react"
import api from "../../api/axios";
import toast from "react-hot-toast";
import { format } from "date-fns";

const GeneratePayslipForm = ({employees, onSuccess}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return (
    <button
      onClick={() => setIsOpen(true)}
      className="btn-primary inline-flex items-center justify-center gap-2"
    >
      <Plus className="size-4" />
      Generate Payslip
    </button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/payslips", data);
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
     <div className="w-full max-w-lg rounded-lg bg-(--app-surface) shadow-2xl animate-slide-up">
        <div className="flex items-start justify-between border-b border-(--app-border) p-5">
          <div>
            <h3 className="text-lg font-semibold text-(--app-text)">Generate Payslip</h3>
            <p className="mt-1 text-sm text-(--app-text-muted)">
              Create a monthly payslip for an active employee.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-2 text-(--app-text-muted) transition-colors hover:bg-(--app-surface-muted) hover:text-(--app-text)"
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          
          {/* select employee */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select name="employeeId" required>
              {employees.map((e) =>(
                <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.position})</option>
              ))}
            </select>
          </div>

          {/* month and year */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
              <select name="month">
                {Array.from({ length: 12 }, (_, i) => {
                  const monthNumber = i + 1;
                  const monthName = format(new Date(2026, i), "MMMM");

                  return (
                    <option key={monthNumber} value={monthNumber}>
                      {monthName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
              <input type="number" name="year" defaultValue={new Date().getFullYear()}/>
            </div>
          </div>

          {/* basic salary*/}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Basic Salary</label>
            <input type="number" name="basicSalary" required placeholder="5000"/>
          </div>


          {/* allowance and deduction */}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Allowances</label>
              <input type="number" name="allowances" defaultValue="0"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Deductions</label>
              <input type="number" name="deductions" defaultValue="0"/>
            </div>
          </div>

          {/* button */}
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setIsOpen(false)} type="button" className="btn-secondary cursor-pointer">
              Cancel
            </button>
            <button disabled={loading} type="submit" className="btn-primary flex items-center cursor-pointer">
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
              Generate
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default GeneratePayslipForm