import { useCallback, useEffect, useState } from "react"
import { DEPARTMENTS } from "../assets/assets";
import { PencilIcon, Plus, Search, Trash2Icon, UsersIcon, X } from "lucide-react";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/axios";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () =>{
   try {
    const url = selectedDept ? `/employees?department=${selectedDept}` : "/employees";
    const res = await api.get(url);
    setEmployees(res.data)
   } catch (error) {
    console.error("Failed to fetch employees", error);
   } finally{
    setLoading(false);
   }
  }, [selectedDept])

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees])

  const filtered = employees.filter((emp) => `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase().includes(search.toLowerCase()))

  const activeCount = employees.filter((emp) => !emp.isDeleted).length;
  const deletedCount = employees.filter((emp) => emp.isDeleted).length;
  const formOpen = showCreateModal || editEmployee;

  const closeForm = () => {
    setShowCreateModal(false);
    setEditEmployee(null);
  };

  const handleDelete = async (employee) => {
    if (!confirm(`Delete ${employee.firstName} ${employee.lastName}?`)) return;

    try {
      await api.delete(`/employees/${employee.id}`);
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
};
  return (
    <div className="animate-fade-in">
      {/* Need to clean up, theres so many divs */}
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">
            Manage profiles, roles, departments, and payroll details.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
        >
          <Plus className="size-4" />
          Add Employee
        </button>
      </header>

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="card p-4">
          <p className="text-sm text-(--app-text-muted)">Total Employees</p>
          <p className="mt-1 text-2xl font-semibold text-(--app-text)">{employees.length}</p>
        </div>

        <div className="card p-4">
          <p className="text-sm text-(--app-text-muted)">Active Records</p>
          <p className="mt-1 text-2xl font-semibold text-(--app-success)">{activeCount}</p>
        </div>

        <div className="card p-4">
          <p className="text-sm text-(--app-text-muted)">Deleted Records</p>
          <p className="mt-1 text-2xl font-semibold text-(--app-danger)">{deletedCount}</p>
        </div>
      </section>

      {/* Search Bar */}

      <section className="card mb-5 p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-(--app-text-soft)" />
            <input
              placeholder="Search by name or position"
              className="pl-10"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="sm:max-w-56"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Employee Cards */}
        {loading ? (
        <section className="card overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex animate-pulse items-center gap-4 border-b border-(--app-border) p-4 last:border-b-0">
              <div className="size-10 rounded-full bg-(--app-surface-muted)" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-40 rounded bg-(--app-surface-muted)" />
                <div className="h-3 w-24 rounded bg-(--app-surface-muted)" />
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="card overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <UsersIcon className="mb-3 size-9 text-(--app-text-soft)" />
              <h2 className="text-sm font-semibold text-(--app-text)">No employees found</h2>
              <p className="mt-1 text-sm text-(--app-text-muted)">
                Try changing the search or department filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-modern min-w-190">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((emp) => (
                    <tr key={emp.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--app-primary-soft) text-sm font-semibold text-(--app-primary)">
                            {emp.firstName?.[0]}{emp.lastName?.[0]}
                          </div>

                          <div>
                            <p className="font-medium text-(--app-text)">
                              {emp.firstName} {emp.lastName}
                            </p>
                            <p className="text-xs text-(--app-text-muted)">{emp.email || "No email"}</p>
                          </div>
                        </div>
                      </td>

                      <td>{emp.department || "Unassigned"}</td>
                      <td>{emp.position || "Not specified"}</td>

                      <td>
                        <span className={`badge ${emp.isDeleted ? "badge-danger" : "badge-success"}`}>
                          {emp.isDeleted ? "Deleted" : "Active"}
                        </span>
                      </td>

                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditEmployee(emp)}
                            className="rounded-md p-2 text-(--app-text-muted) transition-colors hover:bg-(--app-surface-muted) hover:text-(--app-text)"
                            aria-label="Edit employee"
                          >
                            <PencilIcon className="size-4" />
                          </button>

                          {!emp.isDeleted && (
                            <button
                              onClick={() => handleDelete(emp)}
                              className="rounded-md p-2 text-(--app-text-muted) transition-colors hover:bg-(--app-danger-soft) hover:text-(--app-danger)"
                              aria-label="Delete employee"
                            >
                              <Trash2Icon className="size-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Create Employee Modal */}
      {formOpen && (
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50">
        <button
          className="absolute inset-0 cursor-default"
          onClick={closeForm}
          aria-label="Close employee form"
        />

        <aside className="relative h-full w-full max-w-3xl overflow-y-auto bg-(--app-surface) shadow-2xl">
          <header className="sticky top-0 z-10 flex items-start justify-between border-b border-(--app-border) bg-(--app-surface) p-5">
            <div>
              <h2 className="text-lg font-semibold text-(--app-text)">
                {editEmployee ? "Edit Employee" : "Add Employee"}
              </h2>
              <p className="mt-1 text-sm text-(--app-text-muted)">
                {editEmployee ? "Update employee details." : "Create a user account and employee profile."}
              </p>
            </div>

            <button
              onClick={closeForm}
              className="rounded-md p-2 text-(--app-text-muted) transition-colors hover:bg-(--app-surface-muted) hover:text-(--app-text)"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </header>

          <div className="p-5">
            <EmployeeForm
              initialData={editEmployee}
              onSuccess={() => {
                closeForm();
                fetchEmployees();
              }}
              onCancel={closeForm}
            />
          </div>
        </aside>
      </div>
    )}
    </div>
  )
}

export default Employees