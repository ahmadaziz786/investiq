'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Shield,
  CheckCircle2,
  Users,
  Wallet,
  ShieldCheck,
  Zap,
  Flame,
  ChevronRight,
  Star,
  MessageCircle,
} from 'lucide-react';
import InvestmentCalculator from '@/components/shared/InvestmentCalculator';
import { DEFAULT_INVESTMENT_PLANS, TESTIMONIALS, formatINR } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-linear-to-br from-[#dbeafe] via-[#ede9fe] to-[#f3e8ff] pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Sandbox Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xs border border-purple-200/80 text-xs font-medium text-indigo-700 shadow-2xs"
          >
            <span className="text-sm">🎯</span>
            <span>Now playing in extra sandbox mode</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
          >
            Invest Small,{' '}
            <span className="bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Earn Big.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            Start your investment journey with as little as ₹500. Secure,
            assured returns for first-time investors. No risk, all reward.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md mx-auto"
          >
            <Link
              href="/plans"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold text-base shadow-lg shadow-orange-500/20 hover:opacity-95 transition-opacity"
            >
              <span>Start Investing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-indigo-600 font-semibold text-base shadow-xs border border-white/80 hover:bg-slate-50 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>How it Works</span>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              Bank Security
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              SEBI Registered
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-500" />
              1L+ Investors
            </span>
          </div>
        </div>
      </section>

      {/* 2. WHY INVEST WITH US */}
      <section id="security" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Invest with Us
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              We provide a low-entry barrier and high-security environment for
              first-time investors to grow their wealth confidently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-md md:max-w-none mx-auto">
            {/* Card 1 */}
            <div className="rounded-3xl bg-[#f0f7ff] p-6 space-y-3 border border-blue-100/60">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 flex items-center justify-center text-blue-600">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 pt-1">
                Start from ₹500
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Micro-investments make wealth building accessible to everyone.
                No large capital needed.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl bg-[#f8f5ff] p-6 space-y-3 border border-purple-100/60">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/80 flex items-center justify-center text-purple-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 pt-1">
                Zero Risk, Assured
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your principal is always protected. We prioritize safety and
                guaranteed returns for your peace of mind.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-[#fff8f1] p-6 space-y-3 border border-orange-100/60">
              <div className="w-12 h-12 rounded-2xl bg-orange-100/80 flex items-center justify-center text-orange-500">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 pt-1">
                Instant Withdrawal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Need your money? Withdraw your earnings anytime directly to your
                bank account with zero fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOT INVESTMENT PLAN + HOME CALCULATOR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#25134d] via-[#2b1659] to-[#1e0f40] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-current text-orange-400" />
            <span>Hot Investment Plan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-md mx-auto">
            Turn ₹500 into ₹800 in 6 months.
          </h2>

          <p className="text-sm sm:text-base text-purple-200/80 max-w-md mx-auto leading-relaxed">
            Our &apos;Growth Starter&apos; plan is designed for maximum returns
            with fixed tenure. Join over 50,000+ happy investors today.
          </p>

          {/* Duration & APY Glass Boxes */}
          <div className="flex flex-col items-center gap-3.5 pt-2 max-w-xs mx-auto">
            <div className="w-44 py-3.5 px-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <p className="text-xs text-purple-200/70">Duration</p>
              <p className="text-xl font-extrabold text-white mt-0.5">
                6 Months
              </p>
            </div>

            <div className="w-44 py-3.5 px-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
              <p className="text-xs text-purple-200/70">Assured APY</p>
              <p className="text-xl font-extrabold text-orange-400 mt-0.5">
                18.5%
              </p>
            </div>
          </div>

          <div className="pt-2 pb-6">
            <Link
              href="/invest?plan=quick-returns&amount=500"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:opacity-95 transition-opacity"
            >
              <span>Invest in this Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Embedded Home Calculator */}
          <InvestmentCalculator variant="home" />
        </div>
      </section>

      {/* 4. HOW TO GET STARTED */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900">
            How to Get Started - It&apos;s Simple!
          </h2>

          {/* Video Guide Card */}
          <div className="rounded-3xl bg-linear-to-r from-blue-200/80 via-indigo-200/80 to-purple-300/80 p-8 text-center space-y-3 shadow-xs">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('choose-plan');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 mx-auto shadow-md hover:scale-105 transition-transform"
            >
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </button>
            <p className="text-sm font-medium text-slate-700">
              Watch 2-minute guide
            </p>
          </div>

          {/* Steps 01, 02, 03 */}
          <div className="space-y-6 pt-2">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                01
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Create Account & Verify
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
                    ~2 minutes
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Sign up with email. Complete quick KYC verification.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-purple-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                02
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Choose Your Plan
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
                    ~1 minute
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Browse investment plans. Use calculator to see returns.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                03
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Invest & Track
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-500">
                    Ongoing
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Make payment securely. Track growth in real-time dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CHOOSE YOUR INVESTMENT PLAN */}
      <section
        id="choose-plan"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Choose Your Investment Plan
            </h2>
            <p className="text-sm text-slate-500">
              Select from our range of carefully designed investment plans
              tailored to your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md md:max-w-none mx-auto">
            {DEFAULT_INVESTMENT_PLANS.map((plan) => (
              <div
                key={plan.slug}
                className={`relative bg-white rounded-3xl p-6 transition-all ${
                  plan.is_popular
                    ? 'border-2 border-purple-400 shadow-lg'
                    : 'border border-slate-100 shadow-sm'
                }`}
              >
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-semibold shadow-xs">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500">{plan.tagline}</p>
                  </div>

                  <div>
                    <p className="text-3xl font-extrabold text-indigo-500">
                      {plan.return_rate}%
                    </p>
                    <p className="text-xs text-slate-400">returns</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Min. Investment</span>
                      <span className="font-bold text-slate-900">
                        {formatINR(plan.min_amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-bold text-slate-900">
                        {plan.duration_months} months
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/invest?plan=${plan.slug}&amount=${plan.min_amount}`}
                    className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      plan.is_popular
                        ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:opacity-95'
                        : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT OUR INVESTORS SAY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              What Our Investors Say
            </h2>
            <p className="text-sm text-slate-500">
              Join thousands of satisfied investors who trust InvestIQ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-md md:max-w-none mx-auto">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-1 text-orange-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-400 text-white font-bold text-sm flex items-center justify-center">
                    {item.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400">{item.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STILL HAVE QUESTIONS? CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 text-white text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Still have questions?
            </h2>
            <p className="text-sm text-white/90">
              Our support team is available 24/7 to help you start your journey.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 text-slate-900 shadow-xl space-y-4 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Chat with Support
                </p>
                <p className="text-xs text-slate-500">
                  Online now • 2m response time
                </p>
              </div>
            </div>

            <Link
              href="/support"
              className="block w-full py-3 rounded-xl border border-slate-200 text-center text-xs font-semibold text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              Open Support Portal
            </Link>
          </div>

          {/* Avatar Stack */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="flex -space-x-2">
              {['P', 'R', 'A', 'S'].map((letter) => (
                <div
                  key={letter}
                  className="w-8 h-8 rounded-full bg-orange-500 border-2 border-white text-xs font-bold flex items-center justify-center text-white"
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-white">
              Join 2M+ Investors
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}