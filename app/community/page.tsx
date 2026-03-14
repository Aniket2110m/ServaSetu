"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(3);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", service: "", rating: 5, review: "" });

  const allStories = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      service: "Complete Home Maintenance",
      category: "electrical",
      image: "PS",
      rating: 5,
      review:
        "ServaSetu has been a game-changer for our family. From plumbing to electrical work, their professionals are always on time and extremely skilled. We've been using their AMC plan for 6 months now!",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      service: "AC Repair & Maintenance",
      category: "ac-repair",
      image: "RK",
      rating: 5,
      review:
        "The AC technician was incredibly professional. He explained everything clearly, provided genuine advice, and the service was completed in under 2 hours. Highly recommend!",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Ananya Patel",
      location: "Delhi NCR",
      service: "Plumbing Emergency",
      category: "plumbing",
      image: "AP",
      rating: 5,
      review:
        "Had a major pipe leak at 11 PM. Their emergency service responded within 45 minutes! The technician was skilled and fixed everything perfectly. True professionals!",
      date: "3 weeks ago",
    },
    {
      id: 4,
      name: "Suresh Nair",
      location: "Chennai, Tamil Nadu",
      service: "Electrical Panel Upgrade",
      category: "electrical",
      image: "SN",
      rating: 5,
      review:
        "Our old fuse box was a safety hazard. The electrician diagnosed the issue immediately and upgraded our entire panel the same day. Transparent pricing, zero surprises.",
      date: "2 months ago",
    },
    {
      id: 5,
      name: "Meena Verma",
      location: "Hyderabad, Telangana",
      service: "Deep Home Cleaning",
      category: "cleaning",
      image: "MV",
      rating: 5,
      review:
        "Booked a post-renovation deep clean and was blown away. Every corner was spotless within 4 hours. The team was polite, efficient, and used eco-friendly products.",
      date: "5 weeks ago",
    },
    {
      id: 6,
      name: "Arun Joshi",
      location: "Pune, Maharashtra",
      service: "Bathroom Pipe Repair",
      category: "plumbing",
      image: "AJ",
      rating: 4,
      review:
        "Excellent plumber arrived within the promised window and fixed a stubborn leak that two others couldn't solve. Reasonable pricing and very tidy work.",
      date: "3 months ago",
    },
  ];

  const filtered = activeCategory === "all" ? allStories : allStories.filter((s) => s.category === activeCategory);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setVisibleCount(3);
  }

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
      setReviewForm({ name: "", service: "", rating: 5, review: "" });
    }, 2500);
  }

  return (
    <div className="font-display bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-[#1F4E8C] to-[#1FA37A] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6">
              <span className="material-symbols-outlined text-sm text-[#FF9933]">
                groups
              </span>
              ServaSetu Community
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
              Real Stories from
              <br />
              <span className="text-[#FF9933]">Real Homeowners</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Join thousands of satisfied customers who trust ServaSetu for all
              their home maintenance needs. Read their experiences and become
              part of our growing community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-white text-[#1F4E8C] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2"
              >
                Book Your Service
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a
                href="#stories"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
              >
                Read Success Stories
                <span className="material-symbols-outlined">expand_more</span>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {[
              { number: "10,000+", label: "Happy Customers", icon: "mood" },
              { number: "500+", label: "Expert Technicians", icon: "verified_user" },
              { number: "50+", label: "Cities Covered", icon: "location_city" },
              { number: "98%", label: "Satisfaction Rate", icon: "star" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <span className="material-symbols-outlined text-[#FF9933] text-4xl mb-3 block">
                  {stat.icon}
                </span>
                <div className="text-4xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section id="stories" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#1F4E8C] mb-4">
              Customer Success Stories
            </h2>
            <div className="h-1.5 w-24 bg-[#FF9933] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real experiences from homeowners who chose ServaSetu
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["all", "plumbing", "electrical", "ac-repair", "cleaning"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize transition-all ${
                    activeCategory === category
                      ? "bg-brand-gradient text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category.replace("-", " ")}
                </button>
              )
            )}
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((story) => (
              <div
                key={story.id}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="size-14 rounded-full bg-gradient-to-br from-[#1F4E8C] to-[#1FA37A] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {story.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#1F4E8C] text-lg">
                      {story.name}
                    </h4>
                    <p className="text-sm text-slate-600">{story.location}</p>
                    <div className="flex text-[#FF9933] mt-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-[#1F4E8C]/10 text-[#1F4E8C] px-3 py-1 rounded-full text-xs font-bold">
                    {story.service}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed text-justify mb-4 italic">
                  &quot;{story.review}&quot;
                </p>

                <p className="text-sm text-slate-500">{story.date}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            {hasMore ? (
              <button
                onClick={() => setVisibleCount((c) => c + 3)}
                className="bg-[#1F4E8C] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                Load More Stories
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            ) : (
              <p className="text-slate-500 text-sm">
                All {filtered.length} {activeCategory !== "all" ? `${activeCategory.replace("-", " ")} ` : ""}stories shown.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#1F4E8C] mb-4">
              Video Testimonials
            </h2>
            <div className="h-1.5 w-24 bg-[#FF9933] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Watch our customers share their experiences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-[#1F4E8C] to-[#1FA37A] relative flex items-center justify-center">
                  <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-4xl">
                      play_circle
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-xs font-medium">
                      2:45
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-[#1F4E8C] mb-2">
                    Customer Review #{item}
                  </h4>
                  <p className="text-sm text-slate-600">
                    Watch how ServaSetu transformed their home maintenance
                    experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-gradient-to-r from-[#1F4E8C] to-[#1FA37A] rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
            
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[#FF9933] text-6xl mb-6 block">
                record_voice_over
              </span>
              <h2 className="text-4xl font-extrabold text-white mb-6">
                Share Your ServaSetu Story
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Had a great experience? We'd love to hear from you! Share your
                story and inspire others in the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-white text-[#1F4E8C] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">edit_note</span>
                  Write Your Review
                </button>
                <Link href="/auth">
                  <button className="bg-[#FF9933] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:brightness-110 transition-all inline-flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">videocam</span>
                    Submit Video Testimonial
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#1F4E8C] mb-4">
              Community FAQs
            </h2>
            <div className="h-1.5 w-24 bg-[#FF9933] rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Common questions from our community members
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How can I join the ServaSetu community?",
                a: "Simply book a service with us! Once you've experienced our services, you'll automatically become part of our growing community.",
              },
              {
                q: "Can I share my experience on social media?",
                a: "Absolutely! We encourage you to share your ServaSetu stories on social media. Tag us @ServaSetu to be featured on our official channels.",
              },
              {
                q: "Do you offer rewards for referrals?",
                a: "Yes! Our community referral program offers exclusive benefits. Refer friends and family to earn rewards on future bookings.",
              },
              {
                q: "How are professionals verified in the community?",
                a: "All our technicians undergo rigorous background checks, skill assessments, and continuous training to maintain ServaSetu standards.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h4 className="font-bold text-[#1F4E8C] text-lg pr-4">
                    {faq.q}
                  </h4>
                  <span className="material-symbols-outlined text-[#1FA37A] group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </summary>
                <p className="text-slate-600 mt-4 leading-relaxed text-justify">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative">
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            {reviewSubmitted ? (
              <div className="text-center py-8">
                <span
                  className="material-symbols-outlined text-6xl text-[#1FA37A] mb-4 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <h3 className="text-2xl font-bold text-[#1B2430] mb-2">Thank you!</h3>
                <p className="text-slate-600">Your review has been submitted for moderation.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#1F4E8C] mb-6">Write Your Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      required
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Priya Sharma"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA37A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Service Used</label>
                    <input
                      required
                      value={reviewForm.service}
                      onChange={(e) => setReviewForm((f) => ({ ...f, service: e.target.value }))}
                      placeholder="e.g. AC Repair, Plumbing"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA37A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                          className={`text-3xl transition-colors ${reviewForm.rating >= star ? "text-[#FF9933]" : "text-slate-300"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Your Experience</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm((f) => ({ ...f, review: e.target.value }))}
                      placeholder="Tell us about your experience with ServaSetu..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1FA37A] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1FA37A] text-white py-3.5 rounded-xl font-bold hover:brightness-110 transition-all"
                  >
                    Submit Review
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
