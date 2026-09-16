import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useStreak } from '../../hooks/useStreak'

export default function Streak() {
  const { streak, reset } = useStreak()

  const today = new Date().toISOString().split('T')[0]
  const sudahCheckIn = streak.lastDate === today

  const badgeList = [
    { min: 3, nama: 'Pemula Disiplin', icon: '🌱', warna: 'green' },
    { min: 7, nama: 'Seminggu Penuh', icon: '🔥', warna: 'orange' },
    { min: 14, nama: 'Dua Minggu Konsisten', icon: '⭐', warna: 'yellow' },
    { min: 30, nama: 'Sebulan Disiplin', icon: '🏆', warna: 'amber' },
    { min: 60, nama: 'Dua Bulan Legendaris', icon: '👑', warna: 'purple' },
    { min: 100, nama: 'Seratus Hari Master', icon: '💎', warna: 'blue' },
  ]

  const earnedBadges = badgeList.filter((b) => streak.longest >= b.min)
  const nextBadge = badgeList.find((b) => streak.longest < b.min)

  const progressToNext = nextBadge
    ? Math.min((streak.longest / nextBadge.min) * 100, 100)
    : 100

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🔥 Streak Harian
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Bangun kebiasaan disiplin setiap hari.
        </p>
      </div>

      {/* STREAK UTAMA */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-700">
        <div className="text-center py-6">
          <span className="text-6xl">🔥</span>
          <p className="text-6xl font-bold text-orange-500 mt-4">
            {streak.current}
          </p>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            hari berturut-turut
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">Terpanjang</p>
              <p className="font-bold text-slate-800 dark:text-white text-lg">
                {streak.longest} hari
              </p>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-600"></div>
            <div>
              <p className="text-slate-500 dark:text-slate-400">Status</p>
              <p className="font-bold text-lg">
                {sudahCheckIn ? (
                  <span className="text-green-600">✅ Sudah hari ini</span>
                ) : (
                  <span className="text-orange-500">⏳ Belum hari ini</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* PROGRESS BADGE BERIKUTNYA */}
      {nextBadge && (
        <Card title="🎯 Badge Berikutnya" icon="">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{nextBadge.icon}</span>
            <div>
              <p className="font-bold text-slate-800 dark:text-white">
                {nextBadge.nama}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {nextBadge.min} hari berturut-turut
              </p>
            </div>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressToNext}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
            {streak.longest}/{nextBadge.min} hari ({Math.round(progressToNext)}%)
          </p>
        </Card>
      )}

      {/* BADGE YANG DIDAPAT */}
      <Card title="🏅 Badge Diperoleh" icon="">
        {earnedBadges.length === 0 ? (
          <p className="text-center text-slate-400 py-6">
            Belum ada badge. Mulai isi jurnal setiap hari!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {earnedBadges.map((b, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-4 bg-amber-50 dark:bg-slate-700 rounded-xl"
              >
                <span className="text-4xl mb-2">{b.icon}</span>
                <p className="text-xs font-bold text-slate-800 dark:text-white text-center">
                  {b.nama}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {b.min} hari
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* RIWAYAT 30 HARI */}
      <Card title="📅 30 Hari Terakhir" icon="">
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: 30 }).map((_, i) => {
            const date = new Date(Date.now() - (29 - i) * 86400000)
            const dateStr = date.toISOString().split('T')[0]
            const checkIn = (streak.history || []).includes(dateStr)
            return (
              <div
                key={i}
                className={`aspect-square rounded ${checkIn ? 'bg-orange-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                title={dateStr}
              />
            )
          })}
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">
          Kotak oranye = hari Anda check-in
        </p>
      </Card>

      <Button variant="secondary" onClick={reset} className="w-full">
        🔄 Reset Streak
      </Button>
    </div>
  )
}