import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

export default function Jurnal() {
  const [jurnal, setJurnal] = useState([])
  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    kondisiPasar: 'sideways',
    emosi: 'tenang',
    pilarRajaMakro: 5,
    pilarPembunuh: 5,
    pilarSentuhanEmas: 5,
    pilarDewaFundamental: 5,
    profitLoss: 0,
    catatan: '',
  })

  const hitungTotal = () => {
    return form.pilarRajaMakro + form.pilarPembunuh + form.pilarSentuhanEmas + form.pilarDewaFundamental
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newJurnal = {
      id: Date.now(),
      ...form,
      totalSkor: hitungTotal(),
      amal: form.profitLoss > 0 ? form.profitLoss * 0.02 : 0,
    }
    setJurnal([newJurnal, ...jurnal])
    setForm({
      tanggal: new Date().toISOString().split('T')[0],
      kondisiPasar: 'sideways',
      emosi: 'tenang',
      pilarRajaMakro: 5,
      pilarPembunuh: 5,
      pilarSentuhanEmas: 5,
      pilarDewaFundamental: 5,
      profitLoss: 0,
      catatan: '',
    })
  }

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📓 Jurnal Trading
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Catat setiap transaksi dan refleksi Anda.
        </p>
      </div>

      {/* FORM JURNAL */}
      <Card title="✍️ Entri Jurnal Baru" icon="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                Kondisi Pasar
              </label>
              <select
                value={form.kondisiPasar}
                onChange={(e) => setForm({ ...form, kondisiPasar: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="bullish">Bullish</option>
                <option value="bearish">Bearish</option>
                <option value="sideways">Sideways</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Emosi
              </label>
              <select
                value={form.emosi}
                onChange={(e) => setForm({ ...form, emosi: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="tenang">Tenang</option>
                <option value="cemas">Cemas</option>
                <option value="serakah">Serakah</option>
                <option value="ragu">Ragu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: 'pilarRajaMakro', label: 'Raja Makro' },
              { key: 'pilarPembunuh', label: 'Pembunuh' },
              { key: 'pilarSentuhanEmas', label: 'Sentuhan Emas' },
              { key: 'pilarDewaFundamental', label: 'Dewa Fundamental' },
            ].map((p) => (
              <div key={p.key}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {p.label} (1-10)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form[p.key]}
                  onChange={(e) => setForm({ ...form, [p.key]: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Profit/Loss (Rp)
            </label>
            <input
              type="number"
              value={form.profitLoss}
              onChange={(e) => setForm({ ...form, profitLoss: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Catatan
            </label>
            <textarea
              value={form.catatan}
              onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              rows="3"
              placeholder="Apa pelajaran hari ini?"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-slate-700 rounded-xl">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Total Skor: <strong>{hitungTotal()}/40</strong>
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Amal 2%: <strong>{formatRupiah(form.profitLoss > 0 ? form.profitLoss * 0.02 : 0)}</strong>
            </span>
          </div>

          <Button type="submit" variant="primary" className="w-full">
            💾 Simpan Jurnal
          </Button>
        </form>
      </Card>

      {/* DAFTAR JURNAL */}
      <Card title="📚 Riwayat Jurnal" icon="">
        {jurnal.length === 0 ? (
          <p className="text-center text-slate-400 py-8">
            Belum ada jurnal. Mulai catat hari ini!
          </p>
        ) : (
          <div className="space-y-3">
            {jurnal.map((j) => (
              <div
                key={j.id}
                className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-white">
                      {j.tanggal}
                    </span>
                    <Badge color={j.kondisiPasar === 'bullish' ? 'green' : j.kondisiPasar === 'bearish' ? 'red' : 'yellow'}>
                      {j.kondisiPasar}
                    </Badge>
                    <Badge color="purple">{j.emosi}</Badge>
                  </div>
                  <span className="text-sm font-bold text-amber-500">
                    {j.totalSkor}/40
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {j.catatan || 'Tidak ada catatan.'}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>P/L: {formatRupiah(j.profitLoss)}</span>
                  <span>Amal: {formatRupiah(j.amal)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}