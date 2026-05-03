"use client";

import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full mx-auto max-w-md">
        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Smart Masjid
          </h1>
          <p className="text-text-secondary font-medium tracking-wide">
            MANAGEMENT SYSTEM
          </p>
        </div>

        {/* Login Card */}
        <div className="login-card p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Secure Portal Access
            </h2>
            <p className="text-text-muted text-sm">
              Please enter your credentials to access the administrative dashboard.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary mb-2"
              >
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                placeholder="admin@masjid.org"
                className="input-field"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-text-primary"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-text-primary"
              >
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              className="w-full primary-button flex justify-center items-center"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-text-muted">
              First time here?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Register Your Institution
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
            <Link href="#" className="text-xs text-text-muted hover:text-primary">Security</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
