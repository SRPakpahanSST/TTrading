import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'

export default function PilarRadar({ pilar }) {
  const navigate = useNavigate()

  const items = [
    { nama: 'Raja Makro', skor: pilar.rajaMakro, warna: 'bg-blue-500' },
    { nama: 'Pembunuh Jangka Pendek', skor: pilar.pembunuh, warna: 'bg-red-500' },
    { nama: 'Sentuhan Emas', skor: pilar.sentuhanEmas, warna: 'bg-amber-500' },
    { nama: 'Dewa Fundamental', skor: pilar.dewaFundamental, warna: 'bg-green-500' },
  ]

  const total = items.reduce((sum, p) => sum + p.skor, 0)

  // Cari pilar dengan skor terendah untuk rekomendasi
  const terendah = items.reduce((min, p) => (p.skor < min.skor ? p : min), items[0])

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          🏛️ Skor 4 Pilar
        </h2>
        <span className="text-2xl font-bold text-amber-500">{total}/40</span>
      </div>

      <div className="space-y-4">
        {items.map((p, i) => (
          <ProgressBar
            key={i}
            value={p.skor}
            max={10}
            color={p.warna}
            label={p.nama}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Rekomendasi:</strong> Fokus latih <strong>{terendah.nama}</strong>.
        </p>
      </div>

      <button
        onClick={() => navigate('/jurnal')}
        className="w-full mt-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition"
      >
        Update Skor di Jurnal
      </button>
    </Card>
  )
}