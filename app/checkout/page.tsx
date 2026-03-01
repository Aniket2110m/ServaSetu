"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, startOfToday } from "date-fns";
import "react-day-picker/dist/style.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

interface SelectedService {
  id: string;
  name: string;
  price: number;
  categoryIcon: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [selectedTime, setSelectedTime] = useState("11:00 AM - 01:00 PM");
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleProceedToPayment = () => {
    // Save checkout details to localStorage for address page
    localStorage.setItem('selectedDate', selectedDate ? format(selectedDate, 'dd MMM yyyy') : '');
    localStorage.setItem('selectedTime', selectedTime);
    localStorage.setItem('selectedPayment', selectedPayment);
    router.push('/address');
  };

  // Check authentication
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      router.push('/auth');
      setIsAuthenticated(false);
    }
  }, [router]);

  // Load selected services from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('selectedServices');
    if (savedServices) {
      try {
        const parsedServices = JSON.parse(savedServices);
        setSelectedServices(parsedServices);
      } catch (error) {
        console.error('Failed to parse selected services:', error);
        setSelectedServices([]);
      }
    }
  }, []);

  const timeSlots = [
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
  ];

  // Calculate totals
  const getSubtotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.12; // 12% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const totalSteps = 4;
  const currentStep = 3;
  const progressPosition = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {!isAuthenticated && <></>}
      <Navbar />

      <main className="flex w-full flex-col px-6 py-12 md:px-20 flex-grow">
        <div className="px-6 md:px-8 py-12 mb-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Scheduling & Checkout</h3>
              <span className="text-sm font-bold text-white">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-white/30">
              <div
                className="absolute h-full rounded-full bg-white"
                style={{ width: `${progressPosition}%` }}
              ></div>
              <div
                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-400 shadow-md"
                style={{ left: `calc(${progressPosition}% - 8px)` }}
              ></div>
            </div>
            <div className="grid grid-cols-4 w-full text-[11px] font-bold uppercase tracking-wider text-white/80">
              <div className="text-white">1. Select Service</div>
              <div className="px-4 text-white">2. Schedule</div>
              <div className="px-4">3. Address</div>
              <div className="text-right">4. Payment</div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1280px] mx-auto">
        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">
            Complete Your Booking
          </h1>
          <p className="text-slate-500 mt-2 text-lg max-w-3xl mx-auto">
            Select a convenient time and preferred payment method to confirm
            your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Scheduling & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Date & Time Selection */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-600/10 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Select Date & Time
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Calendar */}
                <div className="calendar-container border border-slate-100 rounded-xl p-6">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={{ before: today }}
                    showOutsideDays
                    className="w-full"
                    classNames={{
                      root: "w-full",
                      months: "w-full",
                      month: "w-full",
                      month_caption: "mb-4 flex items-center justify-between",
                      caption_label: "text-xl font-bold text-slate-900",
                      nav: "flex items-center gap-2",
                      button_previous:
                        "h-9 w-9 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer",
                      button_next:
                        "h-9 w-9 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer",
                      month_grid: "w-full border-collapse",
                      weekdays: "grid grid-cols-7 gap-1 mb-2",
                      weekday:
                        "rounded-md bg-slate-800 py-2 text-center text-xs font-extrabold uppercase tracking-wide text-white",
                      week: "grid grid-cols-7 gap-1 mt-1",
                      day: "h-10 w-10 p-0 text-center rounded-full",
                      day_button:
                        "h-10 w-10 rounded-full text-sm font-semibold text-slate-900 hover:bg-slate-200 transition-colors",
                      selected:
                        "!rounded-full !bg-gradient-to-r !from-blue-600 !to-emerald-500 !text-white hover:!from-blue-600 hover:!to-emerald-500",
                      today: "",
                      outside: "text-slate-400",
                      disabled: "text-slate-300",
                    }}
                  />
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Available Time Slots
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3.5 px-4 rounded-lg text-sm font-semibold transition-all text-center border ${
                          selectedTime === time
                            ? "bg-slate-500 text-white border-slate-500 shadow-sm"
                            : "bg-[#F6F9FC] text-slate-900 border-slate-300 hover:bg-slate-300 hover:text-slate-950"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-600/10 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div
                  onClick={() => setSelectedPayment("upi")}
                  className={`relative p-5 rounded-xl flex flex-col items-center gap-3 text-center cursor-pointer group ${
                    selectedPayment === "upi"
                      ? "border-2 border-blue-600 bg-blue-50"
                      : "border border-slate-200 hover:border-blue-600 transition-colors"
                  }`}
                >
                  <span className="material-symbols-outlined text-blue-600 text-3xl">
                    account_balance_wallet
                  </span>
                  <p className="font-bold text-slate-900">UPI Payment</p>
                  <p className="text-xs text-slate-500">
                    Google Pay, PhonePe, Paytm
                  </p>
                  {selectedPayment === "upi" && (
                    <div className="absolute top-3 right-3">
                      <span className="material-symbols-outlined text-blue-600 text-lg">
                        check_circle
                      </span>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setSelectedPayment("card")}
                  className={`p-5 rounded-xl flex flex-col items-center gap-3 text-center cursor-pointer ${
                    selectedPayment === "card"
                      ? "border-2 border-blue-600 bg-blue-50"
                      : "border border-slate-200 hover:border-blue-600 transition-colors"
                  }`}
                >
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    credit_card
                  </span>
                  <p className="font-bold text-slate-900">Cards</p>
                  <p className="text-xs text-slate-500">
                    Credit or Debit Cards
                  </p>
                </div>

                <div
                  onClick={() => setSelectedPayment("netbanking")}
                  className={`p-5 rounded-xl flex flex-col items-center gap-3 text-center cursor-pointer ${
                    selectedPayment === "netbanking"
                      ? "border-2 border-blue-600 bg-blue-50"
                      : "border border-slate-200 hover:border-blue-600 transition-colors"
                  }`}
                >
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    account_balance
                  </span>
                  <p className="font-bold text-slate-900">Net Banking</p>
                  <p className="text-xs text-slate-500">
                    All Major Indian Banks
                  </p>
                </div>

                <div
                  onClick={() => setSelectedPayment("pay_after_service")}
                  className={`p-5 rounded-xl flex flex-col items-center gap-3 text-center cursor-pointer ${
                    selectedPayment === "pay_after_service"
                      ? "border-2 border-blue-600 bg-blue-50"
                      : "border border-slate-200 hover:border-blue-600 transition-colors"
                  }`}
                >
                  <span className="material-symbols-outlined text-slate-400 text-3xl">
                    payments
                  </span>
                  <p className="font-bold text-slate-900">Pay After Service</p>
                  <p className="text-xs text-slate-500">
                    Pay once service is completed
                  </p>
                </div>
              </div>

              {selectedPayment === "upi" && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Enter UPI ID
                  </label>
                  <div className="flex gap-4">
                    <input
                      className="flex-1 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-900 px-4 h-12"
                      placeholder="username@upi"
                      type="text"
                    />
                    <button className="bg-slate-900 text-white font-bold px-6 rounded-lg">
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-6 text-white">
                  <h3 className="text-lg font-bold">Order Summary</h3>
                  <p className="text-xs text-white/80 mt-1">{selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Selected Services */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedServices.length > 0 ? (
                      selectedServices.map((service, index) => (
                        <div key={service.id} className="flex items-start gap-4 pb-3 border-b border-slate-100">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                            <span className="material-symbols-outlined text-2xl">
                              {service.categoryIcon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                              {service.name}
                            </h4>
                            <p className="text-xs text-blue-600 font-bold mt-1">
                              ₹{service.price.toFixed(0)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <span className="material-symbols-outlined text-slate-300 text-5xl mb-2">
                          shopping_cart
                        </span>
                        <p className="text-sm text-slate-500">
                          No services selected
                        </p>
                        <Link href="/booking" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                          Go back to select services
                        </Link>
                      </div>
                    )}
                  </div>

                  {selectedServices.length > 0 && (
                    <>
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Service Date</span>
                          <span className="font-semibold text-slate-900">
                            {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Time Slot</span>
                          <span className="font-semibold text-slate-900">
                            {selectedTime}
                          </span>
                        </div>

                        <div className="border-t border-dashed border-slate-200 my-4"></div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-semibold text-slate-900">
                            ₹{getSubtotal().toFixed(0)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Service Tax (12%)</span>
                          <span className="font-semibold text-slate-900">
                            ₹{getTax().toFixed(0)}
                          </span>
                        </div>

                        <div className="pt-4 flex justify-between items-center">
                          <span className="text-lg font-black text-slate-900">
                            Total
                          </span>
                          <span className="text-2xl font-black text-blue-600">
                            ₹{getTotal().toFixed(0)}
                          </span>
                        </div>
                      </div>

                      <button onClick={handleProceedToPayment} className="w-full mt-6 bg-gradient-to-r from-blue-600 to-emerald-500 hover:brightness-105 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                        <span>Proceed to Pay</span>
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </button>

                      <p className="text-[10px] text-center text-slate-400 mt-4 px-4 uppercase tracking-widest font-bold">
                        Secure checkout powered by Razorpay
                      </p>
                    </>
                  )}
                </div>
              </div>

              {selectedServices.length > 0 && (
                <div className="mt-6 flex items-center justify-center gap-4 text-slate-400">
                  <span className="material-symbols-outlined text-sm">
                    verified_user
                  </span>
                  <span className="text-xs font-medium uppercase tracking-tighter">
                    Safe & Secure Payment Guaranteed
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
