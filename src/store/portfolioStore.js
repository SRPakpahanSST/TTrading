import { create } from 'zustand'

export const usePortfolioStore = create((set) => ({
  totalAset: 379143,
  modalAwal: 380000,
  profitLoss: -857,

  updatePortfolio: (data) => set(data),

  resetPortfolio: () => set({
    totalAset: 0,
    modalAwal: 0,
    profitLoss: 0,
  }),
}))