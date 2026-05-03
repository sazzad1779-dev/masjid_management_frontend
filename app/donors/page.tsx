import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function DonorDirectoryPage() {
  const donors = [
    { id: 1, name: "Abdullah Ali", phone: "+1 234-567-8901", email: "abdullah@example.com", pledge: "$100/mo", status: "Active", total: "$5,400" },
    { id: 2, name: "Fatima Khan", phone: "+1 234-567-8902", email: "fatima@example.com", pledge: "$50/mo", status: "Active", total: "$2,150" },
    { id: 3, name: "Omar Farooq", phone: "+1 234-567-8903", email: "omar@example.com", pledge: "$250/mo", status: "Inactive", total: "$12,000" },
    { id: 4, name: "Zainab Ahmed", phone: "+1 234-567-8904", email: "zainab@example.com", pledge: "$20/mo", status: "Active", total: "$480" },
  ];

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title="Donor Directory" />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Registered Donors</h1>
                <p className="mt-1 text-zinc-500">Manage community contributions and donor engagement.</p>
              </div>
              <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95">
                + Add New Donor
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex flex-wrap gap-4 items-center">
              <input type="text" placeholder="Search by name, phone, or email..." className="flex-1 min-w-[250px] bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
              <select className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all">
                <option>Active Donors</option>
                <option>Inactive</option>
                <option>Pledged</option>
              </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {donors.map((donor) => (
                <div key={donor.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 font-bold text-lg">
                      {donor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] uppercase font-black tracking-widest ${donor.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {donor.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 leading-tight">{donor.name}</h3>
                  <p className="text-sm text-zinc-500 mb-4">{donor.email}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-zinc-50">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider">Monthly Pledge</span>
                      <span className="text-zinc-900 font-bold">{donor.pledge}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400 font-bold uppercase tracking-wider">Total Contributed</span>
                      <span className="text-emerald-600 font-bold">{donor.total}</span>
                    </div>
                  </div>
                  
                  <Link href={`/donor-portal`} className="block w-full mt-6 py-2.5 bg-zinc-50 text-zinc-600 text-sm font-semibold rounded-xl border border-zinc-100 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 transition-all uppercase tracking-widest text-center">
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
