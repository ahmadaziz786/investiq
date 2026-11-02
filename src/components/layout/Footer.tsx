'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Shield, Lock } from 'lucide-react';

export default function Footer() {
  const platformLinks = [
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Investment Plans', href: '/plans' },
    { name: 'Security', href: '/#security' },
    { name: 'Calculator', href: '/plans#calculator' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/support' },
    { name: 'Our Team', href: '/support' },
    { name: 'Careers', href: '/support' },
    { name: 'Blog', href: '/support' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/support' },
    { name: 'Contact Us', href: '/support#contact' },
    { name: 'FAQs', href: '/support#faqs' },
    { name: 'Community', href: '/support' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/support' },
    { name: 'Privacy Policy', href: '/support' },
    { name: 'Cookie Policy', href: '/support' },
    { name: 'Compliance', href: '/support' },
  ];

  return (
    <footer className="bg-linear-to-b from-[#25134d] via-[#1c0e3b] to-[#14092b] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-blue-500 via-indigo-500 to-purple-400 flex items-center justify-center text-white shadow-sm">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Invest
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  IQ
                </span>
              </span>
            </Link>

            <p className="text-sm text-purple-200/80 leading-relaxed max-w-sm">
              Empowering the next generation of investors with micro-investment
              solutions that are secure and profitable.
            </p>

            {/* Social Icons (Pure SVG - Zero Deprecation Errors) */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-100 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-100 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-100 transition-colors"
              >
                <svg
                  className="w-4 h-4 stroke-current fill-none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-purple-100 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              PLATFORM
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-purple-200/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              COMPANY
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-purple-200/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              SUPPORT
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-purple-200/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              LEGAL
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-purple-200/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-purple-200/70">
          <p>© 2026 InvestIQ Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-purple-300/80" />
              PCI DSS Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-300/80" />
              ISO 27001 Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}