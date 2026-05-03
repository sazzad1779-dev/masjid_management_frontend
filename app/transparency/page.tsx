import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function TransparencyPage() {
  const recentTransactions = [
    { id: 1, type: "Income", category: "Friday Collection", amount: 4500, date: "2024-05-01" },
    { id: 2, type: "Expense", category: "Utility Bills", amount: 1200, date: "2024-04-28" },
    { id: 3, type: "Income", category: "General Donation", amount: 1500, date: "2024-04-25" },
    { id: 4, type: "Income", category: "Ramadan Fund", amount: 12000, date: "2024-04-20" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link - keeping it as it adds value for subpages */}
          <Link href="/" className="flex items-center gap-2 group mb-8 w-fit">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 shadow-emerald-600/20 shadow-md group-hover:scale-105 transition-transform">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-900">Back to Home</span>
          </Link>

          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">Financial Transparency</h1>
              <p className="mt-2 text-lg text-zinc-600">Real-time reporting on how our community funds are managed.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-zinc-100">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Income (Last 30 Days)</p>
                <p className="mt-4 text-4xl font-bold text-emerald-600">$18,000</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>12% from last month</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-zinc-100">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total Expenses (Last 30 Days)</p>
                <p className="mt-4 text-4xl font-bold text-zinc-900">$4,200</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500 font-medium">
                  <span>Within expected budget</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl bg-emerald-600 p-8 shadow-xl shadow-emerald-600/20 text-white">
                <p className="text-sm font-medium text-emerald-100 uppercase tracking-wider">Net Growth</p>
                <p className="mt-4 text-4xl font-bold">$13,800</p>
                <p className="mt-4 text-sm text-emerald-100">Strengthening our community foundations.</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-zinc-100">
              <div className="border-b border-zinc-100 px-8 py-6">
                <h2 className="text-xl font-bold text-zinc-900">Recent Transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50">
                      <th className="px-8 py-4 text-sm font-semibold text-zinc-600">Date</th>
                      <th className="px-8 py-4 text-sm font-semibold text-zinc-600">Category</th>
                      <th className="px-8 py-4 text-sm font-semibold text-zinc-600">Type</th>
                      <th className="px-8 py-4 text-sm font-semibold text-zinc-900 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-8 py-4 text-sm text-zinc-600">{tx.date}</td>
                        <td className="px-8 py-4 text-sm font-medium text-zinc-900">{tx.category}</td>
                        <td className="px-8 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            tx.type === 'Income' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-700'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className={`px-8 py-4 text-sm font-bold text-right ${
                          tx.type === 'Income' ? 'text-emerald-600' : 'text-zinc-900'
                        }`}>
                          {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-zinc-50 px-8 py-4 text-center">
                <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  View Full Annual Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

