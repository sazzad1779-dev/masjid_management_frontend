import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function AccountsPage() {
  const accounts = [
    {
      name: "Bank Account",
      type: "Primary Institution Account",
      balance: "$24,500.00",
      status: "Active",
      icon: (
        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
    },
    {
      name: "Cash Box",
      type: "Petty Cash & Daily Collections",
      balance: "$1,240.50",
      status: "Active",
      icon: (
        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      name: "Mobile Banking",
      type: "Digital Donations Portal",
      balance: "$8,320.00",
      status: "Active",
      icon: (
        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Financial Accounts" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Account Management</h1>
              <p className="mt-1 text-zinc-500">Monitor real-time balances and manage fund transfers across all institutional repositories.</p>
            </div>

            {/* Account Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <div key={account.name} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-600 transition-colors">
                      <div className="group-hover:text-white transition-colors">
                        {account.icon}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded tracking-wider">
                      {account.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900">{account.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4">{account.type}</p>
                  <div className="pt-4 border-t border-zinc-50">
                    <p className="text-2xl font-bold text-zinc-900">{account.balance}</p>
                    <button className="mt-4 w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-100">
                      View Ledger
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions & History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Initiate Transfer</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">From Account</label>
                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none">
                      <option>Cash Box</option>
                      <option>Bank Account</option>
                      <option>Mobile Banking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">To Account</label>
                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none">
                      <option>Bank Account</option>
                      <option>Cash Box</option>
                      <option>Mobile Banking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">Amount ($)</label>
                    <input type="number" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="0.00" />
                  </div>
                  <button type="submit" className="w-full px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 mt-4">
                    Confirm Transfer
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                  <h3 className="text-lg font-bold text-zinc-900">Reconciliation History</h3>
                  <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Export PDF</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-100 text-[10px] uppercase font-bold text-zinc-400 tracking-widest bg-white">
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Method</th>
                        <th className="px-8 py-4">Amount</th>
                        <th className="px-8 py-4">Admin</th>
                        <th className="px-8 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {[
                        { date: "May 02, 2024", method: "Internal Transfer", amount: "$1,200.00", admin: "S. Malik", status: "Verified" },
                        { date: "Apr 28, 2024", method: "Bank Deposit", amount: "$4,500.00", admin: "S. Malik", status: "Verified" },
                        { date: "Apr 15, 2024", method: "Petty Cash Sync", amount: "$240.00", admin: "A. Rahman", status: "Pending" },
                        { date: "Apr 02, 2024", method: "Mobile App Payout", amount: "$8,930.00", admin: "S. Malik", status: "Verified" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-4 text-sm font-medium text-zinc-900">{row.date}</td>
                          <td className="px-8 py-4 text-sm text-zinc-600">{row.method}</td>
                          <td className="px-8 py-4 text-sm font-bold text-zinc-900">{row.amount}</td>
                          <td className="px-8 py-4 text-sm text-zinc-500">{row.admin}</td>
                          <td className="px-8 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              row.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
