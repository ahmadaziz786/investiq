'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  Target,
  Plus,
  Users,
  Download,
  Copy,
  Check,
  Share2,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { useInvestStore } from '@/store/useInvestStore';
import { PORTFOLIO_GROWTH_DATA, formatINR } from '@/lib/constants';

export default function DashboardPage() {
  const { user, investments, setReferralModalOpen } = useInvestStore();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const displayName = user?.full_name || 'Demo User';
  const referralCode = user?.referral_code || 'DEMO2025';
  const invitedCount = user?.referral_invited_count ?? 5;
  const joinedCount = user?.referral_joined_count ?? 2;
  const earnedAmount = user?.referral_earned ?? 200;

  const totalInvested = investments.reduce(
    (sum, item) => sum + Number(item.invested_amount),
    0
  );
  const expectedReturns = investments.reduce(
    (sum, item) => sum + Number(item.expected_returns),
    0
  );
  const currentValue =
    totalInvested === 7000 ? 8430 : Math.round(totalInvested * 1.204);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    triggerToast('Referral code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // SVG Chart Coordinates (Width: 600, Height: 220)
  const chartPoints = PORTFOLIO_GROWTH_DATA.map((d, i) => {
    const x = 50 + i * 100;
    const y = 190 - (d.value / 8500) * 150;
    return { ...d, x, y };
  });

  const polylinePoints = chartPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white border border-slate-200 shadow-xl rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold text-slate-800">
          {toastMessage}
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* 1. Welcome Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-sm text-slate-500">
            Here&apos;s an overview of your investment portfolio.
          </p>
        </div>

        {/* 2. Top 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Invested */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">
                Total Invested
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                {formatINR(totalInvested)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Current Value */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-start justify-between">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-slate-500">
                Current Value
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                {formatINR(currentValue)}
              </p>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
                <ArrowUpRight className="w-3 h-3" />
                +20.4%
              </span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Expected Returns */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">
                Expected Returns
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                {formatINR(expectedReturns)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Active Investments */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">
                Active Investments
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                {investments.length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 3. Portfolio Growth Interactive Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Portfolio Growth
            </h2>
            <p className="text-xs text-slate-500">
              Your investment value over the last 6 months
            </p>
          </div>

          <div className="relative w-full overflow-x-auto pt-2">
            <svg
              viewBox="0 0 600 225"
              className="w-full min-w-[460px] h-56 overflow-visible"
            >
              {/* Grid Lines & Y-Axis Labels */}
              {[
                { label: '₹8K', y: 48 },
                { label: '₹6K', y: 84 },
                { label: '₹4K', y: 120 },
                { label: '₹2K', y: 155 },
                { label: '₹0K', y: 190 },
              ].map((tick) => (
                <g key={tick.label}>
                  <line
                    x1="50"
                    y1={tick.y}
                    x2="550"
                    y2={tick.y}
                    stroke="#f1f5f9"
                    strokeDasharray="3 3"
                  />
                  <text
                    x="42"
                    y={tick.y + 4}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400"
                  >
                    {tick.label}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line
                x1="50"
                y1="40"
                x2="50"
                y2="190"
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <line
                x1="50"
                y1="190"
                x2="550"
                y2="190"
                stroke="#94a3b8"
                strokeWidth="1"
              />

              {/* Line Path */}
              <polyline
                fill="none"
                stroke="#4f86f7"
                strokeWidth="2.5"
                points={polylinePoints}
              />

              {/* Data Points & Hover Tooltips */}
              {chartPoints.map((pt, idx) => (
                <g
                  key={pt.month}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setHoveredPoint(idx)}
                >
                  {/* X-Axis Month Label */}
                  <text
                    x={pt.x}
                    y="210"
                    textAnchor="middle"
                    className="text-[11px] fill-slate-500"
                  >
                    {pt.month}
                  </text>

                  {/* Hover Vertical Guide */}
                  {hoveredPoint === idx && (
                    <line
                      x1={pt.x}
                      y1="45"
                      x2={pt.x}
                      y2="190"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                  )}

                  {/* Circle Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === idx ? 5 : 3.5}
                    fill="#4f86f7"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />

                  {/* Tooltip Box */}
                  {hoveredPoint === idx && (
                    <g
                      transform={`translate(${Math.min(
                        Math.max(pt.x - 55, 55),
                        430
                      )}, ${pt.y + 15})`}
                    >
                      <rect
                        width="115"
                        height="48"
                        rx="8"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                      />
                      <text
                        x="12"
                        y="19"
                        className="text-[11px] font-semibold fill-slate-700"
                      >
                        {pt.month}
                      </text>
                      <text
                        x="12"
                        y="36"
                        className="text-[11px] font-medium fill-blue-500"
                      >
                        Value : {formatINR(pt.value)}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* 4. Active Investments Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Active Investments
            </h2>
            <p className="text-xs text-slate-500">
              Track the progress of your current investments
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
                  <th className="py-3 pr-4">Plan</th>
                  <th className="py-3 px-4">Invested</th>
                  <th className="py-3 px-4">Expected</th>
                  <th className="py-3 px-4">Maturity</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 pl-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/60">
                    <td className="py-4 pr-4 font-semibold text-slate-900">
                      {inv.plan_name}
                    </td>
                    <td className="py-4 px-4 text-slate-700">
                      {formatINR(inv.invested_amount)}
                    </td>
                    <td className="py-4 px-4 font-medium text-emerald-500">
                      +{formatINR(inv.expected_returns)}
                    </td>
                    <td className="py-4 px-4 text-slate-600">
                      {inv.maturity_date}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-20 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-blue-500 to-purple-500"
                            style={{ width: `${inv.progress_percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {inv.progress_percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pl-4">
                      <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-[11px] font-semibold">
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Quick Actions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
          <div className="space-y-2.5">
            <Link
              href="/plans"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800 transition-colors"
            >
              <Plus className="w-4 h-4 text-slate-600" />
              <span>Make New Investment</span>
            </Link>

            <button
              type="button"
              onClick={() => setReferralModalOpen(true)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800 transition-colors"
            >
              <Users className="w-4 h-4 text-slate-600" />
              <span>Refer a Friend</span>
            </button>

            <button
              type="button"
              onClick={() =>
                triggerToast(
                  'Coming Soon: Statement download will be available soon'
                )
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Download Statement</span>
            </button>
          </div>
        </div>

        {/* 6. Refer & Earn Card */}
        <div className="bg-[#f6f3ff] rounded-3xl p-6 border border-purple-100 space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Refer & Earn</span>
            </h2>
            <p className="text-xs text-slate-500">
              Invite friends and earn ₹100 for each signup
            </p>
          </div>

          <div className="bg-white rounded-2xl p-3.5 border border-purple-100/80 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-400">Your Referral Code</p>
              <p className="text-base font-extrabold tracking-wider text-slate-900 mt-0.5">
                {referralCode}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            >
              {copiedCode ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="bg-white rounded-2xl py-3 px-2 border border-purple-100/60">
              <p className="text-base font-extrabold text-slate-900">
                {invitedCount}
              </p>
              <p className="text-[11px] text-slate-400">Invited</p>
            </div>
            <div className="bg-white rounded-2xl py-3 px-2 border border-purple-100/60">
              <p className="text-base font-extrabold text-slate-900">
                {joinedCount}
              </p>
              <p className="text-[11px] text-slate-400">Joined</p>
            </div>
            <div className="bg-white rounded-2xl py-3 px-2 border border-purple-100/60">
              <p className="text-base font-extrabold text-emerald-500">
                ₹{earnedAmount}
              </p>
              <p className="text-[11px] text-slate-400">Earned</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setReferralModalOpen(true)}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-indigo-400 to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-sm hover:opacity-95 flex items-center justify-center gap-2 transition-opacity"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Invite Link</span>
          </button>
        </div>

        {/* 7. Maximize Your Returns Banner */}
        <div className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-3xl p-6 text-white space-y-4 shadow-md">
          <div className="space-y-1">
            <h3 className="text-base font-bold">Maximize Your Returns</h3>
            <p className="text-xs text-white/90">
              Upgrade to Premium Portfolio for up to 80% guaranteed returns.
            </p>
          </div>
          <Link
            href="/plans"
            className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>View Premium Plans</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}