export default function NotificationBanner() {
  const jam = new Date().getHours()
  let notif = null

  if (jam >= 6 && jam < 9) {
    notif = { icon: '🌅', pesan: 'Selamat pagi! Siapkan watchlist hari ini.', warna: 'amber' }
  } else if (jam >= 9 && jam < 12) {
    notif = { icon: '📊', pesan: 'Sesi I sedang berjalan. Sabar menunggu sinyal.', warna: 'blue' }
  } else if (jam >= 12 && jam < 14) {
    notif = { icon: '☕', pesan: 'Waktu istirahat. Evaluasi posisi Anda.', warna: 'green' }
  } else if (jam >= 14 && jam < 16) {
    notif = { icon: '⚡', pesan: 'Sesi II. Disiplin pada target & stop loss.', warna: 'purple' }
  } else {
    notif = { icon: '🌙', pesan: 'Bursa tutup. Saatnya refleksi & jurnal.', warna: 'slate' }
  }

  const warnaMap = {
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    slate: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${warnaMap[notif.warna]}`}>
      <span className="text-2xl">{notif.icon}</span>
      <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">{notif.pesan}</p>
    </div>
  )
}