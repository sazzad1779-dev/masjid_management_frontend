"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { api } from "../lib/api";

interface Membership {
  masjid_id: string;
  role: string;
}

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  memberships: Membership[];
}

export default function TeamManagementPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const user: any = await api.get('/auth/me');
      const masjidId = user.memberships?.[0]?.masjid_id;
      
      if (masjidId) {
        const members = await api.get<TeamMember[]>(`/auth/users?masjid_id=${masjidId}`);
        setTeam(members);
      } else {
        setError("Masjid ID not found for current user.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  };

  const getRole = (member: TeamMember) => {
    return member.memberships?.[0]?.role || "Viewer";
  };

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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Team Management</h1>
                <p className="mt-1 text-zinc-500">Manage your masjid's administrative team and permission roles.</p>
              </div>
              <button onClick={fetchTeam} className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors">
                <svg className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Role Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { role: "Admins", count: team.filter(m => getRole(m) === 'admin').length, color: "emerald", desc: "Full system access" },
                { role: "Cashiers", count: team.filter(m => getRole(m) === 'cashier').length, color: "blue", desc: "Financial records only" },
                { role: "Viewers", count: team.filter(m => !['admin', 'cashier'].includes(getRole(m))).length, color: "zinc", desc: "Read-only access" },
              ].map((stat) => (
                <div key={stat.role} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className={`h-1 w-12 rounded-full mb-4 ${
                    stat.color === 'emerald' ? 'bg-emerald-500' : 
                    stat.color === 'blue' ? 'bg-blue-500' : 'bg-zinc-400'
                  }`} />
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
                  {loading && team.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-zinc-400">Loading team members...</td>
                    </tr>
                  ) : (
                    team.map((member) => (
                      <tr key={member.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center font-bold text-zinc-500 uppercase">
                              {member.full_name?.substring(0, 2) || "U"}
                            </div>
                            <div>
                              <p className="font-bold text-zinc-900">{member.full_name}</p>
                              <p className="text-sm text-zinc-400">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            getRole(member) === 'admin' ? 'bg-emerald-50 text-emerald-600' :
                            getRole(member) === 'cashier' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-zinc-600'
                          }`}>
                            {getRole(member)}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full ${member.is_active ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'}`} />
                            <span className={`text-xs font-bold uppercase tracking-widest ${member.is_active ? 'text-zinc-600' : 'text-amber-600'}`}>
                              {member.is_active ? 'Active' : 'Pending'}
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
                    ))
                  )}
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
                <input type="email" placeholder="email@masjid.org" className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">System Role</label>
                <select className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white">
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                  <option value="committee">Committee</option>
                  <option value="viewer">Viewer</option>
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
