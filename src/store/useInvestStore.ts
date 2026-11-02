import { create } from 'zustand';
import {
  InvestmentPlan,
  Profile,
  SupportTicket,
  UserInvestment,
} from '@/types/investiq';
import {
  ADMIN_DEMO_TICKETS,
  DEFAULT_INVESTMENT_PLANS,
  DEMO_ACTIVE_INVESTMENTS,
} from '@/lib/constants';

interface InvestState {
  user: Profile | null;
  plans: InvestmentPlan[];
  investments: UserInvestment[];
  tickets: SupportTicket[];
  selectedPlanSlug: string;
  calculatorAmount: number;
  isReferralModalOpen: boolean;

  setUser: (user: Profile | null) => void;
  setPlans: (plans: InvestmentPlan[]) => void;
  setInvestments: (investments: UserInvestment[]) => void;
  addInvestment: (investment: UserInvestment) => void;
  addTicket: (ticket: SupportTicket) => void;
  setSelectedPlanSlug: (slug: string) => void;
  setCalculatorAmount: (amount: number) => void;
  setReferralModalOpen: (open: boolean) => void;
  logout: () => void;
}

export const useInvestStore = create<InvestState>((set) => ({
  user: null,
  plans: DEFAULT_INVESTMENT_PLANS,
  investments: DEMO_ACTIVE_INVESTMENTS,
  tickets: ADMIN_DEMO_TICKETS,
  selectedPlanSlug: 'quick-returns',
  calculatorAmount: 500,
  isReferralModalOpen: false,

  setUser: (user) => set({ user }),
  setPlans: (plans) => set({ plans }),
  setInvestments: (investments) => set({ investments }),
  addInvestment: (investment) =>
    set((state) => ({
      investments: [investment, ...state.investments],
    })),
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [ticket, ...state.tickets],
    })),
  setSelectedPlanSlug: (slug) => {
    const plan = DEFAULT_INVESTMENT_PLANS.find((p) => p.slug === slug);
    set({
      selectedPlanSlug: slug,
      calculatorAmount: plan ? plan.min_amount : 500,
    });
  },
  setCalculatorAmount: (amount) => set({ calculatorAmount: amount }),
  setReferralModalOpen: (open) => set({ isReferralModalOpen: open }),
  logout: () => set({ user: null }),
}));