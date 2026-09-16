import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useShare } from '../../hooks/useShare'

export default function Bagikan() {
  const {
    getPortfolioData,
    getAmalData,
    bagikanPortofolio,
    bagikanAmal,
    downloadPortofolioImage,
    copyText,
    copied,
  } = useShare()

  const [activeTab, setActiveTab] = useState('portofolio')

  const portfolio = getPortfolioData()
  const amal = getAmalData()

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka || 0)

  const handleCopy = async () => {
    const teks =
      activeTab === 'portofolio'
        ? bagikanPortofolio('copy')
        : bagikanAmal('copy')
    await copyText(teks)
  }

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📤 Bagikan
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Bagikan portofolio & amal Anda ke media sosial.
        </p>
      </div>

      {/* TAB SELECTOR */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('portofolio')}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
            activeTab === 'portofolio'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          📊 Portofolio
        </button>
        <button
          onClick={() => setActiveTab('amal')}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition ${
            activeTab === 'amal'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
          }`}
        >
          🤝 Amal
        </button>
      </div>

      {/* PREVIEW PORTOFOLIO */}
      {activeTab === 'portofolio' && (
        <>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="mb-4">
              <p className="text-amber-400 font-bold text-lg">🌱 T Trading</p>
              <p className="text-slate-400 text-xs">Cuan Berkah, Dampak Nyata</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-xs">TOTAL ASET</p>
                <p className="text-3xl font-bold">{formatRupiah(portfolio.totalAset)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs">MODAL AWAL</p>
                  <p className="text-lg font-semibold">{formatRupiah(portfolio.modalAwal)}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">PROFIT/LOSS</p>
                  <p className={`text-lg font-semibold ${
                    portfolio.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatRupiah(portfolio.profitLoss)} ({portfolio.profitLossPersen}%)
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-700">
                <p className="text-slate-500 text-xs">📅 {portfolio.tanggal}</p>
                <p className="text-slate-500 text-xs mt-1">
                  🎯 Hati adalah grafik Candlestick terbesar
                </p>
              </div>
            </div>
          </Card>

          <Card title="📤 Bagikan Ke" icon="">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => bagikanPortofolio('whatsapp')} className="w-full">
                💬 WhatsApp
              </Button>
              <Button onClick={() => bagikanPortofolio('telegram')} className="w-full">
                ✈️ Telegram
              </Button>
              <Button variant="secondary" onClick={handleCopy} className="w-full">
                📋 Copy Teks
              </Button>
              <Button variant="secondary" onClick={downloadPortofolioImage} className="w-full">
                🖼️ Download
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 mt-3 text-center">
                ✅ Teks berhasil di-copy!
              </p>
            )}
          </Card>
        </>
      )}

      {/* PREVIEW AMAL */}
      {activeTab === 'amal' && (
        <>
          <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white">
            <div className="mb-4">
              <p className="text-amber-200 font-bold text-lg">🤝 Laporan Amal</p>
              <p className="text-pink-100 text-xs">PMD Impact Invest</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-pink-100 text-xs">TOTAL AMAL</p>
                <p className="text-3xl font-bold">{formatRupiah(amal.total)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-pink-100 text-xs">JUMLAH DONASI</p>
                  <p className="text-lg font-semibold">{amal.jumlah}x</p>
                </div>
                <div>
                  <p className="text-pink-100 text-xs">PENERIMA</p>
                  <p className="text-lg font-semibold">{amal.penerimaUnik} lembaga</p>
                </div>
              </div>
              <div className="pt-3 border-t border-pink-300">
                <p className="text-pink-100 text-xs">
                  📅 {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-pink-100 text-xs mt-1">
                  💝 Berbagi tidak mengurangi rezeki
                </p>
              </div>
            </div>
          </Card>

          <Card title="📤 Bagikan Ke" icon="">
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => bagikanAmal('whatsapp')} className="w-full">
                💬 WhatsApp
              </Button>
              <Button onClick={() => bagikanAmal('telegram')} className="w-full">
                ✈️ Telegram
              </Button>
              <Button variant="secondary" onClick={handleCopy} className="w-full col-span-2">
                📋 Copy Teks
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 mt-3 text-center">
                ✅ Teks berhasil di-copy!
              </p>
            )}
          </Card>
        </>
      )}

      {/* RINGKASAN RIWAYAT AMAL */}
      {activeTab === 'amal' && amal.riwayat.length > 0 && (
        <Card title="📋 Riwayat Amal Terakhir" icon="">
          <div className="space-y-2">
            {amal.riwayat.map((a, i) => (
              <div key={i} className="flex justify-between text-sm p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="text-slate-600 dark:text-slate-300">
                  {a.penerima || 'Donasi'}
                </span>
                <span className="font-semibold text-pink-500">
                  {formatRupiah(a.jumlah)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}