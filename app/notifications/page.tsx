import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New large donation received",
      message: "A donation of $2,500 has been received from Omar Farooq for the Zakat fund.",
      time: "10 minutes ago",
      type: "donation",
      unread: true,
    },
    {
      id: 2,
      title: "Prayer times updated",
      message: "The Iqaamah times for Maghrib have been adjusted for the new month.",
      time: "2 hours ago",
      type: "system",
      unread: true,
    },
    {
      id: 3,
      title: "New donor registration",
      message: "A new donor, Ahmed Hassan, has registered via the public portal.",
      time: "5 hours ago",
      type: "donor",
      unread: false,
    },
    {
      id: 4,
      title: "Monthly report generated",
      message: "The financial summary for April 2024 is now available in the analytics dashboard.",
      time: "1 day ago",
      type: "report",
      unread: false,
    },
    {
      id: 5,
      title: "System maintenance scheduled",
      message: "The portal will be undergoing brief maintenance this Sunday at 2:00 AM.",
      time: "2 days ago",
      type: "system",
      unread: false,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "donation":
        return (
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case "donor":
        return (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case "report":
        return (
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-zinc-50 font-sans">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Notification Center"
          actions={
            <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              Mark all as read
            </button>
          }
        />

        <main className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Notifications</h1>
                <p className="mt-1 text-zinc-500">Stay updated on recent activities and alerts.</p>
              </div>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`relative bg-white p-6 rounded-2xl border transition-all hover:shadow-md flex gap-4 ${
                    notification.unread ? "border-emerald-100 shadow-sm shadow-emerald-600/5 ring-1 ring-emerald-50" : "border-zinc-100"
                  }`}
                >
                  {notification.unread && (
                    <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-emerald-500" />
                  )}
                  
                  {getTypeIcon(notification.type)}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold ${notification.unread ? "text-zinc-900" : "text-zinc-700"}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{notification.time}</span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="mt-4 flex gap-4">
                      <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors">
                        View Details
                      </button>
                      <button className="text-xs font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-widest transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 border-2 border-dashed border-zinc-200 rounded-2xl text-sm font-semibold text-zinc-400 hover:border-emerald-200 hover:text-emerald-600 transition-all uppercase tracking-widest mt-8">
              Load older notifications
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
