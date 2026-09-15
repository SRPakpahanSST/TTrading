import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import LineChart from '../../components/ui/LineChart'

export default function Analisis() {
  const [kodeSaham, setKodeSaham] = useState('BRIS')

  const dataBullBear = [
    { name: 'Jan', value: 1500 },
    { name: 'Feb', value: 1650 },
    { name: 'Mar', value: 1700 },
    { name: 'Apr', value: 1800 },
    { name: 'Mei', value: 1750 },
    { name: 'Jun', value: 1850 },
    { name: 'Jul', value: 1900 },
  ]

  const ma200 = 1700
  const hargaSekarang = 1900
  const zona = hargaSekarang > ma200 ? 'Raja' : 'Bandit'

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📈 Analisis
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Analisis fundamental dan teknikal saham pilihan Anda.
        </p>
      </div>

      {/* INPUT SAHAM */}
      <Card>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={kodeSaham}
            onChange={(e) => setKodeSaham(e.target.value.toUpperCase())}
            placeholder="Kode Saham"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Badge color={zona === 'Raja' ? 'green' : 'red'} size="lg">
            Zona {zona}
          </Badge>
        </div>
      </Card>

      {/* GRAFIK BULL-BEAR */}
      <Card title={`📊 Grafik ${kodeSaham}`} icon="">
        <LineChart data={dataBullBear} dataKey="value" xKey="name" />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400">Harga Sekarang</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">
              Rp {hargaSekarang.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <p className="text-sm text-slate-500 dark:text-slate-400">MA200 (Bull-Bear)</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">
              Rp {ma200.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </Card>

      {/* ALIRAN DANA ASING */}
      <Card title="🌍 Aliran Dana Asing" icon="">
        <div className="space-y-3">
          {[
            { tanggal: '15 Sep', nilai: 1220000000000, arah: 'masuk' },
            { tanggal: '14 Sep', nilai: -450000000000, arah: 'keluar' },
            { tanggal: '13 Sep', nilai: 780000000000, arah: 'masuk' },
          ].map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl"
            >
              <span className="text-slate-600 dark:text-slate-300">{d.tanggal}</span>
              <div className="flex items-center gap-2">
                <Badge color={d.arah === 'masuk' ? 'green' : 'red'}>
                  {d.arah}
                </Badge>
                <span className={`font-semibold ${
                  d.nilai > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  Rp {(d.nilai / 1000000000).toFixed(0)} M
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}