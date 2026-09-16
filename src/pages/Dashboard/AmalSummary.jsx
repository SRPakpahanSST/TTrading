import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function AmalSummary({ amal }) {
  const navigate = useNavigate()

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0)

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          🤝 Amal
        </h2>
        <Badge color="purple">{amal.jumlah}x donasi</Badge>
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">Total Amal</p>
        <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
          {formatRupiah(amal.total)}
        </p>
      </div>

      {amal.riwayat.length > 0 ? (
        <div className="space-y-2 mb-4">
          {amal.riwayat.map((a, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400 truncate">
                {a.penerima || 'Donasi'}
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 ml-2">
                {formatRupiah(a.jumlah)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 mb-4">Belum ada donasi.</p>
      )}

      <button
        onClick={() => navigate('/amal')}
        className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-xl transition"
      >
        Catat Amal Baru
      </button>
    </Card>
  )
}