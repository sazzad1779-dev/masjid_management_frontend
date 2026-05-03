import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl mb-4">
              Empowering Masajid through <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Digital Stewardship</span>
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Smart Masjid is dedicated to providing modern, transparent, and efficient management tools for spiritual communities worldwide.
            </p>
          </div>

          <div className="space-y-20">
            {/* Mission Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">Our Mission</h2>
                <p className="text-zinc-600 leading-relaxed mb-6">
                  Our mission is to simplify the complex administrative tasks faced by Masajid daily. By leveraging modern technology, we enable community leaders to focus on spiritual guidance while maintaining impeccable financial records and community engagement.
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-zinc-700">Transparency in every transaction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-zinc-700">Efficiency in administration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-zinc-700">Excellence in community service</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl shadow-emerald-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50" />
                <div className="relative z-10">
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21l-8-18h16l-8 18z" />
                    </svg>
                  </div>
                  <p className="text-zinc-900 font-bold italic text-lg leading-relaxed">
                    "Service to the community is an act of worship. Our platform ensures that this service is conducted with the highest level of ihsan (excellence)."
                  </p>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-8 border-l-4 border-emerald-500 pl-4">Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-zinc-100 transition-all hover:border-emerald-200">
                  <h3 className="font-bold text-zinc-900 mb-2">Integrity</h3>
                  <p className="text-sm text-zinc-600">Amancah (trust) is at the heart of everything we build. Your data and community trust are safe with us.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-100 transition-all hover:border-emerald-200">
                  <h3 className="font-bold text-zinc-900 mb-2">Transparency</h3>
                  <p className="text-sm text-zinc-600">We provide tools that make it easy to show the community how their generous donations are being utilized.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-zinc-100 transition-all hover:border-emerald-200">
                  <h3 className="font-bold text-zinc-900 mb-2">Innovation</h3>
                  <p className="text-sm text-zinc-600">Continuous improvement of our features to meet the evolving needs of modern spiritual institutions.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
