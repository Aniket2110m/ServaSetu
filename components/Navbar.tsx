"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-4 z-50 w-full bg-transparent">
      <div className="max-w-[1100px] mx-auto px-4">
        <div className="w-full rounded-full bg-[#3d4f1f]/95 backdrop-blur-md border border-[#556B2F]/40 shadow-lg px-1 py-3 flex items-center justify-center gap-16">
          {/* Left Navigation */}
          <div className="hidden lg:flex items-center gap-16">
            <Link
              href="/#services"
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#why-us"
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              Why Us?
            </Link>
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
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
          </Link>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center gap-16">
            <Link
              href="/#how-we-work"
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              How We Work
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
