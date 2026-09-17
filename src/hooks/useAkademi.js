import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import level1 from '../data/akademi/level1.json'
import level2 from '../data/akademi/level2.json'
import level3 from '../data/akademi/level3.json'

export const LEVELS = [level1, level2, level3]

export function useAkademi(levelId = 1) {
  const [progress, setProgress] = useState({
    materiSelesai: {},
    kuisSkor: {},
    xp: 0,
  })

  const load = useCallback(() => {
    const saved = storage.get('akademiProgress', {
      materiSelesai: {},
      kuisSkor: {},
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

  const level = LEVELS.find((l) => l.level === levelId) || LEVELS[0]
  const semuaMateri = level.materi
  const totalMateri = semuaMateri.length

  const selesaiLevelIni = progress.materiSelesai[levelId] || []
  const materiSelesai = selesaiLevelIni.length
  const progressPersen = Math.round((materiSelesai / totalMateri) * 100)
  const levelSelesai = materiSelesai === totalMateri

  const levelSebelumnyaSelesai =
    levelId === 1 || (progress.materiSelesai[levelId - 1] || []).length ===
    (LEVELS.find((l) => l.level === levelId - 1)?.materi.length || 0)

  const tandaiSelesai = (materiId) => {
    if (selesaiLevelIni.includes(materiId)) return
    const newProgress = {
      ...progress,
      materiSelesai: {
        ...progress.materiSelesai,
        [levelId]: [...selesaiLevelIni, materiId],
      },
      xp: progress.xp + 15,
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

  const hitungLevelSelesai = (lvId) => {
    const lv = LEVELS.find((l) => l.level === lvId)
    if (!lv) return 0
    return (progress.materiSelesai[lvId] || []).length
  }

  return {
    level,
    levels: LEVELS,
    progress,
    semuaMateri,
    totalMateri,
    materiSelesai,
    progressPersen,
    levelSelesai,
    levelSebelumnyaSelesai,
    tandaiSelesai,
    simpanSkorKuis,
    hitungLevelSelesai,
    refresh: load,
  }
}