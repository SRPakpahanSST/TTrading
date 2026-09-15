import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function PortfolioSummary() {
  const data = {
    totalAset: 379143,
    modalAwal: 380000,
    profitLoss: -857,
    profitLossPersen: -0.23,
  }

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          💰 Ringkasan Portofolio
        </h2>
        <Badge color={data.profitLoss >= 0 ? 'green' : 'red'}>
          {data.profitLoss >= 0 ? 'Profit' : 'Loss'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Aset</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">
            {formatRupiah(data.totalAset)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Modal Awal</p>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              {formatRupiah(data.modalAwal)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Profit/Loss</p>
            <p className={`text-lg font-semibold ${
              data.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatRupiah(data.profitLoss)} ({data.profitLossPersen}%)
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-500 dark:text-slate-400">Target Bulan Ini</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">5%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full"
              style={{ width: '0.23%' }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  )
}