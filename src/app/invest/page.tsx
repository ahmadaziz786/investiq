'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, ChevronLeft } from 'lucide-react';
import { DEFAULT_INVESTMENT_PLANS, formatINR } from '@/lib/constants';
import { useInvestStore } from '@/store/useInvestStore';

function InvestCheckout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, addInvestment } = useInvestStore();

  const planSlug = searchParams.get('plan');
  const initialAmount = Number(searchParams.get('amount')) || 500;

  const plan =
    DEFAULT_INVESTMENT_PLANS.find((p) => p.slug === planSlug) ||
    DEFAULT_INVESTMENT_PLANS[0];

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(Math.max(initialAmount, plan.min_amount));
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Security Check: Agar user logged in nahi hai, toh login page par bhejo
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return <div className="min-h-screen bg-slate-50" />;

  const expectedReturns = Math.round((amount * plan.return_rate) / 100);
  const totalMaturity = amount + expectedReturns;
  const progress = step === 1 ? 50 : 100;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate secure payment processing (2 seconds delay)
    setTimeout(() => {
      addInvestment({
        id: `INV-${Date.now()}`,
        user_id: user.id,
        plan_id: plan.id,
        plan_name: plan.name,
        invested_amount: amount,
        return_rate: plan.return_rate,
        duration_months: plan.duration_months,
        expected_returns: expectedReturns,
        total_maturity_amount: totalMaturity,
        start_date: new Date().toISOString(),
        maturity_date: new Date(
          new Date().setMonth(new Date().getMonth() + plan.duration_months)
        ).toISOString(),
        progress_percentage: 0,
        status: 'active',
        created_at: new Date().toISOString(),
      });
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Progress Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700">
              Step {step} of 2: {step === 1 ? 'Choose Amount' : 'Review & Pay'}
            </span>
            <span className="text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-6">
        <button
          onClick={() => (step === 2 ? setStep(1) : router.back())}
          className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Plan Summary Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {plan.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {plan.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold">
                      {plan.duration_months} Months
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      +{plan.return_rate}% Returns
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-slate-900">
                  How much would you like to invest?
                </h3>

                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {[500, 1500, 5000, 10000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      disabled={val < plan.min_amount}
                      className={`py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        amount === val
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : val < plan.min_amount
                          ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                          : 'border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-slate-50'
                      }`}
                    >
                      {formatINR(val)}
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {formatINR(amount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={plan.min_amount}
                    max={plan.max_amount}
                    step={500}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>Min: {formatINR(plan.min_amount)}</span>
                    <span>Max: {formatINR(plan.max_amount)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold shadow-md hover:opacity-95 transition-opacity"
              >
                Proceed to Review & Pay
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Investment Summary */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">
                    Review Your Investment
                  </h3>
                </div>
                <div className="p-5 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plan</span>
                    <span className="font-semibold text-slate-900">
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investment Amount</span>
                    <span className="font-semibold text-slate-900">
                      {formatINR(amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-semibold text-slate-900">
                      {plan.duration_months} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Returns</span>
                    <span className="font-semibold text-emerald-600">
                      +{formatINR(expectedReturns)} ({plan.return_rate}%)
                    </span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-700">
                      Total at Maturity
                    </span>
                    <span className="text-xl font-extrabold text-orange-500">
                      {formatINR(totalMaturity)}
                    </span>
                  </div>
                </div>
              </div>

              {/* T&C Checkbox */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed cursor-pointer"
                >
                  I have read and agree to the{' '}
                  <span className="font-semibold text-indigo-600">
                    Terms & Conditions
                  </span>{' '}
                  and understand that my investment is subject to market-related
                  risks as disclosed.
                </label>
              </div>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-6 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-500" /> 256-bit SSL
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-500" /> PCI DSS
                </span>
              </div>

              <button
                onClick={handlePay}
                disabled={!acceptedTerms || isProcessing}
                className="w-full py-4 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  'Secure Pay & Invest'
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function InvestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">
          Loading...
        </div>
      }
    >
      <InvestCheckout />
    </Suspense>
  );
}