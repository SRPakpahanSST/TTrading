import { useState, useEffect, useCallback } from 'react'

// Daftar ayat fallback (jika API down)
const FALLBACK_AYAT = [
  {
    kitab: 'Yohanes',
    pasal: 3,
    ayat: 16,
    teks: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.',
  },
  {
    kitab: 'Filipi',
    pasal: 4,
    ayat: 13,
    teks: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.',
  },
  {
    kitab: 'Mazmur',
    pasal: 23,
    ayat: 1,
    teks: 'TUHAN adalah gembalaku, takkan kekurangan aku.',
  },
  {
    kitab: 'Amsal',
    pasal: 3,
    ayat: 5,
    teks: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.',
  },
  {
    kitab: 'Yesaya',
    pasal: 41,
    ayat: 10,
    teks: 'Janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau.',
  },
]

// Daftar ayat yang akan dirotasi
const DAFTAR_AYAT = [
  { kitab: 'Yoh', pasal: 3, ayat: 16 },
  { kitab: 'Flp', pasal: 4, ayat: 13 },
  { kitab: 'Mzm', pasal: 23, ayat: 1 },
  { kitab: 'Ams', pasal: 3, ayat: 5 },
  { kitab: 'Yes', pasal: 41, ayat: 10 },
  { kitab: 'Yos', pasal: 1, ayat: 9 },
  { kitab: 'Mat', pasal: 11, ayat: 28 },
]

export function useAyatFirman() {
  const [ayat, setAyat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFallback, setIsFallback] = useState(false)

  // Ambil ayat berdasarkan hari ini (rotasi)
  const getAyatHariIni = useCallback(() => {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 0)
    const diff = today - startOfYear
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
    const index = dayOfYear % DAFTAR_AYAT.length
    return DAFTAR_AYAT[index]
  }, [])

  // Ambil ayat acak (untuk tombol "Ambil Ayat Baru")
  const getAyatAcak = useCallback(() => {
    const index = Math.floor(Math.random() * DAFTAR_AYAT.length)
    return DAFTAR_AYAT[index]
  }, [])

  const fetchAyat = useCallback(async (targetAyat) => {
    setLoading(true)
    setError(null)
    setIsFallback(false)

    const { kitab, pasal, ayat: nomorAyat } = targetAyat
    const url = `https://api-alkitab.herokuapp.com/v2/passage/${kitab}/${pasal}/${nomorAyat}?ver=tb`

    try {
      // Timeout 8 detik
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)

      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data && data.verse) {
        const ayatData = data.verse[0] || data.verse
        setAyat({
          kitab: ayatData.book || kitab,
          pasal: ayatData.chapter || pasal,
          ayat: ayatData.verse || nomorAyat,
          teks: ayatData.text || 'Teks tidak tersedia',
        })
      } else {
        throw new Error('Format data tidak dikenali')
      }
    } catch (err) {
      console.warn('API Alkitab gagal, pakai fallback:', err.message)
      setIsFallback(true)
      // Cari fallback yang cocok, atau pakai acak
      const fallback = FALLBACK_AYAT.find(
        (f) => f.pasal === pasal && f.ayat === nomorAyat
      ) || FALLBACK_AYAT[Math.floor(Math.random() * FALLBACK_AYAT.length)]
      setAyat(fallback)
      setError('API sedang tidak tersedia. Menampilkan ayat cadangan.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Ambil ayat hari ini saat komponen dimuat
  useEffect(() => {
    fetchAyat(getAyatHariIni())
  }, [fetchAyat, getAyatHariIni])

  // Fungsi untuk ambil ayat baru (acak)
  const ambilAyatBaru = useCallback(() => {
    fetchAyat(getAyatAcak())
  }, [fetchAyat, getAyatAcak])

  return {
    ayat,
    loading,
    error,
    isFallback,
    ambilAyatBaru,
  }
}