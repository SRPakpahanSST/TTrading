import { useState, useEffect } from 'react'
import { deteksiDosa } from '../utils/dosaRules'

export function useDosaDetector() {
  const [dosaAktif, setDosaAktif] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('dosaLogs')
    if (saved) setDosaAktif(JSON.parse(saved))
  }, [])

  const deteksi = (data) => {
    const dosa = deteksiDosa(data)
    setDosaAktif(dosa)
    localStorage.setItem('dosaLogs', JSON.stringify(dosa))
    return dosa
  }

  return { dosaAktif, deteksi }
}