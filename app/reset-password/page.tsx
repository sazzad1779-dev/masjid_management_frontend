"use client";

import React from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
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

        {/* Reset Password Card */}
        <div className="login-card p-8 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Reset Your Password
            </h2>
            <p className="text-text-muted text-sm">
              Please enter your new password below.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-primary mb-2"
              >
                New Password
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
                className="block text-sm font-semibold text-text-primary mb-2"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full primary-button flex justify-center items-center"
            >
              Update Password
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-text-muted">
              Changed your mind?{" "}
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
