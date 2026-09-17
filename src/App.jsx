import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
// ... import lain
import Akademi from './pages/Akademi'
import LevelDetail from './pages/Akademi/LevelDetail'
import MateriDetail from './pages/Akademi/MateriDetail'
import UjianAkhir from './pages/Akademi/UjianAkhir'

function App() {
  return (
    <Layout>
      <Routes>
        {/* ... route lain */}
        <Route path="/akademi" element={<Akademi />} />
        <Route path="/akademi/level/:levelId" element={<LevelDetail />} />
        <Route path="/akademi/materi/:id" element={<MateriDetail />} />
        <Route path="/akademi/ujian-akhir" element={<UjianAkhir />} />
        {/* ... route lain */}
      </Routes>
    </Layout>
  )
}

export default App
