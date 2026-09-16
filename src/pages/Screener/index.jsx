import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useScreener } from '../../hooks/useScreener'
import { useWatchlist } from '../../hooks/useWatchlist'

export default function Screener() {
  const { filter, setFilter, hasil, sektorList, reset } = useScreener()
  const { tambah, isInWatchlist } = useWatchlist()

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)

  const getSkor = (s) => {
    let skor = 0
    if (s.per < 10) skor += 30
    else if (s.per < 15) skor += 20
    else if (s.per < 20) skor += 10
    if (s.pbv < 1) skor += 25
    else if (s.pbv < 2) skor += 15
    else if (s.pbv < 3) skor += 5
    if (s.roe > 20) skor += 25
    else if (s.roe > 15) skor += 15
    else if (s.roe > 10) skor += 10
    if (s.dividen > 5) skor += 20
    else if (s.dividen > 3) skor += 10
    return skor
  }

  const getWarnaSkor = (skor) => {
    if (skor >= 70) return 'green'
    if (skor >= 50) return 'yellow'
    return 'red'
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🔍 Screener Saham
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Temukan saham murah & berkualitas berdasarkan fundamental.
        </p>
      </div>

      <Card title="⚙️ Filter" icon="">
        <div className="space-y-4">
          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>PER Maksimal (Kemurahan)</span>
              <span className="text-amber-500">{filter.perMax}x</span>
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={filter.perMax}
              onChange={(e) => setFilter({ ...filter, perMax: parseInt(e.target.value) })}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>PBV Maksimal</span>
              <span className="text-amber-500">{filter.pbvMax}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.1"
              value={filter.pbvMax}
              onChange={(e) => setFilter({ ...filter, pbvMax: parseFloat(e.target.value) })}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>ROE Minimal (Profitabilitas)</span>
              <span className="text-green-500">{filter.roeMin}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={filter.roeMin}
              onChange={(e) => setFilter({ ...filter, roeMin: parseInt(e.target.value) })}
              className="w-full accent-green-500"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>Dividen Minimal</span>
              <span className="text-amber-500">{filter.dividenMin}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="15"
              value={filter.dividenMin}
              onChange={(e) => setFilter({ ...filter, dividenMin: parseInt(e.target.value) })}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Sektor
            </label>
            <select
              value={filter.sektor}
              onChange={(e) => setFilter({ ...filter, sektor: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {sektorList.map((s) => (
                <option key={s} value={s}>
                  {s === 'semua' ? 'Semua Sektor' : s}
                </option>
              ))}
            </select>
          </div>

          <Button variant="secondary" onClick={reset} className="w-full">
            🔄 Reset Filter
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            📊 Hasil ({hasil.length} saham)
          </h2>
        </div>

        {hasil.length === 0 ? (
          <p className="text-center text-slate-400 py-8">
            Tidak ada saham yang cocok dengan kriteria.
          </p>
        ) : (
          <div className="space-y-3">
            {hasil.map((s) => {
              const skor = getSkor(s)
              const sudahAda = isInWatchlist(s.kode)
              return (
                <div key={s.kode} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                          {s.kode}
                        </h3>
                        <Badge color={getWarnaSkor(skor)} size="sm">
                          Skor {skor}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {s.nama} • {s.sektor}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                      {formatRupiah(s.harga)}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">PER</p>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">{s.per}x</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">PBV</p>
                      <p className="font-semibold text-slate-800 dark:text-white text-sm">{s.pbv}x</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">ROE</p>
                      <p className="font-semibold text-green-600 text-sm">{s.roe}%</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Div</p>
                      <p className="font-semibold text-amber-600 text-sm">{s.dividen}%</p>
                    </div>
                  </div>

                  <button
                    onClick={() => tambah(s)}
                    disabled={sudahAda}
                    className={`w-full py-2 text-sm font-semibold rounded-xl transition ${
                      sudahAda
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-600 text-white'
                    }`}
                  >
                    {sudahAda ? '✅ Sudah di Watchlist' : '⭐ Tambah ke Watchlist'}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}