export const doaPagi = [
  // Doa & Niat
  {
    kategori: 'Doa',
    judul: 'Niat Pagi',
    teks: 'Ya Allah, aku niatkan hari ini untuk mencari rezeki yang halal dan berkah. Lindungi aku dari keserakahan dan beri aku kesabaran.',
  },
  {
    kategori: 'Doa',
    judul: 'Doa Rezeki',
    teks: 'Ya Allah, bukakan pintu rezeki yang halal untukku, keluarga, dan komunitas PMD Impact Invest. Berkahilah setiap usaha kami.',
  },
  {
    kategori: 'Doa',
    judul: 'Doa Ketengan',
    teks: 'Ya Allah, tenangkan hatiku dalam menghadapi naik turun pasar. Jangan biarkan emosi mengalahkan akal sehatku.',
  },

  // Mantra Raja Makro
  {
    kategori: 'Mantra',
    pilar: 'Raja Makro',
    judul: 'Kesabaran',
    teks: 'Sabar menunggu, cepat bertindak. Peluang terbaik datang kepada yang tenang.',
  },
  {
    kategori: 'Mantra',
    pilar: 'Raja Makro',
    judul: 'Penantian',
    teks: 'Tidak trading juga sebuah keputusan. Diam adalah strategi.',
  },

  // Mantra Pembunuh Jangka Pendek
  {
    kategori: 'Mantra',
    pilar: 'Pembunuh Jangka Pendek',
    judul: 'Keberanian',
    teks: 'Sinyal jelas, berani entry! Ragu sedikit, peluang hilang banyak.',
  },
  {
    kategori: 'Mantra',
    pilar: 'Pembunuh Jangka Pendek',
    judul: 'Momentum',
    teks: 'Momentum adalah teman terbaik trader. Ikuti, jangan lawan.',
  },

  // Mantra Sentuhan Emas
  {
    kategori: 'Mantra',
    pilar: 'Sentuhan Emas',
    judul: 'Disiplin',
    teks: 'Di atas garis adalah Raja, di bawah adalah bandit. Disiplin mengalahkan analisis.',
  },
  {
    kategori: 'Mantra',
    pilar: 'Sentuhan Emas',
    judul: 'Stop Loss',
    teks: 'Stop loss adalah sahabat sejati trader. Cut loss, jangan berharap.',
  },

  // Mantra Dewa Fundamental
  {
    kategori: 'Mantra',
    pilar: 'Dewa Fundamental',
    judul: 'Hati',
    teks: 'Hati adalah grafik Candlestick terbesar. Kalau hati kacau, pasar sejelas apa pun akan sia-sia.',
  },
  {
    kategori: 'Mantra',
    pilar: 'Dewa Fundamental',
    judul: 'Amal',
    teks: 'Sisihkan 2% profit untuk amal. Berbagi tidak mengurangi rezeki, justru menambah.',
  },
  {
    kategori: 'Mantra',
    pilar: 'Dewa Fundamental',
    judul: 'Syukur',
    teks: 'Kaya bukan tujuan, berkah adalah tujuan. Syukuri apa yang ada hari ini.',
  },
]

export const getDoaHariIni = () => {
  const today = new Date()
  const startOfYear = new Date(today.getFullYear(), 0, 0)
  const diff = today - startOfYear
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const index = dayOfYear % doaPagi.length
  return doaPagi[index]
}

export const getDoaByKategori = (kategori) =>
  doaPagi.filter((d) => d.kategori === kategori)

export const getMantraByPilar = (pilar) =>
  doaPagi.filter((d) => d.kategori === 'Mantra' && d.pilar === pilar)

export const getKategoriDoa = () => {
  const set = new Set(doaPagi.map((d) => d.kategori))
  return Array.from(set)
}

export const getPilarList = () => {
  const set = new Set(doaPagi.filter((d) => d.pilar).map((d) => d.pilar))
  return Array.from(set)
}