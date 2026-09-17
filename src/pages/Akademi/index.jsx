import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAkademi, LEVELS } from '../../hooks/useAkademi'

export default function Akademi() {
  const navigate = useNavigate()
  const { progress, hitungLevelSelesai } = useAkademi(1)

  const getLevelStatus = (level) => {
    const selesai = hitungLevelSelesai(level.level)
    const total = level.materi.length
    const levelSelesai = selesai === total

    // Level 1 selalu terbuka
    if (level.level === 1) return { status: 'terbuka', selesai, total, levelSelesai }

    // Cek level sebelumnya
    const levelSebelumnya = LEVELS.find((l) => l.level === level.level - 1)
    const levelSebelumnyaSelesai =
      hitungLevelSelesai(level.level - 1) === levelSebelumnya?.materi.length

    if (!levelSebelumnyaSelesai) return { status: 'terkunci', selesai, total, levelSelesai }
    return { status: 'terbuka', selesai, total, levelSelesai }
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🎓 Akademi Trading
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Belajar trading dari nol, langkah demi langkah.
        </p>
      </div>

      {/* XP SUMMARY */}
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm">Total XP</p>
            <p className="text-4xl font-bold">⭐ {progress.xp}</p>
          </div>
          <span className="text-6xl">🎓</span>
        </div>
      </Card>

      {/* DAFTAR LEVEL */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          📚 Level Pembelajaran
        </h2>
        <div className="space-y-4">
          {LEVELS.map((level) => {
            const info = getLevelStatus(level)
            const progressPersen = Math.round((info.selesai / info.total) * 100)
            const terkunci = info.status === 'terkunci'

            return (
              <Card
                key={level.level}
                className={`${
                  terkunci
                    ? 'opacity-60'
                    : 'cursor-pointer hover:shadow-xl transition-all'
                }`}
                onClick={() => !terkunci && navigate(`/akademi/level/${level.level}`)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                      info.levelSelesai
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : terkunci
                        ? 'bg-slate-100 dark:bg-slate-700'
                        : 'bg-indigo-100 dark:bg-slate-700'
                    }`}
                  >
                    <span className="text-3xl">
                      {terkunci ? '🔒' : info.levelSelesai ? '✅' : '📘'}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge
                        color={
                          info.levelSelesai
                            ? 'green'
                            : terkunci
                            ? 'gray'
                            : 'blue'
                        }
                        size="sm"
                      >
                        Level {level.level}
                      </Badge>
                      <Badge color="purple" size="sm">
                        {level.namaLevel}
                      </Badge>
                      {info.levelSelesai && (
                        <Badge color="amber" size="sm">
                          🏅 {level.badgeSelesai}
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                      {level.namaLevel}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                      {level.deskripsi}
                    </p>

                    {!terkunci && (
                      <>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500 dark:text-slate-400">
                            Progress
                          </span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {info.selesai}/{info.total} ({progressPersen}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              info.levelSelesai
                                ? 'bg-green-500'
                                : 'bg-indigo-500'
                            }`}
                            style={{ width: `${progressPersen}%` }}
                          ></div>
                        </div>
                      </>
                    )}

                    {terkunci && (
                      <p className="text-xs text-amber-600 dark:text-amber-400">
                        🔒 Selesaikan Level {level.level - 1} terlebih dahulu
                      </p>
                    )}
                  </div>

                  {!terkunci && (
                    <span className="text-slate-400 text-xl">→</span>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Selesaikan setiap level secara berurutan.
          Level berikutnya akan terbuka otomatis setelah level sebelumnya
          selesai. Setiap materi selesai = +15 XP.
        </p>
      </Card>
    </div>
  )
}