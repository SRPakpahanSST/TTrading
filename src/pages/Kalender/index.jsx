import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { kalenderEkonomi, kategoriWarna } from '../../data/kalenderEkonomi'

export default function Kalender() {
  const [filter, setFilter] = useState('semua')

  const sekarang = new Date()
  const kategoriList = ['semua', 'Suku Bunga', 'Inflasi', 'Data Ekonomi', 'Laporan Keuangan']

  const filtered = kalenderEkonomi
    .filter((k) => filter === 'semua' || k.kategori === filter)
    .filter((k) => new Date(k.tanggal) >= new Date(sekarang.toDateString()))
    .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))

  const formatTanggal = (tanggal) => {
    const d = new Date(tanggal)
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getHariTersisa = (tanggal) => {
    const diff = Math.ceil((new Date(tanggal) - new Date(sekarang.toDateString())) / 86400000)
    if (diff === 0) return 'Hari ini'
    if (diff === 1) return 'Besok'
    if (diff < 0) return 'Sudah lewat'
    return `${diff} hari lagi`
  }

  const getDampakColor = (dampak) => {
    if (dampak === 'tinggi') return 'red'
    if (dampak === 'sedang') return 'yellow'
    return 'green'
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📅 Kalender Ekonomi
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Jadwal data ekonomi & laporan keuangan penting.
        </p>
      </div>

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

      {/* DAFTAR EVENT */}
      {filtered.length === 0 ? (
        <Card>
          <p className="text-center text-slate-400 py-8">
            Tidak ada event untuk kategori ini.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((event, i) => (
            <Card key={i}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-center">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-slate-700 flex flex-col items-center justify-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(event.tanggal).toLocaleDateString('id-ID', { month: 'short' })}
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {new Date(event.tanggal).getDate()}
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge color={kategoriWarna[event.kategori] || 'gray'} size="sm">
                      {event.kategori}
                    </Badge>
                    <Badge color={getDampakColor(event.dampak)} size="sm">
                      Dampak {event.dampak}
                    </Badge>
                    <Badge color="gray" size="sm">
                      {event.negara}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                    {event.judul}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatTanggal(event.tanggal)} • {event.jam} WIB
                  </p>
                  <p className="text-xs font-semibold text-amber-500 mt-1">
                    ⏰ {getHariTersisa(event.tanggal)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Event dengan <strong>dampak tinggi</strong> biasanya
          menyebabkan volatilitas pasar. Siapkan strategi Anda sebelum event ini.
        </p>
      </Card>
    </div>
  )
}