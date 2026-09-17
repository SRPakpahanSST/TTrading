import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { useAyatFirman } from '../../hooks/useAyatFirman'

export default function AyatFirmanCard() {
  const {
    ayat,
    loading,
    error,
    sumber,
    setSumber,
    tema,
    setTema,
    temaList,
    totalAyat,
    ambilAyatBaru,
  } = useAyatFirman()

  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Ayat Firman
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {totalAyat} ayat tersedia
            </p>
          </div>
        </div>
        <button
          onClick={ambilAyatBaru}
          disabled={loading}
          className="text-sm px-3 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition disabled:opacity-50"
        >
          {loading ? '⏳' : '🔄'} Acak
        </button>
      </div>

      {/* TOMBOL PILIH SUMBER */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSumber('lokal')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
            sumber === 'lokal'
              ? 'bg-indigo-500 text-white'
              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          💾 Lokal (120 Ayat)
        </button>
        <button
          onClick={() => setSumber('sabda')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
            sumber === 'sabda'
              ? 'bg-indigo-500 text-white'
              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          🌐 API SABDA
        </button>
      </div>

      {/* FILTER TEMA */}
      {sumber === 'lokal' && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {temaList.map((t) => (
            <button
              key={t}
              onClick={() => setTema(t)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                tema === t
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <p className="text-slate-400">Memuat ayat...</p>
        </div>
      ) : error && !ayat ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <>
          {/* ... (Sisa tampilan ayat tetap sama) ... */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                {ayat?.kitab} {ayat?.pasal}:{ayat?.ayat}
              </p>
              {ayat?.tema && (
                <Badge color="purple" size="sm">
                  {ayat.tema}
                </Badge>
              )}
            </div>
            <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed text-lg">
              "{ayat?.teks}"
            </p>
          </div>
          
          {error && <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">⚠️ {error}</p>}

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