import { useState } from 'react'
import Card from '../../components/ui/Card'
import PortfolioSummary from './PortfolioSummary'
import PilarRadar from './PilarRadar'
import DosaAlert from './DosaAlert'
import MantraCard from '../../components/shared/MantraCard'

export default function Dashboard() {
  const mantra = "Sabar menunggu, cepat bertindak. Hati tenang, tangan cepat."

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

      {/* MANTRA */}
      <MantraCard mantra={mantra} />

      {/* GRID UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioSummary />
        <PilarRadar />
      </div>

      {/* DOSA ALERT */}
      <DosaAlert />
    </div>
  )
}