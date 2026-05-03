import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Configuration" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-zinc-900">Masjid Settings</h1>

              {/* Settings Group: General */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-zinc-100">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">General Information</h3>
                  <p className="mt-1 text-sm text-zinc-500">Identity and contact details for the institution.</p>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-8 mb-6">
                    <div className="h-24 w-24 rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-200 flex items-center justify-center text-zinc-400">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">Institutional Logo</h4>
                      <p className="text-xs text-zinc-500 mb-3">Professional branding for receipts and portal.</p>
                      <button className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-lg hover:bg-zinc-800 transition-colors">Upload New Logo</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700">Masjid Name</label>
                      <input type="text" defaultValue="Grand Community Masjid" className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700">Contact Email</label>
                      <input type="email" defaultValue="admin@grandmasjid.org" className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700">Address</label>
                    <textarea rows={3} defaultValue="123 Community Lane, Spirit City, SC 45678" className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none" />
                  </div>
                </div>
              </div>

              {/* Settings Group: Prayer Times */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-zinc-100">
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Prayer & Jumuah Times</h3>
                  <p className="mt-1 text-sm text-zinc-500">Methodology and offsets for local congregation.</p>
                </div>
                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-zinc-50">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700">Calculation Method</label>
                      <select className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white">
                        <option>Islamic Society of North America (ISNA)</option>
                        <option>Muslim World League</option>
                        <option>Egyptian General Authority of Survey</option>
                        <option>Umm al-Qura University, Makkah</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-zinc-700">Jumuah Prayer Time</label>
                      <input type="text" defaultValue="1:30 PM" className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
                      <div key={prayer} className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase">{prayer} Offset</label>
                        <input type="number" defaultValue="0" className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <button className="px-5 py-2.5 text-sm font-semibold text-zinc-500 hover:text-zinc-700 transition-colors">Discard Changes</button>
                <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
