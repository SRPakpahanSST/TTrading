import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Simulasi from './pages/Simulasi'
import SimulasiLanjutan from './pages/SimulasiLanjutan'
import Jurnal from './pages/Jurnal'
import Analisis from './pages/Analisis'
import DosaDagang from './pages/DosaDagang'
import Meditasi from './pages/Meditasi'
import Kalkulator from './pages/Kalkulator'
import Amal from './pages/Amal'
import Pengaturan from './pages/Pengaturan'
import Watchlist from './pages/Watchlist'
import Streak from './pages/Streak'
import Screener from './pages/Screener'
import Kalender from './pages/Kalender'
import Leaderboard from './pages/Leaderboard'
import BadgePage from './pages/Badge'
import Bagikan from './pages/Bagikan'
import LaporanAmal from './pages/LaporanAmal'
import Syukur from './pages/Syukur'
import DoaPagi from './pages/DoaPagi'
import Akademi from './pages/Akademi'
import LevelDetail from './pages/Akademi/LevelDetail'
import MateriDetail from './pages/Akademi/MateriDetail'
import UjianAkhir from './pages/Akademi/UjianAkhir'
import Misi from './pages/Misi'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/misi" element={<Misi />} />
        <Route path="/akademi" element={<Akademi />} />
        <Route path="/akademi/level/:levelId" element={<LevelDetail />} />
        <Route path="/akademi/materi/:id" element={<MateriDetail />} />
        <Route path="/akademi/ujian-akhir" element={<UjianAkhir />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/screener" element={<Screener />} />
        <Route path="/kalender" element={<Kalender />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/badge" element={<BadgePage />} />
        <Route path="/bagikan" element={<Bagikan />} />
        <Route path="/laporan-amal" element={<LaporanAmal />} />
        <Route path="/syukur" element={<Syukur />} />
        <Route path="/doa-pagi" element={<DoaPagi />} />
        <Route path="/simulasi" element={<Simulasi />} />
        <Route path="/simulasi-lanjutan" element={<SimulasiLanjutan />} />
        <Route path="/jurnal" element={<Jurnal />} />
        <Route path="/analisis" element={<Analisis />} />
        <Route path="/dosa" element={<DosaDagang />} />
        <Route path="/meditasi" element={<Meditasi />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/amal" element={<Amal />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </Layout>
  )
}

export default App