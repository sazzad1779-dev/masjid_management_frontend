"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { api } from "../lib/api";

interface DonationRecord {
  id: string;
  donor_id: string;
  month: string;
  pledged_amount: number;
  paid_amount: number;
  status: "pending" | "paid" | "overdue" | "partial";
  payment_date?: string;
  payment_method?: string;
  reference_number?: string;
  verification_note?: string;
}

interface Donor { id: string; full_name: string; monthly_pledge_amount: number; pledge_currency: string; }
interface Account { id: string; account_name: string; }

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: "success"|"error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-semibold ${type==="success" ? "bg-emerald-600" : "bg-red-500"}`}>
      {type==="success"
        ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
        : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

// ── Verify Payment Modal ───────────────────────────────────────────────────────
function VerifyModal({ open, onClose, onVerify, record, donors, accounts, loading, error }: {
  open: boolean; onClose: () => void; onVerify: (d: any) => void;
  record: DonationRecord | null; donors: Donor[]; accounts: Account[];
  loading: boolean; error: string | null;
}) {
  const [form, setForm] = useState({
    paid_amount: "", payment_date: new Date().toISOString().split("T")[0],
    payment_method: "Cash", account_id: "", reference_number: "", verification_note: "",
  });

  useEffect(() => {
    if (record) setForm(f => ({ ...f, paid_amount: String(record.pledged_amount), account_id: accounts[0]?.id || "" }));
  }, [record, open, accounts]);

  if (!open || !record) return null;

  const donorName = donors.find(d => d.id === record.donor_id)?.full_name || "—";
  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg">
        <div className="px-8 pt-8 pb-4 border-b border-zinc-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Verify Payment</h2>
            <p className="text-sm text-zinc-500 mt-0.5">
              <span className="font-semibold text-zinc-700">{donorName}</span>
              <span className="mx-2 text-zinc-300">·</span>
              <span className="font-semibold text-emerald-700">{record.month}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-8 space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">{error}</div>}

          {/* Pledged amount info */}
          <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 text-sm">
            <span className="text-zinc-600 font-medium">Pledged amount</span>
            <span className="font-bold text-emerald-700">{record.pledged_amount.toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Paid Amount *</label>
              <input name="paid_amount" type="number" min="0" step="0.01" value={form.paid_amount} onChange={set} required
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Payment Date *</label>
              <input name="payment_date" type="date" value={form.payment_date} onChange={set} required
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Payment Method *</label>
            <select name="payment_method" value={form.payment_method} onChange={set}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Mobile Banking</option>
              <option>Cheque</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">
              Deposit to Account *
              {accounts.length === 0 && <span className="text-red-500 font-normal ml-2">(No accounts found — please add an account first)</span>}
            </label>
            <select name="account_id" value={form.account_id} onChange={set} required disabled={accounts.length === 0}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-60">
              <option value="">— Select Account —</option>
              {accounts.map(a => <option key={a.id} value={a.id}>{a.account_name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Reference No. <span className="text-zinc-400 font-normal">(optional)</span></label>
            <input name="reference_number" value={form.reference_number} onChange={set} placeholder="TXN-12345"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Note <span className="text-zinc-400 font-normal">(optional)</span></label>
            <textarea name="verification_note" rows={2} value={form.verification_note} onChange={set}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"/>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
            <button onClick={() => onVerify(form)}
              disabled={loading || !form.account_id || !form.paid_amount || !form.payment_date}
              className="px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2">
              {loading && <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
              {loading ? "Saving..." : "Confirm Payment"}
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-1">Generate Monthly Bills</h2>
        <p className="text-sm text-zinc-500 mb-6">Creates a pending donation record for every active donor for the selected month (skips if already generated).</p>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Select Month *</label>
          <input type="month" value={month} onChange={e => setMonth(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"/>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 bg-zinc-100 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
          <button onClick={() => onGenerate(month)} disabled={loading || !month}
            className="px-5 py-2.5 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-60 flex items-center gap-2">
            {loading && <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
            {loading ? "Generating..." : "Generate Bills"}
          </button>
        </div>
      </div>
    </div>
  );
}

const STATUS_STYLE: Record<string, string> = {
  paid:    "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  overdue: "bg-red-50 text-red-600 border-red-100",
  partial: "bg-blue-50 text-blue-600 border-blue-100",
};

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function DonationsTrackingPage() {
  const [records, setRecords] = useState<DonationRecord[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [masjidId, setMasjidId] = useState<string | null>(null);
  // Keep month in a ref too so callbacks always read the latest value
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const selectedMonthRef = useRef(selectedMonth);
  const masjidIdRef = useRef<string | null>(null);
  const [toast, setToast] = useState<{message:string;type:"success"|"error"}|null>(null);

  // Modals
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DonationRecord | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const showToast = (message: string, type: "success"|"error" = "success") => setToast({ message, type });

  // ── Fetch records: always uses explicit params to avoid stale closures ───────
  const fetchRecords = async (mid: string, month: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<DonationRecord[]>(`/donations/?masjid_id=${mid}&month=${month}&limit=500`);
      setRecords(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch donation records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user: any = await api.get("/auth/me");
        const mid = user.memberships?.[0]?.masjid_id;
        if (mid) {
          setMasjidId(mid);
          masjidIdRef.current = mid;
          const [donorList, accountList] = await Promise.all([
            api.get<Donor[]>(`/donors/?masjid_id=${mid}&limit=500`),
            api.get<Account[]>(`/accounts/?masjid_id=${mid}`),
          ]);
          setDonors(donorList);
          setAccounts(accountList);
          await fetchRecords(mid, selectedMonthRef.current);
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

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    selectedMonthRef.current = month;
    if (masjidIdRef.current) fetchRecords(masjidIdRef.current, month);
  };

  // ── Generate bills ─────────────────────────────────────────────────────────
  const handleGenerate = async (month: string) => {
    if (!masjidIdRef.current) return;
    setModalLoading(true);
    try {
      const result = await api.post<DonationRecord[]>(`/donations/generate?masjid_id=${masjidIdRef.current}`, { month });
      setGenerateOpen(false);
      // Only refresh the list if the generated month matches the currently viewed month
      if (month === selectedMonthRef.current) {
        await fetchRecords(masjidIdRef.current, month);
      }
      const msg = result.length > 0
        ? `Generated ${result.length} bill(s) for ${month}.`
        : `Bills for ${month} were already generated (all donors already have records).`;
      showToast(msg, result.length > 0 ? "success" : "success");
    } catch (err: any) {
      showToast(err.message || "Failed to generate bills", "error");
    } finally {
      setModalLoading(false);
    }
  };

  // ── Verify payment ─────────────────────────────────────────────────────────
  const handleVerify = async (formData: any) => {
    if (!selectedRecord || !masjidIdRef.current) return;
    setModalLoading(true);
    setModalError(null);
    try {
      await api.put(`/donations/${selectedRecord.id}/verify?masjid_id=${masjidIdRef.current}`, {
        paid_amount:       parseFloat(formData.paid_amount),
        payment_date:      formData.payment_date,
        payment_method:    formData.payment_method,
        account_id:        formData.account_id,
        reference_number:  formData.reference_number || null,
        verification_note: formData.verification_note || null,
      });
      setVerifyOpen(false);
      showToast("Payment verified successfully!");
      await fetchRecords(masjidIdRef.current, selectedMonthRef.current);
    } catch (err: any) {
      setModalError(err.message || "Failed to verify payment");
    } finally {
      setModalLoading(false);
    }
  };

  // ── Export CSV ─────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const rows = [["Donor","Month","Pledged","Paid","Status","Payment Date","Method"]];
    records.forEach(r => rows.push([
      donors.find(d => d.id === r.donor_id)?.full_name || r.donor_id,
      r.month, String(r.pledged_amount), String(r.paid_amount),
      r.status, r.payment_date || "", r.payment_method || "",
    ]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([csv], { type:"text/csv" })),
      download: `donations-${selectedMonth}.csv`,
    });
    a.click();
  };

  const getDonorName = (id: string) => donors.find(d => d.id === id)?.full_name || id.slice(0,8)+"…";
  const paidCount   = records.filter(r => r.status === "paid").length;
  const pendingCount = records.filter(r => r.status !== "paid").length;
  const totalPaid    = records.filter(r => r.status === "paid").reduce((s, r) => s + r.paid_amount, 0);
  const totalPledged = records.reduce((s, r) => s + r.pledged_amount, 0);

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Monthly Tracking"/>
        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Donation Tracking Grid</h1>
                <p className="mt-1 text-zinc-500">Monitor recurring donation status across the community.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <input type="month" value={selectedMonth} onChange={e => handleMonthChange(e.target.value)}
                  className="bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"/>
                <button onClick={() => fetchRecords(masjidIdRef.current!, selectedMonthRef.current)}
                  className="p-2.5 bg-white border border-zinc-200 text-zinc-500 rounded-xl hover:text-emerald-600 transition-colors shadow-sm" title="Refresh">
                  <svg className={`h-5 w-5 ${loading?"animate-spin":""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </button>
                <button onClick={() => setGenerateOpen(true)}
                  className="px-5 py-2.5 bg-zinc-900 text-white rounded-xl font-semibold shadow-lg shadow-zinc-900/10 hover:bg-zinc-800 transition-all active:scale-95">
                  Generate Bills
                </button>
                <button onClick={exportCSV}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  Export CSV
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label:"Records", value: records.length, sub:`For ${selectedMonth}`, color:"text-zinc-900" },
                { label:"Paid", value: paidCount, sub:`${totalPaid.toLocaleString()} collected`, color:"text-emerald-600" },
                { label:"Pending / Overdue", value: pendingCount, sub:"Requires follow-up", color:"text-amber-600" },
                { label:"Collection Rate", value: totalPledged>0 ? `${Math.round((totalPaid/totalPledged)*100)}%` : "0%",
                  sub:`of ${totalPledged.toLocaleString()} pledged`, color:"text-emerald-700" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-zinc-400 mt-1">{s.sub}</p>
                </div>
              ))}
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {error}
              </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between gap-4 flex-wrap">
                <h3 className="font-bold text-zinc-900">Records — {selectedMonth}</h3>
                <div className="flex gap-6 text-xs font-bold text-zinc-400 uppercase tracking-widest flex-wrap">
                  {(["paid","pending","overdue","partial"] as const).map(s => (
                    <div key={s} className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-sm ${s==="paid"?"bg-emerald-500":s==="pending"?"bg-amber-400":s==="overdue"?"bg-red-500":"bg-blue-400"}`}/>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      {["Donor","Pledged","Paid","Status","Pay Date","Method","Action"].map((h,i) => (
                        <th key={h} className={`px-6 py-4 text-xs font-bold text-zinc-400 uppercase tracking-widest ${i===1||i===2?"text-right":i===3?"text-center":""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {loading ? (
                      [1,2,3,4].map(i => (
                        <tr key={i}>{[1,2,3,4,5,6,7].map(j => (
                          <td key={j} className="px-6 py-4"><div className="h-4 bg-zinc-100 rounded animate-pulse"/></td>
                        ))}</tr>
                      ))
                    ) : records.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-16 text-center text-zinc-400 text-sm">
                          No donation records for <strong>{selectedMonth}</strong>.
                          <br/>Click <strong>"Generate Bills"</strong> to create records for all active donors.
                        </td>
                      </tr>
                    ) : (
                      records.map(rec => (
                        <tr key={rec.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-zinc-900">{getDonorName(rec.donor_id)}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-zinc-700 text-right">{rec.pledged_amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-bold text-emerald-700 text-right">{rec.paid_amount > 0 ? rec.paid_amount.toLocaleString() : "—"}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-black tracking-widest border ${STATUS_STYLE[rec.status] || STATUS_STYLE.pending}`}>
                              {rec.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-500">
                            {rec.payment_date ? new Date(rec.payment_date).toLocaleDateString() : "—"}
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-500">{rec.payment_method || "—"}</td>
                          <td className="px-6 py-4 text-right">
                            {rec.status !== "paid" ? (
                              <button onClick={() => { setSelectedRecord(rec); setModalError(null); setVerifyOpen(true); }}
                                className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors uppercase tracking-wider">
                                Verify
                              </button>
                            ) : (
                              <span className="px-3 py-1.5 text-xs font-bold text-zinc-400 bg-zinc-50 rounded-lg uppercase tracking-wider">Done</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <VerifyModal
        open={verifyOpen} onClose={() => setVerifyOpen(false)} onVerify={handleVerify}
        record={selectedRecord} donors={donors} accounts={accounts}
        loading={modalLoading} error={modalError}
      />
      <GenerateModal
        open={generateOpen} onClose={() => setGenerateOpen(false)}
        onGenerate={handleGenerate} loading={modalLoading}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>}
    </div>
  );
}
