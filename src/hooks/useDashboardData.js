import { useState, useEffect, useCallback } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'

export function useDashboardData() {
  const [data, setData] = useState({
    portfolio: { totalAset: 0, modalAwal: 0, profitLoss: 0, riwayat: [] },
    pilar: { rajaMakro: 5, pembunuh: 5, sentuhanEmas: 5, dewaFundamental: 5 },
    amal: { total: 0, jumlah: 0, riwayat: [] },
    dosa: [],
    jurnal: [],
    loading: true,
  })

  const loadData = useCallback(() => {
    // Portfolio
    const portfolio = storage.get(STORAGE_KEYS.PORTFOLIO, {
      totalAset: 379143,
      modalAwal: 380000,
      profitLoss: -857,
      riwayat: [
        { tanggal: '2026-08-01', totalAset: 380000 },
        { tanggal: '2026-09-01', totalAset: 379500 },
        { tanggal: '2026-09-15', totalAset: 379143 },
      ],
    })

    // Pilar Score (dari Jurnal terakhir atau manual)
    const jurnal = storage.get(STORAGE_KEYS.JURNAL, [])
    let pilar = storage.get(STORAGE_KEYS.PILAR_SCORE, null)
    if (!pilar && jurnal.length > 0) {
      const latest = jurnal[0]
      pilar = {
        rajaMakro: latest.pilarRajaMakro || 5,
        pembunuh: latest.pilarPembunuh || 5,
        sentuhanEmas: latest.pilarSentuhanEmas || 5,
        dewaFundamental: latest.pilarDewaFundamental || 5,
      }
    }
    if (!pilar) {
      pilar = { rajaMakro: 8, pembunuh: 6, sentuhanEmas: 10, dewaFundamental: 9 }
    }

    // Amal
    const amalRaw = storage.get(STORAGE_KEYS.AMAL, [])
    const amal = {
      total: amalRaw.reduce((sum, a) => sum + (a.jumlah || 0), 0),
      jumlah: amalRaw.length,
      riwayat: amalRaw.slice(0, 3),
    }

    // Dosa
    const dosa = storage.get(STORAGE_KEYS.DOSA, [])

    setData({ portfolio, pilar, amal, dosa, jurnal, loading: false })
  }, [])

  useEffect(() => {
    loadData()
    const handleStorage = () => loadData()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [loadData])

  return { ...data, refresh: loadData }
}