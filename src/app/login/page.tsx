'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TrendingUp, Copy, Check, Eye, EyeOff, ShieldAlert, FlaskConical, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useInvestStore } from '@/store/useInvestStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedAdmin, setCopiedAdmin] = useState(false);
  
  const router = useRouter();
  const { setUser } = useInvestStore();

  const handleCopy = (type: 'demo' | 'admin') => {
    if (type === 'demo') {
      navigator.clipboard.writeText('Demo@123');
      setCopiedDemo(true);
      setTimeout(() => setCopiedDemo(false), 2000);
    } else {
      navigator.clipboard.writeText('Admin@123');
      setCopiedAdmin(true);
      setTimeout(() => setCopiedAdmin(false), 2000);
    }
  };

  const autofill = (type: 'demo' | 'admin') => {
    if (type === 'demo') {
      setEmail('demo@test.com');
      setPassword('Demo@123');
    } else {
      setEmail('admin@test.com');
      setPassword('Admin@123');
    }
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          setUser(profile);
          router.push(profile.role === 'admin' ? '/admin' : '/dashboard');
          return; 
        } else {
          throw new Error('Profile setup incomplete. Please contact support.');
        }
      }
    } catch (err: any) {
      console.error('Login Error:', err);
      // Special handling for CORS/Network block due to IP address usage
      if (err.message === 'Failed to fetch') {
        setError('Network Error: Please open http://localhost:3000 in your browser instead of the IP address.');
      } else {
        setError(err.message || 'Failed to sign in. Please check your credentials.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 sm:p-6 bg-linear-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50">
      <div className="w-full max-w-md bg-white rounded-4xl p-6 sm:p-8 shadow-2xl border border-slate-100/60 relative overflow-hidden">
        
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white mx-auto shadow-md">
            <TrendingUp className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 pt-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">Sign in to your account to continue</p>
        </div>

        <div className="bg-[#f8f9ff] rounded-2xl p-4 mb-8 border border-indigo-100/60">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-800 text-sm">Demo Login Credentials</h3>
          </div>

          <div className="space-y-3">
            {/* User Account */}
            <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between gap-3 shadow-xs">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-700">User Account</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-semibold">Dashboard</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">Email: demo@test.com</p>
                <p className="text-[11px] text-slate-500 truncate">Password: Demo@123</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button type="button" onClick={() => autofill('demo')} className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Fill</button>
                <button type="button" onClick={() => handleCopy('demo')} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
                  {copiedDemo ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Admin Account */}
            <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between gap-3 shadow-xs">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-700">Admin Account</span>
                  <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 text-[10px] font-semibold">Admin Panel</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">Email: admin@test.com</p>
                <p className="text-[11px] text-slate-500 truncate">Password: Admin@123</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button type="button" onClick={() => autofill('admin')} className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Fill</button>
                <button type="button" onClick={() => handleCopy('admin')} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors">
                  {copiedAdmin ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form with autoComplete off */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-2">
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              autoComplete="off"
              spellCheck="false"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 disabled:bg-slate-50 disabled:text-slate-500"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full mt-2 py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white text-sm font-bold shadow-md hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isLoading ? 'Verifying...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <span className="text-indigo-600 font-semibold cursor-not-allowed opacity-80">
            Sign Up (Closed for Demo)
          </span>
        </div>

        <Link href="/" className="block mt-6 text-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}