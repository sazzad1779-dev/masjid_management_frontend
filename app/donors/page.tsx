"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { api } from "../lib/api";

interface Donor {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  address?: string;
  monthly_pledge_amount: number;
  pledge_currency: string;
  pledge_start_date: string;
  pledge_end_date?: string;
  payment_method: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
}

const EMPTY_FORM = {
  full_name: "",
  phone: "",
  email: "",
  address: "",
  monthly_pledge_amount: "",
  pledge_currency: "BDT",
  pledge_start_date: new Date().toISOString().split("T")[0],
  pledge_end_date: "",
  payment_method: "Cash",
  notes: "",
  is_active: true,
};

// ── Donor form modal (Add / Edit) ────────────────────────────────────────────
function DonorModal({
  open, onClose, onSave, initial, title, loading, error,
}: {
  open: boolean; onClose: () => void; onSave: (d: any) => void;
  initial: typeof EMPTY_FORM; title: string; loading: boolean; error: string | null;
}) {
  const [form, setForm] = useState(initial);
  useEffect(() => { setForm(initial); }, [initial, open]);
  if (!open) return null;

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-8 pt-8 pb-4 border-b border-zinc-100 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-8 space-y-5">
          {error && <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label:"Full Name *", name:"full_name", type:"text", placeholder:"Abdullah Rahman" },
              { label:"Phone *", name:"phone", type:"text", placeholder:"+880 1711-000000" },
              { label:"Email", name:"email", type:"email", placeholder:"donor@email.com" },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5">{f.label}</label>
                <input {...f} value={(form as any)[f.name]} onChange={set}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Payment Method</label>
              <select name="payment_method" value={form.payment_method} onChange={set}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                <option>Cash</option><option>Bank Transfer</option><option>Mobile Banking</option><option>Cheque</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Monthly Pledge *</label>
              <input name="monthly_pledge_amount" type="number" min="0" value={form.monthly_pledge_amount} onChange={set} placeholder="500"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Currency</label>
              <select name="pledge_currency" value={form.pledge_currency} onChange={set}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                <option>BDT</option><option>USD</option><option>GBP</option><option>SAR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Pledge Start Date *</label>
              <input name="pledge_start_date" type="date" value={form.pledge_start_date} onChange={set}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Pledge End Date</label>
              <input name="pledge_end_date" type="date" value={form.pledge_end_date} onChange={set}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Address</label>
            <input name="address" value={form.address} onChange={set} placeholder="Dhaka, Bangladesh"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Notes</label>
            <textarea name="notes" rows={2} value={form.notes} onChange={set} placeholder="Optional notes..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"/>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-6 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
            <button onClick={() => onSave(form)} disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
              {loading && <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              {loading ? "Saving..." : "Save Donor"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Generic confirm dialog ───────────────────────────────────────────────────
function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel, danger, loading }: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; message: React.ReactNode; confirmLabel: string; danger?: boolean; loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className={`h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4 ${danger ? "bg-red-50" : "bg-emerald-50"}`}>
          {danger ? (
            <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          ) : (
            <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          )}
        </div>
        <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
        <p className="text-zinc-500 text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose} className="px-6 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={loading}
            className={`px-6 py-2.5 text-white font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-60 ${danger ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"}`}>
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toast banner ─────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold transition-all ${type === "success" ? "bg-emerald-600" : "bg-red-500"}`}>
      {type === "success"
        ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
        : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function DonorDirectoryPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masjidId, setMasjidId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") =>
    setToast({ message, type });

  const fetchDonors = useCallback(async (mid?: string) => {
    setLoading(true);
    setError(null);
    try {
      const id = mid || masjidId;
      if (!id) return;
      const data = await api.get<Donor[]>(`/donors/?masjid_id=${id}&limit=500`);
      setDonors(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  }, [masjidId]);

  useEffect(() => {
    (async () => {
      try {
        const user: any = await api.get("/auth/me");
        const mid = user.memberships?.[0]?.masjid_id;
        if (mid) { setMasjidId(mid); await fetchDonors(mid); }
        else { setError("Masjid ID not found."); setLoading(false); }
      } catch (err: any) {
        setError(err.message || "Authentication failed");
        setLoading(false);
      }
    })();
  }, []);

  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleAdd = async (formData: any) => {
    setModalLoading(true); setModalError(null);
    try {
      await api.post(`/donors/?masjid_id=${masjidId}`, {
        ...formData,
        monthly_pledge_amount: parseFloat(formData.monthly_pledge_amount),
        pledge_end_date: formData.pledge_end_date || null,
      });
      setAddOpen(false);
      showToast("Donor added successfully!");
      fetchDonors();
    } catch (err: any) { setModalError(err.message || "Failed to add donor"); }
    finally { setModalLoading(false); }
  };

  const handleEdit = async (formData: any) => {
    if (!selectedDonor) return;
    setModalLoading(true); setModalError(null);
    try {
      await api.put(`/donors/${selectedDonor.id}?masjid_id=${masjidId}`, {
        ...formData,
        monthly_pledge_amount: parseFloat(formData.monthly_pledge_amount),
        pledge_end_date: formData.pledge_end_date || null,
      });
      setEditOpen(false);
      showToast("Donor updated successfully!");
      fetchDonors();
    } catch (err: any) { setModalError(err.message || "Failed to update donor"); }
    finally { setModalLoading(false); }
  };

  const handleDeactivate = async () => {
    if (!selectedDonor) return;
    setModalLoading(true);
    try {
      await api.delete(`/donors/${selectedDonor.id}?masjid_id=${masjidId}`);
      setDeactivateOpen(false);
      showToast(`${selectedDonor.full_name} has been deactivated.`);
      fetchDonors();
    } catch (err: any) { showToast(err.message || "Failed to deactivate", "error"); }
    finally { setModalLoading(false); }
  };

  const handleActivate = async () => {
    if (!selectedDonor) return;
    setModalLoading(true);
    try {
      await api.post(`/donors/${selectedDonor.id}/activate?masjid_id=${masjidId}`, {});
      setActivateOpen(false);
      showToast(`${selectedDonor.full_name} has been re-activated!`);
      fetchDonors();
    } catch (err: any) { showToast(err.message || "Failed to activate", "error"); }
    finally { setModalLoading(false); }
  };

  const handleHardDelete = async () => {
    if (!selectedDonor) return;
    setModalLoading(true);
    try {
      await api.delete(`/donors/${selectedDonor.id}/hard?masjid_id=${masjidId}`);
      setDeleteOpen(false);
      showToast(`${selectedDonor.full_name} permanently deleted.`);
      fetchDonors();
    } catch (err: any) { showToast(err.message || "Failed to delete", "error"); }
    finally { setModalLoading(false); }
  };

  // ── Derived data ───────────────────────────────────────────────────────────
  const filtered = donors.filter((d) => {
    const matchSearch =
      !search ||
      d.full_name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      (d.email || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && d.is_active) ||
      (statusFilter === "inactive" && !d.is_active);
    return matchSearch && matchStatus;
  });

  const totalPledge = donors.filter((d) => d.is_active).reduce((sum, d) => sum + d.monthly_pledge_amount, 0);
  const editInitial = selectedDonor
    ? {
        full_name: selectedDonor.full_name,
        phone: selectedDonor.phone,
        email: selectedDonor.email || "",
        address: selectedDonor.address || "",
        monthly_pledge_amount: String(selectedDonor.monthly_pledge_amount),
        pledge_currency: selectedDonor.pledge_currency,
        pledge_start_date: selectedDonor.pledge_start_date,
        pledge_end_date: selectedDonor.pledge_end_date || "",
        payment_method: selectedDonor.payment_method,
        notes: selectedDonor.notes || "",
        is_active: selectedDonor.is_active,
      }
    : EMPTY_FORM;

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Donor Directory" />
        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Registered Donors</h1>
                <p className="mt-1 text-zinc-500">Manage community contributions and donor engagement.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => fetchDonors()}
                  className="p-2.5 bg-white border border-zinc-200 text-zinc-500 rounded-xl hover:text-emerald-600 transition-colors shadow-sm" title="Refresh">
                  <svg className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <button onClick={() => { setModalError(null); setAddOpen(true); }}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                  Add Donor
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label:"Total Donors", value: donors.length, color:"text-zinc-900" },
                { label:"Active", value: donors.filter(d=>d.is_active).length, color:"text-emerald-600" },
                { label:"Inactive", value: donors.filter(d=>!d.is_active).length, color:"text-red-500" },
                { label:"Monthly Pledges", value: `${totalPledge.toLocaleString()}`, color:"text-emerald-700" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[220px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Search by name, phone or email..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                <option value="all">All Donors</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {error}
              </div>
            )}

            {/* Donor Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm animate-pulse">
                    <div className="h-12 w-12 bg-zinc-100 rounded-full mb-4"/>
                    <div className="h-4 bg-zinc-100 rounded w-3/4 mb-2"/>
                    <div className="h-3 bg-zinc-100 rounded w-1/2"/>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-zinc-400">
                <svg className="h-12 w-12 mx-auto mb-3 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p className="font-semibold">No donors found</p>
                <p className="text-sm mt-1">Add your first donor to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filtered.map(donor => (
                  <div key={donor.id} className={`bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all flex flex-col ${donor.is_active ? "border-zinc-100" : "border-red-100 opacity-80"}`}>
                    {/* Avatar + status */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ring-2 ${donor.is_active ? "bg-emerald-50 text-emerald-700 ring-emerald-100" : "bg-zinc-100 text-zinc-500 ring-zinc-200"}`}>
                        {donor.full_name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] uppercase font-black tracking-widest ${donor.is_active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                        {donor.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 leading-tight">{donor.full_name}</h3>
                    <p className="text-sm text-zinc-500 mb-0.5 truncate">{donor.email || "—"}</p>
                    <p className="text-sm text-zinc-400 mb-4">{donor.phone}</p>

                    <div className="space-y-2 pt-4 border-t border-zinc-50 mt-auto">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400 font-bold uppercase tracking-wider">Monthly Pledge</span>
                        <span className="text-zinc-900 font-bold">{donor.monthly_pledge_amount.toLocaleString()} {donor.pledge_currency}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400 font-bold uppercase tracking-wider">Method</span>
                        <span className="text-zinc-700 font-semibold">{donor.payment_method}</span>
                      </div>
                    </div>

                    {/* Action buttons row */}
                    <div className="grid grid-cols-3 gap-1.5 mt-5">
                      {/* Edit — always visible */}
                      <button onClick={() => { setSelectedDonor(donor); setModalError(null); setEditOpen(true); }}
                        className="py-2 text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors uppercase tracking-wide">
                        Edit
                      </button>

                      {/* Activate / Deactivate toggle */}
                      {donor.is_active ? (
                        <button onClick={() => { setSelectedDonor(donor); setDeactivateOpen(true); }}
                          className="py-2 text-[11px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors uppercase tracking-wide">
                          Deactivate
                        </button>
                      ) : (
                        <button onClick={() => { setSelectedDonor(donor); setActivateOpen(true); }}
                          className="py-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors uppercase tracking-wide">
                          Activate
                        </button>
                      )}

                      {/* Hard Delete */}
                      <button onClick={() => { setSelectedDonor(donor); setDeleteOpen(true); }}
                        className="py-2 text-[11px] font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors uppercase tracking-wide">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Modals ── */}
      <DonorModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAdd}
        initial={EMPTY_FORM} title="Add New Donor" loading={modalLoading} error={modalError}/>

      <DonorModal open={editOpen} onClose={() => setEditOpen(false)} onSave={handleEdit}
        initial={editInitial} title={`Edit — ${selectedDonor?.full_name || ""}`} loading={modalLoading} error={modalError}/>

      <ConfirmModal
        open={deactivateOpen} onClose={() => setDeactivateOpen(false)} onConfirm={handleDeactivate}
        title="Deactivate Donor" confirmLabel="Deactivate" danger loading={modalLoading}
        message={<>Are you sure you want to deactivate <strong className="text-zinc-800">{selectedDonor?.full_name}</strong>? They will be hidden from active lists but their records are kept.</>}
      />

      <ConfirmModal
        open={activateOpen} onClose={() => setActivateOpen(false)} onConfirm={handleActivate}
        title="Re-activate Donor" confirmLabel="Activate" loading={modalLoading}
        message={<>Re-activate <strong className="text-zinc-800">{selectedDonor?.full_name}</strong>? They will appear in active donor lists again.</>}
      />

      <ConfirmModal
        open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleHardDelete}
        title="Permanently Delete Donor" confirmLabel="Delete Permanently" danger loading={modalLoading}
        message={<>This will <strong className="text-red-600">permanently delete</strong> <strong className="text-zinc-800">{selectedDonor?.full_name}</strong> and all associated data. This action cannot be undone.</>}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>}
    </div>
  );
}
