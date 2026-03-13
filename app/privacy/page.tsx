import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-extrabold text-[#1B2430] mb-6">Privacy Policy</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          ServaSetu collects essential account and booking information to provide, improve, and secure service delivery.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          We do not sell personal information. Data is used for booking coordination, communication, and platform reliability.
        </p>
        <p className="text-slate-600 leading-relaxed">
          For privacy-related concerns, please contact support with your registered email and booking details.
        </p>
      </main>
      <Footer />
    </div>
  );
}
