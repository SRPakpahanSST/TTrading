import Card from '../ui/Card'

export default function AmalTracker({ totalAmal, targetAmal, persentase }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)
  }

  return (
    <Card title="🤝 Amal" icon="">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Amal</p>
          <p className="text-2xl font-bold text-amber-500">{formatRupiah(totalAmal)}</p>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-500 dark:text-slate-400">Target</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {persentase}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full"
              style={{ width: `${persentase}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}