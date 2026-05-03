import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function IncomePage() {
  const incomes = [
    { id: 1, date: "2024-05-01", category: "General Donation", amount: "$500", status: "Completed", donor: "Abdullah Ali" },
    { id: 2, date: "2024-05-02", category: "Friday Collection", amount: "$1,200", status: "Completed", donor: "Multiple" },
    { id: 3, date: "2024-05-03", category: "Zakat", amount: "$2,500", status: "Pending", donor: "Omar Farooq" },
    { id: 4, date: "2024-05-03", category: "Construction Fund", amount: "$150", status: "Completed", donor: "Fatima Khan" },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Income Records" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Manage Income</h1>
                <p className="mt-1 text-zinc-500">Track and filter all incoming masjid funds.</p>
              </div>
              <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                + Add New Record
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-wrap gap-4 items-center">
              <input type="text" placeholder="Search donors or categories..." className="flex-1 min-w-[250px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                <option>All Categories</option>
                <option>General Donation</option>
                <option>Zakat</option>
                <option>Friday Collection</option>
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
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Donor</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {incomes.map((income) => (
                    <tr key={income.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-zinc-600">{income.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">{income.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900">{income.donor}</td>
                      <td className="px-6 py-4 text-sm font-bold text-emerald-600">{income.amount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${income.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                          <span className="text-xs font-medium text-zinc-600">{income.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/receipt/${income.id}`} className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors" title="Print Receipt">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                          </Link>
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
              <p className="text-sm text-zinc-500 font-medium">Showing 1 to 4 of 248 records</p>
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
