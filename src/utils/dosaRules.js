export const deteksiDosa = (data) => {
  const dosa = []

  // Keserakahan: profit > target tapi tidak jual
  if (data.profitPersen > data.targetProfit && !data.sudahJual) {
    dosa.push({
      nama: 'Keserakahan',
      status: 'waspada',
      pesan: 'Profit sudah melebihi target. Jangan serakah.',
    })
  }

  // Ketakutan: harga turun wajar, ingin cut loss
  if (data.hargaTurun && data.diAtasBullBear) {
    dosa.push({
      nama: 'Ketakutan',
      status: 'aman',
      pesan: 'Harga masih di atas Bull-Bear. Tenang.',
    })
  }

  // Keraguan: sinyal muncul, tidak entry
  if (data.sinyalMuncul && !data.sudahEntry) {
    dosa.push({
      nama: 'Keraguan',
      status: 'bahaya',
      pesan: 'Sinyal jelas. Berani entry!',
    })
  }

  return dosa
}