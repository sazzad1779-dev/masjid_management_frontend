import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function ExpensePage() {
  const expenses = [
    { id: 1, date: "2024-05-01", category: "Utility Bill", amount: "$320", status: "Paid", account: "Petty Cash" },
    { id: 2, date: "2024-05-02", category: "Maintenance", amount: "$1,500", status: "Paid", account: "General Fund" },
    { id: 3, date: "2024-05-03", category: "Cleaning Supplies", amount: "$45", status: "Paid", account: "Petty Cash" },
    { id: 4, date: "2024-05-04", category: "Guest Imam", amount: "$200", status: "Scheduled", account: "Imam Fund" },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Expense Records" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Manage Expenses</h1>
                <p className="mt-1 text-zinc-500">Log and monitor masjid expenditures.</p>
              </div>
              <button className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl font-semibold shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 transition-all active:scale-95">
                + Log New Expense
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-wrap gap-4 items-center">
              <input type="text" placeholder="Search categories or accounts..." className="flex-1 min-w-[250px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                <option>All Accounts</option>
                <option>General Fund</option>
                <option>Petty Cash</option>
                <option>Imam Fund</option>
              </select>
              <input type="date" className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Account</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-zinc-600">{expense.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold">{expense.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900">{expense.account}</td>
                      <td className="px-6 py-4 text-sm font-bold text-rose-600">{expense.amount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${expense.status === 'Paid' ? 'bg-emerald-500' : 'bg-blue-400'}`} />
                          <span className="text-xs font-medium text-zinc-600">{expense.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500 font-medium">Showing 1 to 4 of 86 records</p>
              <div className="flex gap-2">
                <button className="px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-400 cursor-not-allowed">Previous</button>
                <button className="px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-600 hover:bg-zinc-50 transition-colors">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
