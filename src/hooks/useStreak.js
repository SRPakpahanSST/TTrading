import { useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'

export function useStreak() {
  const [streak, setStreak] = useState({
    current: 0,
    longest: 0,
    lastDate: null,
    history: [],
  })

  useEffect(() => {
    const saved = storage.get(STORAGE_KEYS.STREAK, {
      current: 0,
      longest: 0,
      lastDate: null,
      history: [],
    })
    setStreak(saved)
    checkAndUpdate(saved)
  }, [])

  const checkAndUpdate = (current) => {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (current.lastDate === today) {
      // Sudah check-in hari ini
      return
    }

    let newCurrent = current.current
    if (current.lastDate === yesterday) {
      newCurrent = current.current + 1
    } else if (current.lastDate !== today) {
      newCurrent = 1 // Reset streak
    }

    const newLongest = Math.max(newCurrent, current.longest)
    const newHistory = [...(current.history || []), today].slice(-30)

    const updated = {
      current: newCurrent,
      longest: newLongest,
      lastDate: today,
      history: newHistory,
    }

    setStreak(updated)
    storage.set(STORAGE_KEYS.STREAK, updated)
  }

  const reset = () => {
    const kosong = { current: 0, longest: 0, lastDate: null, history: [] }
    setStreak(kosong)
    storage.set(STORAGE_KEYS.STREAK, kosong)
  }

  return { streak, reset }
}