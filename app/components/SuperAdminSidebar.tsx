"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const superNavItems = [
  {
    label: "Stats Overview",
    href: "/super-admin/stats",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Platform Analytics",
    href: "/super-admin/analytics",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Register Masjid",
    href: "/super-admin/register-masjid",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-900/50 flex flex-col shrink-0">
      <div className="h-20 px-8 flex items-center gap-4 border-b border-zinc-800">
        <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <svg className="h-6 w-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <span className="block font-black text-xl tracking-tighter uppercase text-zinc-100">Al-Noor</span>
          <span className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Super Admin</span>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-4">
        <div>
          <p className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Core Management</p>
          <div className="space-y-2">
            {superNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold shadow-lg shadow-emerald-500/5"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white border border-transparent"
                  }`}
                >
                  <div className={`${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"} transition-opacity`}>
                    {item.icon}
                  </div>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800">
          <p className="px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Infrastructure</p>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all group border border-transparent">
              <svg className="h-5 w-5 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-7-4h.01M11 16h.01" />
              </svg>
              Server Health
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all group border border-transparent">
              <svg className="h-5 w-5 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Identity Access
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6 mt-auto">
        <div className="p-4 bg-zinc-800/40 rounded-2xl border border-zinc-700/50">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Systems Operational
          </div>
        </div>
      </div>
    </aside>
  );
}
