import { useState, useEffect } from 'react'

export function usePilarScore() {
  const [skor, setSkor] = useState({
    rajaMakro: 5,
    pembunuh: 5,
    sentuhanEmas: 5,
    dewaFundamental: 5,
  })

  useEffect(() => {
    const saved = localStorage.getItem('pilarScore')
    if (saved) setSkor(JSON.parse(saved))
  }, [])

  const updateSkor = (newSkor) => {
    setSkor(newSkor)
    localStorage.setItem('pilarScore', JSON.stringify(newSkor))
  }

  const total = Object.values(skor).reduce((sum, s) => sum + s, 0)

  return { skor, updateSkor, total }
}