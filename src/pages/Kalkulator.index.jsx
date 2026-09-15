import { useState } from 'react'
import Card from '../../components/ui/Card'

export default function Kalkulator() {
  const [modal, setModal] = useState(1000000)
  const [hargaSaham, setHargaSaham] = useState(1800)
  const [riskPersen, setRiskPersen] = useState(2)
  const [profitPersen, setProfitPersen] = useState(10)
  const [profit, setProfit] = useState(100000)

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  const maxLot = Math.floor(modal / (hargaSaham * 100))
  const riskAmount = modal * (riskPersen / 100)
  const stopLoss = hargaSaham - (riskAmount / (maxLot * 100))
  const takeProfit = hargaSaham + (hargaSaham * (profitPersen / 100))
  const amal = profit > 0 ? profit * 0.02 : 0

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          💰 Kalkulator
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Hitung lot, stop loss, take profit, dan amal secara otomatis.
        </p>
      </div>

      {/* INPUT */}
      <Card title="📝 Input" icon="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Modal (Rp)
            </label>
            <input
              type="number"
              value={modal}
              onChange={(e) => setModal(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Harga Saham (Rp)
            </label>
            <input
              type="number"
              value={hargaSaham}
              onChange={(e) => setHargaSaham(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Risk Tolerance (%)
            </label>
            <input
              type="number"
              value={riskPersen}
              onChange={(e) => setRiskPersen(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Target Profit (%)
            </label>
            <input
              type="number"
              value={profitPersen}
              onChange={(e) => setProfitPersen(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </Card>

      {/* HASIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="📊 Hasil Kalkulasi" icon="">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400">Maksimal Lot</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {maxLot} lot
              </p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-slate-700 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400">Stop Loss</p>
              <p className="text-2xl font-bold text-red-600">
                {formatRupiah(Math.max(stopLoss, 0))}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-slate-700 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400">Take Profit</p>
              <p className="text-2xl font-bold text-green-600">
                {formatRupiah(takeProfit)}
              </p>
            </div>
          </div>
        </Card>

        <Card title="🤝 Kalkulator Amal" icon="">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Profit (Rp)
              </label>
              <input
                type="number"
                value={profit}
                onChange={(e) => setProfit(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="p-4 bg-amber-50 dark:bg-slate-700 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400">Amal 2%</p>
              <p className="text-2xl font-bold text-amber-500">
                {formatRupiah(amal)}
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-slate-700 rounded-xl">
              <p className="text-sm text-slate-500 dark:text-slate-400">Profit Bersih</p>
              <p className="text-2xl font-bold text-green-600">
                {formatRupiah(profit - amal)}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}