import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function DosaAlert({ dosa }) {
  const navigate = useNavigate()

  // Default 3 dosa jika belum ada data
  const list = dosa.length > 0
    ? dosa
    : [
        { nama: 'Keserakahan', status: 'waspada', pesan: 'Profit sudah 8%. Jangan tunggu lebih tinggi.' },
        { nama: 'Ketakutan', status: 'aman', pesan: 'Harga masih di atas Bull-Bear. Tenang.' },
        { nama: 'Keraguan', status: 'bahaya', pesan: 'Sinyal dua letusan muncul. Berani entry!' },
      ]

  const statusColor = { aman: 'green', waspada: 'yellow', bahaya: 'red' }
  const statusIcon = { aman: '✅', waspada: '⚠️', bahaya: '🚨' }

  return (
    <Card title="🧠 Detektor 7 Dosa Dagang" icon="">
      <div className="space-y-3">
        {list.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-800 dark:text-white">
                  {statusIcon[d.status]} {d.nama}
                </span>
                <Badge color={statusColor[d.status]}>{d.status}</Badge>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{d.pesan}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/dosa')}
        className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition"
      >
        🎯 Buka Latihan 7 Dosa
      </button>
    </Card>
  )
}