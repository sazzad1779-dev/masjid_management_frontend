"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for message in URL on mount
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const msg = params.get("message");
      if (msg) {
        setSuccessMessage(msg);
        // Optional: clear the url without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

      const response = await fetch(`${API_BASE_URL}/auth/login/access-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail || "Login failed - please check your credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      
      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
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
        <div className="login-card p-8 md:p-10 bg-white shadow-sm rounded-xl border border-slate-200">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">
              Secure Portal Access
            </h2>
            <p className="text-text-muted text-sm">
              Please enter your credentials to access the administrative dashboard.
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg text-sm font-medium border border-green-100">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
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
                className="input-field w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="input-field w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
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
              disabled={loading}
              className={`w-full primary-button flex justify-center items-center py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Signing in..." : "Sign In"}
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
