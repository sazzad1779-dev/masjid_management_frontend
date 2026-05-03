"use client";

import Link from "next/link";
import SuperAdminSidebar from "../../components/SuperAdminSidebar";

export default function RegisterMasjidPage() {
  return (
    <div className="flex h-screen bg-[#050505] text-zinc-100 font-sans">
      <SuperAdminSidebar />


      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl px-12 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-6">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Institution Management</h2>
          </div>
        </header>

        <div className="p-12 max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Institutional Onboarding</h1>
            <p className="text-zinc-500 text-lg font-medium">New masjid registration and administrative setup.</p>
          </div>

          <form className="space-y-12 bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
            {/* Masjid Information */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">1</span>
                Masjid Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Masjid / Center Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Al-Noor Islamic Center"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Location / City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Country</label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Admin Information */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">2</span>
                Primary Administrator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Contact Name</label>
                  <input
                    type="text"
                    placeholder="Admin Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Institutional Email</label>
                  <input
                    type="email"
                    placeholder="admin@masjid.org"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all"
                    required
                  />
                </div>
              </div>
            </section>

            <div className="pt-8 border-t border-white/5 flex justify-end gap-4">
              <Link href="/super-admin/stats" className="px-8 py-3 rounded-xl font-bold text-sm text-zinc-500 hover:text-white transition-all">Cancel</Link>
              <button type="submit" className="px-10 py-3 bg-emerald-500 text-zinc-950 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
                Register Masjid
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
