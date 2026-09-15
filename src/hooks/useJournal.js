import { useState, useEffect } from 'react'

export function useJournal() {
  const [jurnal, setJurnal] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('jurnal')
    if (saved) setJurnal(JSON.parse(saved))
  }, [])

  const tambahJurnal = (entri) => {
    const newJurnal = [entri, ...jurnal]
    setJurnal(newJurnal)
    localStorage.setItem('jurnal', JSON.stringify(newJurnal))
  }

  return { jurnal, tambahJurnal }
}