export const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka)
}

export const formatPersen = (angka) => {
  return `${angka.toFixed(2)}%`
}

export const formatTanggal = (tanggal) => {
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const formatWaktu = (tanggal) => {
  return new Date(tanggal).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}