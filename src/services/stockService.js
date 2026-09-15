import { fetchAPI } from './api'

export const stockService = {
  getHarga: async (kodeSaham) => {
    // Simulasi (nanti ganti dengan API real)
    return {
      kode: kodeSaham,
      harga: Math.floor(Math.random() * 2000) + 500,
      perubahan: (Math.random() * 10 - 5).toFixed(2),
    }
  },

  getHistoris: async (kodeSaham, periode = '1mo') => {
    // Simulasi data historis
    const data = []
    for (let i = 0; i < 30; i++) {
      data.push({
        tanggal: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        harga: Math.floor(Math.random() * 2000) + 500,
      })
    }
    return data.reverse()
  },

  getAliranAsing: async (kodeSaham) => {
    // Simulasi aliran dana asing
    return [
      { tanggal: '15 Sep', nilai: 1220000000000, arah: 'masuk' },
      { tanggal: '14 Sep', nilai: -450000000000, arah: 'keluar' },
      { tanggal: '13 Sep', nilai: 780000000000, arah: 'masuk' },
    ]
  },
}