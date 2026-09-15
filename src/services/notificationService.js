export const notificationService = {
  requestPermission: async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  },

  kirim: (judul, pesan) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(judul, {
        body: pesan,
        icon: '/icon-192.png',
      })
    }
  },

  jadwalkanPengingat: () => {
    const jadwal = [
      { jam: 7, pesan: 'Tarik napas. Hati tenang. Hari ini trading dengan bijak.' },
      { jam: 9, pesan: 'Sabar menunggu. Jangan FOMO.' },
      { jam: 12, pesan: 'Evaluasi posisi. Jangan serakah.' },
      { jam: 15, pesan: 'Ambil keputusan. Disiplin!' },
      { jam: 16, pesan: 'Refleksi. Sisihkan 2% profit untuk amal.' },
      { jam: 21, pesan: 'Tutup laptop. Istirahat. Besok hari baru.' },
    ]

    return jadwal
  },
}