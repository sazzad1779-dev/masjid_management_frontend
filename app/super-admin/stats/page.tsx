import Link from "next/link";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";

export default function SuperAdminStatsPage() {
  const directory = [
    { name: "Al-Noor Islamic Center", location: "Naperville, IL", status: "Active", masjids: 1, income: "$1.2M" },
    { name: "Masjid Al-Falah", location: "Chicago, IL", status: "Active", masjids: 1, income: "$840k" },
    { name: "Community Mosque", location: "Oak Brook, IL", status: "Active", masjids: 3, income: "$2.1M" },
    { name: "Islamic Foundation", location: "Villa Park, IL", status: "Review", masjids: 1, income: "$450k" },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100 font-sans">
       <SuperAdminSidebar />


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Infrastructure Health</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Normal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-bold transition-all hover:bg-white/10 cursor-pointer">
                Switch Tenant: Global
             </div>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-12">
          {/* Hero Header */}
          <div>
            <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Platform Overview</h1>
            <p className="text-zinc-500 text-lg max-w-2xl font-medium">Super Admin real-time statistics and multi-tenant management for the Al-Noor global network.</p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden">
               <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Total Masjids</p>
               <h3 className="text-6xl font-black tracking-tighter">142</h3>
               <div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +12% growth
               </div>
               <div className="absolute -right-8 -bottom-8 h-40 w-40 bg-white/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden">
               <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Total Users</p>
               <h3 className="text-6xl font-black tracking-tighter">45.2k</h3>
               <div className="mt-8 flex items-center gap-2 text-blue-400 text-sm font-bold">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +5.2k new this month
               </div>
               <div className="absolute -right-8 -bottom-8 h-40 w-40 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-10 rounded-[2.5rem] relative group overflow-hidden">
               <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Platform Income (YTD)</p>
               <h3 className="text-6xl font-black tracking-tighter">$8.4M</h3>
               <div className="mt-8 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Reconciled across nodes
               </div>
               <div className="absolute -right-8 -bottom-8 h-40 w-40 bg-white/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
            </div>
          </div>

          {/* Directory */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight">Institutional Directory</h3>
              <div className="flex gap-4">
                 <input type="text" placeholder="Search masjids..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 w-64" />
                 <button className="px-6 py-2 bg-emerald-500 text-zinc-950 rounded-xl font-bold text-sm">Add Institution</button>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em]">
                        <th className="px-8 py-6">Institution Name</th>
                        <th className="px-8 py-6">Region</th>
                        <th className="px-8 py-6">Masjids</th>
                        <th className="px-8 py-6">Revenue</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {directory.map((item, i) => (
                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6 font-bold text-lg">{item.name}</td>
                          <td className="px-8 py-6 text-zinc-400 text-sm font-medium">{item.location}</td>
                          <td className="px-8 py-6 text-zinc-400 text-sm font-medium">{item.masjids}</td>
                          <td className="px-8 py-6 text-emerald-500 text-sm font-bold tracking-tight">{item.income}</td>
                          <td className="px-8 py-6">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                             }`}>
                                {item.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="p-2 text-zinc-600 hover:text-white transition-colors group-hover:bg-white/5 rounded-lg">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 p-12 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 flex justify-between">
           <div>© 2024 Al-Noor Global Infrastructure. Modern Stewardship Analytics.</div>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-zinc-400">Governance</Link>
              <Link href="#" className="hover:text-zinc-400">Global Settings</Link>
              <Link href="#" className="hover:text-zinc-400">Logout Dashboard</Link>
           </div>
        </footer>
      </main>
    </div>
  );
}
