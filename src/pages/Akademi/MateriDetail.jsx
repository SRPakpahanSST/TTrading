import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useAkademi, LEVELS } from '../../hooks/useAkademi'

export default function MateriDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Cari materi di semua level
  let materi = null
  let levelMateri = null
  for (const lv of LEVELS) {
    const m = lv.materi.find((x) => x.id === id)
    if (m) {
      materi = m
      levelMateri = lv
      break
    }
  }

  const { progress, tandaiSelesai, simpanSkorKuis } = useAkademi(levelMateri?.level || 1)

  const [showKuis, setShowKuis] = useState(false)
  const [jawaban, setJawaban] = useState({})
  const [hasilKuis, setHasilKuis] = useState(null)

  if (!materi) {
    return (
      <div className="space-y-6 fade-in">
        <Card>
          <p className="text-center py-8 text-slate-400">Materi tidak ditemukan.</p>
        </Card>
        <Button onClick={() => navigate('/akademi')}>← Kembali</Button>
      </div>
    )
  }

  const levelNum = levelMateri.level
  const selesai = (progress.materiSelesai[levelNum] || []).includes(materi.id)
  const skorLama = progress.kuisSkor[materi.id]

  const handleJawab = (soalIndex, pilihanIndex) => {
    setJawaban({ ...jawaban, [soalIndex]: pilihanIndex })
  }

  const handleSubmitKuis = () => {
    let benar = 0
    materi.kuis.forEach((soal, i) => {
      if (jawaban[i] === soal.jawaban) benar++
    })
    setHasilKuis({ benar, total: materi.kuis.length, skor: benar })
    simpanSkorKuis(materi.id, benar)
  }

  const handleTandaiSelesai = () => {
    tandaiSelesai(materi.id)
    setShowKuis(true)
  }

  return (
    <div className="space-y-6 fade-in">
      <button
        onClick={() => navigate(`/akademi/level/${levelNum}`)}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-500"
      >
        ← Kembali ke Level {levelNum}