import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AMCSection from "@/components/AMCSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-display text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <header className="relative -mt-20 pb-28 min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#FF9933]/60 via-white/45 to-[#138808]/60 w-full">
        {/* Decorative Abstract Orbs */}
        <div className="absolute top-0 left-0 w-[540px] h-[540px] bg-[#FF9933]/25 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[640px] h-[640px] bg-[#138808]/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 w-[860px] h-[440px] bg-white/30 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white rounded-t-[50%] z-10 border-t border-slate-100/50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D5ECE8] text-[#1A6E5C] text-[11px] font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">verified</span>
            Nation-First Professionalism
          </div>

          <h1 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-[#1B2430]">
            Bharat's Bridge to Better Service.
          </h1>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Connecting 10 million+ households with elite, vetted service
            professionals. We prioritize community trust and excellence in every
            task.
          </p>

          <div className="mt-6 sm:mt-8 max-w-lg mx-auto px-4 sm:px-0">
            <form action="/booking" method="get" className="relative w-full">
              <span className="material-symbols-outlined text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 text-base pointer-events-none">
                    search
              </span>
              <input
                name="service"
                className="w-full bg-white border border-slate-200 rounded-full pl-14 pr-32 py-4 sm:py-5 text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#1B5DA5] focus:border-[#1B5DA5] shadow-lg"
                placeholder="Find trusted professionals near you !"
                type="text"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1B5DA5] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:brightness-110 transition-all"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-8 sm:mt-10 flex items-center justify-center px-4 sm:px-0">
            <a
              href="/booking"
              className="bg-[#1B5DA5] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold shadow-lg hover:brightness-110 transition-all text-center"
            >
              Explore Verified Services
            </a>
          </div>
        </div>
      </header>

      {/* Download App Section with Phone Animation */}
      <section className="relative w-full py-16 md:py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-emerald-500 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 size-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 size-60 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-32 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase px-4 py-2 rounded-full mb-4 sm:mb-6">
                <span className="material-symbols-outlined text-sm text-[#FF9933]">
                  smartphone
                </span>
                Experience ServaSetu
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 leading-tight">
                India's Most Trusted<br />
                <span className="text-[#FF9933]">Home Services Platform</span>
              </h2>
              
              <p className="text-base sm:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed max-w-lg">
                Book verified professionals in seconds. Track service in real-time. 
                Pay securely. Experience hassle-free home maintenance at your fingertips.
              </p>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  { icon: "bolt", text: "Book services in under 60 seconds" },
                  { icon: "verified_user", text: "100% background-verified professionals" },
                  { icon: "schedule", text: "Real-time tracking & updates" },
                  { icon: "payments", text: "Secure & transparent pricing" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#FF9933] text-xl">
                        {feature.icon}
                      </span>
                    </div>
                    <span className="text-white/95 font-medium text-sm sm:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#1B5DA5] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/90 transition-all shadow-xl"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  Get Started Now
                </a>
                
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                >
                  <span className="material-symbols-outlined">explore</span>
                  Explore Services
                </a>
              </div>
            </div>
            
            {/* Right Side - Animated Phone Mockup with Floating Service Cards */}
            <div className="relative h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center overflow-visible hidden md:flex">
              {/* Phone Mockup */}
              <div className="relative z-20">
                <div className="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-8 border-slate-800">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 w-40 h-7 rounded-b-3xl z-20"></div>
                  
                  {/* Phone Screen */}
                  <div className="relative bg-gradient-to-r from-blue-600 to-emerald-500 rounded-[2.5rem] overflow-hidden w-[280px] h-[560px] flex items-center justify-center">
                    {/* ServaSetu Logo & Branding */}
                    <div className="text-center flex flex-col items-center justify-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                        <Image 
                          src="/logo.png" 
                          alt="ServaSetu Logo" 
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-3xl font-extrabold text-white tracking-tight">ServaSetu</h3>
                      <p className="text-white/80 text-sm mt-2">Your Trust, Our Promise</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Service Cards Around Phone */}
              {/* Top Left Card - Home Repairs */}
              <div className="absolute top-0 -left-20 lg:-left-32 animate-float-card-1 z-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-40 transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-[#FF9933] to-[#ff7700] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl">home</span>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-slate-900">Home Repairs</h4>
                  </div>
                </div>
              </div>
              
              {/* Top Right Card - Cleaning */}
              <div className="absolute top-0 -right-20 lg:-right-32 animate-float-card-2 z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-40 transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-[#1FA37A] to-[#138808] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl">cleaning_services</span>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-slate-900">Cleaning</h4>
                  </div>
                </div>
              </div>
              
              {/* Bottom Left Card - Plumbing */}
              <div className="absolute bottom-0 -left-20 lg:-left-32 animate-float-card-3 z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-40 transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-[#1B5DA5] to-[#0d3d6e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl">plumbing</span>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-slate-900">Plumbing</h4>
                  </div>
                </div>
              </div>
              
              {/* Bottom Right Card - Electrical */}
              <div className="absolute bottom-0 -right-20 lg:-right-32 animate-float-card-4 z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-40 transform hover:scale-105 transition-transform cursor-pointer">
                  <div className="h-32 bg-gradient-to-br from-[#FF9933] to-[#1B5DA5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-5xl">bolt</span>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-slate-900">Electrical</h4>
                  </div>
                </div>
              </div>
              
              {/* Stats Floating Cards */}
              <div className="absolute top-0 right-1/4 animate-float-slow hidden xl:block">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#FF9933] text-3xl">
                      star
                    </span>
                    <div>
                      <div className="text-white font-bold text-lg">4.8/5</div>
                      <div className="text-white/70 text-xs">50K+ Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-1/4 animate-float-delayed hidden xl:block">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#1FA37A] text-3xl">
                      groups
                    </span>
                    <div>
                      <div className="text-white font-bold text-lg">10M+</div>
                      <div className="text-white/70 text-xs">Happy Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Infinite Scroll Animation */}
      <section className="w-full py-12 md:py-16 bg-white overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4E8C] mb-2">
              Trusted By 10,000+ Families
            </h2>
            <p className="text-sm sm:text-base text-slate-600">Testimonials from Authentic Customers !!</p>
          </div>
        </div>
        
        <div className="relative group/testimonials">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          {/* Scrolling container */}
          <div className="flex animate-scroll group-hover/testimonials:[animation-play-state:paused] hover:[animation-play-state:paused]">
            {/* First set of testimonials */}
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "ServaSetu transformed my home maintenance experience. Their professionals are well-trained and punctual. Highly recommend!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                text: "The AMC plan is worth every rupee. No more last-minute panic when something breaks. Priority service is amazing!",
                rating: 4
              },
              {
                name: "Anita Desai",
                location: "Bangalore",
                text: "Finally, a service I can trust! Background-verified professionals and transparent pricing. This is the future of home services.",
                rating: 5
              },
              {
                name: "Vikram Patel",
                location: "Pune",
                text: "I've used ServaSetu for plumbing, electrical work, and cleaning. Consistently excellent service across the board.",
                rating: 4
              },
              {
                name: "Meera Reddy",
                location: "Hyderabad",
                text: "As a working mom, ServaSetu has been a lifesaver. Quick bookings, reliable service, and friendly professionals.",
                rating: 5
              },
            ].map((testimonial, index) => (
              <div
                key={`testimonial-1-${index}`}
                className="flex-shrink-0 w-80 h-[270px] mx-4 bg-[#F6F9FC] rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined text-lg ${
                        i < testimonial.rating ? "text-[#FF9933]" : "text-slate-300"
                      }`}
                      style={{
                        fontVariationSettings:
                          i < testimonial.rating
                            ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                            : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed text-justify h-[132px] mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#1B5DA5] to-[#1FA37A] flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1B2430]">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "ServaSetu transformed my home maintenance experience. Their professionals are well-trained and punctual. Highly recommend!",
                rating: 5
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                text: "The AMC plan is worth every rupee. No more last-minute panic when something breaks. Priority service is amazing!",
                rating: 4
              },
              {
                name: "Anita Desai",
                location: "Bangalore",
                text: "Finally, a service I can trust! Background-verified professionals and transparent pricing. This is the future of home services.",
                rating: 5
              },
              {
                name: "Vikram Patel",
                location: "Pune",
                text: "I've used ServaSetu for plumbing, electrical work, and cleaning. Consistently excellent service across the board.",
                rating: 4
              },
              {
                name: "Meera Reddy",
                location: "Hyderabad",
                text: "As a working mom, ServaSetu has been a lifesaver. Quick bookings, reliable service, and friendly professionals.",
                rating: 5
              },
            ].map((testimonial, index) => (
              <div
                key={`testimonial-2-${index}`}
                className="flex-shrink-0 w-80 h-[270px] mx-4 bg-[#F6F9FC] rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined text-lg ${
                        i < testimonial.rating ? "text-[#FF9933]" : "text-slate-300"
                      }`}
                      style={{
                        fontVariationSettings:
                          i < testimonial.rating
                            ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                            : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed text-justify h-[132px] mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="size-10 rounded-full bg-gradient-to-br from-[#1B5DA5] to-[#1FA37A] flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#1B2430]">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="how-we-work" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 text-center">
              How We Work
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto text-center">
              Simple, transparent, and professional. Here's how we connect you with verified service experts in just 4 steps.
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-emerald-500 to-blue-600 -translate-x-1/2 h-full"></div>

            {/* Timeline Steps */}
            <div className="space-y-12 md:space-y-16">

              {/* Step 1 - Left */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                <div className="md:w-1/2 md:ml-0 md:mr-auto">
                  <div className="group bg-[#F6F9FC] hover:bg-slate-400 p-8 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_20px_45px_-20px_rgba(30,64,175,0.45)] transition-all duration-300 relative">
                    {/* Step Number */}
                    <div className="absolute -left-16 top-8 hidden md:flex w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                      1
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#1FA37A] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:scale-110 ring-1 ring-white/40 transition-all duration-300 mb-6 mx-auto">
                      <span className="material-symbols-outlined text-3xl text-white transition-transform duration-300 group-hover:-translate-y-0.5" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}>
                        search
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 text-center transition-colors">
                      Browse & Search
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-white/90 leading-relaxed text-justify transition-colors">
                      Explore our wide range of verified professionals and services. Filter by expertise, ratings, and availability to find the perfect fit for your needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Right */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className="md:w-1/2 md:ml-auto md:mr-0">
                  <div className="group bg-[#F6F9FC] hover:bg-slate-400 p-8 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_20px_45px_-20px_rgba(30,64,175,0.45)] transition-all duration-300 relative">
                    {/* Step Number */}
                    <div className="absolute -right-16 top-8 hidden md:flex w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                      2
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#1FA37A] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:scale-110 ring-1 ring-white/40 transition-all duration-300 mb-6 mx-auto">
                      <span className="material-symbols-outlined text-3xl text-white transition-transform duration-300 group-hover:-translate-y-0.5" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}>
                        calendar_month
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 text-center transition-colors">
                      Book & Schedule
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-white/90 leading-relaxed text-justify transition-colors">
                      Choose your preferred professional and time slot. Get instant confirmation with real-time tracking and updates about your appointment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Left */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <div className="md:w-1/2 md:ml-0 md:mr-auto">
                  <div className="group bg-[#F6F9FC] hover:bg-slate-400 p-8 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_20px_45px_-20px_rgba(30,64,175,0.45)] transition-all duration-300 relative">
                    {/* Step Number */}
                    <div className="absolute -left-16 top-8 hidden md:flex w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                      3
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#1FA37A] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:scale-110 ring-1 ring-white/40 transition-all duration-300 mb-6 mx-auto">
                      <span className="material-symbols-outlined text-3xl text-white transition-transform duration-300 group-hover:-translate-y-0.5" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}>
                        home_repair_service
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 text-center transition-colors">
                      Professional Service
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-white/90 leading-relaxed text-justify transition-colors">
                      Our vetted expert arrives on time and handles your task with precision and professionalism. Safety and quality are our top priorities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 - Right */}
              <div className="relative animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                <div className="md:w-1/2 md:ml-auto md:mr-0">
                  <div className="group bg-[#F6F9FC] hover:bg-slate-400 p-8 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_20px_45px_-20px_rgba(30,64,175,0.45)] transition-all duration-300 relative">
                    {/* Step Number */}
                    <div className="absolute -right-16 top-8 hidden md:flex w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                      4
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF9933] to-[#1FA37A] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 group-hover:scale-110 ring-1 ring-white/40 transition-all duration-300 mb-6 mx-auto">
                      <span className="material-symbols-outlined text-3xl text-white transition-transform duration-300 group-hover:-translate-y-0.5" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}>
                        rate_review
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-white mb-4 text-center transition-colors">
                      Rate & Review
                    </h3>
                    <p className="text-sm text-slate-600 group-hover:text-white/90 leading-relaxed text-justify transition-colors">
                      Share your experience and help other community members make informed decisions. Your feedback drives our continuous improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 md:mt-20 text-center">
            <a
              href="/booking"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined mr-2">
                arrow_forward
              </span>
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      {/* Service Ecosystem */}
      <section id="services" className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B2430]">
              Service Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every professional is background-checked and skill-certified.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                icon: "home_repair_service",
                title: "Home Repair & Maintenance",
                desc: "Plumbing, Electrical, Carpentry, Appliance Repair & Installation Services",
                categoryId: "home-repair",
              },
              {
                icon: "cleaning_services",
                title: "Cleaning & Hygiene Services",
                desc: "Deep Cleaning, Sofa & Mattress, Kitchen, Bathroom, Water Tank, Pest Control",
                categoryId: "cleaning",
              },
              {
                icon: "format_paint",
                title: "Painting & Minor Renovation",
                desc: "Interior & Exterior Painting, Waterproofing, Tile & Civil Repairs",
                categoryId: "painting",
              },
              {
                icon: "nature",
                title: "Gardening & Outdoor Services",
                desc: "Gardening, Lawn Mowing, Hedge Trimming, Terrace & Plant Care",
                categoryId: "gardening",
              },
              {
                icon: "directions_car",
                title: "Automobile Utility Services",
                desc: "Car & Bike Washing, Detailing, Interior Cleaning at Home",
                categoryId: "automobile",
              },
              {
                icon: "security",
                title: "Safety & Installation Services",
                desc: "CCTV, Smart Lock, Inverter, Solar Panel, EV Charger Installation",
                categoryId: "safety",
              },
              {
                icon: "apartment",
                title: "Commercial & Facility Services",
                desc: "Office, Retail, Society Maintenance & Commercial Cleaning",
                categoryId: "commercial",
              },
              {
                icon: "subscriptions",
                title: "Subscription & AMC Services",
                desc: "Annual Contracts, Quarterly Check-ups, Service & Maintenance Plans",
                categoryId: null,
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.categoryId ? `/booking?category=${service.categoryId}` : "/booking"}
                className="group bg-[#F6F9FC] rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 hover:bg-slate-400 hover:border-slate-500 hover:shadow-lg hover:shadow-slate-400/50 hover:ring-2 hover:ring-[#1B5DA5]/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="size-10 md:size-12 rounded-lg md:rounded-xl bg-white flex items-center justify-center text-[#1B5DA5] shadow-sm mb-3 md:mb-4 group-hover:bg-gradient-to-br group-hover:from-[#FF9933] group-hover:to-[#1FA37A] group-hover:text-white group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-xl transition-all duration-300 mx-auto">
                  <span className="material-symbols-outlined text-xl md:text-2xl transition-transform duration-300 group-hover:-translate-y-0.5" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}>
                    {service.icon}
                  </span>
                </div>
                <h3 className="font-bold text-xs md:text-sm text-[#1B2430] line-clamp-2 group-hover:text-white group-hover:drop-shadow-lg transition-colors duration-300 text-center">
                  {service.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Plans */}
      <AMCSection />

      {/* Our Core Values */}
      <section id="why-us" className="w-full py-16 md:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4E8C] mb-4">
              Why Us? 
            </h2>
            <div className="h-1.5 w-24 bg-[#FF9933] rounded-full mx-auto mb-6"></div>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              {
                icon: "shield",
                title: "Trust & Reliability",
                desc: "Every professional is background-verified and certified. We take responsibility for every service delivered in your home.",
              },
              {
                icon: "stars",
                title: "Excellence",
                desc: "We don't compromise on quality. From tools to training, we ensure our professionals deliver world-class service.",
              },
              {
                icon: "handshake",
                title: "Transparency",
                desc: "No hidden charges, no surprises. What you see is what you pay. Clear communication at every step.",
              },
              {
                icon: "groups",
                title: "Customer First",
                desc: "Your satisfaction drives us. We listen, adapt, and continuously improve to serve you better.",
              },
              {
                icon: "emoji_objects",
                title: "Innovation",
                desc: "Leveraging technology to make home services smarter, faster, and more convenient for modern India.",
              },
              {
                icon: "favorite",
                title: "Care & Respect",
                desc: "We treat your home with the care it deserves and our professionals with the respect they've earned.",
              },
            ].map((value, index) => (
              <a
                key={index}
                href="/booking"
                className="group bg-[#F6F9FC] rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-slate-100 hover:bg-slate-400 hover:border-slate-500 hover:shadow-lg hover:shadow-slate-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="size-12 md:size-14 rounded-lg md:rounded-xl bg-white flex items-center justify-center text-[#1B5DA5] shadow-sm mb-4 md:mb-6 group-hover:bg-gradient-to-br group-hover:from-[#FF9933] group-hover:to-[#1FA37A] group-hover:text-white transition-all duration-300 mx-auto">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">
                    {value.icon}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#1F4E8C] mb-2 md:mb-3 group-hover:text-white group-hover:drop-shadow-lg transition-colors duration-300 text-center">
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed text-justify group-hover:text-white group-hover:drop-shadow-md transition-colors duration-300">
                  {value.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
