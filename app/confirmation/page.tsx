"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SelectedService {
  id: string;
  name: string;
  price: number;
  categoryIcon: string;
}

interface AddressData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  landmark: string;
}

export default function ConfirmationPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [bookingId, setBookingId] = useState<string>("");

  useEffect(() => {
    // Load booking details from localStorage
    const savedServices = localStorage.getItem("selectedServices");
    const savedDate = localStorage.getItem("selectedDate");
    const savedTime = localStorage.getItem("selectedTime");
    const savedAddress = localStorage.getItem("addressData");

    if (savedServices) {
      try {
        setSelectedServices(JSON.parse(savedServices));
      } catch (error) {
        console.error("Failed to parse services:", error);
      }
    }

    if (savedDate) setSelectedDate(savedDate);
    if (savedTime) setSelectedTime(savedTime);

    if (savedAddress) {
      try {
        setAddressData(JSON.parse(savedAddress));
      } catch (error) {
        console.error("Failed to parse address:", error);
      }
    }

    // Generate booking ID
    const id = `#SVS-${Date.now().toString().slice(-8)}`;
    setBookingId(id);

    setIsLoaded(true);
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

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      <Navbar />

      <main className="flex-grow w-full px-6 py-12 md:px-20">
        <div className="w-full max-w-[1280px] mx-auto">
          {/* Success Animation */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center justify-center size-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 animate-bounce">
              <span
                className="material-symbols-outlined text-white text-6xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-slate-600">
              Your service has been successfully scheduled. Check your email for details.
            </p>
          </div>

          {/* Main Booking Details Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    Booking ID
                  </p>
                  <p className="text-2xl font-black">{bookingId}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm font-medium mb-1">
                    Booking Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-300">
                      verified_user
                    </span>
                    <span className="font-bold">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Services Section */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Services Booked
                </h3>
                <div className="space-y-3">
                  {selectedServices.length > 0 ? (
                    selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            {service.name}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-blue-600">
                          ₹{service.price.toFixed(0)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">No services selected</p>
                  )}
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                {/* Scheduled Date & Time */}
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Schedule Details
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600">
                          calendar_today
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Booking Date</p>
                        <p className="font-semibold text-slate-900">
                          {selectedDate || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-600">
                          schedule
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Time Slot</p>
                        <p className="font-semibold text-slate-900">
                          {selectedTime || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Contact Information
                  </p>
                  <div className="space-y-3">
                    {addressData && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-600">
                              person
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Name</p>
                            <p className="font-semibold text-slate-900">
                              {addressData.fullName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-orange-600">
                              call
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Phone</p>
                            <p className="font-semibold text-slate-900">
                              {addressData.phone}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="border-t border-slate-200 pt-8">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Service Location
                </p>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-red-600">
                      location_on
                    </span>
                  </div>
                  {addressData ? (
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">
                        {addressData.address}
                      </p>
                      {addressData.landmark && (
                        <p className="text-sm text-slate-600 mb-2">
                          Landmark: {addressData.landmark}
                        </p>
                      )}
                      <p className="text-sm text-slate-600">
                        {addressData.city}, {addressData.state} - {addressData.postalCode}
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-500">No address provided</p>
                  )}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-slate-200 pt-8">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                  Billing Summary
                </p>
                <div className="bg-slate-50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ₹{getSubtotal().toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Tax (12%)</span>
                    <span className="font-semibold text-slate-900">
                      ₹{getTax().toFixed(0)}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-black text-blue-600">
                      ₹{getTotal().toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">home</span>
              Back to Home
            </Link>
            <Link
              href="/booking"
              className="px-8 py-4 bg-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Book Another Service
            </Link>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-blue-600">
                    info
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    What's Next?
                  </h4>
                  <p className="text-sm text-slate-600">
                    We'll assign a professional technician 24 hours before your service appointment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-emerald-600">
                    verified_user
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    30-Day Warranty
                  </h4>
                  <p className="text-sm text-slate-600">
                    All our services come with a 30-day quality guarantee.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-orange-600">
                    support_agent
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    Need Help?
                  </h4>
                  <p className="text-sm text-slate-600">
                    Contact us at support@servasetu.com or call our hotline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
