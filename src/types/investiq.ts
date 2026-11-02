export type UserRole = 'user' | 'admin';
export type KycStatus = 'pending' | 'verified' | 'rejected';
export type InvestmentStatus = 'pending' | 'active' | 'matured' | 'cancelled';
export type TransactionStatus = 'initiated' | 'success' | 'failed' | 'refunded';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  kyc_status: KycStatus;
  referral_code: string;
  referred_by: string | null;
  referral_invited_count: number;
  referral_joined_count: number;
  referral_earned: number;
  created_at: string;
  updated_at: string;
}

export interface InvestmentPlan {
  id: string;
  slug: 'quick-returns' | 'steady-growth' | 'wealth-builder' | 'premium-portfolio' | string;
  name: string;
  tagline: string;
  description: string;
  return_rate: number;
  duration_months: number;
  min_amount: number;
  max_amount: number;
  risk_level: string;
  is_popular: boolean;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export interface UserInvestment {
  id: string;
  user_id: string;
  plan_id: string;
  plan_name: string;
  invested_amount: number;
  return_rate: number;
  duration_months: number;
  expected_returns: number;
  total_maturity_amount: number;
  start_date: string;
  maturity_date: string;
  progress_percentage: number;
  status: InvestmentStatus;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  investment_id: string;
  user_name?: string;
  user_email?: string;
  plan_name?: string;
  amount: number;
  currency: string;
  payment_method: string;
  gateway_order_id: string | null;
  gateway_payment_id: string | null;
  idempotency_key: string;
  status: TransactionStatus;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string | null;
  name: string;
  phone: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  attachment_url?: string | null;
  status: TicketStatus;
  created_at: string;
}