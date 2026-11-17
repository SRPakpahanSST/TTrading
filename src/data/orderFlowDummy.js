export const dummyOrderFlow = {
  "BRIS": {
    "09:00-09:10": {
      totalBeli: 150000, // Lembar
      totalJual: 120000,
      bid: [
        { harga: 1800, lot: 500 }, { harga: 1790, lot: 800 }, { harga: 1780, lot: 1200 },
      ],
      offer: [
        { harga: 1810, lot: 400 }, { harga: 1820, lot: 600 }, { harga: 1830, lot: 900 },
      ]
    },
    "15:50-16:10": {
      totalBeli: 80000,
      totalJual: 110000,
      bid: [
        { harga: 1795, lot: 300 }, { harga: 1785, lot: 700 }, { harga: 1775, lot: 1000 },
      ],
      offer: [
        { harga: 1805, lot: 800 }, { harga: 1815, lot: 1000 }, { harga: 1825, lot: 1500 },
      ]
    }
  },
  "TLKM": {
    // ... buat dummy serupa untuk TLKM
  }
}