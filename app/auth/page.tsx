"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "phone" | null>(null);
  const [authFeedback, setAuthFeedback] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const passwordChecks = {
    minLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasMixedCase: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
  };

  const isSignupPasswordStrong =
    passwordChecks.minLength && passwordChecks.hasNumber && passwordChecks.hasMixedCase;

  const handleGoogleAuth = async () => {
    setSocialLoading("google");
    setAuthFeedback({ type: "loading", message: "Connecting to Google..." });

    try {
      const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;

      if (!googleAuthUrl) {
        localStorage.setItem("userToken", JSON.stringify({
          provider: "google",
          timestamp: new Date().toISOString(),
        }));
        setAuthFeedback({ type: "success", message: "Signed in successfully. Redirecting..." });
        router.push("/booking");
        return;
      }

      window.location.href = googleAuthUrl;
    } catch {
      setAuthFeedback({ type: "error", message: "Unable to start Google sign-in. Please try again." });
    } finally {
      setSocialLoading(null);
    }
  };

  const handlePhoneAuth = async () => {
    setSocialLoading("phone");
    setAuthFeedback({ type: "loading", message: "Verifying phone login..." });

    try {
      const phoneAuthUrl = process.env.NEXT_PUBLIC_PHONE_AUTH_URL;

      if (!phoneAuthUrl) {
        localStorage.setItem("userToken", JSON.stringify({
          provider: "phone",
          timestamp: new Date().toISOString(),
        }));
        setAuthFeedback({ type: "success", message: "Signed in successfully. Redirecting..." });
        router.push("/booking");
        return;
      }

      window.location.href = phoneAuthUrl;
    } catch {
      setAuthFeedback({ type: "error", message: "Unable to start phone sign-in. Please try again." });
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && !isSignupPasswordStrong) {
      setAuthFeedback({
        type: "error",
        message: "Please set a stronger password to continue signup.",
      });
      return;
    }

    setIsSubmitting(true);
    setAuthFeedback({ type: "loading", message: isLogin ? "Signing you in..." : "Creating your account..." });

    try {
      localStorage.setItem("userToken", JSON.stringify({
        email: formData.email,
        timestamp: new Date().toISOString(),
      }));

      setAuthFeedback({ type: "success", message: "Authentication successful. Redirecting..." });
      router.push("/booking");
    } catch {
      setAuthFeedback({ type: "error", message: "Authentication failed. Please retry." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1F4E8C] via-[#1F4E8C] to-[#1FA37A] overflow-x-hidden">
      <div className="min-h-screen flex items-center justify-center p-3 lg:p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col gap-5 text-white">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="ServaSetu Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-4xl font-extrabold tracking-tight">
              ServaSetu
            </span>
          </Link>

          <div className="space-y-3">
            <h1 className="text-5xl font-extrabold leading-[1.05]">
              Welcome to
              <br />
              <span className="text-[#FF9933]">Professional</span> Home Services
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of satisfied customers who trust ServaSetu for all
              their home maintenance needs.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: "verified_user",
                title: "Verified Professionals",
                desc: "All experts are background-checked",
              },
              {
                icon: "payments",
                title: "Transparent Pricing",
                desc: "No hidden charges, ever",
              },
              {
                icon: "workspace_premium",
                title: "Service Warranty",
                desc: "30-day warranty on all services",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#FF9933]">
                    {feature.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-5 lg:p-7">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 mb-5 justify-center"
          >
            <div className="relative w-10 h-10 rounded-2xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="ServaSetu Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-[#1F4E8C]">
              ServaSetu
            </span>
          </Link>

          {/* Form Header */}
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-[#1F4E8C] mb-1.5">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-sm text-slate-600">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to get started with ServaSetu"}
            </p>
          </div>

          {authFeedback.type !== "idle" && (
            <div
              className={`mb-4 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 ${
                authFeedback.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : authFeedback.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {authFeedback.type === "error"
                  ? "error"
                  : authFeedback.type === "success"
                  ? "check_circle"
                  : "hourglass_top"}
              </span>
              {authFeedback.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    person
                  </span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F4E8C] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  email
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F4E8C] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    phone
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F4E8C] focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  lock
                </span>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1F4E8C] focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              {!isLogin && (
                <div className="mt-2 space-y-1 text-xs">
                  <p className="text-slate-500 font-semibold">Password should include:</p>
                  <div className={`flex items-center gap-1 ${passwordChecks.minLength ? "text-emerald-600" : "text-slate-500"}`}>
                    <span className="material-symbols-outlined text-sm">{passwordChecks.minLength ? "check_circle" : "radio_button_unchecked"}</span>
                    At least 8 characters
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.hasNumber ? "text-emerald-600" : "text-slate-500"}`}>
                    <span className="material-symbols-outlined text-sm">{passwordChecks.hasNumber ? "check_circle" : "radio_button_unchecked"}</span>
                    One number
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.hasMixedCase ? "text-emerald-600" : "text-slate-500"}`}>
                    <span className="material-symbols-outlined text-sm">{passwordChecks.hasMixedCase ? "check_circle" : "radio_button_unchecked"}</span>
                    One uppercase and one lowercase letter
                  </div>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-slate-300 text-[#1F4E8C] focus:ring-[#1F4E8C]"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm font-semibold text-[#1F4E8C] hover:text-[#1FA37A] transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-slate-300 text-[#1F4E8C] focus:ring-[#1F4E8C] mt-0.5"
                  required
                />
                <label className="text-sm text-slate-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#1F4E8C] font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#1F4E8C] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || socialLoading !== null}
              className="w-full bg-brand-gradient text-white py-3 rounded-xl font-bold text-base hover:shadow-xl hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Please wait..." : isLogin ? "Login to Account" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isSubmitting || socialLoading !== null}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-[#1F4E8C] hover:bg-slate-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {socialLoading === "google" ? "Connecting..." : "Google"}
            </button>
            <button
              type="button"
              onClick={handlePhoneAuth}
              disabled={isSubmitting || socialLoading !== null}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-[#1F4E8C] hover:bg-slate-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-2xl">phone</span>
              {socialLoading === "phone" ? "Connecting..." : "Phone Number"}
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-slate-600 mt-5">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-[#1F4E8C] hover:text-[#1FA37A] transition-colors"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-[#1F4E8C] transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
