import PageHeader from "@/components/layout/page-header";
import StatCard from "@/components/dashboard/stat-card";
import { CATEGORIES, STATUSES } from "@/lib/constants";
import { listTickets } from "@/lib/tickets";


// Counts are computed in the browser-free server render from the ticket list.
function countBy(tickets, field, values) {
  return values.map((value) => ({
    label: value,
    count: tickets.filter((ticket) => ticket[field] === value).length,
  }));
}

export default async function ReportsPage() {
  const mockTickets = await listTickets();
  const total = mockTickets.length;
  const byStatus = countBy(mockTickets, "status", STATUSES);
  const byCategory = countBy(mockTickets, "category", CATEGORIES);
  const statusCount = (status) => byStatus.find((item) => item.label === status).count;

  return (
    <>
      <PageHeader title="Reports" />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Complaints" value={total} />
          <StatCard label="Resolved" value={statusCount("Resolved")} />
          <StatCard label="Open" value={statusCount("Open")} />
          <StatCard label="In Progress" value={statusCount("In Progress")} />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Complaints by Status</h2>
            <div className="flex flex-col gap-4">
              {byStatus.map((item) => {
                // Bar width is a share of the total; guard against dividing by zero.
                const width = total === 0 ? 0 : Math.round((item.count / total) * 100);
                return (
                  <div key={item.label}>
                    <div className="mb-1 flex justify-between text-sm text-slate-700">
                      <span>{item.label}</span>
                      <span>{item.count}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100">
                      <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Complaints by Category</h2>
            <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-2">Category</th>
                  <th className="py-2 text-right">Complaints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {byCategory.map((item) => (
                  <tr key={item.label}>
                    <td className="py-2.5 text-slate-700">{item.label}</td>
                    <td className="py-2.5 text-right font-medium text-slate-900">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
