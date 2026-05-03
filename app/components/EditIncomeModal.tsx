"use client";

import { useState, useEffect } from "react";
import { api } from "../lib/api";

interface EditIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  masjidId: string;
  initialData: any;
}

export default function EditIncomeModal({ isOpen, onClose, onSuccess, masjidId, initialData }: EditIncomeModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'General Donation',
    income_date: new Date().toISOString().split('T')[0],
    source: '',
    payment_method: 'Cash',
    reference_number: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        amount: initialData.amount || '',
        category: initialData.category || 'General Donation',
        income_date: initialData.income_date || new Date().toISOString().split('T')[0],
        source: initialData.source || '',
        payment_method: initialData.payment_method || 'Cash',
        reference_number: initialData.reference_number || '',
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/income/${initialData.id}`, {
        ...formData,
        amount: parseFloat(formData.amount),
        masjid_id: masjidId
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update income record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
          <h2 className="text-xl font-bold text-zinc-900">Edit Income</h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Title/Description</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="e.g., Friday Jumu'ah Collection" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Amount (USD)</label>
              <input required type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Date</label>
              <input required type="date" name="income_date" value={formData.income_date} onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                <option value="General Donation">General Donation</option>
                <option value="Zakat">Zakat</option>
                <option value="Sadaqah">Sadaqah</option>
                <option value="Friday Collection">Friday Collection</option>
                <option value="Event Ticket">Event Ticket</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Payment Method</label>
              <select name="payment_method" value={formData.payment_method} onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Check">Check</option>
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Source (Optional)</label>
              <input type="text" name="source" value={formData.source} onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" placeholder="e.g., Online Portal, Collection Box" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-zinc-600 bg-white border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center">
              {loading ? 'Saving...' : 'Update Income'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
