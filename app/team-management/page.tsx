"use client";

import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

interface teamMember {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Cashier" | "Viewer";
  status: "Active" | "Pending";
}

export default function TeamManagementPage() {
  const [team, setTeam] = useState<teamMember[]>([
    { id: 1, name: "Saif UI Haq", email: "saif@masjid.org", role: "Admin", status: "Active" },
    { id: 2, name: "Omar Farooq", email: "omar@masjid.org", role: "Cashier", status: "Active" },
    { id: 3, name: "Zaid Ahmed", email: "zaid@masjid.org", role: "Viewer", status: "Active" },
    { id: 4, name: "Hassan Ali", email: "hassan@masjid.org", role: "Cashier", status: "Pending" },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Administration"
          actions={
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Invite Member
            </button>
          }
        />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-6xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">Team Management</h1>
              <p className="mt-1 text-zinc-500">Manage your masjid's administrative team and permission roles.</p>
            </div>

            {/* Role Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { role: "Admins", count: 1, color: "emerald", desc: "Full system access" },
                { role: "Cashiers", count: 2, color: "blue", desc: "Financial records only" },
                { role: "Viewers", count: 1, color: "zinc", desc: "Read-only access" },
              ].map((stat) => (
                <div key={stat.role} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className={`h-1 w-12 bg-${stat.color}-500 rounded-full mb-4`} />
                  <p className="text-2xl font-bold text-zinc-900">{stat.count}</p>
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{stat.role}</p>
                  <p className="mt-2 text-xs text-zinc-400">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Team Table */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest">Name / Email</th>
                    <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest">System Role</th>
                    <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-xs font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {team.map((member) => (
                    <tr key={member.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center font-bold text-zinc-500 uppercase">
                            {member.name.substring(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900">{member.name}</p>
                            <p className="text-sm text-zinc-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          member.role === 'Admin' ? 'bg-emerald-50 text-emerald-600' :
                          member.role === 'Cashier' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-600'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className={`h-1.5 w-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                          <span className={`text-xs font-bold uppercase tracking-widest ${member.status === 'Active' ? 'text-zinc-600' : 'text-amber-600'}`}>
                            {member.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-zinc-400 hover:text-zinc-600 p-2 transition-colors">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Invite Modal Placeholder */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10 relative">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900">Invite Team Member</h2>
              <p className="text-zinc-500">Send an invitation to join the administrative portal.</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">Full Name</label>
                <input type="text" placeholder="e.g. Bilal Ahmed" className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">Email Address</label>
                <input type="email" placeholder="email@masjid.org" className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">System Role</label>
                <select className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white">
                  <option>Admin</option>
                  <option>Cashier</option>
                  <option>Viewer</option>
                </select>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 font-bold text-zinc-500 hover:bg-zinc-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
