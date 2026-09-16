export const kalenderEkonomi = [
  // September 2026
  { tanggal: '2026-09-17', jam: '14:00', judul: 'Rapat BI: Suku Bunga', kategori: 'Suku Bunga', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-09-18', jam: '10:00', judul: 'Cadangan Devisa Indonesia', kategori: 'Data Ekonomi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-09-19', jam: '20:00', judul: 'Fed Rate Decision', kategori: 'Suku Bunga', dampak: 'tinggi', negara: 'US' },
  { tanggal: '2026-09-22', jam: '11:00', judul: 'Neraca Perdagangan Indonesia', kategori: 'Data Ekonomi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-09-25', jam: '09:00', judul: 'Inflasi Indonesia (YoY)', kategori: 'Inflasi', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-09-28', jam: '15:00', judul: 'Laporan Keuangan BBCA Q3', kategori: 'Laporan Keuangan', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-09-30', jam: '15:00', judul: 'Laporan Keuangan BBRI Q3', kategori: 'Laporan Keuangan', dampak: 'tinggi', negara: 'ID' },

  // Oktober 2026
  { tanggal: '2026-10-01', jam: '09:00', judul: 'Inflasi Indonesia (MoM)', kategori: 'Inflasi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-10-03', jam: '10:00', judul: 'Data Tenaga Kerja AS', kategori: 'Data Ekonomi', dampak: 'tinggi', negara: 'US' },
  { tanggal: '2026-10-05', jam: '14:00', judul: 'Rapat BI: Suku Bunga', kategori: 'Suku Bunga', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-10-08', jam: '15:00', judul: 'Laporan Keuangan TLKM Q3', kategori: 'Laporan Keuangan', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-10-10', jam: '09:00', judul: 'Indeks Kepercayaan Konsumen', kategori: 'Data Ekonomi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-10-15', jam: '15:00', judul: 'Laporan Keuangan BMRI Q3', kategori: 'Laporan Keuangan', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-10-20', jam: '10:00', judul: 'Cadangan Devisa', kategori: 'Data Ekonomi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-10-25', jam: '09:00', judul: 'Inflasi Indonesia (YoY)', kategori: 'Inflasi', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-10-28', jam: '15:00', judul: 'Laporan Keuangan BRIS Q3', kategori: 'Laporan Keuangan', dampak: 'tinggi', negara: 'ID' },

  // November 2026
  { tanggal: '2026-11-01', jam: '09:00', judul: 'Inflasi Indonesia (MoM)', kategori: 'Inflasi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-11-05', jam: '14:00', judul: 'Rapat BI: Suku Bunga', kategori: 'Suku Bunga', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-11-07', jam: '20:00', judul: 'Fed Rate Decision', kategori: 'Suku Bunga', dampak: 'tinggi', negara: 'US' },
  { tanggal: '2026-11-10', jam: '09:00', judul: 'Data Tenaga Kerja Indonesia', kategori: 'Data Ekonomi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-11-15', jam: '10:00', judul: 'Cadangan Devisa', kategori: 'Data Ekonomi', dampak: 'sedang', negara: 'ID' },
  { tanggal: '2026-11-20', jam: '15:00', judul: 'Laporan Keuangan ASII Q3', kategori: 'Laporan Keuangan', dampak: 'tinggi', negara: 'ID' },
  { tanggal: '2026-11-25', jam: '09:00', judul: 'Inflasi Indonesia (YoY)', kategori: 'Inflasi', dampak: 'tinggi', negara: 'ID' },
]

export const kategoriWarna = {
  'Suku Bunga': 'red',
  'Inflasi': 'orange',
  'Data Ekonomi': 'blue',
  'Laporan Keuangan': 'purple',
}

export const getKalenderBulanIni = () => {
  const now = new Date()
  const bulan = now.getMonth() + 1
  const tahun = now.getFullYear()
  return kalenderEkonomi.filter((k) => {
    const d = new Date(k.tanggal)
    return d.getMonth() + 1 === bulan && d.getFullYear() === tahun
  })
}

export const getKalenderMendatang = (hariKeDepan = 30) => {
  const now = new Date()
  const limit = new Date(Date.now() + hariKeDepan * 86400000)
  return kalenderEkonomi
    .filter((k) => {
      const d = new Date(k.tanggal)
      return d >= now && d <= limit
    })
    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
}