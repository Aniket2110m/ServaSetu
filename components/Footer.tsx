import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-12 items-start">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-3xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="ServaSetu Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                ServaSetu
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/90 text-justify-safe">
              Modern home maintenance, delivered with precision.
Trusted professionals. Structured service. Assured quality
            </p>
            <div className="flex gap-5">
              <a
                className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all overflow-hidden"
                href="https://x.com/ServaSetu20208"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on X"
              >
                <Image
                  src="/twitter-x-logo.png"
                  alt="X Logo"
                  width={28}
                  height={28}
                  className="object-contain invert drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
                />
              </a>
              <a
                className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all overflow-hidden"
                href="https://www.instagram.com/servasetu.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow us on Instagram"
              >
                <Image
                  src="/instagram-logo.png"
                  alt="Instagram Logo"
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </a>
              <a
                className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all overflow-hidden"
                href="https://www.linkedin.com/in/serva-setu-b242963b4/"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect with us on LinkedIn"
              >
                <Image
                  src="/linkedin-logo.png"
                  alt="LinkedIn Logo"
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </a>
              <a
                className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all overflow-hidden"
                href="https://www.facebook.com/profile.php?id=61581316358614"
                target="_blank"
                rel="noopener noreferrer"
                title="Like us on Facebook"
              >
                <Image
                  src="/facebook-logo.png"
                  alt="Facebook Logo"
                  width={28}
                  height={28}
                  className="object-contain brightness-0 invert"
                />
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 text-lg text-justify-safe">
              Quick Links :
            </h5>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/about"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/community"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/auth"
                >
                  Login / Sign Up
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/booking"
                >
                  Book a Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 text-lg text-justify-safe">
              Support Us :
            </h5>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/#services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/#amc"
                >
                  AMC Plans
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/#testimonials"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  className="text-white/80 hover:text-white hover:underline transition-all"
                  href="/community"
                >
                  Why Us?
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 text-lg text-justify-safe">
              Contact Us:
            </h5>
            <p className="text-sm mb-6 text-white/80 text-justify-safe">
              Let’s simplify your home maintenance — contact ServaSetu today !! 
            </p>
            <div className="flex items-stretch gap-0 rounded-xl overflow-hidden border border-white/30 bg-white/20 backdrop-blur-sm">
              <input
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none"
                placeholder="Your email address"
                type="email"
              />
              <button className="bg-white text-blue-600 px-4 py-3 font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all">
                Send{" "}
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/70">
          <p className="text-justify-safe">
            © 2026 ServaSetu Pvt. Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
