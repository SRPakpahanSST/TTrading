import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { doaPagi, getDoaHariIni, getKategoriDoa, getPilarList } from '../../data/doaPagi'

export default function DoaPagi() {
  const doaHariIni = getDoaHariIni()
  const [filter, setFilter] = useState('semua')

  const kategoriList = ['semua', ...getKategoriDoa()]
  const pilarList = getPilarList()

  const filtered = doaPagi.filter((d) => filter === 'semua' || d.kategori === filter)

  const getWarnaPilar = (pilar) => {
    const map = {
      'Raja Makro': 'blue',
      'Pembunuh Jangka Pendek': 'red',
      'Sentuhan Emas': 'amber',
      'Dewa Fundamental': 'green',
    }
    return map[pilar] || 'gray'
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🌅 Doa & Mantra Pagi
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Awali hari dengan doa dan mantra positif.
        </p>
      </div>

      {/* DOA HARI INI */}
      <Card className="bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700">
        <div className="text-center py-6">
          <span className="text-5xl">🌅</span>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            {doaHariIni.kategori} Hari Ini
          </p>
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">
            {doaHariIni.judul}
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mt-4 italic leading-relaxed max-w-2xl mx-auto">
            "{doaHariIni.teks}"
          </p>
          {doaHariIni.pilar && (
            <div className="mt-4">
              <Badge color={getWarnaPilar(doaHariIni.pilar)}>
                {doaHariIni.pilar}
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* FILTER */}
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

      {/* DAFTAR */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <Card key={i}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <span className="text-3xl">
                  {item.kategori === 'Doa' ? '🤲' : '📿'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    {item.judul}
                  </h3>
                  {item.pilar && (
                    <Badge color={getWarnaPilar(item.pilar)} size="sm">
                      {item.pilar}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{item.teks}"
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* INFO PILAR */}
      <Card title="🏛️ Mantra Berdasarkan Pilar" icon="">
        <div className="space-y-3">
          {pilarList.map((pilar) => {
            const mantra = doaPagi.filter(
              (d) => d.kategori === 'Mantra' && d.pilar === pilar
            )
            return (
              <div key={pilar} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={getWarnaPilar(pilar)}>{pilar}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {mantra.length} mantra
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {mantra.map((m) => m.teks).join(' • ')}
                </p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Baca doa & mantra ini setiap pagi sebelum
          trading. Ini akan menenangkan hati dan menjernihkan pikiran Anda.
        </p>
      </Card>
    </div>
  )
}