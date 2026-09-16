import { useState } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'
import {
  generateShareText,
  shareKeWhatsApp,
  shareKeTelegram,
  copyKeClipboard,
  downloadGambar,
  generatePortfolioSVG,
} from '../utils/generateImage'

export function useShare() {
  const [copied, setCopied] = useState(false)

  const getPortfolioData = () => {
    const portfolio = storage.get(STORAGE_KEYS.PORTFOLIO, {
      totalAset: 0,
      modalAwal: 0,
      profitLoss: 0,
      riwayat: [],
    })
    const persen =
      portfolio.modalAwal > 0
        ? ((portfolio.profitLoss / portfolio.modalAwal) * 100).toFixed(2)
        : 0

    return {
      ...portfolio,
      profitLossPersen: persen,
      tanggal: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }
  }

  const getAmalData = () => {
    const amal = storage.get(STORAGE_KEYS.AMAL, [])
    const total = amal.reduce((sum, a) => sum + (a.jumlah || 0), 0)
    const jumlah = amal.length
    const penerimaUnik = new Set(amal.map((a) => a.penerima)).size

    return { total, jumlah, penerimaUnik, riwayat: amal.slice(0, 5) }
  }

  const bagikanPortofolio = (platform = 'whatsapp') => {
    const portfolio = getPortfolioData()
    const formatRupiah = (angka) =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(angka || 0)

    const teks = generateShareText({
      judul: '📊 Portofolio Saya',
      baris: [
        `💰 Total Aset: ${formatRupiah(portfolio.totalAset)}`,
        `💵 Modal Awal: ${formatRupiah(portfolio.modalAwal)}`,
        `📈 P/L: ${formatRupiah(portfolio.profitLoss)} (${portfolio.profitLossPersen}%)`,
        `📅 ${portfolio.tanggal}`,
      ],
    })

    if (platform === 'whatsapp') shareKeWhatsApp(teks)
    else if (platform === 'telegram') shareKeTelegram(teks)
    else copyKeClipboard(teks).then((ok) => setCopied(ok))

    return teks
  }

  const bagikanAmal = (platform = 'whatsapp') => {
    const amal = getAmalData()
    const formatRupiah = (angka) =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(angka || 0)

    const teks = generateShareText({
      judul: '🤝 Laporan Amal Saya',
      baris: [
        `💝 Total Amal: ${formatRupiah(amal.total)}`,
        `📊 Jumlah Donasi: ${amal.jumlah}x`,
        `🏢 Penerima: ${amal.penerimaUnik} lembaga`,
        `📅 ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      ],
    })

    if (platform === 'whatsapp') shareKeWhatsApp(teks)
    else if (platform === 'telegram') shareKeTelegram(teks)
    else copyKeClipboard(teks).then((ok) => setCopied(ok))

    return teks
  }

  const downloadPortofolioImage = () => {
    const portfolio = getPortfolioData()
    const svg = generatePortfolioSVG(portfolio)
    downloadGambar(svg, `portofolio-${Date.now()}.svg`)
  }

  const copyText = async (teks) => {
    const ok = await copyKeClipboard(teks)
    setCopied(ok)
    return ok
  }

  return {
    getPortfolioData,
    getAmalData,
    bagikanPortofolio,
    bagikanAmal,
    downloadPortofolioImage,
    copyText,
    copied,
  }
}