import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold text-[#1B2430] mb-6">Terms of Service</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          By using ServaSetu, you agree to use the platform lawfully and provide accurate information during booking and account creation.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Service pricing, schedules, and availability may vary based on location and provider capacity. Final confirmations are shared during checkout.
        </p>
        <p className="text-slate-600 leading-relaxed">
          If you have questions regarding these terms, please contact our support team through the app contact channels.
        </p>
      </main>
      <Footer />
    </div>
  );
}
