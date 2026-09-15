import { useState, useEffect } from 'react'

export function useAmal() {
  const [amal, setAmal] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('amal')
    if (saved) setAmal(JSON.parse(saved))
  }, [])

  const tambahAmal = (entri) => {
    const newAmal = [entri, ...amal]
    setAmal(newAmal)
    localStorage.setItem('amal', JSON.stringify(newAmal))
  }

  const totalAmal = amal.reduce((sum, a) => sum + a.jumlah, 0)

  return { amal, tambahAmal, totalAmal }
}