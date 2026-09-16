import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useBadges } from '../../hooks/useBadges'
import { badgeList, getKategoriList } from '../../data/badgeList'

export default function BadgePage() {
  const { isEarned, totalEarned, totalBadges, reset } = useBadges()
  const [filter, setFilter] = useState('semua')

  const kategoriList = ['semua', ...getKategoriList()]

  const filtered = badgeList.filter(
    (b) => filter === 'semua' || b.kategori === filter
  )

  const progressPersen = Math.round((totalEarned / totalBadges) * 100)

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🏅 Badge & Achievement
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Koleksi badge dari perjalanan investasi Anda.
        </p>
      </div>

      {/* PROGRESS */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            📊 Progres
          </h2>
          <Badge color="amber">
            {totalEarned}/{totalBadges}
          </Badge>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPersen}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
          {progressPersen}% badge terkumpul
        </p>
      </Card>

      {/* FILTER KATEGORI */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {kategoriList.map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
              filter === k
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* GRID BADGE */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((b) => {
          const earned = isEarned(b.id)
          return (
            <Card
              key={b.id}
              className={`text-center transition-all ${
                earned
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-700 dark:to-slate-800 border-2 border-amber-400'
                  : 'opacity-50 grayscale'
              }`}
            >
              <div className="text-5xl mb-3">{b.icon}</div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                {b.nama}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {b.deskripsi}
              </p>
              <Badge color={earned ? 'green' : 'gray'} size="sm">
                {earned ? '✅ Diperoleh' : '🔒 Terkunci'}
              </Badge>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <p className="text-center text-slate-400 py-8">
            Tidak ada badge untuk kategori ini.
          </p>
        </Card>
      )}

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Badge otomatis diperoleh saat Anda memenuhi
          syarat (streak, jurnal, amal, dll.). Teruslah aktif agar semua badge
          terbuka!
        </p>
      </Card>

      <button
        onClick={reset}
        className="w-full py-2 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-xl transition"
      >
        🔄 Reset Semua Badge
      </button>
    </div>
  )
}