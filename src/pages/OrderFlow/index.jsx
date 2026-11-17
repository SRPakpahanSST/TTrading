import { useState, useEffect } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { dummyOrderFlow } from '../../data/orderFlowDummy'
import { useWatchlistOrderFlow } from '../../hooks/useWatchlistOrderFlow'

export default function OrderFlow() {
  const { stocks, addStock, removeStock } = useWatchlistOrderFlow()
  const [selectedStock, setSelectedStock] = useState(stocks[0] || 'BRIS')
  const [sesi, setSesi] = useState('09:00-09:10')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newStock, setNewStock] = useState('')
  const [notif, setNotif] = useState(null)

  // Ambil data saat saham atau sesi berubah
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      // Ambil data dari dummy, jika tidak ada gunakan DEFAULT
      const flow = dummyOrderFlow[selectedStock]?.[sesi] || dummyOrderFlow['DEFAULT'][sesi]
      setData(flow)
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [selectedStock, sesi])

  const handleAddStock = (e) => {
    e.preventDefault()
    const res = addStock(newStock)
    setNotif({ teks: res.message, tipe: res.success ? 'sukses' : 'error' })
    if (res.success) setNewStock('')
    setTimeout(() => setNotif(null), 3000)
  }

  const getPersenBeli = () => {
    if (!data) return 0
    const total = data.totalBeli + data.totalJual
    return ((data.totalBeli / total) * 100).toFixed(1)
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          ⚖️ Analisis Order Flow
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Pantau tekanan beli/jual di sesi pembukaan & pra-penutupan.
        </p>
      </div>

      {/* FORM TAMBAH SAHAM */}
      <Card title="➕ Tambah Saham Pantauan" icon="">
        <form onSubmit={handleAddStock} className="flex gap-2">
          <input
            type="text"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value.toUpperCase())}
            placeholder="Kode Saham (misal: BBRI)"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Button type="submit">Tambah</Button>
        </form>
        {notif && (
          <p className={`text-sm mt-2 ${notif.tipe === 'sukses' ? 'text-green-600' : 'text-red-600'}`}>
            {notif.teks}
          </p>
        )}
        
        {/* DAFTAR SAHAM YANG DIPANTAU */}
        <div className="flex flex-wrap gap-2 mt-4">
          {stocks.map((s) => (
            <div
              key={s}
              onClick={() => setSelectedStock(s)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-all ${
                selectedStock === s
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {s}
              <button
                onClick={(e) => { e.stopPropagation(); removeStock(s); }}
                className="text-xs opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* FILTER SESI */}
      <div className="flex gap-2">
        <button
          onClick={() => setSesi('09:00-09:10')}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
            sesi === '09:00-09:10'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          🌅 Pembukaan (09:00 - 09:10)
        </button>
        <button
          onClick={() => setSesi('15:50-16:10')}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
            sesi === '15:50-16:10'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          🌇 Pra-Penutupan (15:50 - 16:10)
        </button>
      </div>

      {/* TAMPILAN DATA */}
      {loading ? (
        <Card><p className="text-center text-slate-400 py-8">Memuat data...</p></Card>
      ) : data ? (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                Ringkasan {selectedStock}
              </h3>
              <Badge color={getPersenBeli() > 50 ? 'green' : 'red'}>
                {getPersenBeli() > 50 ? '🟢 Dominasi Beli' : '🔴 Dominasi Jual'}
              </Badge>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-green-600 font-semibold">Beli: {data.totalBeli.toLocaleString()} lbr</span>
              <span className="text-red-600 font-semibold">Jual: {data.totalJual.toLocaleString()} lbr</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-4 overflow-hidden flex">
              <div className="bg-green-500 h-4" style={{ width: `${getPersenBeli()}%` }}></div>
              <div className="bg-red-500 h-4" style={{ width: `${100 - getPersenBeli()}%` }}></div>
            </div>
            <p className="text-xs text-center mt-2 text-slate-500 dark:text-slate-400">
              Rasio Bid/Offer: {getPersenBeli()}% : {(100 - getPersenBeli()).toFixed(1)}%
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h4 className="text-sm font-bold text-green-600 mb-3">🟢 Antrean Beli (Bid)</h4>
              <div className="space-y-2">
                {data.bid.map((b, i) => (
                  <div key={i} className="flex justify-between text-sm p-2 bg-green-50 dark:bg-slate-700 rounded-lg">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Rp {b.harga.toLocaleString()}</span>
                    <span className="text-slate-500 dark:text-slate-400">{b.lot} lot</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h4 className="text-sm font-bold text-red-600 mb-3">🔴 Antrean Jual (Offer)</h4>
              <div className="space-y-2">
                {data.offer.map((o, i) => (
                  <div key={i} className="flex justify-between text-sm p-2 bg-red-50 dark:bg-slate-700 rounded-lg">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Rp {o.harga.toLocaleString()}</span>
                    <span className="text-slate-500 dark:text-slate-400">{o.lot} lot</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card><p className="text-center text-slate-400 py-8">Data tidak ditemukan.</p></Card>
      )}
    </div>
  )
}
