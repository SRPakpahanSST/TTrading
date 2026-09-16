import { useState, useEffect, useCallback } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'

export function useSyukur() {
  const [syukur, setSyukur] = useState([])

  const load = useCallback(() => {
    setSyukur(storage.get(STORAGE_KEYS.SYUKUR, []))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const tambahSyukur = (entri) => {
    const today = new Date().toISOString().split('T')[0]
    const newEntri = {
      id: Date.now(),
      tanggal: entri.tanggal || today,
      tigaHal: entri.tigaHal,
      mood: entri.mood || 'tenang',
      catatan: entri.catatan || '',
      createdAt: new Date().toISOString(),
    }
    const baru = [newEntri, ...syukur]
    setSyukur(baru)
    storage.set(STORAGE_KEYS.SYUKUR, baru)
    return newEntri
  }

  const hapusSyukur = (id) => {
    const baru = syukur.filter((s) => s.id !== id)
    setSyukur(baru)
    storage.set(STORAGE_KEYS.SYUKUR, baru)
  }

  const hariIniSudahIsi = () => {
    const today = new Date().toISOString().split('T')[0]
    return syukur.some((s) => s.tanggal === today)
  }

  const totalSyukur = syukur.length

  const getStreakSyukur = () => {
    if (syukur.length === 0) return 0
    const sorted = [...syukur].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const item of sorted) {
      const itemDate = new Date(item.tanggal)
      itemDate.setHours(0, 0, 0, 0)
      const diffDays = Math.round((currentDate - itemDate) / 86400000)

      if (diffDays === streak || diffDays === streak + 1) {
        streak++
        currentDate = itemDate
      } else {
        break
      }
    }
    return streak
  }

  const getSyukurMingguIni = () => {
    const weekAgo = new Date(Date.now() - 7 * 86400000)
    return syukur.filter((s) => new Date(s.tanggal) >= weekAgo)
  }

  return {
    syukur,
    tambahSyukur,
    hapusSyukur,
    hariIniSudahIsi,
    totalSyukur,
    getStreakSyukur,
    getSyukurMingguIni,
    refresh: load,
  }
}