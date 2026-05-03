"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { api } from "../lib/api";

interface Account {
  id: string;
  account_name: string;
  account_type: string;
  bank_name?: string;
  account_number?: string;
  opening_balance: number;
  is_active: boolean;
}

interface Transfer {
  id: string;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  transfer_date: string;
  notes?: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const user: any = await api.get('/auth/me');
      const masjidId = user.memberships?.[0]?.masjid_id;
      
      if (masjidId) {
        const [accs, trans] = await Promise.all([
          api.get<Account[]>(`/accounts/?masjid_id=${masjidId}`),
          api.get<Transfer[]>(`/accounts/transfer?masjid_id=${masjidId}`)
        ]);
        setAccounts(accs);
        setTransfers(trans);
      } else {
        setError("Masjid ID not found for current user.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch account data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Financial Accounts" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Account Management</h1>
                <p className="mt-1 text-zinc-500">Monitor real-time balances and manage fund transfers across all institutional repositories.</p>
              </div>
              <button 
                onClick={fetchData} 
                className="p-2.5 text-zinc-400 hover:text-emerald-600 transition-colors bg-white rounded-xl border border-zinc-100 shadow-sm"
                title="Refresh Data"
              >
                <svg className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Account Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading && accounts.length === 0 ? (
                [1,2,3].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm animate-pulse h-48"></div>
                ))
              ) : (
                accounts.map((account) => (
                  <div key={account.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm transition-all hover:shadow-md group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-600 transition-colors">
                        <div className="group-hover:text-white transition-colors text-emerald-600">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded tracking-wider ${
                        account.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {account.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900">{account.account_name}</h3>
                    <p className="text-sm text-zinc-500 mb-4">{account.account_type}</p>
                    <div className="pt-4 border-t border-zinc-50">
                      <p className="text-2xl font-bold text-zinc-900">{formatCurrency(account.opening_balance)}</p>
                      <button className="mt-4 w-full py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-100">
                        View Ledger
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Actions & History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
                <h3 className="text-lg font-bold text-zinc-900 mb-6">Initiate Transfer</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">From Account</label>
                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none">
                      <option disabled value="">Select source</option>
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1">To Account</label>
                    <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none">
                      <option disabled value="">Select destination</option>
                      {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
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
                  <h3 className="text-lg font-bold text-zinc-900">Transfer History</h3>
                  <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Export PDF</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-100 text-[10px] uppercase font-bold text-zinc-400 tracking-widest bg-white">
                        <th className="px-8 py-4">Date</th>
                        <th className="px-8 py-4">Description</th>
                        <th className="px-8 py-4">Amount</th>
                        <th className="px-8 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {transfers.length > 0 ? transfers.map((row) => (
                        <tr key={row.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-4 text-sm font-medium text-zinc-900">{new Date(row.transfer_date).toLocaleDateString()}</td>
                          <td className="px-8 py-4 text-sm text-zinc-600">{row.notes || "Transfer"}</td>
                          <td className="px-8 py-4 text-sm font-bold text-zinc-900">{formatCurrency(row.amount)}</td>
                          <td className="px-8 py-4 text-right">
                            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                              Verified
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-12 text-center text-zinc-400 text-sm">No transfer history found.</td>
                        </tr>
                      )}
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
