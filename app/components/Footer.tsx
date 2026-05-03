import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Smart Masjid Management System. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-zinc-600">
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
