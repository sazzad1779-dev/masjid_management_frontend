"use client";

import Link from "next/link";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";


export default function SuperAdminAnalyticsPage() {
   const metrics = [
      { label: "Total Registered Masjids", value: "1,248", change: "+12%", icon: "mosque" },
      { label: "Total Active Users", value: "450.2k", change: "+8%", icon: "people" },
      { label: "Platform Transactions", value: "$12.4M", change: "+24%", icon: "receipt" },
      { label: "System Load", value: "24%", change: "-2%", icon: "memory" },
   ];

   return (
      <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans">
         <SuperAdminSidebar />


         {/* Main Content */}
         <main className="flex-1 flex flex-col overflow-hidden">
            <header className="h-20 border-b border-zinc-800 bg-zinc-900/30 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-20">
               <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Network Intelligence Dashboard</h2>
               <div className="flex items-center gap-6">
                  <div className="flex bg-zinc-800/50 rounded-full p-1 border border-zinc-700/50">
                     <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-zinc-700 text-white">Live View</button>
                     <button className="px-4 py-1.5 rounded-full text-xs font-bold text-zinc-500">History</button>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                     <span className="text-zinc-400 text-xs font-black">SA</span>
                  </div>
               </div>
            </header>

            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
               <div className="max-w-7xl mx-auto space-y-12">
                  <div className="flex items-end justify-between border-b border-zinc-800 pb-12">
                     <div>
                        <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Platform Growth</h1>
                        <p className="text-zinc-500 text-lg max-w-2xl font-medium">Visualizing the expanding network of Islamic centers utilizing the Al-Noor stewardship platform worldwide.</p>

                     </div>
                     <button className="px-8 py-4 bg-emerald-500 text-zinc-950 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
                        Export Analysis
                     </button>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {metrics.map(m => (
                        <div key={m.label} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-zinc-700 transition-all group">
                           <div className="flex justify-between items-start mb-6">
                              <div className="h-10 w-10 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors">
                                 <span className="material-icons-round text-sm">{m.icon}</span>
                              </div>
                              <span className="text-[10px] font-black uppercase px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                                 {m.change}
                              </span>
                           </div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">{m.label}</p>
                           <p className="text-3xl font-black tracking-tight">{m.value}</p>
                        </div>
                     ))}
                  </div>

                  {/* Large Chart Area Placeholder */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 p-10 rounded-[3rem] relative overflow-hidden">
                        <div className="flex items-center justify-between mb-12">
                           <h3 className="text-xl font-bold">Transaction Volume (Global)</h3>
                           <div className="flex gap-4">
                              <div className="flex items-center gap-2">
                                 <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                 <span className="text-xs text-zinc-400">Current</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <div className="h-2 w-2 rounded-full bg-zinc-700"></div>
                                 <span className="text-xs text-zinc-400">Previous</span>
                              </div>
                           </div>
                        </div>
                        {/* Visual bar graph representation */}
                        <div className="h-72 flex items-end justify-between gap-3">
                           {[...Array(24)].map((_, i) => (
                              <div key={i} className="flex-1 space-y-2 group">
                                 <div className="h-4 w-full bg-zinc-800 group-hover:bg-zinc-700 transition-all rounded-sm" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                                 <div className="h-10 w-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-all rounded-sm" style={{ height: `${Math.random() * 100}%` }}></div>
                              </div>
                           ))}
                        </div>
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 h-full w-1/2 bg-emerald-500/5 blur-[120px] pointer-events-none"></div>
                     </div>

                     <div className="bg-zinc-900/30 border border-zinc-800 p-10 rounded-[3rem]">
                        <h3 className="text-xl font-bold mb-8">Recent Activity</h3>
                        <div className="space-y-8">
                           {[
                              { title: "Naperville Center", action: "Registered", time: "2 mins ago", type: "success" },
                              { title: "Gateway Latency", action: "Detected", time: "15 mins ago", type: "warning" },
                              { title: "Masjid Al-Falah", action: "Verified Domain", time: "1 hour ago", type: "info" },
                              { title: "System Backup", action: "Cloud Sync", time: "4 hours ago", type: "success" },
                           ].map((item, i) => (
                              <div key={i} className="flex gap-4">
                                 <div className={`h-1.5 w-1.5 rounded-full mt-2 ${item.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                                       item.type === 'warning' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-blue-400'
                                    }`}></div>
                                 <div>
                                    <p className="text-sm font-bold text-zinc-100">{item.title}</p>
                                    <p className="text-xs text-zinc-500">{item.action} • {item.time}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <button className="w-full mt-10 py-4 bg-zinc-800 text-zinc-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:text-zinc-100 transition-all">
                           View Complete Network Logs
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <footer className="p-12 border-t border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 flex justify-between">
               <div>© 2024 Al-Noor Infrastructure. Modern Institutional Stewardship.</div>
               <div className="flex gap-8">
                  <Link href="#" className="hover:text-zinc-400">API Docs</Link>
                  <Link href="#" className="hover:text-zinc-400">Security Audit</Link>
                  <Link href="#" className="hover:text-zinc-400">Node Status</Link>
               </div>
            </footer>
         </main>

         <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
      </div>
   );
}
