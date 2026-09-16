import { useDashboardData } from '../../hooks/useDashboardData'
import { useMantra } from '../../hooks/useMantra'
import NotificationBanner from './NotificationBanner'
import QuickActions from './QuickActions'
import PortfolioSummary from './PortfolioSummary'
import PilarRadar from './PilarRadar'
import AssetChart from './AssetChart'
import AmalSummary from './AmalSummary'
import DosaAlert from './DosaAlert'
import Card from '../../components/ui/Card'

export default function Dashboard() {
  const { portfolio, pilar, amal, dosa, loading } = useDashboardData()
  const mantra = useMantra()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-400">Memuat data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📊 Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Selamat datang kembali! Mari lihat perkembangan portofolio Anda.
        </p>
      </div>

      {/* NOTIFIKASI */}
      <NotificationBanner />

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

      {/* QUICK ACTIONS */}
      <QuickActions />

      {/* PORTOFOLIO & PILAR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioSummary portfolio={portfolio} />
        <PilarRadar pilar={pilar} />
      </div>

      {/* GRAFIK ASET */}
      <AssetChart riwayat={portfolio.riwayat} />

      {/* AMAL & DOSA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AmalSummary amal={amal} />
        <DosaAlert dosa={dosa} />
      </div>
    </div>
  )
}