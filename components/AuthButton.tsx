"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthButton() {
  const pathname = usePathname();

  if (
    pathname === "/auth" ||
    pathname.startsWith("/booking") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/address") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/confirmation")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-4 z-40">
      <Link
        href="/auth"
        className="inline-flex items-center rounded-full bg-[#1B5DA5] px-7 py-2.5 text-white font-bold text-base hover:brightness-110 transition-all shadow-lg hover:shadow-xl"
      >
        Login / Signup
      </Link>
    </div>
  );
}
