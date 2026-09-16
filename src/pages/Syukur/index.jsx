import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { useSyukur } from '../../hooks/useSyukur'

const moodList = [
  { value: 'bahagia', label: 'Bahagia', icon: '😊' },
  { value: 'tenang', label: 'Tenang', icon: '😌' },
  { value: 'biasa', label: 'Biasa', icon: '😐' },
  { value: 'cemas', label: 'Cemas', icon: '😰' },
  { value: 'sedih', label: 'Sedih', icon: '😢' },
]

export default function Syukur() {
  const { syukur, tambahSyukur, hapusSyukur, hariIniSudahIsi, totalSyukur, getStreakSyukur } = useSyukur()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    hal1: '',
    hal2: '',
    hal3: '',
    mood: 'tenang',
    catatan: '',
  })

  const streak = getStreakSyukur()
  const sudahIsi = hariIniSudahIsi()

  const handleSimpan = () => {
    if (!form.hal1.trim()) {
      alert('Minimal isi 1 hal yang disyukuri')
      return
    }

    const tigaHal = [form.hal1, form.hal2, form.hal3].filter((h) => h.trim())
    tambahSyukur({
      tigaHal,
      mood: form.mood,
      catatan: form.catatan,
    })

    setForm({ hal1: '', hal2: '', hal3: '', mood: 'tenang', catatan: '' })
    setShowModal(false)
  }

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            🙏 Jurnal Syukur
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Catat 3 hal yang disyukuri setiap hari.
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Isi</Button>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700">
          <div className="text-center">
            <span className="text-3xl">🔥</span>
            <p className="text-3xl font-bold text-green-600 mt-2">{streak}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Streak Syukur</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700">
          <div className="text-center">
            <span className="text-3xl">📖</span>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalSyukur}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Entri</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 col-span-2 md:col-span-1">
          <div className="text-center">
            <span className="text-3xl">{sudahIsi ? '✅' : '⏳'}</span>
            <p className="text-xl font-bold text-amber-600 mt-2">
              {sudahIsi ? 'Sudah hari ini' : 'Belum hari ini'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
          </div>
        </Card>
      </div>

      {/* RIWAYAT */}
      {syukur.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <span className="text-5xl">🙏</span>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              Belum ada jurnal syukur.
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Mulai catat 3 hal yang Anda syukuri hari ini.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {syukur.slice(0, 20).map((item) => {
            const moodData = moodList.find((m) => m.value === item.mood)
            return (
              <Card key={item.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">
                      {formatTanggal(item.tanggal)}
                    </p>
                    <Badge color="blue" size="sm">
                      {moodData?.icon} {moodData?.label}
                    </Badge>
                  </div>
                  <button
                    onClick={() => hapusSyukur(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  {item.tigaHal.map((hal, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2 bg-green-50 dark:bg-slate-700 rounded-lg"
                    >
                      <span className="text-green-500 font-bold">{i + 1}.</span>
                      <p className="text-sm text-slate-700 dark:text-slate-300 flex-1">
                        {hal}
                      </p>
                    </div>
                  ))}
                </div>

                {item.catatan && (
                  <div className="mt-3 p-3 bg-amber-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-xs text-amber-700 dark:text-amber-400 italic">
                      💭 {item.catatan}
                    </p>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {/* MODAL ISI */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="🙏 Jurnal Syukur Hari Ini"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Catat 3 hal yang Anda syukuri hari ini:
          </p>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              1. Hal Pertama *
            </label>
            <input
              type="text"
              value={form.hal1}
              onChange={(e) => setForm({ ...form, hal1: e.target.value })}
              placeholder="Contoh: Kesehatan yang baik"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              2. Hal Kedua
            </label>
            <input
              type="text"
              value={form.hal2}
              onChange={(e) => setForm({ ...form, hal2: e.target.value })}
              placeholder="Contoh: Keluarga yang mendukung"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              3. Hal Ketiga
            </label>
            <input
              type="text"
              value={form.hal3}
              onChange={(e) => setForm({ ...form, hal3: e.target.value })}
              placeholder="Contoh: Rezeki hari ini"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Mood Hari Ini
            </label>
            <div className="grid grid-cols-5 gap-2">
              {moodList.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setForm({ ...form, mood: m.value })}
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition ${
                    form.mood === m.value
                      ? 'border-amber-500 bg-amber-50 dark:bg-slate-700'
                      : 'border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Catatan (opsional)
            </label>
            <textarea
              value={form.catatan}
              onChange={(e) => setForm({ ...form, catatan: e.target.value })}
              rows="2"
              placeholder="Ceritakan sedikit..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <Button onClick={handleSimpan} className="w-full">
            💾 Simpan Syukur
          </Button>
        </div>
      </Modal>
    </div>
  )
}