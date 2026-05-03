import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  actions?: React.ReactNode;
}

export default function AdminHeader({ title, actions }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-zinc-200 bg-white px-8 flex items-center justify-between shrink-0">
      <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-tight">{title}</h2>
      <div className="flex items-center gap-4">
        {actions}
        <Link href="/notifications" className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors relative">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Link>
        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white shadow-sm">
          <span className="text-emerald-700 font-bold text-sm">SA</span>
        </div>
      </div>
    </header>
  );
}
