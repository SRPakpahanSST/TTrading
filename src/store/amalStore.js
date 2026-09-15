import { create } from 'zustand'

export const useAmalStore = create((set) => ({
  amal: [],

  addAmal: (entri) => set((state) => ({
    amal: [{ id: Date.now(), ...entri }, ...state.amal],
  })),

  getTotal: () => {
    return 0 // Akan dihitung di komponen
  },

  clearAmal: () => set({ amal: [] }),
}))