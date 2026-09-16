export const mantraList = [
  // 🧘 Raja Makro — Kesabaran
  { teks: 'Sabar menunggu, cepat bertindak.', pilar: 'rajaMakro' },
  { teks: 'Pasar selalu benar, aku hanya perlu mengikutinya.', pilar: 'rajaMakro' },
  { teks: 'Peluang terbaik datang kepada yang sabar.', pilar: 'rajaMakro' },
  { teks: 'Tidak trading juga sebuah keputusan.', pilar: 'rajaMakro' },
  { teks: 'Tunggu angin datang, baru terbang bersama.', pilar: 'rajaMakro' },

  // 🐺 Pembunuh Jangka Pendek — Keberanian
  { teks: 'Sinyal jelas, berani entry!', pilar: 'pembunuh' },
  { teks: 'Menari dengan serigala, harus lebih galak.', pilar: 'pembunuh' },
  { teks: 'Momentum adalah teman terbaik trader.', pilar: 'pembunuh' },
  { teks: 'Ragu sedikit, peluang hilang banyak.', pilar: 'pembunuh' },

  // ✨ Sentuhan Emas — Disiplin
  { teks: 'Di atas garis adalah Raja, di bawah adalah bandit.', pilar: 'sentuhanEmas' },
  { teks: 'Cut loss, jangan berharap.', pilar: 'sentuhanEmas' },
  { teks: 'Disiplin mengalahkan analisis.', pilar: 'sentuhanEmas' },
  { teks: 'Ambil untungmu, jangan serakah.', pilar: 'sentuhanEmas' },
  { teks: 'Stop loss adalah sahabat sejati trader.', pilar: 'sentuhanEmas' },

  // 💎 Dewa Fundamental — Hati & Amal
  { teks: 'Hati adalah grafik Candlestick terbesar.', pilar: 'dewaFundamental' },
  { teks: 'Cuan berkah, dampak nyata.', pilar: 'dewaFundamental' },
  { teks: 'Sisihkan 2% profit untuk amal.', pilar: 'dewaFundamental' },
  { teks: 'Kaya bukan tujuan, berkah adalah tujuan.', pilar: 'dewaFundamental' },
  { teks: 'Berbagi tidak mengurangi rezeki, justru menambah.', pilar: 'dewaFundamental' },
  { teks: 'Hati tenang, tangan cepat.', pilar: 'dewaFundamental' },
]

export const getMantraHariIni = () => {
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const diff = today - startOfYear
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const index = dayOfYear % mantraList.length
  return mantraList[index]
}