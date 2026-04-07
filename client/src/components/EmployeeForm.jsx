import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";

const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initialData;
  const handleSubmit = async (e) => { e.preventDefault(); };

  const FormField = ({ label, children, className = "", id }) => (
  <div className={className}>
    <label htmlFor={id} className="block mb-2">{label}</label>
    {children}
  </div>
);

  return (
  <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl animate-fade-in">

    {/* Personal Information */}
    <div className="card p-5 sm:p-6">
      <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
        <FormField label="First Name" id="firstName">
          <input name="firstName" id="firstName" required defaultValue={initialData?.firstName} />
        </FormField>

        <FormField label="Last Name" id="lastName">
          <input name="lastName" id="lastName" required defaultValue={initialData?.lastName} />
        </FormField>

        <FormField label="Phone Number" id="phone">
          <input name="phone" id="phone" required defaultValue={initialData?.phone} />
        </FormField>

        <FormField label="Join Date" id="joinDate">
          <input
            type="date"
            name="joinDate"
            id="joinDate"
            required
            defaultValue={
              initialData?.joinDate
                ? new Date(initialData.joinDate).toISOString().split("T")[0]
                : ""
            }
          />
        </FormField>

        <FormField label="Bio (Optional)" className="sm:col-span-2" id="bio">
          <textarea
            name="bio"
            id="bio"
            defaultValue={initialData?.bio}
            rows={3}
            className="resize-none"
            placeholder="Brief description..."
          />
        </FormField>
      </div>
    </div>

    {/* Employment Details */}
    <div className="card p-5 sm:p-6">
      <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-b-slate-100">
        Employment Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
        <FormField label="Department" id="department">
          <select name="department" id="department" defaultValue={initialData?.department || ""}>
            <option value="">Select Department</option>
            {DEPARTMENTS.map((deptName) => (
              <option key={deptName} value={deptName}>
                {deptName}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Position" id="position">
          <input name="position" id="position" required defaultValue={initialData?.position} />
        </FormField>

        <FormField label="Basic Salary" id="basicSalary">
          <input
            type="number"
            name="basicSalary"
            id="basicSalary"
            required
            defaultValue={initialData?.basicSalary || 0}
            min="0"
            step="0.01"
          />
        </FormField>

        <FormField label="Allowances" id="allowances">
          <input
            type="number"
            name="allowances"
            id="allowances"
            required
            defaultValue={initialData?.allowances || 0}
            min="0"
            step="0.01"
          />
        </FormField>

        <FormField label="Deductions" id="deductions">
          <input
            type="number"
            name="deductions"
            id="deductions"
            required
            defaultValue={initialData?.deductions || 0}
            min="0"
            step="0.01"
          />
        </FormField>

        {isEditMode && (
          <FormField label="Status" id="employmentStatus">
            <select
              name="employmentStatus"
              id="employmentStatus"
              required
              defaultValue={initialData?.employmentStatus}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </FormField>
        )}
      </div>
    </div>

    {/* Account Setup */}
    <div className="card p-5 sm:p-6">
      <h3 className="text-base font-medium text-slate-900 mb-6 pb-4 border-b border-slate-100">
        Account Setup
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
        <FormField label="Work Email" className="sm:col-span-2" id="email">
          <input type="email" name="email" id="email" required defaultValue={initialData?.email} />
        </FormField>

        {!isEditMode ? (
          <FormField label="Temporary Password" id="password">
            <input type="password" name="password" id="password" required />
          </FormField>
        ) : (
          <FormField label="Change Password (Optional)">
            <input
              type="password"
              name="password"
              placeholder="Leave blank to keep current"
            />
          </FormField>
        )}

        <FormField label="System Role" id="role">
          <select name="role" defaultValue={initialData?.user?.role || "EMPLOYEE"} id="role">
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </FormField>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
      <button
        type="button"
        className="btn-secondary cursor-pointer"
        onClick={() => (onCancel ? onCancel() : navigate(-1))}
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary flex items-center justify-center cursor-pointer"
      >
        {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
        {isEditMode ? "Update Employee" : "Create Employee"}
      </button>
    </div>
  </form>
);
}

export default EmployeeForm