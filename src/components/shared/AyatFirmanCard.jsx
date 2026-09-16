import Card from '../ui/Card'
import Button from '../ui/Button'
import { useAyatFirman } from '../../hooks/useAyatFirman'

export default function AyatFirmanCard() {
  const { ayat, loading, error, isFallback, ambilAyatBaru } = useAyatFirman()

  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Ayat Firman
          </h2>
        </div>
        <button
          onClick={ambilAyatBaru}
          disabled={loading}
          className="text-sm px-3 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition disabled:opacity-50"
        >
          {loading ? '⏳' : '🔄'} Acak
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-slate-400">Memuat ayat...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
              {ayat?.kitab} {ayat?.pasal}:{ayat?.ayat}
            </p>
            <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed text-lg">
              "{ayat?.teks}"
            </p>
          </div>

          {isFallback && (
            <div className="mb-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                ⚠️ {error || 'Menampilkan ayat cadangan.'}
              </p>
            </div>
          )}

          <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
              "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku." — Mazmur 119:105
            </p>
          </div>
        </>
      )}
    </Card>
  )
}