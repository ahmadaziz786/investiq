import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ReferralModal from '@/components/shared/ReferralModal';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'InvestIQ — Invest Small, Earn Big',
  description:
    'Start your micro-investment journey with as little as ₹500. Secure, assured returns for first-time investors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-slate-50/40 text-slate-900 antialiased`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ReferralModal />
      </body>
    </html>
  );
}