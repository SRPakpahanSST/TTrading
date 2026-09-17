import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useSimulasiLanjutan } from '../../hooks/useSimulasiLanjutan'

export default function SimulasiLanjutan() {
  const {
    skenario,
    sesi,
    riwayat,
    mulaiSesi,
    beli,
    jual,
    selesaikanSesi,
    resetSesi,
    evaluasiPerforma,
    getHargaSekarang,
  } = useSimulasiLanjutan()

  const [notif, setNotif] = useState(null)
  const [formBeli, setFormBeli] = useState({ kode: '', lot: 1 })
  const [formJual, setFormJual] = useState({ kode: '', lot: 1 })

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0)

  const tampilkanNotif = (pesan, tipe = 'info') => {
    setNotif({ pesan, tipe })
    setTimeout(() => setNotif(null), 3000)
  }

  const handleBeli = () => {
    const hasil = beli(formBeli.kode, parseInt(formBeli.lot))
    if (hasil.sukses) {
      tampilkanNotif(hasil.pesan, 'sukses')
      setFormBeli({ kode: '', lot: 1 })
    } else {
      tampilkanNotif(hasil.pesan, 'error')
    }
  }

  const handleJual = () => {
    const hasil = jual(formJual.kode, parseInt(formJual.lot))
    if (hasil.sukses) {
      tampilkanNotif(hasil.pesan, 'sukses')
      setFormJual({ kode: '', lot: 1 })
    } else {
      tampilkanNotif(hasil.pesan, 'error')
    }
  }

  const handleSelesai = () => {
    if (Object.keys(sesi?.posisi || {}).length > 0) {
      if (!confirm('Masih ada posisi terbuka. Yakin selesaikan?')) return
    }
    selesaikanSesi()
  }

  // === SESI SELESAI: TAMPILKAN HASIL ===
  if (sesi?.selesai) {
    const hasil = sesi.hasil
    const catatan = evaluasiPerforma(hasil)
    const isProfit = hasil.profit >= 0

    return (
      <div className="space-y-6 fade-in">
        <Card
          className={`${
            isProfit
              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
              : 'bg-gradient-to-br from-red-500 to-rose-600'
          } text-white`}
        >
          <div className="text-center py-6">
            <span className="text-6xl">{isProfit ? '🎉' : '💪'}</span>
            <h1 className="text-2xl font-bold mt-4">Sesi Selesai!</h1>
            <p className="text-sm opacity-90 mt-1">{hasil.skenarioNama}</p>
            <p className="text-4xl font-bold mt-4">
              {formatRupiah(hasil.saldoAkhir)}
            </p>
            <p className="text-lg mt-2">
              {isProfit ? '📈' : '📉'} {formatRupiah(hasil.profit)} ({hasil.profitPersen}%)
            </p>
          </div>
        </Card>

        {/* STATISTIK */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Trade</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{hasil.jumlahTrade}</p>
          </Card>
          <Card className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Menang</p>
            <p className="text-2xl font-bold text-green-600">{hasil.menang}</p>
          </Card>
          <Card className="text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Kalah</p>
            <p className="text-2xl font-bold text-red-600">{hasil.kalah}</p>
          </Card>
        </div>

        {/* WIN RATE */}
        <Card>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 dark:text-white">Win Rate</h3>
            <span className="text-2xl font-bold text-amber-500">{hasil.winRate}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                parseFloat(hasil.winRate) >= 60
                  ? 'bg-green-500'
                  : parseFloat(hasil.winRate) >= 40
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${hasil.winRate}%` }}
            ></div>
          </div>
        </Card>

        {/* EVALUASI */}
        <Card title="📊 Evaluasi Performa" icon="">
          <div className="space-y-2">
            {catatan.map((c, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-sm ${
                  c.tipe === 'baik'
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : c.tipe === 'sedang'
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}
              >
                {c.pesan}
              </div>
            ))}
          </div>
        </Card>

        {/* RIWAYAT TRANSAKSI */}
        <Card title="📜 Riwayat Transaksi" icon="">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sesi.transaksi.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl text-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-white">{t.kode}</span>
                    <Badge color={t.tipe === 'beli' ? 'blue' : 'green'} size="sm">
                      {t.tipe}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.lot} lot × {formatRupiah(t.harga)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800 dark:text-white">
                    {formatRupiah(t.total)}
                  </p>
                  {t.profit !== undefined && (
                    <p className={`text-xs font-semibold ${
                      t.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {t.profit >= 0 ? '+' : ''}{formatRupiah(t.profit)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={resetSesi} className="flex-1">
            🔄 Sesi Baru
          </Button>
        </div>
      </div>
    )
  }

  // === SESI AKTIF: TAMPILKAN TRADING ===
  if (sesi) {
    const nilaiPosisi = Object.entries(sesi.posisi).reduce((sum, [kode, pos]) => {
      const saham = sesi.skenario.saham.find((s) => s.kode === kode)
      if (!saham) return sum
      return sum + getHargaSekarang(saham) * pos.lot * 100
    }, 0)
    const totalAset = sesi.saldo + nilaiPosisi
    const pnl = totalAset - sesi.saldoAwal

    return (
      <div className="space-y-6 fade-in">
        {/* NOTIFIKASI */}
        {notif && (
          <div
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg ${
              notif.tipe === 'sukses' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notif.pesan}
          </div>
        )}

        {/* HEADER */}
        <Card className={`bg-gradient-to-r ${
          sesi.skenario.warna === 'green'
            ? 'from-green-500 to-emerald-600'
            : sesi.skenario.warna === 'red'
            ? 'from-red-500 to-rose-600'
            : 'from-amber-500 to-yellow-500'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs opacity-90">Skenario</p>
              <p className="text-xl font-bold">
                {sesi.skenario.icon} {sesi.skenario.nama}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={handleSelesai}
              className="!bg-white/20 !text-white hover:!bg-white/30 !text-xs"
            >
              ✅ Selesai
            </Button>
          </div>
        </Card>

        {/* SALDO */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className="text-xs text-slate-500 dark:text-slate-400">Saldo Tunai</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">
              {formatRupiah(sesi.saldo)}
            </p>
          </Card>
          <Card>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Aset</p>
            <p className="text-xl font-bold text-amber-500">
              {formatRupiah(totalAset)}
            </p>
            <p className={`text-xs font-semibold ${
              pnl >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {pnl >= 0 ? '+' : ''}{formatRupiah(pnl)}
            </p>
          </Card>
        </div>

        {/* HARGA SAHAM */}
        <Card title="📊 Harga Saham" icon="">
          <div className="space-y-2">
            {sesi.skenario.saham.map((s) => {
              const hargaSekarang = getHargaSekarang(s)
              const posisi = sesi.posisi[s.kode]
              return (
                <div
                  key={s.kode}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
                >
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">{s.kode}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.nama}</p>
                    {posisi && (
                      <Badge color="blue" size="sm">
                        Punya {posisi.lot} lot @ {formatRupiah(posisi.hargaBeli)}
                      </Badge>
                    )}
                  </div>
                  <p className="font-bold text-slate-800 dark:text-white">
                    {formatRupiah(hargaSekarang)}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* FORM BELI */}
        <Card title="💰 Beli Saham" icon="">
          <div className="space-y-3">
            <select
              value={formBeli.kode}
              onChange={(e) => setFormBeli({ ...formBeli, kode: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="">Pilih Saham</option>
              {sesi.skenario.saham.map((s) => (
                <option key={s.kode} value={s.kode}>
                  {s.kode} — {s.nama}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={formBeli.lot}
              onChange={(e) => setFormBeli({ ...formBeli, lot: e.target.value })}
              placeholder="Jumlah Lot"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
            />
            <Button
              onClick={handleBeli}
              disabled={!formBeli.kode || !formBeli.lot}
              className="w-full"
            >
              💰 Beli
            </Button>
          </div>
        </Card>

        {/* FORM JUAL */}
        {Object.keys(sesi.posisi).length > 0 && (
          <Card title="💸 Jual Saham" icon="">
            <div className="space-y-3">
              <select
                value={formJual.kode}
                onChange={(e) => setFormJual({ ...formJual, kode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
              >
                <option value="">Pilih Saham</option>
                {Object.entries(sesi.posisi).map(([kode, pos]) => (
                  <option key={kode} value={kode}>
                    {kode} — {pos.lot} lot
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={formJual.lot}
                onChange={(e) => setFormJual({ ...formJual, lot: e.target.value })}
                placeholder="Jumlah Lot"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
              />
              <Button
                onClick={handleJual}
                disabled={!formJual.kode || !formJual.lot}
                variant="success"
                className="w-full"
              >
                💸 Jual
              </Button>
            </div>
          </Card>
        )}

        {/* TRANSAKSI TERAKHIR */}
        {sesi.transaksi.length > 0 && (
          <Card title="📜 Transaksi Terakhir" icon="">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {sesi.transaksi.slice(0, 10).map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl text-sm"
                >
                  <div>
                    <Badge color={t.tipe === 'beli' ? 'blue' : 'green'} size="sm">
                      {t.tipe}
                    </Badge>
                    <span className="font-semibold text-slate-800 dark:text-white ml-2">
                      {t.kode}
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">
                    {t.lot} lot × {formatRupiah(t.harga)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    )
  }

  // === BELUM ADA SESI: PILIH SKENARIO ===
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          🎮 Simulasi Lanjutan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Latihan trading realistis dengan skenario pasar berbeda.
        </p>
      </div>

      {/* INFO */}
      <Card className="bg-blue-50 dark:bg-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          💡 <strong>Cara Main:</strong> Pilih skenario pasar, beli/jual saham
          dengan saldo virtual Rp 10.000.000. Setelah 10 trade (atau kapan saja),
          klik "Selesai" untuk melihat evaluasi performa Anda.
        </p>
      </Card>

      {/* DAFTAR SKENARIO */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
          🎯 Pilih Skenario Pasar
        </h2>
        <div className="space-y-4">
          {skenario.map((s) => (
            <Card
              key={s.id}
              className="cursor-pointer hover:shadow-xl transition-all"
              onClick={() => mulaiSesi(s.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                    s.warna === 'green'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : s.warna === 'red'
                      ? 'bg-red-100 dark:bg-red-900/30'
                      : 'bg-amber-100 dark:bg-amber-900/30'
                  }`}
                >
                  <span className="text-3xl">{s.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge color={s.warna} size="sm">
                      {s.sulit}
                    </Badge>
                    <Badge color="gray" size="sm">
                      {s.saham.length} saham
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                    {s.nama}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {s.deskripsi}
                  </p>
                </div>
                <span className="text-slate-400 text-xl">→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* RIWAYAT */}
      {riwayat.length > 0 && (
        <Card title="🏆 Riwayat Simulasi" icon="">
          <div className="space-y-3">
            {riwayat.slice(0, 5).map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">
                    {r.skenarioNama}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {r.jumlahTrade} trade • Win rate {r.winRate}%
                  </p>
                </div>
                <p
                  className={`font-bold text-sm ${
                    r.profit >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {r.profit >= 0 ? '+' : ''}{formatRupiah(r.profit)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}