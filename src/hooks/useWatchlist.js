import { useState, useEffect, useCallback } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([])

  const load = useCallback(() => {
    setWatchlist(storage.get(STORAGE_KEYS.WATCHLIST, []))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const tambah = (saham) => {
    if (watchlist.some((w) => w.kode === saham.kode)) return false
    const baru = [...watchlist, { ...saham, tanggalDitambah: new Date().toISOString() }]
    setWatchlist(baru)
    storage.set(STORAGE_KEYS.WATCHLIST, baru)
    return true
  }

  const hapus = (kode) => {
    const baru = watchlist.filter((w) => w.kode !== kode)
    setWatchlist(baru)
    storage.set(STORAGE_KEYS.WATCHLIST, baru)
  }

  const updateCatatan = (kode, catatan) => {
    const baru = watchlist.map((w) =>
      w.kode === kode ? { ...w, catatan } : w
    )
    setWatchlist(baru)
    storage.set(STORAGE_KEYS.WATCHLIST, baru)
  }

  const isInWatchlist = (kode) => watchlist.some((w) => w.kode === kode)

  return { watchlist, tambah, hapus, updateCatatan, isInWatchlist, refresh: load }
}