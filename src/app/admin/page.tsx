'use client';

import React, { useState } from 'react';
import {
  Users,
  Wallet,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { ADMIN_DEMO_USERS, formatINR } from '@/lib/constants';
import { useInvestStore } from '@/store/useInvestStore';

type AdminTab = 'users' | 'investments' | 'payments' | 'tickets';

export default function AdminDashboardPage() {
  const { investments, tickets } = useInvestStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [userList, setUserList] = useState(ADMIN_DEMO_USERS);

  const handleKycToggle = (id: string, newStatus: string) => {
    setUserList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, kyc_status: newStatus } : u))
    );
  };

  const filteredUsers = userList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Status' ||
      u.kyc_status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const pendingKycCount = userList.filter(
    (u) => u.kyc_status === 'pending'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 1. Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Welcome back, Admin User. Here&apos;s your platform overview.
          </p>
        </div>

        {/* 2. Top 5 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Users */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Total Users</p>
              <p className="text-2xl font-extrabold text-slate-900">30</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Investment Volume */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">
                Investment Volume
              </p>
              <p className="text-2xl font-extrabold text-slate-900">
                ₹7.22 Cr
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          {/* Active Investments */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">
                Active Investments
              </p>
              <p className="text-2xl font-extrabold text-slate-900">22</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Pending KYC */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Pending KYC</p>
              <p className="text-2xl font-extrabold text-slate-900">
                {pendingKycCount + 2}
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>

          {/* Open Tickets */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Open Tickets</p>
              <p className="text-2xl font-extrabold text-slate-900">
                {tickets.length + 8}
              </p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs (Users, Investments, Payments, Tickets) */}
        <div className="bg-slate-100/90 p-1.5 rounded-2xl grid grid-cols-4 gap-1">
          {[
            { id: 'users', label: 'Users' },
            { id: 'investments', label: 'Investments' },
            { id: 'payments', label: 'Payments' },
            { id: 'tickets', label: 'Tickets' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4. Search & Status Filter Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-10 text-xs sm:text-sm font-medium text-slate-700 text-center focus:outline-hidden"
            >
              <option value="All Status">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* 5. Dynamic Tab Content Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-5">
          {activeTab === 'users' && (
            <>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900">
                  User Management
                </h2>
                <p className="text-xs text-slate-500">
                  Manage all registered users and their KYC status
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Invested</th>
                      <th className="py-3 px-4">KYC Status</th>
                      <th className="py-3 pl-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70">
                        <td className="py-4 pr-4 font-semibold text-slate-900">
                          {u.name}
                        </td>
                        <td className="py-4 px-4 text-slate-600">{u.email}</td>
                        <td className="py-4 px-4 font-medium text-slate-800">
                          {u.invested}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                              u.kyc_status === 'verified'
                                ? 'bg-emerald-50 text-emerald-600'
                                : u.kyc_status === 'pending'
                                ? 'bg-amber-50 text-amber-600'
                                : 'bg-red-50 text-red-600'
                            }`}
                          >
                            {u.kyc_status}
                          </span>
                        </td>
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleKycToggle(u.id, 'verified')}
                              title="Approve KYC"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleKycToggle(u.id, 'rejected')}
                              title="Reject KYC"
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'investments' && (
            <>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900">
                  All Investments
                </h2>
                <p className="text-xs text-slate-500">
                  Monitor active user plans and maturity timelines
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
                      <th className="py-3 pr-4">Plan</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Expected Return</th>
                      <th className="py-3 px-4">Maturity</th>
                      <th className="py-3 pl-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {investments.map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-4 pr-4 font-semibold text-slate-900">
                          {inv.plan_name}
                        </td>
                        <td className="py-4 px-4 text-slate-700">
                          {formatINR(inv.invested_amount)}
                        </td>
                        <td className="py-4 px-4 text-emerald-600 font-medium">
                          +{formatINR(inv.expected_returns)}
                        </td>
                        <td className="py-4 px-4 text-slate-500">
                          {inv.maturity_date}
                        </td>
                        <td className="py-4 pl-4">
                          <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-[11px] font-semibold">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'payments' && (
            <>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Payment Logs
                </h2>
                <p className="text-xs text-slate-500">
                  Verified gateway transactions and settlement status
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-medium text-slate-500">
                      <th className="py-3 pr-4">Order ID</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 pl-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    <tr>
                      <td className="py-4 pr-4 font-mono text-xs text-slate-700">
                        order_Rzp99281A
                      </td>
                      <td className="py-4 px-4 text-slate-600">UPI / GPay</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        ₹5,000
                      </td>
                      <td className="py-4 pl-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold">
                          Success
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-mono text-xs text-slate-700">
                        order_Rzp99244B
                      </td>
                      <td className="py-4 px-4 text-slate-600">Net Banking</td>
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        ₹1,500
                      </td>
                      <td className="py-4 pl-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold">
                          Success
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'tickets' && (
            <>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Support Tickets
                </h2>
                <p className="text-xs text-slate-500">
                  Respond to investor inquiries and KYC support requests
                </p>
              </div>
              <div className="space-y-3">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600">
                        {t.id} • {t.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase">
                        {t.status}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {t.subject}
                    </p>
                    <p className="text-xs text-slate-600">{t.message}</p>
                    <p className="text-[11px] text-slate-400 pt-1">
                      From: {t.name} ({t.email})
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}