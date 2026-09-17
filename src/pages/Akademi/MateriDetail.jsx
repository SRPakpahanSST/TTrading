import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useAkademi } from '../../hooks/useAkademi'

export default function MateriDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { semuaMateri, progress, tandaiSelesai, simpanSkorKuis } = useAkademi()

  const materi = semuaMateri.find((m) => m.id === id)
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

  const selesai = progress.materiSelesai.includes(materi.id)
  const skorLama = progress.kuisSkor[materi.id]

  const handleJawab = (soalIndex, pilihanIndex) => {
    setJawaban({ ...jawaban, [soalIndex]: pilihanIndex })
  }

  const handleSubmitKuis = () => {
    let benar = 0
    materi.kuis.forEach((soal, i) => {
      if (jawaban[i] === soal.jawaban) benar++
    })
    const skor = benar
    setHasilKuis({ benar, total: materi.kuis.length, skor })
    simpanSkorKuis(materi.id, skor)
  }

  const handleTandaiSelesai = () => {
    tandaiSelesai(materi.id)
    setShowKuis(true)
  }

  return (
    <div className="space-y-6 fade-in">
      <button
        onClick={() => navigate('/akademi')}
        className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-500"
      >
        ← Kembali ke Akademi
      </button>

      {/* HEADER MATERI */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-3xl">{materi.icon}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              {materi.judul}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge color="gray" size="sm">⏱️ {materi.durasi}</Badge>
              {selesai && <Badge color="green" size="sm">✅ Selesai</Badge>}
              {skorLama !== undefined && (
                <Badge color="amber" size="sm">🎯 Skor {skorLama}/{materi.kuis.length}</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* KONTEN */}
      <Card>
        <div className="space-y-4">
          {materi.konten.map((item, i) => {
            if (item.tipe === 'paragraf') {
              return (
                <p key={i} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {item.teks}
                </p>
              )
            }
            if (item.tipe === 'heading') {
              return (
                <h2 key={i} className="text-xl font-bold text-slate-800 dark:text-white pt-4">
                  {item.teks}
                </h2>
              )
            }
            if (item.tipe === 'list') {
              return (
                <ul key={i} className="space-y-2">
                  {item.items.map((li, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <span className="text-indigo-500 mt-1">●</span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )
            }
            if (item.tipe === 'highlight') {
              return (
                <div key={i} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border-l-4 border-amber-500">
                  <p className="text-slate-700 dark:text-slate-200 italic font-medium">
                    💡 "{item.teks}"
                  </p>
                </div>
              )
            }
            return null
          })}
        </div>
      </Card>

      {/* RANGKUMAN */}
      <Card title="📝 Rangkuman" icon="">
        <div className="space-y-2">
          {materi.rangkuman.map((r, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <span className="text-green-500 font-bold">✓</span>
              <p className="text-slate-700 dark:text-slate-300 text-sm">{r}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* TOMBOL SELESAI */}
      {!selesai && (
        <Button onClick={handleTandaiSelesai} className="w-full">
          ✅ Tandai Selesai & Lanjut Kuis
        </Button>
      )}

      {/* KUIS */}
      {(selesai || showKuis) && (
        <Card title="🎯 Kuis Pemahaman" icon="">
          {!hasilKuis ? (
            <div className="space-y-6">
              {materi.kuis.map((soal, i) => (
                <div key={i} className="space-y-3">
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {i + 1}. {soal.soal}
                  </p>
                  <div className="space-y-2">
                    {soal.pilihan.map((p, j) => (
                      <button
                        key={j}
                        onClick={() => handleJawab(i, j)}
                        className={`w-full text-left p-3 rounded-xl border-2 transition ${
                          jawaban[i] === j
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-slate-700'
                            : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                        }`}
                      >
                        <span className="font-semibold text-slate-500 dark:text-slate-400 mr-2">
                          {String.fromCharCode(65 + j)}.
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{p}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                onClick={handleSubmitKuis}
                disabled={Object.keys(jawaban).length < materi.kuis.length}
                className="w-full"
              >
                📤 Kirim Jawaban
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <span className="text-6xl">
                {hasilKuis.skor === hasilKuis.total ? '🏆' : hasilKuis.skor >= 2 ? '🎉' : '💪'}
              </span>
              <p className="text-3xl font-bold text-slate-800 dark:text-white mt-4">
                {hasilKuis.skor}/{hasilKuis.total}
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {hasilKuis.skor === hasilKuis.total
                  ? 'Sempurna! Anda paham materi ini.'
                  : hasilKuis.skor >= 2
                  ? 'Bagus! Sedikit lagi sempurna.'
                  : 'Jangan menyerah. Baca ulang materinya.'}
              </p>

              {/* PEMBAHASAN */}
              <div className="mt-6 text-left space-y-3">
                {materi.kuis.map((soal, i) => {
                  const benar = jawaban[i] === soal.jawaban
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl ${
                        benar
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : 'bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
                        {benar ? '✅' : '❌'} {soal.soal}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Jawaban: <strong>{soal.pilihan[soal.jawaban]}</strong>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                        {soal.penjelasan}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setHasilKuis(null)
                    setJawaban({})
                  }}
                  className="flex-1"
                >
                  🔄 Ulangi Kuis
                </Button>
                <Button onClick={() => navigate('/akademi')} className="flex-1">
                  → Materi Lain
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}