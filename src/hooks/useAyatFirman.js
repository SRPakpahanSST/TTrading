import { useState, useEffect, useCallback } from 'react'
import { semuaAyat as ayatLokal } from '../data/ayatFirman' // <-- Impor dari folder

// Opsi sumber data
const SUMBER_DATA = {
  LOKAL: 'lokal',
  SABDA: 'sabda',
}

export function useAyatFirman() {
  const [ayat, setAyat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sumber, setSumber] = useState(SUMBER_DATA.LOKAL) // <-- State baru
  const [tema, setTema] = useState('semua')

  // Gabungkan semua ayat dari file lokal
  const semuaAyat = ayatLokal || []

  // Daftar tema unik dari data lokal
  const temaList = ['semua', ...new Set(semuaAyat.map((a) => a.tema))]

  // Fungsi untuk mengambil ayat dari API SABDA (berdasarkan referensi)
  const ambilAyatDariSabda = useCallback(async (kitab, pasal, ayat) => {
    try {
      const response = await fetch(
        `https://alkitab.sabda.org/api/passage/?passage=${encodeURIComponent(kitab)}+${pasal}:${ayat}&ver=tb`
      )
      const data = await response.json()
      // Format respons SABDA perlu disesuaikan
      if (data && data.passage) {
        return { teks: data.passage }
      }
      throw new Error('Format data SABDA tidak dikenali')
    } catch (err) {
      console.warn('Gagal mengambil dari SABDA:', err.message)
      return null // Kembalikan null jika gagal, agar bisa pakai fallback
    }
  }, [])

  // Muat ayat hari ini (logika ini dipertahankan)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const ayatHariIni = semuaAyat.length > 0 ? semuaAyat[new Date().getDate() % semuaAyat.length] : null
      if (ayatHariIni) {
        setAyat(ayatHariIni)
        setError(null)
      } else {
        setError('Data ayat lokal tidak tersedia.')
      }
      setLoading(false)
    }, 300)
  }, [semuaAyat])

  // Ambil ayat baru (logika ini dipertahankan)
  const ambilAyatBaru = useCallback(async () => {
    setLoading(true)
    let ayatBaru = null

    if (sumber === SUMBER_DATA.LOKAL) {
      // Logika acak dari data lokal
      let pool = semuaAyat
      if (tema !== 'semua') {
        pool = semuaAyat.filter((a) => a.tema === tema)
      }
      ayatBaru = pool[Math.floor(Math.random() * pool.length)]
    } else if (sumber === SUMBER_DATA.SABDA) {
      // Ambil acak dari referensi lokal, lalu ambil teksnya dari SABDA
      const referensiAcak = semuaAyat[Math.floor(Math.random() * semuaAyat.length)]
      if (referensiAcak) {
        const hasilSabda = await ambilAyatDariSabda(referensiAcak.kitab, referensiAcak.pasal, referensiAcak.ayat)
        if (hasilSabda) {
          ayatBaru = { ...referensiAcak, teks: hasilSabda.teks }
        }
      }
    }

    // Fallback jika gagal
    if (!ayatBaru) {
      ayatBaru = semuaAyat[Math.floor(Math.random() * semuaAyat.length)]
      setError('Gagal mengambil dari SABDA. Menampilkan dari data lokal.')
    } else {
      setError(null)
    }
    
    setAyat(ayatBaru)
    setLoading(false)
  }, [sumber, tema, semuaAyat, ambilAyatDariSabda])

  // ... (return statement diperbarui untuk menyertakan sumber & setSumber)
  return {
    ayat,
    loading,
    error,
    sumber,
    setSumber, // <-- Kembalikan state baru
    tema,
    setTema,
    temaList,
    totalAyat: semuaAyat.length,
    ambilAyatBaru,
  }
}