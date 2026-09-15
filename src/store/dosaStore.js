import { create } from 'zustand'

export const useDosaStore = create((set) => ({
  dosaAktif: [],

  setDosaAktif: (dosa) => set({ dosaAktif: dosa }),

  clearDosa: () => set({ dosaAktif: [] }),
}))