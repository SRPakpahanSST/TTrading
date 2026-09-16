// Helper untuk membuat gambar shareable dari data teks
export const generateShareText = (data) => {
  const { judul, baris } = data
  return `🌱 *${judul}*\n\n${baris.join('\n')}\n\n_Cuan Berkah, Dampak Nyata_\n— T Trading`
}

export const shareKeWhatsApp = (teks) => {
  const url = `https://wa.me/?text=${encodeURIComponent(teks)}`
  window.open(url, '_blank')
}

export const shareKeTelegram = (teks) => {
  const url = `https://t.me/share/url?url=${encodeURIComponent('https://srpakpahansst.github.io/TTrading/')}&text=${encodeURIComponent(teks)}`
  window.open(url, '_blank')
}

export const copyKeClipboard = async (teks) => {
  try {
    await navigator.clipboard.writeText(teks)
    return true
  } catch {
    return false
  }
}

export const downloadGambar = (dataURL, namaFile) => {
  const link = document.createElement('a')
  link.href = dataURL
  link.download = namaFile
  link.click()
}

// Generate SVG sederhana untuk portofolio (bisa di-download)
export const generatePortfolioSVG = (portfolio) => {
  const { totalAset, modalAwal, profitLoss, profitLossPersen, tanggal } = portfolio
  const isProfit = profitLoss >= 0

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill="url(#grad)" rx="24" />

      <text x="30" y="50" fill="#fbbf24" font-family="system-ui" font-size="24" font-weight="bold">
        🌱 T Trading
      </text>
      <text x="30" y="75" fill="#94a3b8" font-family="system-ui" font-size="12">
        Cuan Berkah, Dampak Nyata
      </text>

      <text x="30" y="130" fill="#94a3b8" font-family="system-ui" font-size="14">
        TOTAL ASET
      </text>
      <text x="30" y="170" fill="#ffffff" font-family="system-ui" font-size="36" font-weight="bold">
        ${formatRupiah(totalAset)}
      </text>

      <line x1="30" y1="200" x2="570" y2="200" stroke="#334155" stroke-width="1" />

      <text x="30" y="235" fill="#94a3b8" font-family="system-ui" font-size="14">
        MODAL AWAL
      </text>
      <text x="30" y="265" fill="#e2e8f0" font-family="system-ui" font-size="20" font-weight="bold">
        ${formatRupiah(modalAwal)}
      </text>

      <text x="320" y="235" fill="#94a3b8" font-family="system-ui" font-size="14">
        PROFIT/LOSS
      </text>
      <text x="320" y="265" fill="${isProfit ? '#22c55e' : '#ef4444'}" font-family="system-ui" font-size="20" font-weight="bold">
        ${formatRupiah(profitLoss)} (${profitLossPersen}%)
      </text>

      <line x1="30" y1="295" x2="570" y2="295" stroke="#334155" stroke-width="1" />

      <text x="30" y="335" fill="#64748b" font-family="system-ui" font-size="12">
        📅 ${tanggal || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
      </text>
      <text x="30" y="360" fill="#64748b" font-family="system-ui" font-size="12">
        🎯 Hati adalah grafik Candlestick terbesar
      </text>

      <circle cx="540" cy="60" r="30" fill="url(#accent)" opacity="0.2" />
      <text x="525" y="68" font-size="24">💎</text>
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}