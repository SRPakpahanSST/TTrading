import { useState, useEffect } from 'react'

export function useStockData(kodeSaham) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!kodeSaham) return

    setLoading(true)
    // Simulasi data (nanti ganti dengan API real)
    setTimeout(() => {
      setData({
        kode: kodeSaham,
        harga: Math.floor(Math.random() * 2000) + 500,
        perubahan: (Math.random() * 10 - 5).toFixed(2),
      })
      setLoading(false)
    }, 500)
  }, [kodeSaham])

  return { data, loading }
}