'use client';

import React, { useState } from 'react';
import {
  Gift,
  X,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Share2,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInvestStore } from '@/store/useInvestStore';

export default function ReferralModal() {
  const { user, isReferralModalOpen, setReferralModalOpen } = useInvestStore();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = user?.referral_code || 'DEMO2025';
  const inviteLink = `https://investiq.app/ref/${referralCode}`;
  const earnedAmount = user?.referral_earned ?? 200;
  const joinedCount = user?.referral_joined_count ?? 2;

  const copyText = (text: string, type: 'code' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isReferralModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setReferralModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Icon & Heading */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto shadow-md">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 pt-1">
                Invite Friends & Earn Together
              </h3>
              <p className="text-xs text-slate-500">
                Get <span className="text-emerald-500 font-bold">₹100</span> for
                every friend who makes their first investment
              </p>
            </div>

            {/* Referral Code Box */}
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Your Referral Code
                  </p>
                  <p className="text-base font-bold tracking-wider text-slate-900 mt-0.5">
                    {referralCode}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(referralCode, 'code')}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Invite Link Box */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Your Invite Link
                  </p>
                  <p className="text-xs font-medium text-slate-700 truncate mt-0.5">
                    {inviteLink}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(inviteLink, 'link')}
                  className="shrink-0 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* 3 Action Buttons: WhatsApp, Email, Copy Link */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Invest with me on InvestIQ starting at ₹500! Use my referral code ${referralCode}: ${inviteLink}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#22c55e] hover:opacity-95 text-white text-xs font-semibold shadow-xs transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:?subject=Join InvestIQ&body=Use my referral link to start investing with ₹500: ${inviteLink}`}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#4f86f7] hover:opacity-95 text-white text-xs font-semibold shadow-xs transition-opacity"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>

                <button
                  type="button"
                  onClick={() => copyText(inviteLink, 'link')}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Green Stats Banner */}
              <div className="bg-emerald-50/90 border border-emerald-100 rounded-2xl p-3.5 text-center space-y-1">
                <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  Your Referral Stats
                </p>
                <p className="text-xs text-slate-600">
                  You&apos;ve earned{' '}
                  <span className="text-emerald-600 font-bold">
                    ₹{earnedAmount}
                  </span>{' '}
                  from <span className="font-bold">{joinedCount}</span>{' '}
                  successful referrals!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}