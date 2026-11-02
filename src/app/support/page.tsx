'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Send,
  Paperclip,
  CheckCircle2,
} from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';
import { useInvestStore } from '@/store/useInvestStore';

const CATEGORIES = [
  'All Categories',
  'Account & KYC',
  'Investments & Plans',
  'Payments & Withdrawals',
  'Security & Compliance',
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { addTicket } = useInvestStore();

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    addTicket({
      id: `TCK-${Date.now().toString().slice(-4)}`,
      user_id: null,
      name,
      phone: phone || '+91 9876543210',
      email,
      category,
      subject,
      message,
      status: 'open',
      created_at: new Date().toISOString(),
    });

    setIsSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      {/* 1. Gradient Hero Header with Search Bar */}
      <section className="bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 pt-16 pb-20 px-4 text-center text-white">
        <div className="max-w-xl mx-auto space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            How can we help?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-sm sm:text-base text-white/90"
          >
            Find answers to common questions or get in touch with our support
            team.
          </motion.p>

          {/* Search Input */}
          <div className="pt-3">
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm shadow-lg focus:outline-hidden focus:ring-2 focus:ring-white/40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Frequently Asked Questions (Accordion) */}
      <section id="faqs" className="max-w-2xl mx-auto px-4 pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-hidden"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-500 text-sm">
              No answers found for &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 3. Contact Us Ticket Form */}
      <section id="contact" className="max-w-2xl mx-auto px-4 pt-14">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Contact Us
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Submit your inquiry or issue and our team will get back to you.
            </p>
          </div>

          {isSubmitted && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Ticket submitted successfully! We will get back to you shortly.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+91"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-hidden focus:border-indigo-500"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="KYC Verification">KYC Verification</option>
                <option value="Payments & Withdrawals">
                  Payments & Withdrawals
                </option>
                <option value="Investment Returns">Investment Returns</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Brief subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attach File</span>
            </button>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-md hover:opacity-95 flex items-center justify-center gap-2 transition-opacity"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </form>
        </div>
      </section>

      {/* 4. Other Ways to Reach Us */}
      <section className="max-w-2xl mx-auto px-4 pt-14 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center pb-2">
          Other Ways to Reach Us
        </h2>

        <div className="space-y-3">
          {/* Phone */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Phone Support</p>
              <p className="text-sm font-bold text-slate-900">
                1800-XXX-XXXX
              </p>
              <p className="text-[11px] text-slate-500">Mon-Sat, 9 AM – 6 PM</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Email Us</p>
              <p className="text-sm font-bold text-slate-900">
                support@investiq.com
              </p>
              <p className="text-[11px] text-slate-500">Response within 24 hours</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">WhatsApp</p>
              <p className="text-sm font-bold text-slate-900">
                +91-XXXXX-XXXXX
              </p>
              <p className="text-[11px] text-slate-500">Quick chat support</p>
            </div>
          </div>

          {/* Office */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Visit Office</p>
              <p className="text-sm font-bold text-slate-900">
                Financial District
              </p>
              <p className="text-[11px] text-slate-500">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}