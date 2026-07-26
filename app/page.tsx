"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, LeadInput } from "@/lib/schema";
import { createLead } from "@/app/actions";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    setServerError(null);
    const res = await createLead(data);

    if (res.success) {
      setIsSubmitted(true);
      reset();
    } else {
      setServerError(res.message || "Something went wrong. Please try again.");
    }
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 antialiased font-sans transition-colors duration-200">
      
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-slate-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-mono font-bold text-xs shadow-sm">
              L
            </div>
            <span className="font-semibold text-base tracking-tight text-slate-900 dark:text-zinc-100">
              LeadDesk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              System Online
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 2. Hero Section + Form */}
      <section className="max-w-6xl mx-auto w-full px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-800">
              Inbound Capture
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 leading-[1.1]">
              Accelerate your client intake.
            </h1>
            
            <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
              Submit your inquiry directly to our lead management pipeline. We review project details and respond within 24 hours.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300 font-medium">
                <div className="h-6 w-6 rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>End-to-end validated pipeline</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-300 font-medium">
                <div className="h-6 w-6 rounded-full bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>Instant routing to admin workspace</span>
              </div>
            </div>
          </div>

          {/* Lead Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl p-8 sm:p-10">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-semibold">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">Inquiry Received</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                      Your lead has been validated and saved to the LeadDesk workspace.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center justify-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-4 transition"
                  >
                    Submit another lead &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {serverError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium">
                      {serverError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all ${
                        errors.name
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100"
                      }`}
                      placeholder="Alex Rivera"
                    />
                    {errors.name && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Work Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all ${
                        errors.email
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100"
                      }`}
                      placeholder="alex@company.com"
                    />
                    {errors.email && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Budget Range
                    </label>
                    <select
                      {...register("budget_range")}
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 outline-none transition-all ${
                        errors.budget_range
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100"
                      }`}
                    >
                      <option value="" className="bg-white dark:bg-zinc-900">Select an estimated budget</option>
                      <option value="<$1k" className="bg-white dark:bg-zinc-900">Under $1,000</option>
                      <option value="$1k-$5k" className="bg-white dark:bg-zinc-900">$1,000 – $5,000</option>
                      <option value="$5k-$10k" className="bg-white dark:bg-zinc-900">$5,000 – $10,000</option>
                      <option value="$10k+" className="bg-white dark:bg-zinc-900">$10,000+</option>
                    </select>
                    {errors.budget_range && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.budget_range.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Project Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={`w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-950 border rounded-xl text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-600 outline-none transition-all resize-none ${
                        errors.message
                          ? "border-red-400 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950"
                          : "border-slate-200 dark:border-zinc-800 focus:border-slate-900 dark:focus:border-zinc-100"
                      }`}
                      placeholder="Briefly describe project scope and timeline..."
                    />
                    {errors.message && <p className="text-red-600 dark:text-red-400 text-xs mt-1.5 font-medium">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium text-sm rounded-xl shadow-md transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white/20 dark:border-zinc-900/20 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Project Inquiry</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metrics & Stats Bar */}
      <section className="w-full border-y border-slate-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">500+</p>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-1">Leads Processed</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">&lt;24h</p>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-1">Avg Response Time</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">98%</p>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-1">Satisfaction Rate</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">256-bit</p>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mt-1">Encryption Standard</p>
          </div>
        </div>
      </section>

      {/* 4. Platform Features Grid */}
      <section className="max-w-6xl mx-auto w-full px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md border border-slate-200 dark:border-zinc-800 mb-3">
            Platform Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">Why LeadDesk?</h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">
            A modern lead management platform built for agencies and consultancies that value speed and precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-zinc-100 font-bold">
              📄
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Smart Capture</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Intake forms with real-time validation ensure clean, structured lead data every time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-zinc-100 font-bold">
              🛡️
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Data Integrity</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Zod-powered schema validation ensures every submission meets your quality standards.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-zinc-100 font-bold">
              ⚡
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Instant Routing</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Leads are automatically routed to the admin workspace, ready for immediate review.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-zinc-100 font-bold">
              📊
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Pipeline Analytics</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Track lead statuses, response rates, and conversion metrics from one central dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="w-full border-t border-slate-200/80 dark:border-zinc-800 bg-slate-100/40 dark:bg-zinc-900/20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-200 dark:bg-zinc-800 px-3 py-1 rounded-md mb-3">
              Workflow
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">How It Works</h2>
            <p className="text-sm text-slate-600 dark:text-zinc-400 mt-2">
              Three simple steps from inquiry to connection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Submit Inquiry</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Fill out the intake form with your project details, budget range, and contact information.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Validate & Route</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Our pipeline validates the data and instantly routes it to the admin workspace.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-zinc-100">Get Connected</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Our team reviews and responds within 24 hours with a tailored proposal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Card */}
      <section className="max-w-4xl mx-auto w-full px-6 py-20">
        <div className="bg-white dark:bg-zinc-900 p-10 sm:p-12 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl text-center space-y-6">
          <div className="inline-flex text-xs font-mono font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
            Get Started Today
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Ready to accelerate your client intake?
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-lg mx-auto">
            Join agencies and consultancies that use LeadDesk to capture, validate, and manage leads with confidence.
          </p>
          <div>
            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold rounded-xl shadow-md transition cursor-pointer"
            >
              ▲ Submit Your Inquiry
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}