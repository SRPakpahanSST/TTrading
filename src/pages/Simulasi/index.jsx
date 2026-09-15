import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

export default function Simulasi() {
  const [saldo, setSaldo] = useState(10000000)
  const [transaksi, setTransaksi] = useState([])
  const [form, setForm] = useState({ kode: '', tipe: 'beli', lot: 1, harga: 0 })

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const total = form.lot * 100 * form.harga
    const biaya = total * 0.0015
    const grandTotal = form.tipe === 'beli' ? total + biaya : total - biaya

    if (form.tipe === 'beli' && grandTotal > saldo) {
      alert('Saldo tidak cukup!')
      return
    }

    const newTransaksi = {
      id: Date.now(),
      ...form,
      total: grandTotal,
      tanggal: new Date().toISOString(),
    }

    setTransaksi([newTransaksi, ...transaksi])
    setSaldo(form.tipe === 'beli' ? saldo - grandTotal : saldo + grandTotal)
    setForm({ kode: '', tipe: 'beli', lot: 1, harga: 0 })
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🎮 Mode Simulasi
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Latihan trading tanpa risiko kehilangan uang sungguhan.
        </p>
      </div>

      {/* SALDO VIRTUAL */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Saldo Virtual</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-white">
              {formatRupiah(saldo)}
            </p>
          </div>
          <Button variant="secondary" onClick={() => setSaldo(10000000)}>
            🔄 Reset
          </Button>
        </div>
      </Card>

      {/* FORM TRANSAKSI */}
      <Card title="📝 Transaksi Virtual" icon="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Kode Saham
              </label>
              <input
                type="text"
                value={form.kode}
                onChange={(e) => setForm({ ...form, kode: e.target.value.toUpperCase() })}
                placeholder="BRIS"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Tipe
              </label>
              <select
                value={form.tipe}
                onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="beli">Beli</option>
                <option value="jual">Jual</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Jumlah Lot
              </label>
              <input
                type="number"
                value={form.lot}
                onChange={(e) => setForm({ ...form, lot: parseInt(e.target.value) || 0 })}
                min="1"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Harga per Lembar
              </label>
              <input
                type="number"
                value={form.harga}
                onChange={(e) => setForm({ ...form, harga: parseInt(e.target.value) || 0 })}
                min="1"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            🚀 Eksekusi Virtual
          </Button>
        </form>
      </Card>

      {/* RIWAYAT TRANSAKSI */}
      <Card title="📜 Riwayat Simulasi" icon="">
        {transaksi.length === 0 ? (
          <p className="text-center text-slate-400 py-8">
            Belum ada transaksi. Mulai simulasi pertama Anda!
          </p>
        ) : (
          <div className="space-y-3">
            {transaksi.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-white">
                      {t.kode}
                    </span>
                    <Badge color={t.tipe === 'beli' ? 'green' : 'red'}>
                      {t.tipe}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t.lot} lot × {formatRupiah(t.harga)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {formatRupiah(t.total)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(t.tanggal).toLocaleTimeString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}