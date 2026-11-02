import { InvestmentPlan, UserInvestment, SupportTicket } from '@/types/investiq';

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const DEFAULT_INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: 'plan-quick-returns',
    slug: 'quick-returns',
    name: 'Quick Returns',
    tagline: 'Short-term fixed return',
    description: 'Fast-track micro-investment plan ideal for first-time investors.',
    return_rate: 60,
    duration_months: 5,
    min_amount: 500,
    max_amount: 50000,
    risk_level: 'Low Risk',
    is_popular: false,
    features: [
      'Lowest entry barrier',
      'Quick 5-month maturity',
      'Guaranteed 60% returns',
      '24/7 portfolio tracking',
    ],
    display_order: 1,
    is_active: true,
  },
  {
    id: 'plan-steady-growth',
    slug: 'steady-growth',
    name: 'Steady Growth',
    tagline: 'Medium-term fixed return',
    description: 'Balanced medium-term plan designed for consistent wealth accumulation.',
    return_rate: 40,
    duration_months: 12,
    min_amount: 1500,
    max_amount: 150000,
    risk_level: 'Low Risk',
    is_popular: true,
    features: [
      'Moderate investment',
      '12-month growth period',
      'Stable 40% annual returns',
      'Monthly progress reports',
    ],
    display_order: 2,
    is_active: true,
  },
  {
    id: 'plan-wealth-builder',
    slug: 'wealth-builder',
    name: 'Wealth Builder',
    tagline: 'Long-term fixed return',
    description: 'Long-term wealth creation with compounding benefits.',
    return_rate: 70,
    duration_months: 24,
    min_amount: 5000,
    max_amount: 500000,
    risk_level: 'Medium Risk',
    is_popular: false,
    features: [
      'Higher investment tier',
      '24-month compounding',
      'Impressive 70% returns',
      'Priority customer support',
    ],
    display_order: 3,
    is_active: true,
  },
  {
    id: 'plan-premium-portfolio',
    slug: 'premium-portfolio',
    name: 'Premium Portfolio',
    tagline: 'Premium long-term',
    description: 'Exclusive high-return portfolio for serious investors.',
    return_rate: 80,
    duration_months: 36,
    min_amount: 10000,
    max_amount: 1000000,
    risk_level: 'Medium Risk',
    is_popular: false,
    features: [
      'Premium investment tier',
      '36-month wealth creation',
      'Maximum 80% returns',
      'Dedicated relationship manager',
      'Exclusive investor events',
    ],
    display_order: 4,
    is_active: true,
  },
];

export const PORTFOLIO_GROWTH_DATA = [
  { month: 'Aug', value: 7000 },
  { month: 'Sep', value: 7310 },
  { month: 'Oct', value: 7451 },
  { month: 'Nov', value: 7479 },
  { month: 'Dec', value: 7732 },
  { month: 'Jan', value: 8430 },
];

export const DEMO_ACTIVE_INVESTMENTS: UserInvestment[] = [
  {
    id: 'inv-1',
    user_id: 'demo-user',
    plan_id: 'plan-quick-returns',
    plan_name: 'Quick Returns',
    invested_amount: 500,
    return_rate: 60,
    duration_months: 5,
    expected_returns: 800,
    total_maturity_amount: 800,
    start_date: '2024-12-01T00:00:00Z',
    maturity_date: '1 May 2025',
    progress_percentage: 60,
    status: 'active',
    created_at: '2024-12-01T00:00:00Z',
  },
  {
    id: 'inv-2',
    user_id: 'demo-user',
    plan_id: 'plan-steady-growth',
    plan_name: 'Steady Growth',
    invested_amount: 1500,
    return_rate: 40,
    duration_months: 12,
    expected_returns: 2100,
    total_maturity_amount: 2100,
    start_date: '2024-11-15T00:00:00Z',
    maturity_date: '15 Nov 2025',
    progress_percentage: 25,
    status: 'active',
    created_at: '2024-11-15T00:00:00Z',
  },
  {
    id: 'inv-3',
    user_id: 'demo-user',
    plan_id: 'plan-wealth-builder',
    plan_name: 'Wealth Builder',
    invested_amount: 5000,
    return_rate: 70,
    duration_months: 24,
    expected_returns: 8500,
    total_maturity_amount: 8500,
    start_date: '2025-01-01T00:00:00Z',
    maturity_date: '1 Jan 2027',
    progress_percentage: 5,
    status: 'active',
    created_at: '2025-01-01T00:00:00Z',
  },
];

