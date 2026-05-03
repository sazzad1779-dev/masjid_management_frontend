import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AuditLogsPage() {
  const auditLogs = [
    { id: 1, timestamp: "2024-05-03 12:45:02", user: "Admin (Saif)", action: "Modified prayer times", category: "Settings", ipAddress: "192.168.1.42", status: "Success" },
    { id: 2, timestamp: "2024-05-03 11:20:15", user: "System", action: "Automated backup completed", category: "System", ipAddress: "Localhost", status: "Success" },
    { id: 3, timestamp: "2024-05-03 10:05:44", user: "Treasurer (Omar)", action: "Deleted income record #842", category: "Finance", ipAddress: "192.168.1.15", status: "Success" },
    { id: 4, timestamp: "2024-05-03 09:15:30", user: "Admin (Saif)", action: "Failed login attempt", category: "Security", ipAddress: "45.12.88.201", status: "Warning" },
    { id: 5, timestamp: "2024-05-02 23:40:12", user: "Moderator (Zaid)", action: "Updated masjid profile", category: "Profile", ipAddress: "192.168.1.12", status: "Success" },
    { id: 6, timestamp: "2024-05-02 18:22:05", user: "System", action: "Sent monthly donation reminders", category: "Communication", ipAddress: "Localhost", status: "Success" },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Security & Integrity"
          actions={
            <button className="px-4 py-2 text-sm font-semibold text-zinc-600 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-all border border-zinc-200">
              Export CSV
            </button>
          }
        />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Audit Activity Log</h1>
                <p className="mt-1 text-zinc-500">A permanent, immutable record of all system changes.</p>
              </div>
              <div className="flex gap-3">
                 <div className="bg-white px-4 py-2 rounded-xl border border-zinc-100 shadow-sm text-center min-w-[120px]">
                   <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Total Events</p>
                   <p className="text-lg font-bold text-emerald-600">12,402</p>
                 </div>
                 <div className="bg-white px-4 py-2 rounded-xl border border-zinc-100 shadow-sm text-center min-w-[120px]">
                   <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Security Alerts</p>
                   <p className="text-lg font-bold text-amber-500">3</p>
                 </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[250px] relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search by activity, user, or IP..." className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              </div>
              <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                <option>All Categories</option>
                <option>Settings</option>
                <option>Finance</option>
                <option>Security</option>
                <option>System</option>
              </select>
              <input type="date" className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">User / Identity</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Action Performed</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Origin IP</th>
                    <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-zinc-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold ${log.user === 'System' ? 'bg-zinc-100 text-zinc-400' : 'bg-emerald-100 text-emerald-700'}`}>
                            {log.user.substring(0, 1)}
                          </div>
                          <span className="text-sm font-bold text-zinc-900">{log.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-zinc-700">{log.action}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-wider">{log.category}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-zinc-400 font-mono">{log.ipAddress}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-1.5 w-1.5 rounded-full ${log.status === 'Success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span className={`text-xs font-bold uppercase tracking-widest ${log.status === 'Success' ? 'text-emerald-700' : 'text-amber-600'}`}>{log.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Information */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-zinc-900 rounded-2xl shadow-xl shadow-zinc-900/10">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-white">
                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="text-white font-bold">System Integrity Verification</h3>
                   <p className="text-zinc-400 text-sm">Integrity check passed. Last verified: 5 mins ago.</p>
                 </div>
               </div>
               <button className="px-5 py-2.5 bg-white text-zinc-900 rounded-xl font-semibold hover:bg-zinc-100 transition-all active:scale-95">
                 Re-verify Logs
               </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
