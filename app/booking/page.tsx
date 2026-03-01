"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookingPage() {
  const router = useRouter();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check authentication
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      router.push('/auth');
      setIsAuthenticated(false);
    }
  }, [router]);

  const categories = [
    {
      id: "home-repair",
      icon: "home_repair_service",
      title: "Home Repair & Maintenance",
      description: "Professional home repair and maintenance services",
      subcategories: [
        { id: "plumbing", name: "Plumbing Services", price: 299.0 },
        { id: "electrical", name: "Electrical Services", price: 349.0 },
        { id: "carpentry", name: "Carpentry Services", price: 399.0 },
        { id: "appliance-repair", name: "Appliance Repair (AC, Refrigerator, Washing Machine, Geyser, RO)", price: 499.0 },
        { id: "tv-mounting", name: "TV Installation & Wall Mounting", price: 449.0 },
      ],
    },
    {
      id: "cleaning",
      icon: "cleaning_services",
      title: "Cleaning & Hygiene Services",
      description: "Deep cleaning and hygiene solutions for your space",
      subcategories: [
        { id: "deep-home", name: "Deep Home Cleaning", price: 1999.0 },
        { id: "sofa-mattress", name: "Sofa & Mattress Cleaning", price: 899.0 },
        { id: "kitchen-deep", name: "Kitchen Deep Cleaning", price: 1299.0 },
        { id: "bathroom-deep", name: "Bathroom Deep Cleaning", price: 799.0 },
        { id: "water-tank", name: "Water Tank Cleaning", price: 1499.0 },
        { id: "pest-control", name: "Pest Control Services", price: 1199.0 },
        { id: "post-construction", name: "Post-Construction Cleaning", price: 2499.0 },
        { id: "move-cleaning", name: "Move-In / Move-Out Cleaning", price: 2199.0 },
      ],
    },
    {
      id: "painting",
      icon: "format_paint",
      title: "Painting & Minor Renovation",
      description: "Professional painting and renovation work",
      subcategories: [
        { id: "interior-painting", name: "Interior Painting", price: 4999.0 },
        { id: "exterior-painting", name: "Exterior Painting", price: 5999.0 },
        { id: "waterproofing", name: "Waterproofing Services", price: 3499.0 },
        { id: "tile-repair", name: "Tile Repair & Minor Civil Work", price: 1999.0 },
      ],
    },
    {
      id: "gardening",
      icon: "yard",
      title: "Gardening & Outdoor Services",
      description: "Complete garden care and outdoor maintenance",
      subcategories: [
        { id: "garden-maintenance", name: "Gardening Maintenance", price: 799.0 },
        { id: "lawn-mowing", name: "Lawn Mowing", price: 499.0 },
        { id: "terrace-garden", name: "Terrace Garden Setup", price: 2999.0 },
        { id: "plant-care", name: "Plant Care & Maintenance", price: 599.0 },
      ],
    },
    {
      id: "automobile",
      icon: "directions_car",
      title: "Automobile Utility Services",
      description: "Professional vehicle cleaning and care at your doorstep",
      subcategories: [
        { id: "car-washing", name: "Car Washing at Home", price: 399.0 },
        { id: "car-detailing", name: "Car Detailing", price: 1999.0 },
        { id: "bike-washing", name: "Bike Washing", price: 199.0 },
      ],
    },
    {
      id: "safety",
      icon: "security",
      title: "Safety & Installation Services",
      description: "Smart security and electrical installations",
      subcategories: [
        { id: "cctv-installation", name: "CCTV Installation", price: 2499.0 },
        { id: "smart-lock", name: "Smart Lock Installation", price: 1799.0 },
        { id: "inverter-battery", name: "Inverter & Battery Installation", price: 1499.0 },
        { id: "basic-electrical", name: "Basic Electrical Installations", price: 899.0 },
      ],
    },
    {
      id: "commercial",
      icon: "business",
      title: "Commercial & Facility Services (B2B)",
      description: "Professional facility management for businesses",
      subcategories: [
        { id: "office-maintenance", name: "Office Maintenance", price: 4999.0 },
        { id: "retail-maintenance", name: "Retail Store Maintenance", price: 5999.0 },
        { id: "society-contracts", name: "Society Maintenance Contracts", price: 9999.0 },
        { id: "commercial-cleaning", name: "Commercial Cleaning Services", price: 3999.0 },
      ],
    },
  ];

  // Save selected services to localStorage whenever they change
  useEffect(() => {
    if (selectedServices.length > 0) {
      const serviceData = selectedServices.map(serviceId => {
        for (const category of categories) {
          const service = category.subcategories.find(s => s.id === serviceId);
          if (service) {
            return {
              id: service.id,
              name: service.name,
              price: service.price,
              categoryIcon: category.icon
            };
          }
        }
        return null;
      }).filter(Boolean);
      
      localStorage.setItem('selectedServices', JSON.stringify(serviceData));
    } else {
      localStorage.removeItem('selectedServices');
    }
  }, [selectedServices, categories]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getDisplayName = (serviceId: string) => {
    for (const category of categories) {
      const sub = category.subcategories.find((s) => s.id === serviceId);
      if (sub) return sub.name;
    }
    return "";
  };

  const getTotalPrice = () => {
    let total = 0;
    for (const category of categories) {
      for (const sub of category.subcategories) {
        if (selectedServices.includes(sub.id)) {
          total += sub.price;
        }
      }
    }
    return total;
  };

  const handleProceedToCheckout = () => {
    // Ensure data is saved before navigation
    const serviceData = selectedServices.map(serviceId => {
      for (const category of categories) {
        const service = category.subcategories.find(s => s.id === serviceId);
        if (service) {
          return {
            id: service.id,
            name: service.name,
            price: service.price,
            categoryIcon: category.icon
          };
        }
      }
      return null;
    }).filter(Boolean);
    
    localStorage.setItem('selectedServices', JSON.stringify(serviceData));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white via-[#F5F7FA] to-white">
      {!isAuthenticated && <></>}
      <Navbar />
      {/* Main Content */}

      {/* Main Content */}
      <main className="flex w-full flex-col px-6 py-12 md:px-20 flex-grow">
        {/* Gradient Section */}
        <div className="px-6 md:px-8 py-12 mb-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl shadow-xl">
          {/* Progress Indicator */}
          <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              Service Selection
            </h3>
            <span className="text-sm font-bold text-white">
              25% Completed
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-white/30">
            <div
              className="absolute h-full rounded-full bg-white"
              style={{ width: "25%" }}
            ></div>
          </div>
          <div className="grid grid-cols-4 w-full text-[11px] font-bold uppercase tracking-wider text-white/80">
            <div className="text-white">1. Select Service</div>
            <div className="px-4">2. Schedule</div>
            <div className="px-4">3. Address</div>
            <div className="text-right">4. Payment</div>
          </div>
        </div>
        </div>

        {/* Services Section - Full Width */}
        <div className="w-full">
          <div className="flex flex-col gap-8 bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-md border border-slate-200">
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative size-10 rounded-full overflow-hidden border border-slate-200 bg-white">
                  <Image src="/logo.png" alt="ServaSetu Logo" fill className="object-contain" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-[#0A192F]">
                  Select Our Services : 
                </h1>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-2xl text-justify-safe">
                Choose one or more services from the categories below. Our certified
                professionals will handle all selected tasks with premium quality
                and transparent pricing !!
              </p>
            </div>

            {/* Categories Accordion */}
            <div className="space-y-4 pb-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  ref={(el) => {
                    categoryRefs.current[category.id] = el;
                  }}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all"
                >
                  {/* Category Header */}
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.id ? null : category.id
                      )
                    }
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                          expandedCategory === category.id
                            ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {category.icon}
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-[#0A192F]">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-slate-400 transition-transform ${
                        expandedCategory === category.id ? "rotate-180" : ""
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Subcategories List */}
                  {expandedCategory === category.id && (
                    <div className="border-t-2 border-blue-100 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 p-6 space-y-3">
                      {category.subcategories.map((sub) => (
                        <label
                          key={sub.id}
                          className="flex items-center gap-4 cursor-pointer p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 transition-all duration-200 border border-slate-200 hover:border-blue-300 hover:shadow-md group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(sub.id)}
                            onChange={() => toggleService(sub.id)}
                            className="w-5 h-5 accent-blue-600 cursor-pointer rounded-md transition-transform group-hover:scale-110"
                          />
                          <div className="flex-1">
                            <p className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                              {sub.name}
                            </p>
                          </div>
                          <span className="text-base font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-blue-100 transition-colors">
                            ₹{sub.price.toFixed(0)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Cart Button */}
        {selectedServices.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <button 
              onClick={handleProceedToCheckout}
              className="relative group cursor-pointer"
            >
              {/* Cart Circle */}
              <div className="size-16 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">
                  shopping_cart
                </span>
              </div>
              {/* Badge with count */}
              <div className="absolute -top-2 -right-2 size-8 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-black border-2 border-white shadow-lg">
                {selectedServices.length}
              </div>
              {/* Tooltip with total */}
              <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl">
                  ₹{getTotalPrice().toFixed(0)} • {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}
                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                </div>
              </div>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
