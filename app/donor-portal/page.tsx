import Link from "next/link";

export default function DonorPortalPage() {
  const myDonations = [
    { id: 1, date: "April 15, 2024", amount: "$100", category: "Monthly Pledge", method: "Direct Debit" },
    { id: 2, date: "March 12, 2024", amount: "$100", category: "Monthly Pledge", method: "Direct Debit" },
    { id: 3, date: "February 10, 2024", amount: "$50", category: "Zakat-ul-Maal", method: "Online" },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9ff] font-sans">
      {/* Navigation */}
      <nav className="h-16 bg-white border-b border-zinc-100 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="font-black text-zinc-900 uppercase tracking-tighter text-lg">Donor Portal</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/transparency" className="text-sm font-bold text-zinc-500 hover:text-emerald-600 transition-colors uppercase tracking-widest">Transparency</Link>
          <div className="h-10 w-10 rounded-full bg-zinc-100 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah" alt="User" />
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-8 space-y-12">
        {/* Welcome Hero */}
        <div className="bg-emerald-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-600/20">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 -mr-12" />
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl font-black tracking-tight">Assalam-o-Alaikum, Abdullah!</h1>
            <p className="text-emerald-50 text-lg font-medium max-w-xl">Your contributions empower our community. JazakAllah Khair for your continuous support.</p>
            <div className="pt-4 flex gap-4">
              <button className="px-8 py-3 bg-white text-emerald-700 rounded-xl font-bold shadow-lg hover:bg-emerald-50 transition-all active:scale-95">Donate Now</button>
              <button className="px-8 py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-all">Update Pledge</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Stats */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-black text-zinc-900 uppercase tracking-widest mb-6">Giving Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Contributed</p>
                  <p className="text-4xl font-black text-zinc-900 tracking-tighter">$5,400.00</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Active Pledge</p>
                  <p className="text-4xl font-black text-emerald-600 tracking-tighter">$100/mo</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-black text-zinc-900 uppercase tracking-widest mb-6">Recent History</h2>
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Date</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Category</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {myDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-zinc-500">{d.date}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-zinc-900">{d.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-black text-emerald-600">{d.amount}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm underline decoration-emerald-200 underline-offset-4 tracking-tight">PDF</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-zinc-900 uppercase tracking-widest">My Impact</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-900">Masjid Expansion</p>
                    <p className="text-xs text-zinc-500">Your Zakat helped fund the new prayer hall extension.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-zinc-900">Education Fund</p>
                    <p className="text-xs text-zinc-500">Sponsored 5 students for the annual Quran competition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
