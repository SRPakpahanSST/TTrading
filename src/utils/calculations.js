export const hitungLot = (modal, hargaSaham) => {
  return Math.floor(modal / (hargaSaham * 100))
}

export const hitungStopLoss = (hargaBeli, riskPersen) => {
  return hargaBeli - (hargaBeli * (riskPersen / 100))
}

export const hitungTakeProfit = (hargaBeli, profitPersen) => {
  return hargaBeli + (hargaBeli * (profitPersen / 100))
}

export const hitungAmal = (profit, persen = 2) => {
  return profit > 0 ? profit * (persen / 100) : 0
}

export const hitungBiayaTransaksi = (nilaiTransaksi, tipe = 'beli') => {
  const biaya = tipe === 'beli' ? 0.0015 : 0.0025
  return nilaiTransaksi * biaya
}