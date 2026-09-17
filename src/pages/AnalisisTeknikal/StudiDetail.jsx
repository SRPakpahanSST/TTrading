import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useStudiKasus } from '../../hooks/useStudiKasus'

export default function StudiDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studiKasus, kategori, progress, jawabStudi } = useStudiKasus()

  const studi = studiKasus.find((s) => s.id === parseInt(id))
  const [pilihanTerpilih, setPilihanTerpilih] = useState(null)
  const [sudahJawab, setSudahJawab] = useState(false)

  if (!studi) {
    return (
      <div className="space-y-6 fade-in">
        <Card>
          <p className="text-center py-8 text-slate-400">Studi kasus tidak ditemukan.</p>
        </Card>
        <Button onClick={() => navigate('/analisis-teknikal')}>← Kembali</Button>
      </div>
    )
  }

  const benar = pilihanTerpilih === studi.jawaban
  const kategoriNama = kategori.find((k) => k.id === studi.kategori)?.nama || studi.kategori

  const handlePilih = (index) => {
    if (sudahJawab) return
    setPilihanTerpilih(index)
  }

  const handleSubmit = () => {
    if (pilihanTerpilih === null) return
    const isBenar = pilihanTerpilih === studi.jawaban
    setSudahJawab(true)
    jawabStudi(studi.id, pilihanTerpilih, isBenar)
  }

  const handleReset = () => {
    setPilihanTerpilih(null)
    setSudahJawab(false)
  }

  // Buat SVG chart dari chartData
  const buatChart = () => {
    const data = studi.chartData
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const width = 300
    const height = 150
    const stepX = width / (data.length - 1)

    const points = data
      .map((v, i) => {
        const x = i * stepX
        const y = height - ((v - min) / range) * height
        return `${x},${y}`
      })
      .join(' ')

    const supportY = studi.supportLevel
      ? height - ((studi.supportLevel - min) / range) * height
      : null
    const resistanceY = studi.resistanceLevel
      ? height - ((studi.resistanceLevel - min) / range) * height
      : null

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
        {/* Grid */}
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="#e2e8f0" strokeDasharray="2,2" strokeWidth="0.5" />
        
        {/* Support line */}
        {supportY !== null && (
          <>
            <line x1="0" y1={supportY} x2={width} y2={supportY} stroke="#22c55e" strokeWidth="1" strokeDasharray="4,2" />
            <text x="5" y={supportY - 3} fontSize="8" fill="#22c55e">Support</text>
          </>
        )}

        {/* Resistance line */}
        {resistanceY !== null && (
          <>
            <line x1="0" y1={resistanceY} x2={width} y2={resistanceY} stroke="#ef4444" strokeWidth="1" strokeDasharray="4,2" />
            <text x="5" y={resistanceY - 3} fontSize="8" fill="#ef4444">Resistance</text>
          </>
        )}

        {/* Line chart */}
        <polyline
          points={points}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {data.map((v, i) => {
          const x = i * stepX
          const y = height - ((v - min) / range) * height
          return <circle key={i} cx={x} cy={y} r="2" fill="#f59e0b" />
        })}
      </svg>
    )
  }

  const buatVolumeChart = () => {
    if (!studi.volumeData) return null
    const data = studi.volumeData
    const max = Math.max(...data)
    const width = 300
    const height = 60
    const barWidth = width / data.length - 2

    return (
      <div className="mt-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Volume</p>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
          {data.map((v, i) => {
            const barHeight = (v / max) * height
            const x = i * (width / data.length) + 1
            return (
              <rect
                key={i}
                x={x}
                y={height - barHeight}
                width={barWidth}
                height={barHeight}
                fill="#6366f1"
                opacity="0.7"
              />
            )
          })}
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-in">
      <button
        onClick={() => navigate('/analisis-teknikal')}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-500"
      >
        ← Kembali ke Analisis Teknikal
      </button>

      {/* HEADER */}
      <Card>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <Badge color="purple" size="sm">
            Studi Kasus #{studi.id}
          </Badge>
          <Badge color="blue" size="sm">
            {kategoriNama}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          {studi.judul}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {studi.deskripsi}
        </p>
      </Card>

      {/* CHART */}
      <Card title="📊 Grafik Harga" icon="">
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3">
          {buatChart()}
        </div>
        {buatVolumeChart()}
      </Card>

      {/* PERTANYAAN */}
      <Card>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          ❓ {studi.pertanyaan}
        </h2>
        <div className="space-y-2">
          {studi.pilihan.map((p, i) => {
            const terpilih = pilihanTerpilih === i
            const isJawabanBenar = i === studi.jawaban

            let warnaKelas = 'border-slate-200 dark:border-slate-600 hover:border-indigo-300'
            if (sudahJawab) {
              if (isJawabanBenar) {
                warnaKelas = 'border-green-500 bg-green-50 dark:bg-green-900/20'
              } else if (terpilih && !isJawabanBenar) {
                warnaKelas = 'border-red-500 bg-red-50 dark:bg-red-900/20'
              }
            } else if (terpilih) {
              warnaKelas = 'border-indigo-500 bg-indigo-50 dark:bg-slate-700'
            }

            return (
              <button
                key={i}
                onClick={() => handlePilih(i)}
                disabled={sudahJawab}
                className={`w-full text-left p-4 rounded-xl border-2 transition ${warnaKelas} ${
                  sudahJawab ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-500 dark:text-slate-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <span className="flex-1 text-slate-700 dark:text-slate-300">
                    {p}
                  </span>
                  {sudahJawab && isJawabanBenar && (
                    <span className="text-green-600 text-xl">✅</span>
                  )}
                  {sudahJawab && terpilih && !isJawabanBenar && (
                    <span className="text-red-600 text-xl">❌</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {!sudahJawab && (
          <Button
            onClick={handleSubmit}
            disabled={pilihanTerpilih === null}
            className="w-full mt-4"
          >
            📤 Kirim Jawaban
          </Button>
        )}
      </Card>

      {/* HASIL & PENJELASAN */}
      {sudahJawab && (
        <>
          <Card
            className={`${
              benar
                ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                : 'bg-gradient-to-br from-red-500 to-rose-600'
            } text-white`}
          >
            <div className="text-center py-4">
              <span className="text-5xl">{benar ? '🎉' : '💪'}</span>
              <h2 className="text-2xl font-bold mt-2">
                {benar ? 'Benar!' : 'Belum Tepat'}
              </h2>
              <p className="text-sm opacity-90 mt-1">
                Jawaban benar: {String.fromCharCode(65 + studi.jawaban)}.{' '}
                {studi.pilihan[studi.jawaban]}
              </p>
            </div>
          </Card>

          <Card title="💡 Penjelasan" icon="">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {studi.penjelasan}
            </p>
          </Card>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleReset} className="flex-1">
              🔄 Ulangi
            </Button>
            <Button onClick={() => navigate('/analisis-teknikal')} className="flex-1">
              → Studi Lain
            </Button>
          </div>
        </>
      )}
    </div>
  )
}