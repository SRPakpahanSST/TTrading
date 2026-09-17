import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useStudiKasus } from '../../hooks/useStudiKasus'

export default function AnalisisTeknikal() {
  const navigate = useNavigate()
  const {
    kategori,
    studiKasus,
    total,
    selesai,
    progressPersen,
    progress,
    resetProgress,
    getSkor,
    getByKategori,
  } = useStudiKasus()

  const [filter, setFilter] = useState('semua')
  const skor = getSkor()

  const filtered =
    filter === 'semua' ? studiKasus : studiKasus.filter((s) => s.kategori === filter)

  const getWarnaKategori = (kat) => {
    const map = {
      pola: 'purple',
      support: 'blue',
      volume: 'amber',
      trend: 'green',
    }
    return map[kat] || 'gray'
  }

  const getNamaKategori = (katId) => {
    return kategori.find((k) => k.id === katId)?.nama || katId
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📈 Analisis Teknikal
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Latihan membaca grafik dengan {total} studi kasus nyata.
        </p>
      </div>

      {/* STATISTIK */}
      <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xs text-indigo-100">Selesai</p>
            <p className="text-2xl font-bold">{selesai}/{total}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-indigo-100">Benar</p>
            <p className="text-2xl font-bold text-green-300">{skor.benar}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-indigo-100">Skor</p>
            <p className="text-2xl font-bold text-amber-300">{skor.persen}%</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progressPersen}%</span>
          </div>
          <div className="w-full bg-indigo-900/30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPersen}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* FILTER */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('semua')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
            filter === 'semua'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          Semua ({total})
        </button>
        {kategori.map((k) => {
          const jumlah = getByKategori(k.id).length
          return (
            <button
              key={k.id}
              onClick={() => setFilter(k.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                filter === k.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {k.icon} {k.nama} ({jumlah})
            </button>
          )
        })}
      </div>

      {/* DAFTAR STUDI KASUS */}
      <div className="space-y-3">
        {filtered.map((s, i) => {
          const sudahDijawab = progress.selesai.includes(s.id)
          const jawaban = progress.jawaban[s.id]
          const benar = jawaban?.benar

          return (
            <Card
              key={s.id}
              className={`cursor-pointer hover:shadow-xl transition-all ${
                sudahDijawab
                  ? benar
                    ? 'border-l-4 border-green-500'
                    : 'border-l-4 border-red-500'
                  : ''
              }`}
              onClick={() => navigate(`/analisis-teknikal/${s.id}`)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    sudahDijawab
                      ? benar
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-red-100 dark:bg-red-900/30'
                      : 'bg-indigo-100 dark:bg-slate-700'
                  }`}
                >
                  <span className="text-xl font-bold">
                    {sudahDijawab ? (benar ? '✅' : '❌') : i + 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge color={getWarnaKategori(s.kategori)} size="sm">
                      {getNamaKategori(s.kategori)}
                    </Badge>
                    {sudahDijawab && (
                      <Badge color={benar ? 'green' : 'red'} size="sm">
                        {benar ? 'Benar' : 'Salah'}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    {s.judul}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {s.deskripsi}
                  </p>
                </div>

                <span className="text-slate-400">→</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* RESET */}
      {selesai > 0 && (
        <Button
          variant="secondary"
          onClick={() => {
            if (confirm('Reset semua progress analisis teknikal?')) {
              resetProgress()
            }
          }}
          className="w-full"
        >
          🔄 Reset Progress
        </Button>
      )}

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Setiap studi kasus menampilkan grafik
          sederhana. Baca deskripsi dengan teliti, lalu jawab pertanyaan. Setelah
          menjawab, Anda akan melihat penjelasan detailnya.
        </p>
      </Card>
    </div>
  )
}