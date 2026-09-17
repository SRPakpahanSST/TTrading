import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useUjian } from '../../hooks/useUjian'
import { useAkademi } from '../../hooks/useAkademi'

export default function UjianAkhir() {
  const navigate = useNavigate()
  const { ujian, soal, totalSoal, nilaiLulus, hasilUjian, simpanHasil } = useUjian()
  const { levels, progress } = useAkademi(1)

  const [mode, setMode] = useState('intro') // intro | ujian | hasil
  const [jawaban, setJawaban] = useState({})
  const [waktuTersisa, setWaktuTersisa] = useState(ujian.durasiMenit * 60)
  const [hasilSekarang, setHasilSekarang] = useState(null)

  // Cek apakah semua level selesai
  const semuaLevelSelesai = levels.every((lv) => {
    const selesai = (progress.materiSelesai[lv.level] || []).length
    return selesai === lv.materi.length
  })

  // Timer
  useEffect(() => {
    if (mode !== 'ujian') return
    if (waktuTersisa <= 0) {
      handleSubmit()
      return
    }
    const timer = setInterval(() => {
      setWaktuTersisa((t) => t - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [mode, waktuTersisa])

  const handleJawab = (soalId, pilihanIndex) => {
    setJawaban({ ...jawaban, [soalId]: pilihanIndex })
  }

  const handleSubmit = () => {
    let benar = 0
    soal.forEach((s) => {
      if (jawaban[s.id] === s.jawaban) benar++
    })
    const skor = Math.round((benar / totalSoal) * 100)
    const hasil = simpanHasil(skor, benar)
    setHasilSekarang(hasil)
    setMode('hasil')
  }

  const handleMulai = () => {
    setJawaban({})
    setWaktuTersisa(ujian.durasiMenit * 60)
    setHasilSekarang(null)
    setMode('ujian')
  }

  const formatWaktu = (detik) => {
    const m = Math.floor(detik / 60)
    const s = detik % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // === MODE: INTRO ===
  if (mode === 'intro') {
    return (
      <div className="space-y-6 fade-in">
        <button
          onClick={() => navigate('/akademi')}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-500"
        >
          ← Kembali ke Akademi
        </button>

        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <div className="text-center py-6">
            <span className="text-6xl">🎓</span>
            <h1 className="text-3xl font-bold mt-4">{ujian.namaUjian}</h1>
            <p className="text-amber-100 mt-2">{ujian.deskripsi}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-100">Soal</p>
              <p className="text-2xl font-bold">{totalSoal}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-100">Durasi</p>
              <p className="text-2xl font-bold">{ujian.durasiMenit}m</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-100">Lulus</p>
              <p className="text-2xl font-bold">{nilaiLulus}</p>
            </div>
          </div>
        </Card>

        {/* SYARAT */}
        <Card>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
            📋 Syarat Ujian
          </h2>
          <div className="space-y-3">
            {levels.map((lv) => {
              const selesai = (progress.materiSelesai[lv.level] || []).length
              const total = lv.materi.length
              const sudahSelesai = selesai === total
              return (
                <div
                  key={lv.level}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    sudahSelesai
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sudahSelesai ? '✅' : '❌'}</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Level {lv.level} — {lv.namaLevel}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {selesai}/{total}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>

        {/* HASIL TERAKHIR */}
        {hasilUjian && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{hasilUjian.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Hasil Terakhir
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {hasilUjian.skor}/100
                </p>
                <Badge color={hasilUjian.warna} size="sm">
                  {hasilUjian.predikat}
                </Badge>
              </div>
            </div>
          </Card>
        )}

        {/* TOMBOL MULAI */}
        <Button
          onClick={handleMulai}
          disabled={!semuaLevelSelesai}
          className="w-full"
        >
          {semuaLevelSelesai
            ? '🚀 Mulai Ujian'
            : '🔒 Selesaikan semua level terlebih dahulu'}
        </Button>

        {/* INFO */}
        <Card className="bg-blue-50 dark:bg-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            💡 <strong>Tips:</strong> Ujian bisa diulang berkali-kali. Skor
            terbaik Anda akan disimpan. Predikat: 🥇 Emas (90+), 🥈 Perak (80+),
            🥉 Perunggu (70+).
          </p>
        </Card>
      </div>
    )
  }

  // === MODE: UJIAN ===
  if (mode === 'ujian') {
    const jumlahDijawab = Object.keys(jawaban).length
    return (
      <div className="space-y-6 fade-in">
        {/* HEADER TIMER */}
        <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white sticky top-20 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-red-100">Waktu Tersisa</p>
              <p className="text-3xl font-bold">{formatWaktu(waktuTersisa)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-red-100">Progres</p>
              <p className="text-3xl font-bold">
                {jumlahDijawab}/{totalSoal}
              </p>
            </div>
          </div>
        </Card>

        {/* DAFTAR SOAL */}
        <div className="space-y-4">
          {soal.map((s, i) => (
            <Card key={s.id}>
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-slate-700 flex items-center justify-center font-bold text-amber-600 text-sm">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <Badge color="purple" size="sm">
                    Level {s.level}
                  </Badge>
                  <p className="font-semibold text-slate-800 dark:text-white mt-2">
                    {s.soal}
                  </p>
                </div>
              </div>
              <div className="space-y-2 ml-11">
                {s.pilihan.map((p, j) => (
                  <button
                    key={j}
                    onClick={() => handleJawab(s.id, j)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition ${
                      jawaban[s.id] === j
                        ? 'border-amber-500 bg-amber-50 dark:bg-slate-700'
                        : 'border-slate-200 dark:border-slate-600 hover:border-amber-300'
                    }`}
                  >
                    <span className="font-semibold text-slate-500 dark:text-slate-400 mr-2">
                      {String.fromCharCode(65 + j)}.
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{p}</span>
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* TOMBOL SUBMIT */}
        <Card className="sticky bottom-4">
          <Button
            onClick={handleSubmit}
            disabled={jumlahDijawab < totalSoal}
            className="w-full"
          >
            {jumlahDijawab < totalSoal
              ? `📝 Jawab semua soal (${jumlahDijawab}/${totalSoal})`
              : '📤 Kirim Jawaban'}
          </Button>
        </Card>
      </div>
    )
  }

  // === MODE: HASIL ===
  const hasil = hasilSekarang || hasilUjian
  return (
    <div className="space-y-6 fade-in">
      <Card
        className={`${
          hasil.skor >= 90
            ? 'bg-gradient-to-br from-amber-400 to-yellow-500'
            : hasil.skor >= 80
            ? 'bg-gradient-to-br from-slate-400 to-slate-500'
            : hasil.skor >= nilaiLulus
            ? 'bg-gradient-to-br from-orange-400 to-orange-600'
            : 'bg-gradient-to-br from-slate-500 to-slate-700'
        } text-white`}
      >
        <div className="text-center py-6">
          <span className="text-7xl">{hasil.icon}</span>
          <h1 className="text-3xl font-bold mt-4">{hasil.predikat}</h1>
          <p className="text-6xl font-bold mt-4">{hasil.skor}/100</p>
          <p className="mt-2 opacity-90">
            {hasil.jumlahBenar} benar dari {hasil.totalSoal} soal
          </p>
          <p className="text-sm opacity-75 mt-1">
            {new Date(hasil.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </Card>

      {/* PESAN */}
      <Card>
        <p className="text-center text-slate-700 dark:text-slate-300 leading-relaxed">
          {hasil.skor >= 90
            ? '🏆 Luar biasa! Anda adalah Master Trader sejati. Ilmu Anda sudah sangat mumpuni.'
            : hasil.skor >= 80
            ? '🎉 Hebat! Anda sudah paham sebagian besar materi. Sedikit lagi menuju sempurna.'
            : hasil.skor >= nilaiLulus
            ? '💪 Selamat! Anda lulus. Teruslah belajar untuk meningkatkan pemahaman.'
            : '📚 Jangan menyerah! Baca ulang materi dan coba lagi. Kegagalan adalah guru terbaik.'}
        </p>
      </Card>

      {/* PEMBAHASAN */}
      <Card title="📖 Pembahasan Jawaban" icon="">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {soal.map((s, i) => {
            const benar = jawaban[s.id] === s.jawaban
            return (
              <div
                key={s.id}
                className={`p-3 rounded-xl ${
                  benar
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <p className="font-semibold text-slate-800 dark:text-white text-sm mb-1">
                  {benar ? '✅' : '❌'} Soal {i + 1}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                  {s.soal}
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Jawaban benar:{' '}
                  <strong>{s.pilihan[s.jawaban]}</strong>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                  {s.penjelasan}
                </p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* TOMBOL */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={handleMulai} className="flex-1">
          🔄 Ulangi Ujian
        </Button>
        <Button onClick={() => navigate('/akademi')} className="flex-1">
          🏠 Kembali ke Akademi
        </Button>
      </div>
    </div>
  )
}
