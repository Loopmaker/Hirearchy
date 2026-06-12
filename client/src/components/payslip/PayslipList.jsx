import { format } from "date-fns"
import { DownloadIcon, ReceiptTextIcon } from "lucide-react"

const PayslipList = ({payslips, isAdmin}) => {
  const sortedPayslips = [...payslips].sort((a, b) => {
  const aDate = new Date(a.year, a.month - 1);
  const bDate = new Date(b.year, b.month - 1);
  return bDate - aDate;
  });

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <section className="card overflow-hidden">
      <header className="flex items-center justify-between border-b border-(--app-border) px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-(--app-text)">Payslip Records</h2>
          <p className="mt-1 text-sm text-(--app-text-muted)">
            {isAdmin ? "Generated employee payslips." : "Your available payslips."}
          </p>
        </div>
      </header>

      {sortedPayslips.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <ReceiptTextIcon className="mb-3 size-9 text-(--app-text-soft)" />
          <h3 className="text-sm font-semibold text-(--app-text)">No payslips found</h3>
          <p className="mt-1 text-sm text-(--app-text-muted)">
            {isAdmin ? "Generated payslips will appear here." : "Your payslips will appear here once generated."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-modern min-w-195">
            <thead>
              <tr>
                {isAdmin && <th>Employee</th>}
                <th>Period</th>
                <th>Basic Salary</th>
                <th>Net Salary</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedPayslips.map((payslip) => {
                const payslipId = payslip._id || payslip.id;

                return (
                  <tr key={payslipId}>
                    {isAdmin && (
                      <td className="font-medium text-(--app-text)">
                        {payslip.employee?.firstName} {payslip.employee?.lastName}
                      </td>
                    )}

                    <td className="text-(--app-text-muted)">
                      {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                    </td>

                    <td className="text-(--app-text-muted)">
                      {currency.format(payslip.basicSalary || 0)}
                    </td>

                    <td className="font-semibold text-(--app-text)">
                      {currency.format(payslip.netSalary || 0)}
                    </td>

                    <td>
                      <div className="flex justify-end">
                        <button
                          onClick={() => window.open(`/print/payslips/${payslipId}`)}
                          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-(--app-primary) transition-colors hover:bg-(--app-primary-soft)"
                        >
                          <DownloadIcon className="size-4" />
                          Download
                        </button>
                      </div>
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

export default PayslipList