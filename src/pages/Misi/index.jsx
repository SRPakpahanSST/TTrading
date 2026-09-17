import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useMisi } from '../../hooks/useMisi'

export default function Misi() {
  const {
    misi,
    levelPengguna,
    misiHariIni,
    riwayat,
    totalXP,
    xpHariIni,
    levelInfo,
    streakMisi,
    selesaikanMisi,
    batalkanMisi,
  } = useMisi()

  const totalMisi = misi.length
  const misiSelesai = misiHariIni.length
  const progressPersen = Math.round((misiSelesai / totalMisi) * 100)

  const progressKeNext = levelInfo.next
    ? Math.round(
        ((totalXP - levelInfo.current.minXP) /
          (levelInfo.next.minXP - levelInfo.current.minXP)) *
          100
      )
    : 100

  const getWarnaKategori = (kategori) => {
    const map = {
      Edukasi: 'blue',
      Refleksi: 'purple',
      Spiritual: 'green',
      Riset: 'amber',
      Sosial: 'pink',
      Mental: 'red',
    }
    return map[kategori] || 'gray'
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🎯 Misi Harian
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Selesaikan misi setiap hari untuk membangun kebiasaan trading yang baik.
        </p>
      </div>

      {/* LEVEL PENGGUNA */}
      <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-amber-100 text-sm">Level Anda</p>
            <h2 className="text-3xl font-bold">
              {levelInfo.current.icon} {levelInfo.current.nama}
            </h2>
            <p className="text-amber-100 text-sm mt-1">
              {totalXP} XP terkumpul
            </p>
          </div>
          <span className="text-6xl">{levelInfo.current.icon}</span>
        </div>

        {levelInfo.next && (
          <>
            <div className="flex justify-between text-sm mb-2">
              <span>Menuju {levelInfo.next.icon} {levelInfo.next.nama}</span>
              <span className="font-bold">{progressKeNext}%</span>
            </div>
            <div className="w-full bg-amber-900/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressKeNext}%` }}
              ></div>
            </div>
            <p className="text-xs text-amber-100 mt-2">
              Butuh {levelInfo.next.minXP - totalXP} XP lagi
            </p>
          </>
        )}
      </Card>

      {/* STATISTIK HARI INI */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center">
          <span className="text-2xl">✅</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
            {misiSelesai}/{totalMisi}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Misi Selesai</p>
        </Card>
        <Card className="text-center">
          <span className="text-2xl">⭐</span>
          <p className="text-2xl font-bold text-amber-500 mt-1">{xpHariIni}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">XP Hari Ini</p>
        </Card>
        <Card className="text-center">
          <span className="text-2xl">🔥</span>
          <p className="text-2xl font-bold text-orange-500 mt-1">{streakMisi}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Streak Misi</p>
        </Card>
      </div>

      {/* PROGRESS HARI INI */}
      <Card>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Progress Hari Ini
          </span>
          <span className="font-bold text-slate-800 dark:text-white">
            {progressPersen}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              progressPersen === 100 ? 'bg-green-500' : 'bg-amber-500'
            }`}
            style={{ width: `${progressPersen}%` }}
          ></div>
        </div>
        {progressPersen === 100 && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-3 text-center font-semibold">
            🎉 Semua misi selesai hari ini! Luar biasa!
          </p>
        )}
      </Card>

      {/* DAFTAR MISI */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          📋 Misi Hari Ini
        </h2>
        <div className="space-y-3">
          {misi.map((m) => {
            const selesai = misiHariIni.includes(m.id)
            return (
              <Card
                key={m.id}
                className={`${
                  selesai
                    ? 'border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/10'
                    : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
                      selesai
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-amber-100 dark:bg-slate-700'
                    }`}
                  >
                    <span className="text-3xl">{m.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge color={getWarnaKategori(m.kategori)} size="sm">
                        {m.kategori}
                      </Badge>
                      <Badge color="amber" size="sm">
                        +{m.xp} XP
                      </Badge>
                    </div>
                    <h3
                      className={`font-bold text-slate-800 dark:text-white ${
                        selesai ? 'line-through opacity-60' : ''
                      }`}
                    >
                      {m.judul}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {m.deskripsi}
                    </p>
                  </div>

                  {selesai ? (
                    <button
                      onClick={() => batalkanMisi(m.id)}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl hover:bg-green-600 transition"
                      title="Batalkan"
                    >
                      ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => selesaikanMisi(m.id)}
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition"
                      title="Tandai selesai"
                    >
                      ○
                    </button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* RIWAYAT 7 HARI */}
      {riwayat.length > 0 && (
        <Card title="📅 Riwayat 7 Hari Terakhir" icon="">
          <div className="space-y-2">
            {riwayat.slice(0, 7).map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">
                    {new Date(r.tanggal).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {r.misiSelesai} misi selesai
                  </p>
                </div>
                <Badge color="amber" size="sm">
                  +{r.xp} XP
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* DAFTAR LEVEL */}
      <Card title="🏆 Daftar Level Pengguna" icon="">
        <div className="space-y-2">
          {levelPengguna.map((lv) => {
            const tercapai = totalXP >= lv.minXP
            const aktif = levelInfo.current.level === lv.level
            return (
              <div
                key={lv.level}
                className={`flex items-center justify-between p-3 rounded-xl transition ${
                  aktif
                    ? 'bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-400'
                    : tercapai
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-slate-50 dark:bg-slate-700 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lv.icon}</span>
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        aktif
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-slate-800 dark:text-white'
                      }`}
                    >
                      Level {lv.level} — {lv.nama}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {lv.minXP} XP
                    </p>
                  </div>
                </div>
                {aktif && <Badge color="amber" size="sm">Aktif</Badge>}
                {tercapai && !aktif && <Badge color="green" size="sm">✅</Badge>}
                {!tercapai && <span className="text-slate-400">🔒</span>}
              </div>
            )
          })}
        </div>
      </Card>

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Tips:</strong> Misi direset setiap hari pada pukul 00:00.
          Selesaikan minimal 1 misi per hari untuk menjaga streak. Semakin
          banyak XP, semakin tinggi level Anda!
        </p>
      </Card>
    </div>
  )
}
