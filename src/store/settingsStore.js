import { create } from 'zustand'

export const useSettingsStore = create((set) => ({
  settings: {
    notifikasiAktif: true,
    targetProfit: 5,
    maxDrawdown: 10,
    komitmenAmal: 2,
  },

  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings },
  })),

  resetSettings: () => set({
    settings: {
      notifikasiAktif: true,
      targetProfit: 5,
      maxDrawdown: 10,
      komitmenAmal: 2,
    },
  }),
}))