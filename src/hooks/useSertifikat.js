import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import sertifikatData from '../data/sertifikatData.json'

export function useSertifikat() {
  const [sertifikatDiperoleh, setSertifikatDiperoleh] = useState([])

  const load = useCallback(() => {
    const saved = storage.get('sertifikat', [])
    setSertifikatDiperoleh(saved)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  // Cek semua data untuk menentukan sertifikat yang layak
  const cekSertifikat = useCallback(() => {
    const ujian = storage.get('ujianAkhir', { hasilTerakhir: null })
    const akademiProgress = storage.get('akademiProgress', { materiSelesai: {} })
    const streak = storage.get('streak', { longest: 0 })
    const amal = storage.get('amal', [])
    const studiKasus = storage.get('studiKasus', { selesai: [] })

    const ujianSkor = ujian.hasilTerakhir?.skor || 0
    const totalLevelSelesai = Object.keys(akademiProgress.materiSelesai || {})
      .filter((lv) => (akademiProgress.materiSelesai[lv] || []).length === 5).length
    const semuaLevelSelesai = totalLevelSelesai === 5
    const streakLongest = streak.longest || 0
    const totalAmal = amal.length || 0
    const studiKasusSelesai = (studiKasus.selesai || []).length

    const diperoleh = []

    sertifikatData.sertifikat.forEach((s) => {
      let layak = false
      const { type, value } = s.syarat

      switch (type) {
        case 'ujianSkor':
          layak = ujianSkor >= value
          break
        case 'semuaLevelSelesai':
          layak = semuaLevelSelesai
          break
        case 'streak':
          layak = streakLongest >= value
          break
        case 'totalAmal':
          layak = totalAmal >= value
          break
        case 'studiKasusSelesai':
          layak = studiKasusSelesai >= value
          break
        default:
          layak = false
      }

      if (layak) {
        diperoleh.push({
          ...s,
          tanggal: new Date().toISOString(),
        })
      }
    })

    // Simpan jika ada yang baru
    const idLama = new Set(sertifikatDiperoleh.map((s) => s.id))
    const idBaru = new Set(diperoleh.map((s) => s.id))
    const adaBaru = diperoleh.some((s) => !idLama.has(s.id))

    if (adaBaru || diperoleh.length !== sertifikatDiperoleh.length) {
      storage.set('sertifikat', diperoleh)
      setSertifikatDiperoleh(diperoleh)
    }

    return diperoleh
  }, [sertifikatDiperoleh])

  useEffect(() => {
    cekSertifikat()
  }, [cekSertifikat])

  const isDiperoleh = (id) => sertifikatDiperoleh.some((s) => s.id === id)

  const totalDiperoleh = sertifikatDiperoleh.length
  const totalSertifikat = sertifikatData.sertifikat.length

  // Generate SVG sertifikat
  const generateSVG = (sertifikat, nama) => {
    const tanggal = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const warnaMap = {
      amber: '#f59e0b',
      gray: '#94a3b8',
      orange: '#f97316',
      purple: '#a855f7',
      red: '#ef4444',
      pink: '#ec4899',
      blue: '#3b82f6',
    }

    const warna = warnaMap[sertifikat.warna] || '#f59e0b'

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f172a" />
            <stop offset="100%" style="stop-color:#1e293b" />
          </linearGradient>
          <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${warna}" />
            <stop offset="100%" style="stop-color:${warna}cc" />
          </linearGradient>
        </defs>

        <rect width="800" height="600" fill="url(#bg)" rx="20" />
        <rect x="20" y="20" width="760" height="560" fill="none" stroke="url(#accent)" stroke-width="4" rx="16" />
        <rect x="30" y="30" width="740" height="540" fill="none" stroke="${warna}" stroke-width="1" rx="12" opacity="0.4" />

        <text x="400" y="80" text-anchor="middle" fill="#fbbf24" font-family="system-ui" font-size="20" font-weight="bold">
          🌱 T TRADING
        </text>
        <text x="400" y="105" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="12">
          Cuan Berkah, Dampak Nyata
        </text>

        <line x1="300" y1="130" x2="500" y2="130" stroke="${warna}" stroke-width="2" />

        <text x="400" y="180" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14" letter-spacing="2">
          SERTIFIKAT
        </text>

        <text x="400" y="260" text-anchor="middle" font-family="system-ui" font-size="80">
          ${sertifikat.icon}
        </text>

        <text x="400" y="330" text-anchor="middle" fill="${warna}" font-family="system-ui" font-size="32" font-weight="bold">
          ${sertifikat.nama}
        </text>

        <text x="400" y="365" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="14">
          Predikat: ${sertifikat.predikat}
        </text>

        <line x1="250" y1="395" x2="550" y2="395" stroke="#334155" stroke-width="1" />

        <text x="400" y="430" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="12">
          Diberikan kepada
        </text>

        <text x="400" y="470" text-anchor="middle" fill="#ffffff" font-family="system-ui" font-size="28" font-weight="bold">
          ${nama || 'Pengguna PMD Impact Invest'}
        </text>

        <text x="400" y="505" text-anchor="middle" fill="#64748b" font-family="system-ui" font-size="12">
          ${sertifikat.deskripsi}
        </text>

        <text x="400" y="545" text-anchor="middle" fill="#94a3b8" font-family="system-ui" font-size="11">
          📅 ${tanggal}
        </text>

        <circle cx="700" cy="500" r="40" fill="none" stroke="${warna}" stroke-width="2" opacity="0.3" />
        <text x="700" y="510" text-anchor="middle" fill="${warna}" font-family="system-ui" font-size="14" font-weight="bold">
          T✓
        </text>
      </svg>
    `

    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
  }

  const downloadSertifikat = (sertifikat, nama) => {
    const dataURL = generateSVG(sertifikat, nama)
    const link = document.createElement('a')
    link.href = dataURL
    link.download = `sertifikat-${sertifikat.id}-${Date.now()}.svg`
    link.click()
  }

  const resetSertifikat = () => {
    storage.remove('sertifikat')
    setSertifikatDiperoleh([])
  }

  return {
    semuaSertifikat: sertifikatData.sertifikat,
    sertifikatDiperoleh,
    totalDiperoleh,
    totalSertifikat,
    isDiperoleh,
    cekSertifikat,
    downloadSertifikat,
    resetSertifikat,
    refresh: load,
  }
}