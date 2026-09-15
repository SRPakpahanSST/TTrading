import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'

const daftarDosa = [
  {
    nama: 'Keserakahan',
    icon: '🤑',
    deskripsi: 'Ingin untung besar cepat, tidak mau ambil profit.',
    pilar: 'Dewa Fundamental',
    latihan: 'Simulasi: Jual di target vs tahan',
  },
  {
    nama: 'Ketakutan',
    icon: '😨',
    deskripsi: 'Panik saat harga turun, cut loss di dasar.',
    pilar: 'Raja Makro',
    latihan: 'Simulasi: Cut loss vs hold',
  },
  {
    nama: 'Harapan',
    icon: '🙏',
    deskripsi: 'Berharap harga naik terus padahal tren turun.',
    pilar: 'Sentuhan Emas',
    latihan: 'Simulasi: Hold vs cut',
  },
  {
    nama: 'Penyesalan',
    icon: '😔',
    deskripsi: 'Menyesal tidak beli di bawah, menyesal jual terlalu cepat.',
    pilar: 'Raja Makro',
    latihan: 'Simulasi: FOMO vs sabar',
  },
  {
    nama: 'Kesombongan',
    icon: '😤',
    deskripsi: 'Merasa paling benar, tidak mau lihat data.',
    pilar: 'Dewa Fundamental',
    latihan: 'Simulasi: Analisis vs feeling',
  },
  {
    nama: 'Keraguan',
    icon: '🤔',
    deskripsi: 'Tidak berani entry saat sinyal muncul.',
    pilar: 'Pembunuh Jangka Pendek',
    latihan: 'Simulasi: Entry vs tunggu',
  },
  {
    nama: 'Kebingungan',
    icon: '😵',
    deskripsi: 'Tidak tahu arah pasar, terlalu banyak informasi.',
    pilar: 'Dewa Fundamental',
    latihan: 'Simulasi: Fokus vs multitasking',
  },
]

export default function DosaDagang() {
  const [selectedDosa, setSelectedDosa] = useState(null)

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🧠 7 Dosa Dagang
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Deteksi, latih, dan atasi dosa dagang yang menghantui Anda.
        </p>
      </div>

      {/* GRID DOSA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daftarDosa.map((dosa, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            onClick={() => setSelectedDosa(dosa)}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{dosa.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                  {dosa.nama}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {dosa.deskripsi}
                </p>
                <Badge color="purple" size="sm">
                  {dosa.pilar}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* DETAIL DOSA */}
      {selectedDosa && (
        <Card title={`${selectedDosa.icon} ${selectedDosa.nama}`} icon="">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Deskripsi</p>
              <p className="text-slate-700 dark:text-slate-300">{selectedDosa.deskripsi}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Pilar Penangkal</p>
              <Badge color="purple">{selectedDosa.pilar}</Badge>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Latihan</p>
              <p className="text-slate-700 dark:text-slate-300">{selectedDosa.latihan}</p>
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => alert(`Memulai latihan: ${selectedDosa.latihan}`)}
            >
              🎯 Mulai Latihan
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setSelectedDosa(null)}
            >
              Tutup
            </Button>
          </div>
        </Card>
      )}

      {/* STATISTIK DOSA */}
      <Card title="📊 Statistik Dosa" icon="">
        <div className="space-y-3">
          {daftarDosa.slice(0, 3).map((dosa, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                {dosa.icon} {dosa.nama}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-white">
                  {Math.floor(Math.random() * 10)}/10
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}