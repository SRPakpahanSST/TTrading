import { useParams, useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useAkademi, LEVELS } from '../../hooks/useAkademi'

export default function LevelDetail() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const levelNum = parseInt(levelId) || 1
  const { level, progress, semuaMateri, totalMateri, materiSelesai, progressPersen, levelSelesai } =
    useAkademi(levelNum)

  return (
    <div className="space-y-6 fade-in">
      <button
        onClick={() => navigate('/akademi')}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-500"
      >
        ← Kembali ke Akademi
      </button>

      {/* LEVEL INFO */}
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-100 text-sm">Level {level.level}</p>
            <h2 className="text-3xl font-bold">{level.namaLevel}</h2>
            <p className="text-indigo-100 text-sm mt-1">{level.deskripsi}</p>
          </div>
          <span className="text-6xl">
            {levelSelesai ? '✅' : level.level === 2 ? '🔬' : '🌱'}
          </span>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span className="font-bold">
              {materiSelesai}/{totalMateri} ({progressPersen}%)
            </span>
          </div>
          <div className="w-full bg-indigo-900/30 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPersen}%` }}
            ></div>
          </div>
        </div>

        {levelSelesai && (
          <div className="mt-4 p-3 bg-white/10 rounded-xl text-center">
            <p className="text-sm">🏅 Badge terbuka: <strong>{level.badgeSelesai}</strong></p>
          </div>
        )}
      </Card>

      {/* DAFTAR MATERI */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          📚 Daftar Materi
        </h2>
        <div className="space-y-3">
          {semuaMateri.map((materi, i) => {
            const selesai = (progress.materiSelesai[levelNum] || []).includes(materi.id)
            const skor = progress.kuisSkor[materi.id]
            return (
              <Card
                key={materi.id}
                onClick={() => navigate(`/akademi/materi/${materi.id}`)}
                className={selesai ? 'border-l-4 border-green-500' : ''}
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
                      {selesai && <Badge color="green" size="sm">✅ Selesai</Badge>}
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
          💡 <strong>Tips:</strong> Setiap materi selesai = +15 XP. Selesaikan
          semua materi untuk membuka badge <strong>{level.badgeSelesai}</strong>.
        </p>
      </Card>
    </div>
  )
}