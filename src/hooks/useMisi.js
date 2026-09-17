import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import misiData from '../data/misiHarian.json'

const STORAGE_KEY = 'misiHarian'

export function useMisi() {
  const [misiHariIni, setMisiHariIni] = useState([])
  const [riwayat, setRiwayat] = useState([])
  const [totalXP, setTotalXP] = useState(0)

  const load = useCallback(() => {
    const saved = storage.get(STORAGE_KEY, {
      tanggal: null,
      misiSelesai: [],
      riwayat: [],
      totalXP: 0,
    })

    const today = new Date().toISOString().split('T')[0]

    // Reset jika beda hari
    if (saved.tanggal !== today) {
      // Cek jika kemarin, simpan ke riwayat
      let newRiwayat = saved.riwayat || []
      if (saved.tanggal && saved.misiSelesai.length > 0) {
        const xpHariItu = saved.misiSelesai.reduce((sum, id) => {
          const misi = misiData.misi.find((m) => m.id === id)
          return sum + (misi?.xp || 0)
        }, 0)
        newRiwayat = [
          { tanggal: saved.tanggal, misiSelesai: saved.misiSelesai.length, xp: xpHariItu },
          ...newRiwayat,
        ].slice(0, 30) // Simpan 30 hari terakhir
      }

      const newData = {
        tanggal: today,
        misiSelesai: [],
        riwayat: newRiwayat,
        totalXP: saved.totalXP || 0,
      }
      storage.set(STORAGE_KEY, newData)
      setMisiHariIni([])
      setRiwayat(newRiwayat)
      setTotalXP(newData.totalXP)
      return
    }

    setMisiHariIni(saved.misiSelesai || [])
    setRiwayat(saved.riwayat || [])
    setTotalXP(saved.totalXP || 0)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const selesaikanMisi = (misiId) => {
    if (misiHariIni.includes(misiId)) return false

    const misi = misiData.misi.find((m) => m.id === misiId)
    if (!misi) return false

    const newMisiSelesai = [...misiHariIni, misiId]
    const newTotalXP = totalXP + misi.xp

    const saved = storage.get(STORAGE_KEY, {})
    const newData = {
      ...saved,
      misiSelesai: newMisiSelesai,
      totalXP: newTotalXP,
    }

    storage.set(STORAGE_KEY, newData)
    setMisiHariIni(newMisiSelesai)
    setTotalXP(newTotalXP)

    return true
  }

  const batalkanMisi = (misiId) => {
    if (!misiHariIni.includes(misiId)) return

    const misi = misiData.misi.find((m) => m.id === misiId)
    const newMisiSelesai = misiHariIni.filter((id) => id !== misiId)
    const newTotalXP = totalXP - (misi?.xp || 0)

    const saved = storage.get(STORAGE_KEY, {})
    storage.set(STORAGE_KEY, {
      ...saved,
      misiSelesai: newMisiSelesai,
      totalXP: newTotalXP,
    })
    setMisiHariIni(newMisiSelesai)
    setTotalXP(newTotalXP)
  }

  // Hitung XP hari ini
  const xpHariIni = misiHariIni.reduce((sum, id) => {
    const misi = misiData.misi.find((m) => m.id === id)
    return sum + (misi?.xp || 0)
  }, 0)

  // Hitung level pengguna
  const getLevel = (xp) => {
    const levels = misiData.levelPengguna
    let currentLevel = levels[0]
    let nextLevel = levels[1]
    for (let i = 0; i < levels.length; i++) {
      if (xp >= levels[i].minXP) {
        currentLevel = levels[i]
        nextLevel = levels[i + 1] || null
      }
    }
    return { current: currentLevel, next: nextLevel }
  }

  const levelInfo = getLevel(totalXP)

  // Streak misi (hari berturut-turut menyelesaikan minimal 1 misi)
  const getStreakMisi = () => {
    if (riwayat.length === 0) return misiHariIni.length > 0 ? 1 : 0
    let streak = misiHariIni.length > 0 ? 1 : 0
    const sorted = [...riwayat].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    let expectedDate = new Date()
    expectedDate.setDate(expectedDate.getDate() - 1)
    for (const item of sorted) {
      const itemDate = new Date(item.tanggal)
      if (itemDate.toISOString().split('T')[0] === expectedDate.toISOString().split('T')[0]) {
        streak++
        expectedDate.setDate(expectedDate.getDate() - 1)
      } else {
        break
      }
    }
    return streak
  }

  const resetHariIni = () => {
    const today = new Date().toISOString().split('T')[0]
    const saved = storage.get(STORAGE_KEY, {})
    storage.set(STORAGE_KEY, {
      ...saved,
      tanggal: today,
      misiSelesai: [],
    })
    setMisiHariIni([])
  }

  return {
    misi: misiData.misi,
    levelPengguna: misiData.levelPengguna,
    misiHariIni,
    riwayat,
    totalXP,
    xpHariIni,
    levelInfo,
    streakMisi: getStreakMisi(),
    selesaikanMisi,
    batalkanMisi,
    resetHariIni,
    refresh: load,
  }
}