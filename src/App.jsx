import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Simulasi from './pages/Simulasi'
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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/streak" element={<Streak />} />
        <Route path="/screener" element={<Screener />} />
        <Route path="/kalender" element={<Kalender />} />
        <Route path="/simulasi" element={<Simulasi />} />
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
