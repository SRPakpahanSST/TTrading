export const dummyOrderFlow = {
  BRIS: {
    '09:00-09:10': { totalBeli: 150000, totalJual: 120000, bid: [{ harga: 1800, lot: 500 }, { harga: 1790, lot: 800 }], offer: [{ harga: 1810, lot: 400 }, { harga: 1820, lot: 600 }] },
    '15:50-16:10': { totalBeli: 80000, totalJual: 110000, bid: [{ harga: 1795, lot: 300 }, { harga: 1785, lot: 700 }], offer: [{ harga: 1805, lot: 800 }, { harga: 1815, lot: 1000 }] },
  },
  TLKM: {
    '09:00-09:10': { totalBeli: 300000, totalJual: 250000, bid: [{ harga: 2800, lot: 1000 }, { harga: 2790, lot: 1500 }], offer: [{ harga: 2810, lot: 800 }, { harga: 2820, lot: 1200 }] },
    '15:50-16:10': { totalBeli: 200000, totalJual: 280000, bid: [{ harga: 2795, lot: 500 }, { harga: 2785, lot: 900 }], offer: [{ harga: 2805, lot: 1100 }, { harga: 2815, lot: 1400 }] },
  },
  BBRI: {
    '09:00-09:10': { totalBeli: 500000, totalJual: 450000, bid: [{ harga: 4200, lot: 2000 }, { harga: 4190, lot: 2500 }], offer: [{ harga: 4210, lot: 1800 }, { harga: 4220, lot: 2200 }] },
    '15:50-16:10': { totalBeli: 350000, totalJual: 400000, bid: [{ harga: 4195, lot: 1500 }, { harga: 4185, lot: 2000 }], offer: [{ harga: 4205, lot: 1900 }, { harga: 4215, lot: 2300 }] },
  },
  // Anda bisa menambahkan saham lain di sini (BMRI, ANTM, dll.)
  DEFAULT: {
    '09:00-09:10': { totalBeli: 100000, totalJual: 100000, bid: [{ harga: 1000, lot: 100 }], offer: [{ harga: 1010, lot: 100 }] },
    '15:50-16:10': { totalBeli: 100000, totalJual: 100000, bid: [{ harga: 1000, lot: 100 }], offer: [{ harga: 1010, lot: 100 }] },
  }
}