export const TESTIMONIALS = [
  {
    initial: 'P',
    name: 'Priya Sharma',
    city: 'Mumbai',
    quote:
      'I started with just ₹500 and now my portfolio has grown significantly. The process is so simple and returns are consistent.',
  },
  {
    initial: 'R',
    name: 'Rahul Verma',
    city: 'Delhi',
    quote:
      "Best investment decision I've made. The dashboard is intuitive and I can track my investments in real-time. Highly recommended!",
  },
  {
    initial: 'A',
    name: 'Anita Patel',
    city: 'Bangalore',
    quote:
      'As a first-time investor, I was skeptical. But InvestIQ made it so easy and the returns have exceeded my expectations.',
  },
];

export const ADMIN_DEMO_USERS = [
  { id: 'u1', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '+91 98201 11201', kyc_status: 'verified', invested: '₹25,000', joined: '12 Jan 2026' },
  { id: 'u2', name: 'Priya Patel', email: 'priya.patel@email.com', phone: '+91 98201 11202', kyc_status: 'verified', invested: '₹15,000', joined: '18 Jan 2026' },
  { id: 'u3', name: 'Amit Kumar', email: 'amit.kumar@email.com', phone: '+91 98201 11203', kyc_status: 'pending', invested: '₹5,000', joined: '02 Feb 2026' },
  { id: 'u4', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 98201 11204', kyc_status: 'verified', invested: '₹50,000', joined: '14 Feb 2026' },
  { id: 'u5', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 98201 11205', kyc_status: 'pending', invested: '₹10,000', joined: '21 Feb 2026' },
  { id: 'u6', name: 'Ananya Gupta', email: 'ananya.gupta@email.com', phone: '+91 98201 11206', kyc_status: 'verified', invested: '₹1,500', joined: '05 Mar 2026' },
  { id: 'u7', name: 'Rohan Mehta', email: 'rohan.mehta@email.com', phone: '+91 98201 11207', kyc_status: 'rejected', invested: '₹0', joined: '11 Mar 2026' },
  { id: 'u8', name: 'Kavita Nair', email: 'kavita.nair@email.com', phone: '+91 98201 11208', kyc_status: 'verified', invested: '₹10,000', joined: '19 Mar 2026' },
  { id: 'u9', name: 'Suresh Iyer', email: 'suresh.iyer@email.com', phone: '+91 98201 11209', kyc_status: 'pending', invested: '₹5,000', joined: '28 Mar 2026' },
  { id: 'u10', name: 'Meera Joshi', email: 'meera.joshi@email.com', phone: '+91 98201 11210', kyc_status: 'verified', invested: '₹75,000', joined: '04 Apr 2026' },
  { id: 'u11', name: 'Karthik Rao', email: 'karthik.rao@email.com', phone: '+91 98201 11211', kyc_status: 'verified', invested: '₹12,000', joined: '15 Apr 2026' },
  { id: 'u12', name: 'Divya Menon', email: 'divya.menon@email.com', phone: '+91 98201 11212', kyc_status: 'pending', invested: '₹2,500', joined: '22 Apr 2026' },
  { id: 'u13', name: 'Arjun Kapoor', email: 'arjun.kapoor@email.com', phone: '+91 98201 11213', kyc_status: 'verified', invested: '₹30,000', joined: '01 May 2026' },
  { id: 'u14', name: 'Lakshmi Krishnan', email: 'lakshmi.k@email.com', phone: '+91 98201 11214', kyc_status: 'verified', invested: '₹8,000', joined: '09 May 2026' },
  { id: 'u15', name: 'Nikhil Agarwal', email: 'nikhil.agarwal@email.com', phone: '+91 98201 11215', kyc_status: 'pending', invested: '₹500', joined: '17 May 2026' },
];

export const ADMIN_DEMO_TICKETS: SupportTicket[] = [
  {
    id: 'TCK-101',
    user_id: null,
    name: 'Amit Kumar',
    phone: '+91 98201 11203',
    email: 'amit.kumar@email.com',
    category: 'KYC Verification',
    subject: 'PAN Card verification pending since 48 hours',
    message: 'I uploaded my PAN card two days ago. Please verify my KYC.',
    status: 'open',
    created_at: '2026-10-30T10:30:00Z',
  },
  {
    id: 'TCK-102',
    user_id: null,
    name: 'Priya Patel',
    phone: '+91 98201 11202',
    email: 'priya.patel@email.com',
    category: 'Payments & Withdrawals',
    subject: 'Upgrading from Steady Growth to Premium Portfolio',
    message: 'Can I roll over my matured balance directly into Premium Portfolio?',
    status: 'in_progress',
    created_at: '2026-10-29T14:15:00Z',
  },
];

export const FAQ_ITEMS = [
  {
    category: 'Account & KYC',
    question: 'How do I create an account on InvestSmart India?',
    answer: 'Click on "Get Started", enter your email address and password, and verify your email to activate your investor dashboard within 2 minutes.',
  },
  {
    category: 'Investments & Plans',
    question: 'What is the minimum investment amount?',
    answer: 'You can start investing with as little as ₹500 in our Quick Returns plan.',
  },
  {
    category: 'Security & Compliance',
    question: 'Is InvestSmart India a registered company?',
    answer: 'Yes, InvestIQ Technologies Pvt Ltd is a registered financial technology platform adhering to strict regulatory and SEBI compliance standards.',
  },
  {
    category: 'Account & KYC',
    question: 'Can I invest if I am an NRI?',
    answer: 'Yes, NRIs with a valid NRO/NRE bank account and Indian KYC documents (PAN & Aadhaar/Passport) can invest seamlessly.',
  },
  {
    category: 'Account & KYC',
    question: 'What documents are required for KYC?',
    answer: 'You only need a valid PAN card, Aadhaar card (or Passport), and an active bank account in your name.',
  },
  {
    category: 'Account & KYC',
    question: 'How long does KYC verification take?',
    answer: 'Automated KYC verification takes less than 2 minutes. Manual reviews, if required, are completed within 24 hours.',
  },
  {
    category: 'Account & KYC',
    question: 'Why was my KYC rejected?',
    answer: 'KYC may be rejected due to blurry document uploads, name mismatch between PAN and bank account, or expired identity proof.',
  },
  {
    category: 'Account & KYC',
    question: 'Can I invest without completing KYC?',
    answer: 'You can explore plans and use the calculator, but completing KYC is mandatory before making live investments or withdrawals.',
  },
  {
    category: 'Investments & Plans',
    question: 'How do the fixed-return investment plans work?',
    answer: 'You select a plan with a fixed tenure (5 to 36 months) and guaranteed return rate. At maturity, your principal plus returns are credited directly to your account.',
  },
  {
    category: 'Investments & Plans',
    question: 'Can I invest in multiple plans simultaneously?',
    answer: 'Yes, there is no limit. You can hold multiple active investments across Quick Returns, Steady Growth, Wealth Builder, and Premium Portfolio.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'What happens if I need to withdraw before maturity?',
    answer: 'Early withdrawal is allowed anytime with zero penalty on your principal and proportional returns based on the duration completed.',
  },
  {
    category: 'Investments & Plans',
    question: 'How are the returns calculated?',
    answer: 'Returns are calculated based on the fixed percentage guaranteed by your chosen plan over its defined maturity duration.',
  },
  {
    category: 'Investments & Plans',
    question: 'Is there any lock-in period?',
    answer: 'None — you can withdraw your principal anytime if an emergency arises.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI (GPay, PhonePe, Paytm), Net Banking, and all major Debit/Credit cards via our 256-bit SSL secured Razorpay gateway.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'My payment failed but money was deducted. What should I do?',
    answer: 'If money was debited for a failed transaction, it is automatically refunded to your source bank account within 3–5 business days.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'Can I make investments using someone elses bank account?',
    answer: 'No, for security and regulatory compliance, investments must be made only from bank accounts that are in your name and linked to your KYC-verified profile.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'Are there any transaction fees?',
    answer: 'Zero fees. We do not charge any deposit, maintenance, or withdrawal fees.',
  },
  {
    category: 'Security & Compliance',
    question: 'How safe is my investment with InvestSmart India?',
    answer: 'Your principal is 100% capital-protected and backed by bank-grade 256-bit encryption, ISO 27001 certification, and PCI DSS compliance.',
  },
  {
    category: 'Security & Compliance',
    question: 'What security measures are in place?',
    answer: 'We enforce strict Row-Level Security (RLS), end-to-end TLS encryption, two-factor authentication, and continuous fraud monitoring.',
  },
  {
    category: 'Security & Compliance',
    question: 'How do I enable two-factor authentication?',
    answer: 'Go to your account settings in the dashboard and toggle on Two-Factor Authentication (2FA) via SMS/Email OTP.',
  },
  {
    category: 'Security & Compliance',
    question: 'What should I do if I suspect unauthorized access?',
    answer: 'Immediately reset your password and contact our 24/7 priority support team via live chat or phone to freeze account activity.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'How and when will I receive my returns?',
    answer: 'Returns along with your invested principal are automatically credited on the maturity date directly to your verified bank account.',
  },
  {
    category: 'Investments & Plans',
    question: 'Are the returns guaranteed?',
    answer: 'Yes, returns are assured as per the selected plan schedule and terms.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'Is there TDS on the returns?',
    answer: 'Returns are taxable as per applicable slabs under the Indian Income Tax Act.',
  },
  {
    category: 'Payments & Withdrawals',
    question: 'How do I withdraw my matured investment?',
    answer: 'Click on the "Instant Withdrawal" option in your dashboard and the funds will be transferred to your bank account with zero fees.',
  },
];