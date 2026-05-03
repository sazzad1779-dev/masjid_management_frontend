"use client";

import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full mx-auto max-w-md">
        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Smart Masjid
          </h1>
          <p className="text-text-secondary font-medium tracking-wide text-xs">
            MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Register Card */}
        <div className="login-card p-8 md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Register Your Institution
            </h2>
            <p className="text-text-muted text-sm px-4">
              Join the network of modern masjids and streamline your institutional administration.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="institution-name"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Institution Name
              </label>
              <input
                id="institution-name"
                type="text"
                placeholder="e.g. Al-Falah Islamic Center"
                className="input-field"
                required
              />
            </div>

            <div>
              <label
                htmlFor="admin-name"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Administrator Name
              </label>
              <input
                id="admin-name"
                type="text"
                placeholder="Full Name"
                className="input-field"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Institutional Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="contact@masjid.org"
                className="input-field"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Security Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full primary-button flex justify-center items-center py-3"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-text-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Sign In to Portal
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-10 text-center">
          <p className="text-xs text-text-muted">
            &copy; 2026 Smart Masjid Management System. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="#" className="text-xs text-text-muted hover:text-primary">Terms</Link>
            <Link href="#" className="text-xs text-text-muted hover:text-primary">Privacy</Link>
            <Link href="#" className="text-xs text-text-muted hover:text-primary">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
