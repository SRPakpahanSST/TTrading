import Card from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'

export default function PilarRadar() {
  const pilar = [
    { nama: 'Raja Makro', skor: 8, warna: 'bg-blue-500' },
    { nama: 'Pembunuh Jangka Pendek', skor: 6, warna: 'bg-red-500' },
    { nama: 'Sentuhan Emas', skor: 10, warna: 'bg-amber-500' },
    { nama: 'Dewa Fundamental', skor: 9, warna: 'bg-green-500' },
  ]

  const total = pilar.reduce((sum, p) => sum + p.skor, 0)

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          🏛️ Skor 4 Pilar
        </h2>
        <span className="text-2xl font-bold text-amber-500">{total}/40</span>
      </div>

      <div className="space-y-4">
        {pilar.map((p, index) => (
          <ProgressBar
            key={index}
            value={p.skor}
            max={10}
            color={p.warna}
            label={p.nama}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-slate-700 rounded-xl">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Rekomendasi:</strong> Fokus latih <strong>Pembunuh Jangka Pendek</strong> 
          — berani entry saat sinyal muncul.
        </p>
      </div>
    </Card>
  )
}