import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function PortfolioSummary({ portfolio }) {
  const { totalAset, modalAwal, profitLoss } = portfolio
  const profitLossPersen = modalAwal > 0 ? ((profitLoss / modalAwal) * 100).toFixed(2) : 0

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0)

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          💰 Portofolio
        </h2>
        <Badge color={profitLoss >= 0 ? 'green' : 'red'}>
          {profitLoss >= 0 ? 'Profit' : 'Loss'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Aset</p>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">
            {formatRupiah(totalAset)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Modal Awal</p>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              {formatRupiah(modalAwal)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Profit/Loss</p>
            <p className={`text-lg font-semibold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatRupiah(profitLoss)} ({profitLossPersen}%)
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}