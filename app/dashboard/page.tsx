import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function DashboardPage() {
  const stats = [
    { name: "Total Income", value: "$45,230", change: "+12.5%", color: "text-emerald-600" },
    { name: "Total Expenses", value: "$12,840", change: "-2.3%", color: "text-zinc-900" },
    { name: "Net Balance", value: "$32,390", change: "+18.2%", color: "text-emerald-600" },
    { name: "Total Donors", value: "1,240", change: "+5.4%", color: "text-zinc-900" },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Overview" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Assalam-o-Alaikum, Admin</h1>
                <p className="mt-1 text-zinc-500">Here&apos;s what&apos;s happening at your masjid today.</p>
              </div>
              <div className="flex gap-3">
                <Link href="/income" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  Add Income
                </Link>
                <Link href="/expense" className="px-5 py-2.5 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 transition-all active:scale-95">
                  New Expense
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm transition-all hover:shadow-md">
                  <p className="text-sm font-semibold text-zinc-500 mb-2">{stat.name}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {stat.change} since last month
                  </p>
                </div>
              ))}
            </div>

            {/* Activity Feed and Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Financial Trends</h3>
                <div className="h-64 flex items-end gap-4">
                  {[40, 70, 45, 90, 65, 80, 50, 85, 75, 95, 60, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-100 rounded-t-lg relative group transition-all hover:bg-emerald-600">
                      <div className="absolute inset-x-0 bottom-0 bg-emerald-600 rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-8 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-600" />
                    Income
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-100" />
                    Expenses
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Recent Activities</h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">New donation received</p>
                        <p className="text-xs text-zinc-500">$500 for general maintenance</p>
                        <p className="mt-1 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">2 HOURS AGO</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/audit-logs" className="block w-full mt-8 py-3 text-sm font-bold text-zinc-400 hover:text-zinc-600 transition-colors uppercase tracking-widest text-center">
                  View All Audit Logs
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
