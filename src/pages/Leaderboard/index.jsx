import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useLeaderboard } from '../../hooks/useLeaderboard'

export default function Leaderboard() {
  const { leaderboard, myStats } = useLeaderboard()

  const getMedali = (peringkat) => {
    if (peringkat === 1) return '🥇'
    if (peringkat === 2) return '🥈'
    if (peringkat === 3) return '🥉'
    return `#${peringkat}`
  }

  const getWarnaPeringkat = (peringkat) => {
    if (peringkat === 1) return 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300'
    if (peringkat === 2) return 'from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-slate-300'
    if (peringkat === 3) return 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-300'
    return 'from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-slate-200 dark:border-slate-700'
  }

  const getWarnaSkor = (skor) => {
    if (skor >= 200) return 'purple'
    if (skor >= 150) return 'green'
    if (skor >= 100) return 'yellow'
    return 'gray'
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🏆 Leaderboard PMD
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Peringkat anggota berdasarkan streak, jurnal, amal, & pilar.
        </p>
      </div>

      {/* KARTU STATISTIK SAYA */}
      {myStats && (
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              📊 Statistik Saya
            </h2>
            <Badge color="amber">
              Peringkat {leaderboard.find((a) => a.isMe)?.peringkat || '-'}
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400">Streak</p>
              <p className="text-2xl font-bold text-orange-500">🔥 {myStats.streak}</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400">Jurnal</p>
              <p className="text-2xl font-bold text-blue-500">📓 {myStats.jurnal}</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400">Amal</p>
              <p className="text-2xl font-bold text-pink-500">🤝 {myStats.amal}</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400">Pilar</p>
              <p className="text-2xl font-bold text-amber-500">🏛️ {myStats.pilar}</p>
            </div>
            <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-500 dark:text-slate-400">Profit</p>
              <p className="text-2xl font-bold text-green-500">💰 {myStats.profit}</p>
            </div>
          </div>
        </Card>
      )}

      {/* PANDUAN SKOR */}
      <Card title="💡 Cara Menghitung Skor" icon="">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
          <div className="p-2 bg-orange-50 dark:bg-slate-700 rounded-lg text-center">
            <p className="font-semibold text-orange-600">Streak × 2</p>
          </div>
          <div className="p-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-center">
            <p className="font-semibold text-blue-600">Jurnal × 1</p>
          </div>
          <div className="p-2 bg-pink-50 dark:bg-slate-700 rounded-lg text-center">
            <p className="font-semibold text-pink-600">Amal × 3</p>
          </div>
          <div className="p-2 bg-amber-50 dark:bg-slate-700 rounded-lg text-center">
            <p className="font-semibold text-amber-600">Pilar × 2</p>
          </div>
          <div className="p-2 bg-green-50 dark:bg-slate-700 rounded-lg text-center">
            <p className="font-semibold text-green-600">Profit × 5</p>
          </div>
        </div>
      </Card>

      {/* DAFTAR LEADERBOARD */}
      <div className="space-y-3">
        {leaderboard.map((anggota) => (
          <div
            key={anggota.id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 bg-gradient-to-br ${getWarnaPeringkat(anggota.peringkat)} ${
              anggota.isMe ? 'ring-2 ring-amber-500' : ''
            }`}
          >
            <div className="flex-shrink-0 w-12 text-center">
              <span className="text-2xl font-bold">{getMedali(anggota.peringkat)}</span>
            </div>

            <div className="flex-shrink-0 text-3xl">{anggota.avatar}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`font-bold truncate ${
                  anggota.isMe ? 'text-amber-600' : 'text-slate-800 dark:text-white'
                }`}>
                  {anggota.nama} {anggota.isMe && '(Anda)'}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                <span>🔥 {anggota.streak}</span>
                <span>📓 {anggota.jurnal}</span>
                <span>🤝 {anggota.amal}</span>
                <span>🏛️ {anggota.pilar}</span>
                <span>💰 {anggota.profit}</span>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <Badge color={getWarnaSkor(anggota.skor)}>
                {anggota.skor} poin
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Perbanyak <strong>amal</strong> (×3 poin) dan{' '}
          <strong>profit</strong> (×5 poin) untuk naik peringkat! Tapi tetap
          utamakan <strong>disiplin</strong> — streak dan jurnal adalah fondasinya.
        </p>
      </Card>
    </div>
  )
}