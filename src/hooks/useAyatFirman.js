import { useState, useEffect, useCallback } from 'react'
import ayatFirmanData from '../data/ayatFirman.json'

export function useAyatFirman() {
  const [ayat, setAyat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setIsFallback] = useState(false)
  const [tema, setTema] = useState('semua')

  const semuaAyat = ayatFirmanData.ayat || []

  // Daftar tema unik
  const temaList = ['semua', ...new Set(semuaAyat.map((a) => a.tema))]

  // Ambil ayat berdasarkan hari ini (rotasi)
  const getAyatHariIni = useCallback(() => {
    if (semuaAyat.length === 0) return null
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 0)
    const diff = today - startOfYear
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
    const index = dayOfYear % semuaAyat.length
    return semuaAyat[index]
  }, [semuaAyat])

  // Ambil ayat acak
  const getAyatAcak = useCallback(() => {
    if (semuaAyat.length === 0) return null
    let pool = semuaAyat
    if (tema !== 'semua') {
      pool = semuaAyat.filter((a) => a.tema === tema)
    }
    if (pool.length === 0) pool = semuaAyat
    const index = Math.floor(Math.random() * pool.length)
    return pool[index]
  }, [semuaAyat, tema])

  // Muat ayat hari ini saat komponen dimuat
  useEffect(() => {
    setLoading(true)
    // Simulasi delay kecil agar transisi halus
    setTimeout(() => {
      const ayatHariIni = getAyatHariIni()
      if (ayatHariIni) {
        setAyat(ayatHariIni)
        setError(null)
      } else {
        setError('Data ayat tidak tersedia.')
      }
      setLoading(false)
    }, 300)
  }, [getAyatHariIni])

  // Ambil ayat baru
  const ambilAyatBaru = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      const ayatBaru = getAyatAcak()
      if (ayatBaru) {
        setAyat(ayatBaru)
        setError(null)
      }
      setLoading(false)
    }, 300)
  }, [getAyatAcak])

  // Total ayat tersedia
  const totalAyat = semuaAyat.length

  // Jumlah ayat per tema
  const jumlahPerTema = semuaAyat.reduce((acc, a) => {
    acc[a.tema] = (acc[a.tema] || 0) + 1
    return acc
  }, {})

  return {
    ayat,
    loading,
    error,
    isFallback,
    tema,
    setTema,
    temaList,
    totalAyat,
    jumlahPerTema,
    ambilAyatBaru,
  }
}