"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-600/20">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900">Smart Masjid</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/transparency" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Transparency</Link>
          <Link href="/services" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Services</Link>
          <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-semibold text-zinc-900 hover:text-emerald-600 transition-colors">Sign in</Link>
          <Link href="/register" className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98]">
            Register Masjid
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white p-4 space-y-4">
          <Link href="/transparency" className="block text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Transparency</Link>
          <Link href="/services" className="block text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Services</Link>
          <Link href="/about" className="block text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">About</Link>
          <div className="pt-4 border-t border-zinc-100">
            <Link href="/login" className="block text-sm font-semibold text-zinc-900 hover:text-emerald-600 transition-colors">Sign in</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
