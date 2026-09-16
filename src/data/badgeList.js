export const badgeList = [
  // === STREAK ===
  { id: 'streak_3', nama: 'Pemula Disiplin', icon: '🌱', deskripsi: '3 hari berturut-turut isi jurnal', kategori: 'Streak', syarat: { type: 'streak', value: 3 } },
  { id: 'streak_7', nama: 'Seminggu Penuh', icon: '🔥', deskripsi: '7 hari berturut-turut isi jurnal', kategori: 'Streak', syarat: { type: 'streak', value: 7 } },
  { id: 'streak_14', nama: 'Dua Minggu Konsisten', icon: '⭐', deskripsi: '14 hari berturut-turut isi jurnal', kategori: 'Streak', syarat: { type: 'streak', value: 14 } },
  { id: 'streak_30', nama: 'Sebulan Disiplin', icon: '🏆', deskripsi: '30 hari berturut-turut isi jurnal', kategori: 'Streak', syarat: { type: 'streak', value: 30 } },
  { id: 'streak_100', nama: 'Seratus Hari Master', icon: '💎', deskripsi: '100 hari berturut-turut isi jurnal', kategori: 'Streak', syarat: { type: 'streak', value: 100 } },

  // === JURNAL ===
  { id: 'jurnal_1', nama: 'Jurnal Pertama', icon: '📓', deskripsi: 'Menulis jurnal pertama', kategori: 'Jurnal', syarat: { type: 'jurnal', value: 1 } },
  { id: 'jurnal_10', nama: 'Rajin Menulis', icon: '✍️', deskripsi: 'Menulis 10 jurnal', kategori: 'Jurnal', syarat: { type: 'jurnal', value: 10 } },
  { id: 'jurnal_50', nama: 'Penulis Produktif', icon: '📚', deskripsi: 'Menulis 50 jurnal', kategori: 'Jurnal', syarat: { type: 'jurnal', value: 50 } },
  { id: 'jurnal_100', nama: 'Buku Harian Trader', icon: '📖', deskripsi: 'Menulis 100 jurnal', kategori: 'Jurnal', syarat: { type: 'jurnal', value: 100 } },

  // === AMAL ===
  { id: 'amal_1', nama: 'Amal Pertama', icon: '🤝', deskripsi: 'Donasi pertama', kategori: 'Amal', syarat: { type: 'amal', value: 1 } },
  { id: 'amal_10', nama: 'Dermawan Muda', icon: '💝', deskripsi: '10x donasi', kategori: 'Amal', syarat: { type: 'amal', value: 10 } },
  { id: 'amal_50', nama: 'Jiwa Sosial', icon: '❤️', deskripsi: '50x donasi', kategori: 'Amal', syarat: { type: 'amal', value: 50 } },
  { id: 'amal_100rb', nama: 'Seratus Ribu Berkah', icon: '💰', deskripsi: 'Total amal Rp100.000', kategori: 'Amal', syarat: { type: 'amalAmount', value: 100000 } },
  { id: 'amal_1jt', nama: 'Jutaan Berkah', icon: '💎', deskripsi: 'Total amal Rp1.000.000', kategori: 'Amal', syarat: { type: 'amalAmount', value: 1000000 } },

  // === WATCHLIST ===
  { id: 'watchlist_1', nama: 'Pantau Pertama', icon: '👀', deskripsi: 'Saham pertama di watchlist', kategori: 'Watchlist', syarat: { type: 'watchlist', value: 1 } },
  { id: 'watchlist_5', nama: 'Pengamat Aktif', icon: '🔍', deskripsi: '5 saham di watchlist', kategori: 'Watchlist', syarat: { type: 'watchlist', value: 5 } },
  { id: 'watchlist_10', nama: 'Kolektor Saham', icon: '📋', deskripsi: '10 saham di watchlist', kategori: 'Watchlist', syarat: { type: 'watchlist', value: 10 } },

  // === SIMULASI ===
  { id: 'simulasi_1', nama: 'Simulasi Pertama', icon: '🎮', deskripsi: 'Transaksi simulasi pertama', kategori: 'Simulasi', syarat: { type: 'simulasi', value: 1 } },
  { id: 'simulasi_10', nama: 'Trader Latihan', icon: '🎯', deskripsi: '10x transaksi simulasi', kategori: 'Simulasi', syarat: { type: 'simulasi', value: 10 } },
  { id: 'simulasi_50', nama: 'Master Simulasi', icon: '🏅', deskripsi: '50x transaksi simulasi', kategori: 'Simulasi', syarat: { type: 'simulasi', value: 50 } },

  // === PILAR ===
  { id: 'pilar_30', nama: 'Pilar Kokoh', icon: '🏛️', deskripsi: 'Skor 4 pilar ≥ 30', kategori: 'Pilar', syarat: { type: 'pilar', value: 30 } },
  { id: 'pilar_35', nama: 'Pilar Sempurna', icon: '🏰', deskripsi: 'Skor 4 pilar ≥ 35', kategori: 'Pilar', syarat: { type: 'pilar', value: 35 } },
  { id: 'pilar_40', nama: 'Pilar Legendaris', icon: '👑', deskripsi: 'Skor 4 pilar = 40 (sempurna)', kategori: 'Pilar', syarat: { type: 'pilar', value: 40 } },

  // === PROFIT ===
  { id: 'profit_pertama', nama: 'Profit Pertama', icon: '🎉', deskripsi: 'Profit pertama dari jurnal', kategori: 'Profit', syarat: { type: 'profit', value: 1 } },
  { id: 'profit_10', nama: '10x Profit', icon: '💰', deskripsi: '10x profit dari jurnal', kategori: 'Profit', syarat: { type: 'profit', value: 10 } },
]

export const getBadgeById = (id) => badgeList.find((b) => b.id === id)

export const getBadgesByKategori = (kategori) =>
  badgeList.filter((b) => b.kategori === kategori)

export const getKategoriList = () => {
  const set = new Set(badgeList.map((b) => b.kategori))
  return Array.from(set)
}