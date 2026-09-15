import Card from '../../components/ui/Card'
import DosaAlertItem from '../../components/shared/DosaAlert'

export default function DosaAlert() {
  const dosa = [
    {
      nama: 'Keserakahan',
      status: 'waspada',
      pesan: 'Profit sudah 8%. Jangan tunggu lebih tinggi.',
    },
    {
      nama: 'Ketakutan',
      status: 'aman',
      pesan: 'Harga masih di atas Bull-Bear. Tenang.',
    },
    {
      nama: 'Keraguan',
      status: 'bahaya',
      pesan: 'Sinyal dua letusan muncul. Berani entry!',
    },
  ]

  return (
    <Card title="🧠 Detektor 7 Dosa Dagang" icon="">
      <div className="space-y-3">
        {dosa.map((d, index) => (
          <DosaAlertItem
            key={index}
            dosa={d.nama}
            status={d.status}
            pesan={d.pesan}
          />
        ))}
      </div>

      <button className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition">
        🎯 Buka Latihan 7 Dosa
      </button>
    </Card>
  )
}