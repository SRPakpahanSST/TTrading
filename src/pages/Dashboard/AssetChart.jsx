import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../../components/ui/Card'

export default function AssetChart({ riwayat }) {
  if (!riwayat || riwayat.length < 2) {
    return (
      <Card title="📈 Grafik Pertumbuhan Aset" icon="">
        <div className="text-center py-8">
          <p className="text-slate-400 text-sm">
            Belum ada cukup data untuk grafik.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Catat aset Anda minimal 2x untuk melihat tren.
          </p>
        </div>
      </Card>
    )
  }

  const data = riwayat.map((r) => ({
    tanggal: new Date(r.tanggal).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    }),
    aset: r.totalAset,
  }))

  const formatRupiah = (val) =>
    new Intl.NumberFormat('id-ID', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(val)

  return (
    <Card title="📈 Grafik Pertumbuhan Aset" icon="">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="tanggal" tick={{ fontSize: 11 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={formatRupiah}
            domain={['auto', 'auto']}
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(value)
            }
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="aset"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}