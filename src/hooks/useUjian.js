import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import ujianData from '../data/akademi/ujianAkhir.json'

const STORAGE_KEY = 'ujianAkhir'

export function useUjian() {
  const [hasilUjian, setHasilUjian] = useState(null)
  const [riwayat, setRiwayat] = useState([])

  const load = useCallback(() => {
    const saved = storage.get(STORAGE_KEY, { hasilTerakhir: null, riwayat: [] })
    setHasilUjian(saved.hasilTerakhir)
    setRiwayat(saved.riwayat || [])
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const soal = ujianData.soal
  const totalSoal = soal.length
  const nilaiLulus = ujianData.nilaiLulus

  const simpanHasil = (skor, jumlahBenar) => {
    let predikat = 'Tidak Lulus'
    let warna = 'gray'
    let icon = '❌'

    if (skor >= 90) {
      predikat = 'Sertifikat Emas'
      warna = 'amber'
      icon = '🥇'
    } else if (skor >= 80) {
      predikat = 'Sertifikat Perak'
      warna = 'gray'
      icon = '🥈'
    } else if (skor >= nilaiLulus) {
      predikat = 'Sertifikat Perunggu'
      warna = 'orange'
      icon = '🥉'
    }

    const hasil = {
      skor,
      jumlahBenar,
      totalSoal,
      predikat,
      warna,
      icon,
      lulus: skor >= nilaiLulus,
      tanggal: new Date().toISOString(),
    }

    const saved = storage.get(STORAGE_KEY, { hasilTerakhir: null, riwayat: [] })
    const newData = {
      hasilTerakhir: hasil,
      riwayat: [hasil, ...(saved.riwayat || [])].slice(0, 10),
    }
    storage.set(STORAGE_KEY, newData)
    setHasilUjian(hasil)
    setRiwayat(newData.riwayat)

    return hasil
  }

  const resetHasil = () => {
    storage.remove(STORAGE_KEY)
    setHasilUjian(null)
    setRiwayat([])
  }

  return {
    ujian: ujianData,
    soal,
    totalSoal,
    nilaiLulus,
    hasilUjian,
    riwayat,
    simpanHasil,
    resetHasil,
    refresh: load,
  }
}
