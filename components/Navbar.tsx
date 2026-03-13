"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-50 w-full bg-transparent">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="w-full rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm px-2 py-3 flex items-center justify-between lg:justify-center lg:gap-16">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            <Link
              href="/#services"
              className="text-sm font-semibold text-slate-700 hover:text-[#1B5DA5] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#why-us"
              className="text-sm font-semibold text-slate-700 hover:text-[#1B5DA5] transition-colors"
            >
              Why Us?
            </Link>
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 lg:mx-8">
            <div className="relative w-10 h-10 rounded-3xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="ServaSetu Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#1B5DA5]">
              ServaSetu
            </span>
          </Link>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            <Link
              href="/#how-we-work"
              className="text-sm font-semibold text-slate-700 hover:text-[#1B5DA5] transition-colors"
            >
              How We Work
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-slate-700 hover:text-[#1B5DA5] transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Mobile Menu Button - Placeholder for future implementation */}
          <div className="lg:hidden flex items-center px-4">
            <button className="text-slate-700 hover:text-[#1B5DA5]">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
