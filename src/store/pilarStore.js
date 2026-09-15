import { create } from 'zustand'

export const usePilarStore = create((set) => ({
  skor: {
    rajaMakro: 5,
    pembunuh: 5,
    sentuhanEmas: 5,
    dewaFundamental: 5,
  },

  updateSkor: (newSkor) => set({ skor: newSkor }),

  getTotal: () => {
    // Akan dihitung di komponen
    return 0
  },
}))