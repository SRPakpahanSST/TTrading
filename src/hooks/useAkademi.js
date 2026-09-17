import { useState, useEffect, useCallback } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'
import level1 from '../data/akademi/level1.json'

export function useAkademi() {
  const [progress, setProgress] = useState({
    materiSelesai: [],
    kuisSkor: {},
    levelAktif: 1,
    xp: 0,
  })

  const load = useCallback(() => {
    const saved = storage.get('akademiProgress', {
      materiSelesai: [],
      kuisSkor: {},
      levelAktif: 1,
      xp: 0,
    })
    setProgress(saved)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const simpanProgress = (newProgress) => {
    setProgress(newProgress)
    storage.set('akademiProgress', newProgress)
  }

  const tandaiSelesai = (materiId) => {
    if (progress.materiSelesai.includes(materiId)) return
    const newProgress = {
      ...progress,
      materiSelesai: [...progress.materiSelesai, materiId],
      xp: progress.xp + 10,
    }
    simpanProgress(newProgress)
  }

  const simpanSkorKuis = (materiId, skor) => {
    const newProgress = {
      ...progress,
      kuisSkor: { ...progress.kuisSkor, [materiId]: skor },
    }
    simpanProgress(newProgress)
  }

  const semuaMateri = level1.materi
  const totalMateri = semuaMateri.length
  const materiSelesai = progress.materiSelesai.length
  const progressPersen = Math.round((materiSelesai / totalMateri) * 100)
  const levelSelesai = materiSelesai === totalMateri

  return {
    level: level1,
    progress,
    semuaMateri,
    totalMateri,
    materiSelesai,
    progressPersen,
    levelSelesai,
    tandaiSelesai,
    simpanSkorKuis,
    refresh: load,
  }
}