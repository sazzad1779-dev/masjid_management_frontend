import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="System Analytics" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 p-8 rounded-3xl text-white overflow-hidden relative">
              <div className="relative z-10">
                <h1 className="text-3xl font-bold">Financial Stewardship Reports</h1>
                <p className="mt-2 text-zinc-400 max-w-lg">Comprehensive overview of institutional financial health and mission-driven stewardship reporting.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2">
                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Annual Report
                  </button>
                  <button className="px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all active:scale-95">
                    Fiscal History
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-600/20 blur-[100px] rounded-full -mr-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Financial Summary */}
                <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-zinc-900">Financial Summary (FY 2024)</h3>
                    <div className="flex gap-2">
                      {['1M', '3M', '6M', '1Y'].map(t => (
                        <button key={t} className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${t === '1Y' ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-64 flex items-end gap-2 px-4">
                     {[30, 45, 60, 40, 75, 90, 85, 100, 70, 50, 65, 80].map((h, i) => (
                       <div key={i} className="flex-1 group relative">
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           ${h*100}
                         </div>
                         <div className="bg-emerald-100 rounded-t-md h-full w-full relative overflow-hidden">
                           <div className="absolute bottom-0 inset-x-0 bg-emerald-600 rounded-t-md transition-all duration-500" style={{ height: `${h}%` }}></div>
                         </div>
                       </div>
                     ))}
                  </div>
                  <div className="mt-6 grid grid-cols-12 gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center">
                     {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                       <div key={m} className="col-span-1">{m}</div>
                     ))}
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
                    <h3 className="text-lg font-bold text-zinc-900 mb-6">Income Categories</h3>
                    <div className="space-y-4">
                      {[
                        { name: "General Donation", val: "65%", color: "bg-emerald-600" },
                        { name: "Zakat & Sadaqah", val: "20%", color: "bg-emerald-400" },
                        { name: "Youth Programs", val: "10%", color: "bg-emerald-200" },
                        { name: "Other", val: "5%", color: "bg-zinc-100" },
                      ].map(cat => (
                        <div key={cat.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-zinc-700">{cat.name}</span>
                            <span className="font-bold text-zinc-900">{cat.val}</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className={`h-full ${cat.color}`} style={{ width: cat.val }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
                    <h3 className="text-lg font-bold text-zinc-900 mb-6">Expense Categories</h3>
                    <div className="space-y-4">
                      {[
                        { name: "Utilities & Maintenance", val: "40%", color: "bg-zinc-800" },
                        { name: "Staff Payroll", val: "35%", color: "bg-zinc-600" },
                        { name: "Community Welfare", val: "15%", color: "bg-zinc-400" },
                        { name: "Events", val: "10%", color: "bg-zinc-200" },
                      ].map(cat => (
                        <div key={cat.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold text-zinc-700">{cat.name}</span>
                            <span className="font-bold text-zinc-900">{cat.val}</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <div className={`h-full ${cat.color}`} style={{ width: cat.val }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-8">
                   <h3 className="text-lg font-bold text-zinc-900 mb-6">Quick Stats</h3>
                   <div className="space-y-6">
                     <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                       </div>
                       <div>
                         <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Donors</p>
                         <p className="text-xl font-bold text-zinc-900">+42 <span className="text-sm font-medium text-emerald-500">this month</span></p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-600">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                       </div>
                       <div>
                         <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Growth</p>
                         <p className="text-xl font-bold text-zinc-900">+12.4% <span className="text-sm font-medium text-emerald-500">vs LY</span></p>
                       </div>
                     </div>
                   </div>
                   <button className="mt-8 w-full py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all border border-emerald-50 uppercase tracking-widest">
                     View Detailed Growth
                   </button>
                 </div>

                 <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl shadow-emerald-600/20">
                   <div className="relative z-10">
                     <h3 className="text-xl font-bold mb-2">Audited Statements</h3>
                     <p className="text-emerald-100 text-sm mb-6">Your institutional accounts are reconciled and verified as of today.</p>
                     <button className="w-full py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-all active:scale-95 flex items-center justify-center gap-2">
                        Download Q1 Report
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                     </button>
                   </div>
                   <svg className="absolute -right-4 -bottom-4 h-32 w-32 text-emerald-500/20 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                 </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
