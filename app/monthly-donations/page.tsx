import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function MonthlyDonationsPage() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const donors = [
    { name: "Ahmed Abdullah", pledge: "$200", status: [true, true, true, true, false, false, false, false, false, false, false, false] },
    { name: "Fatima Zahra", pledge: "$150", status: [true, true, true, false, false, false, false, false, false, false, false, false] },
    { name: "Omar Khayyam", pledge: "$500", status: [true, true, true, true, true, false, false, false, false, false, false, false] },
    { name: "Zainab Ali", pledge: "$100", status: [true, true, false, false, false, false, false, false, false, false, false, false] },
    { name: "Ibrahim Khalil", pledge: "$300", status: [true, true, true, true, true, true, false, false, false, false, false, false] },
    { name: "Maryam Siddiqua", pledge: "$250", status: [true, true, true, true, false, false, false, false, false, false, false, false] },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Monthly Donations" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Donation Tracking Grid</h1>
                <p className="mt-1 text-zinc-500">Monitor recurring pledges and annual fulfillment status matrix.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-white text-zinc-700 border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 transition-all active:scale-95 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>
                <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  Add Pledge
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-zinc-100 bg-zinc-50/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-8 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-emerald-500 rounded-sm"></div>
                    <span>Received</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 bg-zinc-200 rounded-sm"></div>
                    <span>Pending</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Fiscal Year 2024
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50/50 text-[10px] uppercase font-bold text-zinc-500 tracking-widest border-b border-zinc-100">
                      <th className="px-8 py-5 min-w-[200px] sticky left-0 bg-zinc-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Donor Name</th>
                      <th className="px-6 py-5">Pledge</th>
                      {months.map(month => (
                        <th key={month} className="px-4 py-5 text-center">{month}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {donors.map((donor, i) => (
                      <tr key={i} className="hover:bg-zinc-50/30 transition-colors">
                        <td className="px-8 py-5 font-bold text-zinc-800 sticky left-0 bg-white z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">{donor.name}</td>
                        <td className="px-6 py-5 font-medium text-emerald-700">{donor.pledge}</td>
                        {donor.status.map((paid, j) => (
                          <td key={j} className="px-4 py-5">
                            <div className={`mx-auto h-8 w-8 rounded-lg flex items-center justify-center transition-all ${
                              paid 
                                ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50' 
                                : 'bg-zinc-100 text-zinc-300 hover:bg-zinc-200 cursor-pointer'
                            }`}>
                              {paid ? (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-[10px] font-bold">+</span>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-600/20">
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Total Collected</p>
                 <h3 className="text-3xl font-bold">$14,250</h3>
                 <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white w-3/4"></div>
                 </div>
                 <p className="mt-2 text-xs font-medium">75% of annual goal</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                 <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Active Pledges</p>
                 <h3 className="text-3xl font-bold text-zinc-900">142</h3>
                 <p className="mt-2 text-xs text-emerald-600 font-bold">+12 this month</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                 <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Average Monthly</p>
                 <h3 className="text-3xl font-bold text-zinc-900">$2,450</h3>
                 <p className="mt-2 text-xs text-zinc-500 font-medium">Verified by audit</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                 <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Outstanding</p>
                 <h3 className="text-3xl font-bold text-zinc-900">$3,200</h3>
                 <p className="mt-2 text-xs text-amber-600 font-bold">Follow up required</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
