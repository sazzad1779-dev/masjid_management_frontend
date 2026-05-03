"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AddExpenseModal from "../components/AddExpenseModal";
import EditExpenseModal from "../components/EditExpenseModal";
import { api } from "../lib/api";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  vendor?: string;
  payment_method: string;
  is_deleted: boolean;
}

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masjidId, setMasjidId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const user: any = await api.get('/auth/me');
      const fetchedMasjidId = user.memberships?.[0]?.masjid_id;
      
      if (fetchedMasjidId) {
        setMasjidId(fetchedMasjidId);
        const data = await api.get<Expense[]>(`/expense/?masjid_id=${fetchedMasjidId}`);
        setExpenses(data);
      } else {
        setError("Masjid ID not found for current user.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch expense records");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense record?')) {
      try {
        await api.delete(`/expense/${id}`);
        fetchExpenses();
      } catch (err: any) {
        alert(err.message || "Failed to delete record");
      }
    }
  };

  const openEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
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
        <AdminHeader title="Expense Records" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Manage Expenses</h1>
                <p className="mt-1 text-zinc-500">Log and monitor masjid expenditures.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl font-semibold shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 transition-all active:scale-95"
              >
                + Log New Expense
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-wrap gap-4 items-center">
              <input type="text" placeholder="Search categories or vendors..." className="flex-1 min-w-[250px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                <option>All Accounts</option>
                <option>General Fund</option>
                <option>Petty Cash</option>
                <option>Imam Fund</option>
              </select>
              <input type="date" className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-zinc-500">Loading records...</p>
                </div>
              ) : error ? (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-red-500 mb-4">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-medium">{error}</p>
                  <button onClick={fetchExpenses} className="mt-4 text-emerald-600 font-semibold hover:underline">Try Again</button>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Vendor/Title</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Method</th>
                      <th className="px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {expenses.length > 0 ? expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-zinc-600">{expense.expense_date}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold">{expense.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-zinc-900">{expense.vendor || expense.title}</td>
                        <td className="px-6 py-4 text-sm font-bold text-rose-600">{formatCurrency(expense.amount)}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-medium text-zinc-600">{expense.payment_method}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openEditModal(expense)} className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors" title="Edit">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button onClick={() => handleDelete(expense.id)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors" title="Delete">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                          No expense records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500 font-medium">Showing {expenses.length} records</p>
              <div className="flex gap-2">
                <button className="px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-400 cursor-not-allowed">Previous</button>
                <button className="px-4 py-2.5 border border-zinc-200 rounded-xl text-sm font-semibold text-zinc-400 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {masjidId && (
        <AddExpenseModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchExpenses}
          masjidId={masjidId}
        />
      )}

      {masjidId && editingExpense && (
        <EditExpenseModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={fetchExpenses}
          masjidId={masjidId}
          initialData={editingExpense}
        />
      )}
    </div>
  );
}
