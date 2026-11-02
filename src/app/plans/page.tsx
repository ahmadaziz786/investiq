'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';
import InvestmentCalculator from '@/components/shared/InvestmentCalculator';
import { DEFAULT_INVESTMENT_PLANS, formatINR } from '@/lib/constants';

export default function PlansPage() {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen">
      {/* 1. Header Section */}
      <section className="bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 pt-16 pb-32 px-4 text-center text-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Investment Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-white/90 leading-relaxed"
          >
            Choose from our range of carefully designed investment plans. Start
            small, earn big.
          </motion.p>
        </div>
      </section>

      {/* 2. Calculator Section (Overlapping Header) */}
      <section className="px-4 -mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InvestmentCalculator variant="plans" />
        </motion.div>
      </section>

      {/* 3. All Plans List Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            All Investment Plans
          </h2>
          <p className="text-sm text-slate-500">
            Compare all our plans and choose the one that fits your investment
            goals.
          </p>
        </div>

        <div className="space-y-6">
          {DEFAULT_INVESTMENT_PLANS.map((plan) => (
            <div
              key={plan.slug}
              className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm relative ${
                plan.is_popular ? 'border-purple-300' : 'border-slate-200'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold rounded-full shadow-xs">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500">{plan.tagline}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-3xl font-extrabold text-indigo-500">
                    {plan.return_rate}%
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    total returns
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Minimum
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {formatINR(plan.min_amount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Duration
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {plan.duration_months} months
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Returns
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      {formatINR(
                        plan.min_amount +
                          (plan.min_amount * plan.return_rate) / 100
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/invest?plan=${plan.slug}&amount=${plan.min_amount}`}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  plan.is_popular
                    ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-sm hover:opacity-95'
                    : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <span>Start Investing</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quick Comparison Table */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
          Quick Comparison
        </h2>
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#24124d] text-white">
                <tr>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Min. Investment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEFAULT_INVESTMENT_PLANS.map((plan) => (
                  <tr key={plan.slug} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                      {plan.name}
                      {plan.is_popular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-600">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {formatINR(plan.min_amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-start gap-2 mt-4 px-2 text-xs text-slate-500">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
          <p>
            Returns are calculated on minimum investment amount. Actual returns
            may vary based on your investment.
          </p>
        </div>
      </section>
    </div>
  );
}

// Icon for features
function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

// Icon for trending
function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

// Icon for shield
function Shield(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}