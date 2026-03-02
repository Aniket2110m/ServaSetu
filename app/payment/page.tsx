"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SelectedService {
  id: string;
  name: string;
  price: number;
  categoryIcon: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.push("/auth");
      setIsAuthenticated(false);
    }
  }, [router]);

  // Load payment details from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem("selectedServices");
    const savedDate = localStorage.getItem("selectedDate");
    const savedTime = localStorage.getItem("selectedTime");
    const savedPayment = localStorage.getItem("selectedPayment");

    if (savedServices) {
      try {
        setSelectedServices(JSON.parse(savedServices));
      } catch (error) {
        console.error("Failed to parse services:", error);
      }
    }

    if (savedDate) setSelectedDate(savedDate);
    if (savedTime) setSelectedTime(savedTime);
    if (savedPayment) setSelectedPayment(savedPayment);
  }, []);

  // Calculate totals
  const getSubtotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.12;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);

    try {
      // Step 1: Create order on backend (you'll implement this)
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getTotal() * 100, // Amount in paise
          currency: "INR",
          receipt: `receipt-${Date.now()}`,
        }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add to env
        amount: getTotal() * 100,
        currency: "INR",
        name: "ServaSetu",
        description: `Booking for ${selectedDate} at ${selectedTime}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          // Payment successful
          // Verify signature on backend
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Save booking details
            localStorage.setItem(
              "lastBooking",
              JSON.stringify({
                services: selectedServices,
                date: selectedDate,
                time: selectedTime,
                paymentDetails: response,
                timestamp: new Date().toISOString(),
              })
            );

            // Redirect to confirmation
            router.push("/confirmation");
          } else {
            alert("Payment verification failed");
          }

          setLoading(false);
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userPhone") || "",
        },
        theme: {
          color: "#1F4E8C",
        },
      };

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed");
      setLoading(false);
    }
  };

  const handleBackendPayment = (method: string) => {
    // For non-Razorpay methods, redirect to confirmation
    localStorage.setItem("paymentMethod", method);
    router.push("/confirmation");
  };

  const handlePlaceService = async () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    if (selectedMethod === "razorpay") {
      await handleRazorpayPayment();
    } else {
      handleBackendPayment(selectedMethod);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {!isAuthenticated && <></>}
      <Navbar />

      <main className="flex w-full flex-col px-6 py-12 md:px-20 flex-grow">
        <div className="px-6 md:px-8 py-12 mb-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Complete Your Payment</h3>
              <span className="text-sm font-bold text-white">100% Complete</span>
            </div>

            <div className="relative h-2 w-full rounded-full bg-white/30">
              <div className="absolute h-full rounded-full bg-white" style={{ width: "100%" }}></div>
              <div
                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-400 shadow-md"
                style={{ left: "calc(100% - 8px)" }}
              ></div>
            </div>

            <div className="grid grid-cols-4 w-full text-[11px] font-bold uppercase tracking-wider text-white/80">
              <div className="text-white/60">1. Select Service</div>
              <div className="px-4 text-white/60">2. Schedule</div>
              <div className="px-4 text-white/60">3. Address</div>
              <div className="text-right text-white">4. Payment</div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1280px] mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">
              Secure Payment
            </h1>
            <p className="text-slate-500 mt-2 text-lg max-w-3xl mx-auto">
              Choose your payment method to complete your booking
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Select Payment Method
                </h2>

                <div className="space-y-4">
                  {/* UPI */}
                  <button
                    onClick={() => setSelectedMethod("razorpay")}
                    className={`w-full p-4 border-2 rounded-lg transition-all flex items-center gap-4 ${
                      selectedMethod === "razorpay"
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-blue-600">
                        contactless
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-slate-900">
                        UPI / Card Payment
                      </div>
                      <div className={`text-sm ${
                        selectedMethod === "razorpay"
                          ? "text-blue-600 font-semibold"
                          : "text-slate-500"
                      }`}>
                        Powered by Razorpay
                      </div>
                    </div>
                    {selectedMethod === "razorpay" && (
                      <span className="material-symbols-outlined text-blue-600 font-bold">
                        check_circle
                      </span>
                    )}
                    {selectedMethod !== "razorpay" && (
                      <span className="material-symbols-outlined text-slate-400">
                        arrow_forward
                      </span>
                    )}
                  </button>

                  {/* Net Banking */}
                  <button
                    onClick={() => setSelectedMethod("netbanking")}
                    className={`w-full p-4 border-2 rounded-lg transition-all flex items-center gap-4 ${
                      selectedMethod === "netbanking"
                        ? "border-emerald-600 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-emerald-600">
                        payments
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-slate-900">
                        Net Banking
                      </div>
                      <div className={`text-sm ${
                        selectedMethod === "netbanking"
                          ? "text-emerald-600 font-semibold"
                          : "text-slate-500"
                      }`}>
                        Direct bank transfer
                      </div>
                    </div>
                    {selectedMethod === "netbanking" && (
                      <span className="material-symbols-outlined text-emerald-600 font-bold">
                        check_circle
                      </span>
                    )}
                    {selectedMethod !== "netbanking" && (
                      <span className="material-symbols-outlined text-slate-400">
                        arrow_forward
                      </span>
                    )}
                  </button>

                  {/* Pay After Service */}
                  <button
                    onClick={() => setSelectedMethod("postpaid")}
                    className={`w-full p-4 border-2 rounded-lg transition-all flex items-center gap-4 ${
                      selectedMethod === "postpaid"
                        ? "border-orange-600 bg-orange-50"
                        : "border-slate-200 hover:border-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-orange-600">
                        schedule
                      </span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-slate-900">
                        Pay After Service
                      </div>
                      <div className={`text-sm ${
                        selectedMethod === "postpaid"
                          ? "text-orange-600 font-semibold"
                          : "text-slate-500"
                      }`}>
                        Pay when service is complete
                      </div>
                    </div>
                    {selectedMethod === "postpaid" && (
                      <span className="material-symbols-outlined text-orange-600 font-bold">
                        check_circle
                      </span>
                    )}
                    {selectedMethod !== "postpaid" && (
                      <span className="material-symbols-outlined text-slate-400">
                        arrow_forward
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-xs text-center text-slate-400 mt-6 px-4 uppercase tracking-widest font-bold">
                  All payments are secure and encrypted
                </p>

                <button
                  onClick={handlePlaceService}
                  disabled={loading || !selectedMethod}
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-emerald-500 hover:brightness-105 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  <span>{loading ? "Processing..." : "Place Your Service"}</span>
                  <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </section>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-start text-sm"
                    >
                      <span className="text-slate-600 flex-1">{service.name}</span>
                      <span className="font-semibold text-slate-900">
                        ₹{service.price.toFixed(0)}
                      </span>
                    </div>
                  ))}

                  {selectedDate && (
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-slate-600">Booking Date</span>
                      <span className="font-semibold text-slate-900">
                        {selectedDate}
                      </span>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-slate-600">Time Slot</span>
                      <span className="font-semibold text-slate-900">
                        {selectedTime}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ₹{getSubtotal().toFixed(0)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Tax (12%)</span>
                    <span className="font-semibold text-slate-900">
                      ₹{getTax().toFixed(0)}
                    </span>
                  </div>

                  <div className="pt-3 flex justify-between items-center border-t border-slate-200">
                    <span className="text-lg font-black text-slate-900">
                      Total
                    </span>
                    <span className="text-2xl font-black text-blue-600">
                      ₹{getTotal().toFixed(0)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="w-full mt-6 text-center text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Change Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
