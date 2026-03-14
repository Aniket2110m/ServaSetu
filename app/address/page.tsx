"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlowProgress from "@/components/FlowProgress";

interface SelectedService {
  id: string;
  name: string;
  price: number;
  categoryIcon: string;
}

export default function AddressPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Check authentication
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.push("/auth");
      setIsAuthenticated(false);
    }
  }, [router]);

  // Load booking details from localStorage
  useEffect(() => {
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

    // Load saved address data if exists
    if (savedAddress) {
      try {
        setFormData(JSON.parse(savedAddress));
      } catch (error) {
        console.error("Failed to parse address:", error);
      }
    }
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!/^\d{6}$/.test(formData.postalCode.replace(/\D/g, "")))
      newErrors.postalCode = "Postal code must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    // Save address data to localStorage
    localStorage.setItem("addressData", JSON.stringify(formData));
    
    // Redirect to payment
    setTimeout(() => {
      router.push("/payment");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {!isAuthenticated && <></>}
      <Navbar />

      <main className="flex w-full flex-col px-6 py-12 md:px-20 flex-grow">
        <FlowProgress title="Delivery Address & Contact" currentStep={3} />

        <div className="w-full max-w-[1280px] mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">
              Delivery & Contact Details
            </h1>
            <p className="text-slate-500 mt-2 text-lg max-w-3xl mx-auto">
              Please provide your address and contact information for service delivery
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Screen-reader error announcement — always in DOM, updated on submit */}
              <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {Object.keys(errors).length > 0
                  ? `${Object.keys(errors).length} error${Object.keys(errors).length > 1 ? "s" : ""}: ${Object.values(errors).filter(Boolean).join(". ")}.`
                  : ""}
              </div>
              <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.fullName
                          ? "border-red-500 focus:border-red-600"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                          errors.email
                            ? "border-red-500 focus:border-red-600"
                            : "border-slate-200 focus:border-blue-600"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit phone number"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                          errors.phone
                            ? "border-red-500 focus:border-red-600"
                            : "border-slate-200 focus:border-blue-600"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Street Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your street address"
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.address
                          ? "border-red-500 focus:border-red-600"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Landmark */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="e.g., Near the park, Next to hospital"
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 transition-all focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* City, State, Postal Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city name"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                          errors.city
                            ? "border-red-500 focus:border-red-600"
                            : "border-slate-200 focus:border-blue-600"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state name"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                          errors.state
                            ? "border-red-500 focus:border-red-600"
                            : "border-slate-200 focus:border-blue-600"
                        }`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="6-digit postal code"
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                        errors.postalCode
                          ? "border-red-500 focus:border-red-600"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={loading}
                  className="w-full mt-8 bg-gradient-to-r from-blue-600 to-emerald-500 hover:brightness-105 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                  <span>{loading ? "Processing..." : "Proceed to Payment"}</span>
                </button>
              </section>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6">
                  Booking Summary
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
                  href="/checkout"
                  className="w-full mt-6 text-center text-sm text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Change Schedule
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
