import { useState, useEffect, useCallback } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'

// Data dummy anggota PMD (nantinya bisa dari server)
const anggotaDummy = [
  { id: 1, nama: 'Pak Pahan', avatar: '👨‍💼', streak: 15, jurnal: 24, amal: 12, pilar: 34, profit: 8 },
  { id: 2, nama: 'Bu Sari', avatar: '👩‍💼', streak: 22, jurnal: 30, amal: 18, pilar: 38, profit: 12 },
  { id: 3, nama: 'Mas Andi', avatar: '🧑‍💻', streak: 8, jurnal: 15, amal: 5, pilar: 28, profit: 4 },
  { id: 4, nama: 'Mbak Dewi', avatar: '👩‍🎓', streak: 30, jurnal: 45, amal: 25, pilar: 40, profit: 15 },
  { id: 5, nama: 'Pak Budi', avatar: '👨‍🦳', streak: 5, jurnal: 10, amal: 3, pilar: 22, profit: 2 },
]

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [myStats, setMyStats] = useState(null)

  const hitungSkorTotal = (anggota) => {
    return (
      (anggota.streak || 0) * 2 +
      (anggota.jurnal || 0) * 1 +
      (anggota.amal || 0) * 3 +
      (anggota.pilar || 0) * 2 +
      (anggota.profit || 0) * 5
    )
  }

  const load = useCallback(() => {
    // Ambil stats saya dari localStorage
    const streak = storage.get(STORAGE_KEYS.STREAK, { longest: 0 })
    const jurnal = storage.get(STORAGE_KEYS.JURNAL, [])
    const amal = storage.get(STORAGE_KEYS.AMAL, [])
    const pilar = storage.get(STORAGE_KEYS.PILAR_SCORE, null)
    const pilarTotal = pilar
      ? pilar.rajaMakro + pilar.pembunuh + pilar.sentuhanEmas + pilar.dewaFundamental
      : 0

    const jurnalProfit = jurnal.filter((j) => (j.profitLoss || 0) > 0).length

    const saya = {
      id: 999,
      nama: 'Saya',
      avatar: '🌟',
      isMe: true,
      streak: streak.longest || 0,
      jurnal: jurnal.length || 0,
      amal: amal.length || 0,
      pilar: pilarTotal,
      profit: jurnalProfit,
    }

    setMyStats(saya)

    // Gabung dengan dummy
    const gabungan = [...anggotaDummy, saya]
      .map((a) => ({ ...a, skor: hitungSkorTotal(a) }))
      .sort((a, b) => b.skor - a.skor)
      .map((a, i) => ({ ...a, peringkat: i + 1 }))

    setLeaderboard(gabungan)
  }, [])

  useEffect(() => {
    load()
    const handleStorage = () => load()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [load])

  return { leaderboard, myStats, refresh: load }
}