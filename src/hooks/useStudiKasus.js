import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import studiData from '../data/studiKasus.json'

const STORAGE_KEY = 'studiKasus'

export function useStudiKasus() {
  const [progress, setProgress] = useState({ selesai: [], jawaban: {} })

  const load = useCallback(() => {
    const saved = storage.get(STORAGE_KEY, { selesai: [], jawaban: {} })
    setProgress(saved)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const simpan = (data) => {
    setProgress(data)
    storage.set(STORAGE_KEY, data)
  }

  const jawabStudi = (id, pilihanIndex, benar) => {
    const newData = {
      ...progress,
      jawaban: { ...progress.jawaban, [id]: { pilihanIndex, benar } },
      selesai: progress.selesai.includes(id)
        ? progress.selesai
        : [...progress.selesai, id],
    }
    simpan(newData)
  }

  const resetProgress = () => {
    simpan({ selesai: [], jawaban: {} })
  }

  const studiKasus = studiData.studiKasus
  const kategori = studiData.kategori
  const total = studiKasus.length
  const selesai = progress.selesai.length
  const progressPersen = Math.round((selesai / total) * 100)

  const getSkor = () => {
    const totalBenar = Object.values(progress.jawaban).filter((j) => j.benar).length
    return {
      benar: totalBenar,
      total: selesai,
      persen: selesai > 0 ? Math.round((totalBenar / selesai) * 100) : 0,
    }
  }

  const getByKategori = (kategoriId) =>
    studiKasus.filter((s) => s.kategori === kategoriId)

  return {
    kategori,
    studiKasus,
    total,
    selesai,
    progressPersen,
    progress,
    jawabStudi,
    resetProgress,
    getSkor,
    getByKategori,
    refresh: load,
  }
}