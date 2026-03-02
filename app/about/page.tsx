import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="font-display bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Mission */}
      <section className="relative py-24 bg-gradient-to-br from-[#1B3B6D] via-[#1F4E8C] to-[#1B3B6D] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 size-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 size-64 bg-[#1FA37A] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4">
            Our Mission: Connecting
            <br />
            <span className="text-[#1FA37A]">Homes</span> with Trust
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Empowering households with reliable, professional, and high-quality home services through innovation and trust. We believe every home deserves the care of a professional, and every professional deserves a platform that values their skill. ServaSetu bridges this gap with seamless technology, priority scheduling, and a commitment to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#1FA37A] text-white px-8 py-3.5 rounded-full font-bold hover:brightness-110 transition-all shadow-lg">
              Learn Our Story
            </button>
            <button className="bg-white text-[#1B3B6D] px-8 py-3.5 rounded-full font-bold hover:shadow-lg transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-[#1B2430]">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                <p>
                  ServaSetu was born out of a simple need: to bridge the gap between skilled professionals and homeowners. When a household needs expert help, they struggle to find trustworthy service providers. Meanwhile, skilled technicians struggle to find consistent work and fair compensation.
                </p>
                <p>
                  Our founders, a group of passionate innovators, recognized this market gap and decided to create a platform where both sides win. "Setu" means bridge in Hindi – that's exactly what ServaSetu is: the bridge between two ends of the home services ecosystem.
                </p>
                <p>
                  Today, we continue to push ServaSetu forward, integrating AI-driven scheduling and rigorous quality checks, ensuring that every service appointment is a transaction, but a step towards a better-managed home.
                </p>
              </div>
            </div>

            <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 shadow-2xl">
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <span className="material-symbols-outlined text-9xl text-slate-400">
                  image
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values - SETU */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#1B2430] mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The S.E.T.U. Framework: The principles that guide every interaction we have
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                letter: "S",
                title: "Standardization",
                desc: "Every job follows a fixed price and quality checklist for 'guaranteed' service.",
              },
              {
                letter: "E",
                title: "Empathy",
                desc: "We treat every home with the same care and respect we would our own.",
              },
              {
                letter: "T",
                title: "Trust",
                desc: "Through rigorous background checks and transparent communication, we ensure safety.",
              },
              {
                letter: "U",
                title: "Upkeep",
                desc: "Our job isn't just about fixing, it's about the long-term success of your home.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center border border-slate-100"
              >
                <div className="size-16 rounded-xl bg-gradient-to-br from-[#1FA37A] to-[#1B5DA5] flex items-center justify-center text-white mb-6 mx-auto">
                  <span className="text-3xl font-black">{value.letter}</span>
                </div>
                <h3 className="text-xl font-bold text-[#1B2430] mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Community */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1B2430] mb-6">
                Our Community
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 text-justify">
                At ServaSetu, we are more than just a platform; we are a community of thousands of dedicated professionals and happy homeowners. We foster an environment of continuous learning with mutual respect. Our team is dedicated to providing support to every step, ensuring that our service providers have the tools to succeed and our customers have the peace they deserve.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: "50k+", label: "Homes Served" },
                  { number: "1.2k+", label: "Professionals" },
                  { number: "4.9/5", label: "Avg Rating" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-black text-[#1FA37A] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-slate-400">
                  group
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-slate-400">
                  handshake
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-slate-400">
                  celebration
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 aspect-square flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-slate-400">
                  work_outline
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1F4E8C] to-[#1FA37A]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            Ready to experience the
            <br />
            ServaSetu difference?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join thousands of homeowners who trust us with their most valuable assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <button className="bg-[#1FA37A] text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all shadow-lg">
                Book a Service Now
              </button>
            </Link>
            <Link href="/auth">
              <button className="bg-white text-[#1F4E8C] px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all">
                Join as a Partner
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
