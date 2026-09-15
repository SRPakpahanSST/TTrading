import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

export default function Amal() {
  const [amal, setAmal] = useState([
    { id: 1, tanggal: '2026-09-15', jumlah: 360, penerima: 'Yayasan Bunga Kecil', keterangan: 'Donasi pendidikan' },
    { id: 2, tanggal: '2026-09-10', jumlah: 500, penerima: 'Panti Asuhan', keterangan: 'Donasi kesehatan' },
  ])
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    jumlah: 0,
    penerima: '',
    keterangan: '',
  })

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  const totalAmal = amal.reduce((sum, a) => sum + a.jumlah, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAmal([{ id: Date.now(), ...form }, ...amal])
    setForm({
      tanggal: new Date().toISOString().split('T')[0],
      jumlah: 0,
      penerima: '',
      keterangan: '',
    })
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🤝 Amal
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Sisihkan 2% profit untuk dampak sosial.
        </p>
      </div>

      {/* TOTAL AMAL */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Total Amal Terkumpul</p>
          <p className="text-4xl font-bold text-amber-500">{formatRupiah(totalAmal)}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Dari {amal.length} donasi
          </p>
        </div>
      </Card>

      {/* FORM AMAL */}
      <Card title="✍️ Catat Amal Baru" icon="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Jumlah (Rp)
              </label>
              <input
                type="number"
                value={form.jumlah}
                onChange={(e) => setForm({ ...form, jumlah: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Penerima
            </label>
            <input
              type="text"
              value={form.penerima}
              onChange={(e) => setForm({ ...form, penerima: e.target.value })}
              placeholder="Nama yayasan/panti"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Keterangan
            </label>
            <input
              type="text"
              value={form.keterangan}
              onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
              placeholder="Untuk apa donasi ini?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            💾 Simpan Amal
          </Button>
        </form>
      </Card>

      {/* RIWAYAT AMAL */}
      <Card title="📚 Riwayat Amal" icon="">
        <div className="space-y-3">
          {amal.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {a.penerima}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {a.keterangan}
                </p>
                <p className="text-xs text-slate-400 mt-1">{a.tanggal}</p>
              </div>
              <span className="text-lg font-bold text-amber-500">
                {formatRupiah(a.jumlah)}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}