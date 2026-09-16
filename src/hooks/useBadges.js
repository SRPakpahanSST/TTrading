import { useState, useEffect, useCallback } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'
import { badgeList } from '../data/badgeList'

export function useBadges() {
  const [earned, setEarned] = useState([])

  const load = useCallback(() => {
    setEarned(storage.get(STORAGE_KEYS.BADGES, []))
  }, [])

  useEffect(() => {
    load()
    const handleStorage = () => load()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [load])

  const cekDanBerikanBadge = useCallback((stats) => {
    const currentEarned = storage.get(STORAGE_KEYS.BADGES, [])
    const newBadges = []

    badgeList.forEach((badge) => {
      // Skip jika sudah dimiliki
      if (currentEarned.includes(badge.id)) return

      // Cek syarat
      let dapat = false
      const { type, value } = badge.syarat

      switch (type) {
        case 'streak':
          dapat = (stats.streak || 0) >= value
          break
        case 'jurnal':
          dapat = (stats.jurnal || 0) >= value
          break
        case 'amal':
          dapat = (stats.amal || 0) >= value
          break
        case 'amalAmount':
          dapat = (stats.amalAmount || 0) >= value
          break
        case 'watchlist':
          dapat = (stats.watchlist || 0) >= value
          break
        case 'simulasi':
          dapat = (stats.simulasi || 0) >= value
          break
        case 'pilar':
          dapat = (stats.pilar || 0) >= value
          break
        case 'profit':
          dapat = (stats.profit || 0) >= value
          break
        default:
          dapat = false
      }

      if (dapat) {
        newBadges.push(badge.id)
      }
    })

    if (newBadges.length > 0) {
      const updated = [...currentEarned, ...newBadges]
      storage.set(STORAGE_KEYS.BADGES, updated)
      setEarned(updated)
      return newBadges
    }

    return []
  }, [])

  const isEarned = (badgeId) => earned.includes(badgeId)
  const totalEarned = earned.length
  const totalBadges = badgeList.length

  const reset = () => {
    setEarned([])
    storage.set(STORAGE_KEYS.BADGES, [])
  }

  return { earned, cekDanBerikanBadge, isEarned, totalEarned, totalBadges, reset, refresh: load }
}