import { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export default function Pengaturan() {
  const [settings, setSettings] = useState({
    notifikasiAktif: true,
    targetProfit: 5,
    maxDrawdown: 10,
    komitmenAmal: 2,
  })

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings))
    alert('Pengaturan disimpan!')
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          ⚙️ Pengaturan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Sesuaikan aplikasi dengan preferensi Anda.
        </p>
      </div>

      {/* PROFIL */}
      <Card title="👤 Profil" icon="">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-2xl">
            P
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white">Pengguna PMD</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Anggota PMD Impact Invest
            </p>
          </div>
        </div>
      </Card>

      {/* PENGATURAN TRADING */}
      <Card title="📊 Pengaturan Trading" icon="">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Target Profit Bulanan (%)
            </label>
            <input
              type="number"
              value={settings.targetProfit}
              onChange={(e) => setSettings({ ...settings, targetProfit: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Max Drawdown (%)
            </label>
            <input
              type="number"
              value={settings.maxDrawdown}
              onChange={(e) => setSettings({ ...settings, maxDrawdown: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Komitmen Amal (%)
            </label>
            <input
              type="number"
              value={settings.komitmenAmal}
              onChange={(e) => setSettings({ ...settings, komitmenAmal: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </Card>

      {/* NOTIFIKASI */}
      <Card title="🔔 Notifikasi" icon="">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800 dark:text-white">
              Aktifkan Notifikasi
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Dapatkan pengingat harian untuk trading dengan tenang.
            </p>
          </div>
          <button
            onClick={() => setSettings({ ...settings, notifikasiAktif: !settings.notifikasiAktif })}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              settings.notifikasiAktif ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.notifikasiAktif ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* TOMBOL SIMPAN */}
      <Button variant="primary" className="w-full" onClick={handleSave}>
        💾 Simpan Pengaturan
      </Button>

      {/* INFO APLIKASI */}
      <Card>
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="font-bold text-slate-800 dark:text-white mb-1">
            🌱 Tenang Trading v1.0.0
          </p>
          <p>"Hati adalah grafik Candlestick terbesar."</p>
          <p className="mt-2">© 2026 PMD Impact Invest</p>
        </div>
      </Card>
    </div>
  )
}