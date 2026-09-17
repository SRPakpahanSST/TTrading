import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAkademi } from '../../hooks/useAkademi'

export default function Akademi() {
  const navigate = useNavigate()
  const {
    level,
    progress,
    semuaMateri,
    totalMateri,
    materiSelesai,
    progressPersen,
    levelSelesai,
  } = useAkademi()

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

      {/* LEVEL INFO */}
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-100 text-sm">Level {level.level}</p>
            <h2 className="text-3xl font-bold">{level.namaLevel}</h2>
            <p className="text-indigo-100 text-sm mt-1">{level.deskripsi}</p>
          </div>
          <span className="text-6xl">🌱</span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span className="font-bold">
              {materiSelesai}/{totalMateri} materi ({progressPersen}%)
            </span>
          </div>
          <div className="w-full bg-indigo-900/30 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPersen}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-100">XP Terkumpul</p>
            <p className="text-2xl font-bold">⭐ {progress.xp}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-100">Status</p>
            <p className="text-2xl font-bold">
              {levelSelesai ? '✅ Selesai' : '⏳ Berjalan'}
            </p>
          </div>
        </div>
      </Card>

      {/* BADGE SELESAI */}
      {levelSelesai && (
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 border-2 border-amber-400">
          <div className="text-center py-4">
            <span className="text-5xl">🏅</span>
            <h3 className="text-xl font-bold text-amber-600 mt-2">
              Selamat! Anda Menyelesaikan Level 1
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Badge "Pemula" telah terbuka
            </p>
          </div>
        </Card>
      )}

      {/* DAFTAR MATERI */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          📚 Daftar Materi
        </h2>
        <div className="space-y-3">
          {semuaMateri.map((materi, i) => {
            const selesai = progress.materiSelesai.includes(materi.id)
            const skor = progress.kuisSkor[materi.id]
            return (
              <Card
                key={materi.id}
                className={`cursor-pointer hover:shadow-xl transition-all ${
                  selesai ? 'border-l-4 border-green-500' : ''
                }`}
                onClick={() => navigate(`/akademi/${materi.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-slate-700 flex items-center justify-center">
                    <span className="text-2xl">{materi.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Materi {i + 1}
                      </p>
                      <Badge color="gray" size="sm">{materi.durasi}</Badge>
                      {selesai && (
                        <Badge color="green" size="sm">✅ Selesai</Badge>
                      )}
                      {skor !== undefined && (
                        <Badge color="amber" size="sm">🎯 Skor {skor}/3</Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      {materi.judul}
                    </h3>
                  </div>
                  <span className="text-slate-400">→</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Selesaikan setiap materi dan kuis untuk
          mendapatkan badge & XP. Setelah Level 1 selesai, Anda akan lanjut ke
          Level 2 (Fundamental).
        </p>
      </Card>
    </div>
  )
}