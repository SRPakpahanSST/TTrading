import { useNavigate } from 'react-router-dom'
import { useDashboardData } from '../../hooks/useDashboardData'
import { useMantra } from '../../hooks/useMantra'
import { useMisi } from '../../hooks/useMisi'
import NotificationBanner from './NotificationBanner'
import QuickActions from './QuickActions'
import PortfolioSummary from './PortfolioSummary'
import PilarRadar from './PilarRadar'
import AssetChart from './AssetChart'
import AmalSummary from './AmalSummary'
import DosaAlert from './DosaAlert'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function Dashboard() {
  const navigate = useNavigate()
  const { portfolio, pilar, amal, dosa, loading } = useDashboardData()
  const mantra = useMantra()
  const { misi, misiHariIni, xpHariIni, levelInfo, streakMisi } = useMisi()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400">Memuat data...</p>
      </div>
    )
  }

  const totalMisi = misi.length
  const misiSelesai = misiHariIni.length
  const progressPersen = Math.round((misiSelesai / totalMisi) * 100)

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📊 Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Selamat datang kembali! Mari lihat perkembangan portofolio Anda.
        </p>
      </div>

      <NotificationBanner />

      {/* WIDGET MISI HARIAN */}
      <Card
        className="bg-gradient-to-br from-amber-500 to-orange-600 text-white cursor-pointer hover:shadow-xl transition-all"
        onClick={() => navigate('/misi')}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-amber-100 text-sm">Misi Hari Ini</p>
            <p className="text-2xl font-bold">
              {misiSelesai}/{totalMisi} selesai
            </p>
          </div>
          <div className="text-right">
            <p className="text-amber-100 text-sm">XP Hari Ini</p>
            <p className="text-2xl font-bold">⭐ {xpHariIni}</p>
          </div>
        </div>

        <div className="w-full bg-amber-900/30 rounded-full h-2.5 mb-2">
          <div
            className="bg-white h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPersen}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-amber-100">
            {levelInfo.current.icon} {levelInfo.current.nama}
          </span>
          <span className="text-amber-100">
            🔥 Streak: {streakMisi} hari
          </span>
        </div>
      </Card>

      {/* MANTRA */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-700">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🧘</span>
          <div className="flex-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">Mantra Hari Ini</p>
            <p className="text-lg font-semibold text-slate-800 dark:text-white">
              "{mantra.teks}"
            </p>
          </div>
        </div>
      </Card>

      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioSummary portfolio={portfolio} />
        <PilarRadar pilar={pilar} />
      </div>

      <AssetChart riwayat={portfolio.riwayat} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AmalSummary amal={amal} />
        <DosaAlert dosa={dosa} />
      </div>
    </div>
  )
}