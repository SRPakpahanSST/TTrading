import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { storage, STORAGE_KEYS } from '../../utils/storage'

export default function LaporanAmal() {
  const [filter, setFilter] = useState('semua')

  const amal = storage.get(STORAGE_KEYS.AMAL, [])
  const total = amal.reduce((sum, a) => sum + (a.jumlah || 0), 0)
  const jumlah = amal.length

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0)

  // Group by bulan
  const amalByBulan = amal.reduce((acc, a) => {
    const bulan = new Date(a.tanggal).toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    })
    if (!acc[bulan]) acc[bulan] = { total: 0, items: [] }
    acc[bulan].total += a.jumlah || 0
    acc[bulan].items.push(a)
    return acc
  }, {})

  const sortedBulan = Object.keys(amalByBulan).sort(
    (a, b) => new Date(b) - new Date(a)
  )

  const filterBulan = filter === 'semua' ? sortedBulan : [filter]

  // Group by penerima
  const penerimaUnik = amal.reduce((acc, a) => {
    const key = a.penerima || 'Lainnya'
    if (!acc[key]) acc[key] = { total: 0, jumlah: 0 }
    acc[key].total += a.jumlah || 0
    acc[key].jumlah += 1
    return acc
  }, {})

  const topPenerima = Object.entries(penerimaUnik)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5)

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📊 Laporan Amal
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Transparansi amal untuk komunitas PMD Impact Invest.
        </p>
      </div>

      {/* RINGKASAN UTAMA */}
      <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white">
        <div className="text-center py-4">
          <p className="text-pink-100 text-sm mb-2">TOTAL AMAL TERKUMPUL</p>
          <p className="text-4xl font-bold mb-2">{formatRupiah(total)}</p>
          <p className="text-pink-100 text-sm">
            Dari {jumlah} donasi • {Object.keys(penerimaUnik).length} penerima
          </p>
        </div>
      </Card>

      {/* TOP PENERIMA */}
      {topPenerima.length > 0 && (
        <Card title="🏆 Top Penerima Manfaat" icon="">
          <div className="space-y-3">
            {topPenerima.map(([nama, data], i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-white truncate">
                    {nama}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {data.jumlah}x donasi
                  </p>
                </div>
                <p className="font-bold text-pink-500">
                  {formatRupiah(data.total)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* FILTER BULAN */}
      {sortedBulan.length > 0 && (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('semua')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                filter === 'semua'
                  ? 'bg-pink-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Semua
            </button>
            {sortedBulan.map((b) => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                  filter === b
                    ? 'bg-pink-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* RIWAYAT PER BULAN */}
          <div className="space-y-4">
            {filterBulan.map((bulan) => (
              <Card key={bulan}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-white">
                    📅 {bulan}
                  </h3>
                  <Badge color="purple">
                    {formatRupiah(amalByBulan[bulan].total)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {amalByBulan[bulan].items.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm truncate">
                          {a.penerima || 'Donasi'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {a.keterangan || 'Donasi'} •{' '}
                          {new Date(a.tanggal).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <p className="font-bold text-pink-500 text-sm ml-2">
                        {formatRupiah(a.jumlah)}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* JIKA BELUM ADA AMAL */}
      {amal.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <span className="text-5xl">🤝</span>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              Belum ada amal tercatat.
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Mulai catat donasi Anda di halaman Amal.
            </p>
          </div>
        </Card>
      )}

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Laporan ini bisa dibagikan ke grup PMD Impact
          Invest sebagai bentuk <strong>transparansi</strong>. Setiap rupiah amal
          Anda akan tercatat rapi.
        </p>
      </Card>
    </div>
  )
}