import { useState } from 'react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { useWatchlist } from '../../hooks/useWatchlist'
import { sahamList } from '../../data/sahamList'

export default function Watchlist() {
  const { watchlist, tambah, hapus, updateCatatan } = useWatchlist()
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedSaham, setSelectedSaham] = useState(null)
  const [catatan, setCatatan] = useState('')

  const formatRupiah = (angka) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka)

  const filteredSaham = sahamList.filter(
    (s) =>
      s.kode.toLowerCase().includes(search.toLowerCase()) ||
      s.nama.toLowerCase().includes(search.toLowerCase())
  )

  const handleTambah = (saham) => {
    tambah(saham)
    setShowModal(false)
    setSearch('')
  }

  const handleEditCatatan = (item) => {
    setSelectedSaham(item)
    setCatatan(item.catatan || '')
  }

  const handleSimpanCatatan = () => {
    if (selectedSaham) {
      updateCatatan(selectedSaham.kode, catatan)
      setSelectedSaham(null)
      setCatatan('')
    }
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            ⭐ Watchlist
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Daftar saham favorit Anda untuk dipantau.
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ Tambah</Button>
      </div>

      {watchlist.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <span className="text-5xl">⭐</span>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              Belum ada saham di watchlist.
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Klik "Tambah" untuk menambahkan saham favorit.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {watchlist.map((item) => (
            <Card key={item.kode}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                      {item.kode}
                    </h3>
                    <Badge color="blue" size="sm">
                      {item.sektor}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.nama}
                  </p>
                </div>
                <button
                  onClick={() => hapus(item.kode)}
                  className="text-red-500 hover:text-red-700 text-xl"
                  title="Hapus"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Harga</p>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">
                    {formatRupiah(item.harga)}
                  </p>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">PER</p>
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">
                    {item.per}x
                  </p>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">ROE</p>
                  <p className="font-semibold text-green-600 text-sm">
                    {item.roe}%
                  </p>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dividen</p>
                  <p className="font-semibold text-amber-600 text-sm">
                    {item.dividen}%
                  </p>
                </div>
              </div>

              {item.catatan && (
                <div className="mb-3 p-2 bg-amber-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    📝 {item.catatan}
                  </p>
                </div>
              )}

              <button
                onClick={() => handleEditCatatan(item)}
                className="w-full py-2 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl transition"
              >
                {item.catatan ? '✏️ Edit Catatan' : '➕ Tambah Catatan'}
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Tambah Saham */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Tambah Saham ke Watchlist"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kode atau nama saham..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredSaham.slice(0, 20).map((s) => (
            <button
              key={s.kode}
              onClick={() => handleTambah(s)}
              className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 hover:bg-amber-50 dark:hover:bg-slate-600 rounded-xl transition text-left"
            >
              <div>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {s.kode}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {s.nama}
                </p>
              </div>
              <Badge color="gray" size="sm">{s.sektor}</Badge>
            </button>
          ))}
          {filteredSaham.length === 0 && (
            <p className="text-center text-slate-400 py-4">
              Saham tidak ditemukan.
            </p>
          )}
        </div>
      </Modal>

      {/* Modal Edit Catatan */}
      <Modal
        isOpen={!!selectedSaham}
        onClose={() => setSelectedSaham(null)}
        title={`Catatan ${selectedSaham?.kode || ''}`}
      >
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows="4"
          placeholder="Contoh: Beli kalau turun ke Rp1.700"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
        />
        <Button onClick={handleSimpanCatatan} className="w-full">
          💾 Simpan Catatan
        </Button>
      </Modal>
    </div>
  )
}