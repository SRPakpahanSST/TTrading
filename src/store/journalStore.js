import { create } from 'zustand'

export const useJournalStore = create((set) => ({
  jurnal: [],

  addJurnal: (entri) => set((state) => ({
    jurnal: [{ id: Date.now(), ...entri }, ...state.jurnal],
  })),

  deleteJurnal: (id) => set((state) => ({
    jurnal: state.jurnal.filter((j) => j.id !== id),
  })),

  clearJurnal: () => set({ jurnal: [] }),
}))