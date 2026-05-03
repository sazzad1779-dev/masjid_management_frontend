"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    institutionName: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      // We send additional data now that the backend accepts it
      await api.post("/auth/signup", {
        email: formData.email,
        password: formData.password,
        institution_name: formData.institutionName,
        admin_name: formData.adminName,
      });

      setSuccess("Institution registered successfully! Redirecting to login...");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login?message=Registration%20successful.%20Please%20log%20in.");
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

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

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded text-sm text-center font-medium">
                {success}
              </div>
            )}

            <div>
              <label
                htmlFor="institutionName"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Institution Name
              </label>
              <input
                id="institutionName"
                type="text"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="e.g. Al-Falah Islamic Center"
                className="input-field"
                required
                disabled={loading || !!success}
              />
            </div>

            <div>
              <label
                htmlFor="adminName"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Administrator Name
              </label>
              <input
                id="adminName"
                type="text"
                value={formData.adminName}
                onChange={handleChange}
                placeholder="Full Name"
                className="input-field"
                required
                disabled={loading || !!success}
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
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@masjid.org"
                className="input-field"
                required
                disabled={loading || !!success}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
                disabled={loading || !!success}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
                disabled={loading || !!success}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !!success}
                className={`w-full flex justify-center items-center py-3 ${
                  loading || !!success ? "bg-primary/70 cursor-not-allowed text-white rounded-lg font-medium" : "primary-button"
                }`}
              >
                {loading ? "Registering..." : "Sign Up"}
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

