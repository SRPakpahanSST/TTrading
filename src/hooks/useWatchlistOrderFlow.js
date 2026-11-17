import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

const STORAGE_KEY = 'orderFlowWatchlist'

const DEFAULT_STOCKS = ['BRIS', 'TLKM', 'BBRI', 'BMRI', 'ANTM']

export function useWatchlistOrderFlow() {
  const [stocks, setStocks] = useState(() => {
    return storage.get(STORAGE_KEY, DEFAULT_STOCKS)
  })

  useEffect(() => {
    storage.set(STORAGE_KEY, stocks)
  }, [stocks])

  const addStock = (kode) => {
    const upperKode = kode.toUpperCase().trim()
    if (!upperKode) return { success: false, message: 'Kode saham tidak boleh kosong' }
    if (stocks.includes(upperKode)) return { success: false, message: 'Saham sudah ada di daftar' }
    
    setStocks([...stocks, upperKode])
    return { success: true, message: `${upperKode} berhasil ditambahkan` }
  }

  const removeStock = (kode) => {
    setStocks(stocks.filter((s) => s !== kode))
  }

  return { stocks, addStock, removeStock }
}