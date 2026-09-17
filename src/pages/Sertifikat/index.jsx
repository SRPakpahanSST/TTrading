import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useSertifikat } from '../../hooks/useSertifikat'
import { useMisi } from '../../hooks/useMisi'

export default function Sertifikat() {
  const {
    semuaSertifikat,
    sertifikatDiperoleh,
    totalDiperoleh,
    totalSertifikat,
    isDiperoleh,
    downloadSertifikat,
    resetSertifikat,
  } = useSertifikat()

  const { totalXP, levelInfo } = useMisi()
  const [nama, setNama] = useState(() => localStorage.getItem('namaPengguna') || '')

  const formatTanggal = (tgl) => {
    return new Date(tgl).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const simpanNama = () => {
    localStorage.setItem('namaPengguna', nama)
  }

  const progressPersen = Math.round((totalDiperoleh / totalSertifikat) * 100)

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🏆 Sertifikat & Level
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Koleksi pencapaian Anda di T Trading.
        </p>
      </div>

      {/* PROFIL */}
      <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-amber-100 text-sm">Level Anda</p>
            <h2 className="text-3xl font-bold">
              {levelInfo.current.icon} {levelInfo.current.nama}
            </h2>
            <p className="text-amber-100 text-sm mt-1">⭐ {totalXP} XP</p>
          </div>
          <span className="text-6xl">{levelInfo.current.icon}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-amber-100">Sertifikat</p>
            <p className="text-2xl font-bold">{totalDiperoleh}/{totalSertifikat}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-amber-100">Progress</p>
            <p className="text-2xl font-bold">{progressPersen}%</p>
          </div>
        </div>
      </Card>

      {/* INPUT NAMA */}
      <Card title="✍️ Nama di Sertifikat" icon="">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          Masukkan nama yang akan dicetak di sertifikat Anda.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap Anda"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Button onClick={simpanNama}>💾 Simpan</Button>
        </div>
        {nama && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            ✅ Nama tersimpan: <strong>{nama}</strong>
          </p>
        )}
      </Card>

      {/* DAFTAR SERTIFIKAT */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          📜 Koleksi Sertifikat
        </h2>
        <div className="space-y-3">
          {semuaSertifikat.map((s) => {
            const diperoleh = isDiperoleh(s.id)
            const dataDiperoleh = sertifikatDiperoleh.find((x) => x.id === s.id)

            return (
              <Card
                key={s.id}
                className={`${
                  diperoleh
                    ? `border-2 border-${s.warna}-400`
                    : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                      diperoleh
                        ? 'bg-amber-100 dark:bg-amber-900/30'
                        : 'bg-slate-100 dark:bg-slate-700 grayscale'
                    }`}
                  >
                    {diperoleh ? s.icon : '🔒'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge color={diperoleh ? s.warna : 'gray'} size="sm">
                        {s.predikat}
                      </Badge>
                      {diperoleh ? (
                        <Badge color="green" size="sm">✅ Diperoleh</Badge>
                      ) : (
                        <Badge color="gray" size="sm">🔒 Terkunci</Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      {s.nama}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {s.deskripsi}
                    </p>

                    {diperoleh && dataDiperoleh && (
                      <p className="text-xs text-slate-400 mt-1">
                        📅 Diperoleh: {formatTanggal(dataDiperoleh.tanggal)}
                      </p>
                    )}
                  </div>
                </div>

                {diperoleh && (
                  <Button
                    variant="secondary"
                    onClick={() => downloadSertifikat(s, nama)}
                    className="w-full mt-3 !text-sm"
                  >
                    📥 Download Sertifikat (SVG)
                  </Button>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* RESET */}
      {totalDiperoleh > 0 && (
        <Button
          variant="secondary"
          onClick={() => {
            if (confirm('Reset semua sertifikat? Tindakan ini tidak bisa dibatalkan.')) {
              resetSertifikat()
            }
          }}
          className="w-full"
        >
          🔄 Reset Semua Sertifikat
        </Button>
      )}

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Sertifikat diperoleh otomatis saat Anda
          memenuhi syaratnya. Selesaikan Akademi, Ujian Akhir, atau rajin
          melakukan amal untuk membuka semua sertifikat!
        </p>
      </Card>
    </div>
  )
}