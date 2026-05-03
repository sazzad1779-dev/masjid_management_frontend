import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Financial Stewardship",
      description: "Advanced tracking for income, expenses, and multiple funds (Zakat, Sadaqah, Maintenance).",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: ["Fund-based accounting", "Real-time balance tracking", "Automated financial reports"]
    },
    {
      title: "Community Transparency",
      description: "Build trust with your community through accessible, real-time public transparency portals.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      features: ["Public transparency summary", "Verified donation records", "Yearly impact reports"]
    },
    {
      title: "Donor Engagement",
      description: "Empower your donors with a dedicated portal to manage their contributions and stay connected.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: ["Personal donation history", "Printable tax receipts", "Recurring pledge management"]
    },
    {
      title: "Administrative Efficiency",
      description: "Streamline operations with powerful dashboards, notifications, and institution configuration.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      ),
      features: ["Multi-user permissions", "System activity logs", "Instant notification hub"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl mb-6">
              Modular Solutions for <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Spiritual Excellence</span>
            </h1>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Our comprehensive suite of services is designed to handle every aspect of modern masjid management, allowing you to focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="group relative bg-white p-10 rounded-3xl border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-8 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{service.title}</h3>
                <p className="text-zinc-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-zinc-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <section className="mt-32 rounded-[3rem] bg-zinc-900 p-12 sm:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -ml-20 -mt-20" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -mr-20 -mb-20" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your Masjid?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-lg">
                Join hundreds of spiritual communities using Smart Masjid to drive transparency and engagement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95">
                  Register Your Institution
                </Link>
                <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all">
                  Contact Support
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
