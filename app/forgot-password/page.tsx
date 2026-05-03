"use client";

import React from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
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

        {/* Forgot Password Card */}
        <div className="login-card p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Forgot Password?
            </h2>
            <p className="text-text-muted text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary mb-2"
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

            <button
              type="submit"
              className="w-full primary-button flex justify-center items-center"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-text-muted">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-10 text-center">
          <p className="text-xs text-text-muted">
            &copy; 2026 Smart Masjid Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
