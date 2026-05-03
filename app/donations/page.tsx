import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function DonationsPage() {
  const months = ["January", "February", "March", "April", "May"];
  const donations = [
    { id: 1, name: "Abdullah Ali", status: ["Paid", "Paid", "Paid", "Paid", "Pending"] },
    { id: 2, name: "Fatima Khan", status: ["Paid", "Paid", "Paid", "Paid", "Paid"] },
    { id: 3, name: "Omar Farooq", status: ["Paid", "Paid", "Paid", "Overdue", "Overdue"] },
    { id: 4, name: "Zainab Ahmed", status: ["Paid", "Paid", "Paid", "Paid", "Pending"] },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Monthly Tracking" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Donation Tracking Grid</h1>
                <p className="mt-1 text-zinc-500">Monitor recurring donation status across the community.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl font-semibold shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 transition-all active:scale-95">
                  Generate Bills
                </button>
                <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  Export Report
                </button>
              </div>
            </div>

            {/* Grid Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest sticky left-0 bg-zinc-50">Donor Name</th>
                    {months.map(month => (
                      <th key={month} className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">{month}</th>
                    ))}
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {donations.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-zinc-900 sticky left-0 bg-white">{row.name}</td>
                      {row.status.map((status, i) => (
                        <td key={i} className="px-6 py-4 text-center">
                          <div className={`mx-auto h-8 w-8 rounded-lg flex items-center justify-center font-black text-[10px] uppercase shadow-sm border
                            ${status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                              'bg-rose-50 text-rose-600 border-rose-100'}`}>
                            {status[0]}
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold text-zinc-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">Verify</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex gap-8 px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-emerald-500 shadow-sm shadow-emerald-500/20" />
                (P) Paid
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-amber-400 shadow-sm shadow-amber-400/20" />
                (P) Pending
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-rose-500 shadow-sm shadow-rose-500/20" />
                (O) Overdue
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
