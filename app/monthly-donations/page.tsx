"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { api } from "../lib/api";

interface Donor {
  id: string;
  full_name: string;
  monthly_pledge_amount: number;
  pledge_currency: string;
  is_active: boolean;
}

interface DonationRecord {
  id: string;
  donor_id: string;
  month: string;
  pledged_amount: number;
  paid_amount: number;
  status: "pending" | "paid" | "overdue" | "partial";
}

interface Account {
  id: string;
  account_name: string;
}

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold ${type === "success" ? "bg-emerald-600" : "bg-red-500"}`}>
      {type === "success"
        ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

// ── Verify Payment Modal ───────────────────────────────────────────────────────
function VerifyModal({ open, onClose, onVerify, donorName, month, pledged, accounts, loading, error }: {
  open: boolean; onClose: () => void; onVerify: (d: any) => void;
  donorName: string; month: string; pledged: number;
  accounts: Account[]; loading: boolean; error: string | null;
}) {
  const [form, setForm] = useState({
    paid_amount: String(pledged),
    payment_date: new Date().toISOString().split("T")[0],
    payment_method: "Cash",
    account_id: accounts[0]?.id || "",
    reference_number: "",
    verification_note: "",
  });

  useEffect(() => {
    if (open) {
      setForm(f => ({
        ...f,
        paid_amount: String(pledged),
        account_id: accounts[0]?.id || f.account_id,
      }));
    }
  }, [pledged, open, accounts]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="px-8 pt-8 pb-4 border-b border-zinc-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Record Payment</h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              <span className="font-semibold text-zinc-700">{donorName}</span>
              <span className="mx-2 text-zinc-300">·</span>
              <span className="font-semibold text-emerald-700">{month}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 text-sm">
            <span className="text-zinc-600 font-medium">Pledged amount</span>
            <span className="font-bold text-emerald-700">{pledged.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Paid Amount *</label>
              <input type="number" step="0.01" min="0" value={form.paid_amount}
                onChange={e => setForm(f => ({ ...f, paid_amount: e.target.value }))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Pay Date *</label>
              <input type="date" value={form.payment_date}
                onChange={e => setForm(f => ({ ...f, payment_date: e.target.value }))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Payment Method *</label>
            <select value={form.payment_method} onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Mobile Banking</option>
              <option>Cheque</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              Account *
              {accounts.length === 0 && <span className="text-red-400 font-normal ml-1">(no accounts — add one first)</span>}
            </label>
            <select value={form.account_id} onChange={e => setForm(f => ({ ...f, account_id: e.target.value }))}
              disabled={accounts.length === 0}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-60">
              <option value="">— Select Account —</option>
              {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Reference No. <span className="font-normal text-zinc-400">(optional)</span></label>
            <input value={form.reference_number} onChange={e => setForm(f => ({ ...f, reference_number: e.target.value }))}
              placeholder="TXN-..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors text-sm">Cancel</button>
            <button onClick={() => onVerify(form)}
              disabled={loading || !form.account_id || !form.paid_amount || !form.payment_date}
              className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center gap-2">
              {loading && <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
              {loading ? "Saving..." : "Record Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Generate Modal ─────────────────────────────────────────────────────────────
function GenerateModal({ open, onClose, onGenerate, loading }: {
  open: boolean; onClose: () => void; onGenerate: (m: string) => void; loading: boolean;
}) {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-1">Generate Monthly Pledges</h2>
        <p className="text-sm text-zinc-500 mb-6">Creates a pending record for all active donors. Skips months that already have records.</p>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Month *</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
          <button onClick={() => onGenerate(month)} disabled={loading || !month}
            className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
            {loading && <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function MonthlyDonationsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [allRecords, setAllRecords] = useState<DonationRecord[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const masjidIdRef = useRef<string | null>(null);
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear());
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Verify modal state
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [verifyCtx, setVerifyCtx] = useState<{ record: DonationRecord; donorName: string } | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => setToast({ message, type });

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthKeys = (year: number) =>
    months.map((_, i) => `${year}-${String(i + 1).padStart(2, "0")}`);

  // ── fetch all 12 months for the given year ─────────────────────────────────
  const fetchAllData = useCallback(async (mid: string, year: number) => {
    setLoading(true);
    setError(null);
    try {
      const keys = monthKeys(year);
      const results = await Promise.all(
        keys.map(m => api.get<DonationRecord[]>(`/donations/?masjid_id=${mid}&month=${m}&limit=500`).catch(() => [] as DonationRecord[]))
      );
      setAllRecords(results.flat());
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const user: any = await api.get("/auth/me");
        const mid = user.memberships?.[0]?.masjid_id;
        if (mid) {
          masjidIdRef.current = mid;
          const [donorList, accountList] = await Promise.all([
            api.get<Donor[]>(`/donors/?masjid_id=${mid}&limit=500`),
            api.get<Account[]>(`/accounts/?masjid_id=${mid}`),
          ]);
          setDonors(donorList.filter(d => d.is_active));
          setAccounts(accountList);
          await fetchAllData(mid, new Date().getFullYear());
        } else {
          setError("Masjid ID not found.");
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message || "Authentication failed");
        setLoading(false);
      }
    })();
  }, []);

  const changeYear = (y: number) => {
    setFiscalYear(y);
    if (masjidIdRef.current) fetchAllData(masjidIdRef.current, y);
  };

  const getRecord = (donorId: string, mk: string) =>
    allRecords.find(r => r.donor_id === donorId && r.month === mk);

  const openVerify = (donor: Donor, mk: string) => {
    const record = getRecord(donor.id, mk);
    if (record && record.status !== "paid") {
      setVerifyCtx({ record, donorName: donor.full_name });
      setModalError(null);
      setVerifyOpen(true);
    }
  };

  const handleVerify = async (formData: any) => {
    if (!verifyCtx) return;
    const mid = masjidIdRef.current;
    if (!mid) return;
    setModalLoading(true);
    setModalError(null);
    try {
      await api.put(`/donations/${verifyCtx.record.id}/verify?masjid_id=${mid}`, {
        paid_amount:       parseFloat(formData.paid_amount),
        payment_date:      formData.payment_date,
        payment_method:    formData.payment_method,
        account_id:        formData.account_id,
        reference_number:  formData.reference_number || null,
        verification_note: formData.verification_note || null,
      });
      setVerifyOpen(false);
      showToast("Payment recorded successfully!");
      await fetchAllData(mid, fiscalYear);
    } catch (err: any) {
      setModalError(err.message || "Failed to record payment");
    } finally {
      setModalLoading(false);
    }
  };

  const handleGenerate = async (month: string) => {
    const mid = masjidIdRef.current;
    if (!mid) return;
    setModalLoading(true);
    try {
      const result = await api.post<DonationRecord[]>(`/donations/generate?masjid_id=${mid}`, { month });
      setGenerateOpen(false);
      // Only refresh the grid if the generated month falls within the current fiscal year view
      const y = parseInt(month.split("-")[0]);
      if (y === fiscalYear) await fetchAllData(mid, fiscalYear);
      const msg = result.length > 0
        ? `Generated ${result.length} bill(s) for ${month}.`
        : `Bills for ${month} already exist — no new records created.`;
      showToast(msg);
    } catch (err: any) {
      showToast(err.message || "Failed to generate bills", "error");
    } finally {
      setModalLoading(false);
    }
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalCollected = allRecords.filter(r => r.status === "paid").reduce((s, r) => s + r.paid_amount, 0);
  const totalPledged   = allRecords.reduce((s, r) => s + r.pledged_amount, 0);
  const outstanding    = totalPledged - totalCollected;

  const cellStyle = (donor: Donor, mk: string) => {
    const r = getRecord(donor.id, mk);
    if (!r)                    return { cls: "bg-zinc-100 text-zinc-300 cursor-default",                            label: "·", clickable: false };
    if (r.status === "paid")   return { cls: "bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-50 cursor-default", label: "✓", clickable: false };
    if (r.status === "overdue") return { cls: "bg-red-100 text-red-500 hover:bg-red-200 cursor-pointer",             label: "!", clickable: true  };
    return                            { cls: "bg-amber-50 text-amber-600 hover:bg-amber-100 cursor-pointer border border-amber-200", label: "+", clickable: true };
  };

  const mks = monthKeys(fiscalYear);

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Monthly Donations" />
        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Donation Tracking Grid</h1>
                <p className="mt-1 text-zinc-500">Monitor recurring pledges and annual fulfillment status matrix.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {/* Year navigator */}
                <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm">
                  <button onClick={() => changeYear(fiscalYear - 1)}
                    className="text-zinc-400 hover:text-zinc-700 transition-colors px-1">‹</button>
                  <span className="text-emerald-700 font-bold min-w-[60px] text-center">{fiscalYear}</span>
                  <button onClick={() => changeYear(fiscalYear + 1)}
                    className="text-zinc-400 hover:text-zinc-700 transition-colors px-1">›</button>
                </div>
                <button onClick={() => masjidIdRef.current && fetchAllData(masjidIdRef.current, fiscalYear)}
                  className="p-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-400 hover:text-emerald-600 transition-colors shadow-sm">
                  <svg className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button onClick={() => setGenerateOpen(true)}
                  className="px-5 py-2.5 bg-white text-zinc-700 border border-zinc-200 rounded-xl font-semibold hover:bg-zinc-50 transition-all active:scale-95 shadow-sm flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Generate
                </button>
                <button onClick={() => {}}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  Export PDF
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </div>
            )}

            {/* Grid */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 bg-zinc-50/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-6 text-xs font-bold text-zinc-400 uppercase tracking-widest flex-wrap">
                  <div className="flex items-center gap-2"><div className="h-3 w-3 bg-emerald-500 rounded-sm" /><span>Paid</span></div>
                  <div className="flex items-center gap-2"><div className="h-3 w-3 bg-amber-400 rounded-sm" /><span>Pending</span></div>
                  <div className="flex items-center gap-2"><div className="h-3 w-3 bg-red-400 rounded-sm" /><span>Overdue</span></div>
                  <div className="flex items-center gap-2"><div className="h-3 w-3 bg-zinc-200 rounded-sm" /><span>No Record</span></div>
                </div>
                <p className="text-xs font-semibold text-zinc-400">Click amber/red cell to record payment</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50/50 text-[10px] uppercase font-bold text-zinc-500 tracking-widest border-b border-zinc-100">
                      <th className="px-8 py-5 min-w-[200px] sticky left-0 bg-zinc-50 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">Donor Name</th>
                      <th className="px-4 py-5 whitespace-nowrap">Pledge / Mo</th>
                      {months.map(m => (
                        <th key={m} className="px-3 py-5 text-center min-w-[52px]">{m}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {loading ? (
                      [1,2,3,4,5].map(i => (
                        <tr key={i}>
                          {[1,2,...Array(12).fill(0).map((_,j)=>j+3)].map(j => (
                            <td key={j} className="px-4 py-5"><div className="h-5 bg-zinc-100 rounded-lg animate-pulse"/></td>
                          ))}
                        </tr>
                      ))
                    ) : donors.length === 0 ? (
                      <tr>
                        <td colSpan={14} className="px-8 py-16 text-center text-zinc-400 text-sm">
                          No active donors found. Add donors first.
                        </td>
                      </tr>
                    ) : (
                      donors.map(donor => (
                        <tr key={donor.id} className="hover:bg-zinc-50/30 transition-colors">
                          <td className="px-8 py-5 font-bold text-zinc-800 sticky left-0 bg-white z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                            {donor.full_name}
                          </td>
                          <td className="px-4 py-5 text-sm font-semibold text-emerald-700 whitespace-nowrap">
                            {donor.monthly_pledge_amount.toLocaleString()} {donor.pledge_currency}
                          </td>
                          {mks.map((mk, i) => {
                            const { cls, label, clickable } = cellStyle(donor, mk);
                            return (
                              <td key={mk} className="px-3 py-5">
                                <div
                                  title={clickable ? `Click to record payment for ${months[i]}` : undefined}
                                  onClick={() => clickable && openVerify(donor, mk)}
                                  className={`mx-auto h-9 w-9 rounded-lg flex items-center justify-center font-bold text-xs transition-all select-none ${cls}`}>
                                  {label}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-600/20">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Total Collected</p>
                <h3 className="text-3xl font-bold">{totalCollected.toLocaleString()}</h3>
                <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all" style={{ width: totalPledged > 0 ? `${Math.min((totalCollected / totalPledged) * 100, 100)}%` : "0%" }} />
                </div>
                <p className="mt-2 text-xs font-medium opacity-80">
                  {totalPledged > 0 ? `${Math.round((totalCollected / totalPledged) * 100)}%` : "0%"} of annual goal
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Active Pledgers</p>
                <h3 className="text-3xl font-bold text-zinc-900">{donors.length}</h3>
                <p className="mt-2 text-xs text-emerald-600 font-bold">Enrolled donors</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Pledged</p>
                <h3 className="text-3xl font-bold text-zinc-900">{totalPledged.toLocaleString()}</h3>
                <p className="mt-2 text-xs text-zinc-500 font-medium">Across {fiscalYear}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Outstanding</p>
                <h3 className={`text-3xl font-bold ${outstanding > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                  {outstanding.toLocaleString()}
                </h3>
                <p className="mt-2 text-xs text-amber-600 font-bold">{outstanding > 0 ? "Follow up required" : "All settled!"}</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      {verifyCtx && (
        <VerifyModal
          open={verifyOpen}
          onClose={() => setVerifyOpen(false)}
          onVerify={handleVerify}
          donorName={verifyCtx.donorName}
          month={verifyCtx.record.month}
          pledged={verifyCtx.record.pledged_amount}
          accounts={accounts}
          loading={modalLoading}
          error={modalError}
        />
      )}
      <GenerateModal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        onGenerate={handleGenerate}
        loading={modalLoading}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
