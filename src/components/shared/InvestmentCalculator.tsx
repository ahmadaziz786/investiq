'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Shield, Lock, ChevronRight } from 'lucide-react';
import { useInvestStore } from '@/store/useInvestStore';
import { formatINR } from '@/lib/constants';

interface InvestmentCalculatorProps {
  variant?: 'home' | 'plans';
}

export default function InvestmentCalculator({
  variant = 'plans',
}: InvestmentCalculatorProps) {
  const {
    plans,
    selectedPlanSlug,
    calculatorAmount,
    setSelectedPlanSlug,
    setCalculatorAmount,
  } = useInvestStore();

  const activePlan =
    plans.find((p) => p.slug === selectedPlanSlug) || plans[0];

  const expectedReturns = Math.round(
    (calculatorAmount * activePlan.return_rate) / 100
  );
  const totalMaturity = calculatorAmount + expectedReturns;

  const progressPercent =
    ((calculatorAmount - activePlan.min_amount) /
      (activePlan.max_amount - activePlan.min_amount)) *
    100;

  if (variant === 'home') {
    const homeReturns = Math.round((calculatorAmount * 60) / 100);
    const homeTotal = calculatorAmount + homeReturns;
    const homePercent = ((calculatorAmount - 500) / (50000 - 500)) * 100;

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl text-slate-900 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Investment Calculator
          </h3>
          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Initial Amount</span>
            <span className="text-base font-bold text-slate-900">
              {formatINR(calculatorAmount)}
            </span>
          </div>

          <input
            type="range"
            min={500}
            max={50000}
            step={500}
            value={Math.min(Math.max(calculatorAmount, 500), 50000)}
            onChange={(e) => setCalculatorAmount(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, #f97316 0%, #8b5cf6 ${homePercent}%, #a78bfa ${homePercent}%, #ddd6fe 100%)`,
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />

          <div className="bg-slate-50/90 rounded-2xl p-4 space-y-3 mt-4 border border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Your Investment</span>
              <span className="font-semibold text-slate-900">
                {formatINR(calculatorAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Expected Returns</span>
              <span className="font-semibold text-emerald-500">
                {formatINR(homeReturns)} (+60%)
              </span>
            </div>
            <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                Total Value
              </span>
              <span className="text-xl font-extrabold text-orange-500">
                {formatINR(homeTotal)}
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              SEBI Registered
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              SSL Secure
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="calculator"
      className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-md mx-auto"
    >
      {/* Dark Purple Header */}
      <div className="bg-linear-to-r from-[#24124d] to-[#311b66] px-6 py-5 flex items-center gap-3.5 text-white">
        <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-purple-200" />
        </div>
        <div>
          <h2 className="text-lg font-bold leading-tight">
            Investment Calculator
          </h2>
          <p className="text-xs text-purple-200/80">
            Calculate your potential returns
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 2x2 Plan Selector Grid */}
        <div className="bg-slate-100/90 p-1.5 rounded-2xl grid grid-cols-2 gap-1.5">
          {plans.map((plan) => {
            const isSelected = plan.slug === activePlan.slug;
            return (
              <button
                key={plan.slug}
                type="button"
                onClick={() => setSelectedPlanSlug(plan.slug)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {plan.name}
              </button>
            );
          })}
        </div>

        {/* Amount Slider */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              Investment Amount
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {formatINR(calculatorAmount)}
            </span>
          </div>

          <input
            type="range"
            min={activePlan.min_amount}
            max={activePlan.max_amount}
            step={500}
            value={calculatorAmount}
            onChange={(e) => setCalculatorAmount(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, #f97316 0%, #8b5cf6 ${progressPercent}%, #a78bfa 100%)`,
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>{formatINR(activePlan.min_amount)}</span>
            <span>{formatINR(activePlan.max_amount)}</span>
          </div>
        </div>

        {/* Plan Meta Rows */}
        <div className="space-y-3 pt-1 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Plan Duration</span>
            <span className="font-bold text-slate-900">
              {activePlan.duration_months} months
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500">Returns Rate</span>
            <span className="font-bold text-emerald-500">
              {activePlan.return_rate}%
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500">Plan Type</span>
            <span className="font-bold text-slate-900">
              {activePlan.tagline}
            </span>
          </div>
        </div>

        {/* Cream Summary Card */}
        <div className="bg-[#fff8f1] border border-orange-100/80 rounded-2xl p-5 text-center space-y-2">
          <p className="text-xs font-medium text-slate-600">
            Expected Returns:{' '}
            <span className="text-emerald-500 font-bold">
              {formatINR(expectedReturns)} (+{activePlan.return_rate}%)
            </span>
          </p>
          <p className="text-xs text-slate-500">Total at Maturity</p>
          <p className="text-4xl font-extrabold text-orange-500 tracking-tight py-1">
            {formatINR(totalMaturity)}
          </p>
          <p className="text-xs text-slate-500 pb-2">
            Your Investment: {formatINR(calculatorAmount)}
          </p>

          <Link
            href={`/invest?plan=${activePlan.slug}&amount=${calculatorAmount}`}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
          >
            <span>Invest Now</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}