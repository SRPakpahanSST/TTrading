export const sahamList = [
  // Perbankan
  { kode: 'BBCA', nama: 'Bank Central Asia', sektor: 'Perbankan', harga: 9500, per: 22.5, pbv: 4.5, roe: 20.1, dividen: 2.1 },
  { kode: 'BBRI', nama: 'Bank Rakyat Indonesia', sektor: 'Perbankan', harga: 4200, per: 8.2, pbv: 1.8, roe: 18.5, dividen: 7.2 },
  { kode: 'BMRI', nama: 'Bank Mandiri', sektor: 'Perbankan', harga: 6100, per: 9.5, pbv: 2.0, roe: 19.2, dividen: 6.5 },
  { kode: 'BBNI', nama: 'Bank Negara Indonesia', sektor: 'Perbankan', harga: 4800, per: 7.8, pbv: 1.3, roe: 15.4, dividen: 5.8 },
  { kode: 'BRIS', nama: 'Bank Syariah Indonesia', sektor: 'Perbankan Syariah', harga: 1800, per: 14.2, pbv: 2.1, roe: 15.8, dividen: 1.8 },

  // Telekomunikasi
  { kode: 'TLKM', nama: 'Telkom Indonesia', sektor: 'Telekomunikasi', harga: 2800, per: 12.5, pbv: 2.3, roe: 17.5, dividen: 6.8 },
  { kode: 'EXCL', nama: 'XL Axiata', sektor: 'Telekomunikasi', harga: 2300, per: 15.2, pbv: 1.1, roe: 7.2, dividen: 3.5 },
  { kode: 'ISAT', nama: 'Indosat Ooredoo', sektor: 'Telekomunikasi', harga: 10500, per: 18.5, pbv: 2.5, roe: 13.2, dividen: 4.1 },

  // Konsumer
  { kode: 'ICBP', nama: 'Indofood CBP', sektor: 'Konsumer', harga: 11000, per: 14.5, pbv: 3.2, roe: 22.5, dividen: 3.2 },
  { kode: 'INDF', nama: 'Indofood Sukses', sektor: 'Konsumer', harga: 6800, per: 6.5, pbv: 0.9, roe: 13.8, dividen: 5.5 },
  { kode: 'UNVR', nama: 'Unilever Indonesia', sektor: 'Konsumer', harga: 2500, per: 18.2, pbv: 25.5, roe: 85.2, dividen: 4.8 },
  { kode: 'MYOR', nama: 'Mayora Indah', sektor: 'Konsumer', harga: 2400, per: 15.8, pbv: 2.8, roe: 17.5, dividen: 2.5 },

  // Tambang & Energi
  { kode: 'PTBA', nama: 'Bukit Asam', sektor: 'Tambang', harga: 2700, per: 5.2, pbv: 1.5, roe: 28.5, dividen: 12.5 },
  { kode: 'ADRO', nama: 'Adaro Energy', sektor: 'Tambang', harga: 2400, per: 4.8, pbv: 0.8, roe: 16.5, dividen: 8.2 },
  { kode: 'ANTM', nama: 'Aneka Tambang', sektor: 'Tambang', harga: 1500, per: 12.5, pbv: 1.2, roe: 9.5, dividen: 2.2 },
  { kode: 'PGAS', nama: 'Perusahaan Gas Negara', sektor: 'Energi', harga: 1600, per: 5.5, pbv: 0.7, roe: 12.5, dividen: 7.5 },

  // Infrastruktur
  { kode: 'JSMR', nama: 'Jasa Marga', sektor: 'Infrastruktur', harga: 4500, per: 8.2, pbv: 1.1, roe: 13.5, dividen: 4.2 },
  { kode: 'WIKA', nama: 'Wijaya Karya', sektor: 'Infrastruktur', harga: 500, per: 15.5, pbv: 0.4, roe: 2.5, dividen: 1.5 },
  { kode: 'WSKT', nama: 'Waskita Karya', sektor: 'Infrastruktur', harga: 300, per: 8.5, pbv: 0.2, roe: 2.1, dividen: 0 },

  // Otomotif
  { kode: 'ASII', nama: 'Astra International', sektor: 'Otomotif', harga: 5000, per: 6.5, pbv: 1.1, roe: 17.2, dividen: 6.8 },
  { kode: 'AUTO', nama: 'Astra Otoparts', sektor: 'Otomotif', harga: 2000, per: 5.5, pbv: 0.8, roe: 14.5, dividen: 8.5 },

  // Properti
  { kode: 'BSDE', nama: 'Bumi Serpong Damai', sektor: 'Properti', harga: 1000, per: 5.5, pbv: 0.5, roe: 9.5, dividen: 2.5 },
  { kode: 'CTRA', nama: 'Ciputra Development', sektor: 'Properti', harga: 900, per: 8.2, pbv: 0.8, roe: 10.2, dividen: 3.2 },
]

export const getSahamByKode = (kode) => sahamList.find((s) => s.kode === kode)
