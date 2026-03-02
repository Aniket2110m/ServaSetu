'use client';

import { useState } from 'react';

export default function AMCSection() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const trustStats = [
    { number: '2000+', label: 'Homes Protected', icon: 'home' },
    { number: '98%', label: 'Customer Satisfaction', icon: 'sentiment_satisfied' },
    { number: '24Hr', label: 'Response Support', icon: 'schedule' },
  ];

  const features = [
    { text: 'Unlimited Breakdown Calls', icon: 'check_circle' },
    { text: 'Quarterly Preventive Maintenance', icon: 'check_circle' },
    { text: 'Priority Service Slots', icon: 'check_circle' },
  ];

  const plans = [
    {
      name: 'Basic Shield',
      price: '₹5,999',
      period: '/year',
      popular: false,
      features: [
        '2 Preventive Visits',
        'Limited Breakdown Support',
        'Standard Response Time',
      ],
      buttonStyle: 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100',
    },
    {
      name: 'Home Shield',
      price: '₹8,999',
      period: '/year',
      popular: false,
      features: [
        '3 Preventive Visits',
        'Unlimited Breakdown Calls',
        'Priority Scheduling',
      ],
      buttonStyle: 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100',
    },
    {
      name: 'Platinum Shield',
      price: '₹12,499',
      period: '/year',
      popular: true,
      features: [
        '4 Preventive Visits',
        'Unlimited Breakdown Calls',
        'Dedicated Support Line',
        'Structural Coverage',
      ],
      buttonStyle: 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100',
    },
  ];

  return (
    <section className="w-full bg-[#F7F9FC] overflow-x-hidden">
      {/* TRUST STRIP - Full Width Stats */}
      <div className="w-full border-b border-gray-200 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {trustStats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="size-10 sm:size-12 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                    <span className="material-symbols-outlined text-blue-600 text-base sm:text-xl">
                      {stat.icon}
                    </span>
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1B2430] break-words">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-slate-600 mt-1 break-words px-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN AMC SECTION */}
      <div className="w-full py-12 md:py-24 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto overflow-x-hidden">
          {/* Decorative gradient blob */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-10"></div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6 md:gap-8 lg:gap-12 items-start lg:items-center relative z-10 w-full overflow-x-hidden">
            {/* LEFT SIDE - PROTECTION ECOSYSTEM */}
            <div className="flex flex-col overflow-hidden max-w-md">
              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1B2430] leading-tight mb-3 sm:mb-4 break-words overflow-wrap-anywhere">
                365 Days of
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  Home Protection.
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-sm mb-5 sm:mb-6 leading-relaxed break-words">
                Predictable maintenance. Zero surprise breakdown costs. Priority assistance when you need it.
              </p>

              {/* Feature Pills */}
              <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 w-full">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 px-3 sm:px-4 py-2 sm:py-2.5 w-full overflow-hidden"
                  >
                    <span className="material-symbols-outlined text-emerald-500 text-base sm:text-lg flex-shrink-0">
                      {feature.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1B2430] break-words flex-1 min-w-0">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <button className="rounded-full px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95">
                  Get Protected Now
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - PRICING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 overflow-x-hidden pt-2 md:pt-3">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPlan(index)}
                  className={`relative z-10 hover:z-30 bg-white rounded-2xl p-5 sm:p-6 md:p-6 shadow-lg border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                    selectedPlan === index
                      ? 'border-2 border-emerald-500'
                      : 'border border-gray-100'
                  }`}
                >
                  {/* Plan Name */}
                  <div className="mb-4 sm:mb-5 overflow-hidden">
                    <h3 className="text-base sm:text-lg font-bold text-[#1B2430] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {plan.price}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 whitespace-nowrap">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 sm:space-y-3 mb-6 md:mb-8 flex-grow overflow-hidden">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2 sm:gap-3 min-h-0 w-full">
                        <span className="material-symbols-outlined text-emerald-500 text-base sm:text-lg flex-shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="text-xs sm:text-sm text-slate-600 break-words overflow-wrap-anywhere flex-1 min-w-0">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(index);
                    }}
                    className={`w-full rounded-full py-2 sm:py-2.5 font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-md active:scale-95 relative z-20 ${
                      selectedPlan === index
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md'
                        : plan.buttonStyle
                    }`}
                  >
                    Choose Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
