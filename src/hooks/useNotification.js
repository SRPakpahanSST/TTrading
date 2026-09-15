import { useState, useEffect } from 'react'

export function useNotification() {
  const [notifikasiAktif, setNotifikasiAktif] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('notifikasiAktif')
    if (saved !== null) setNotifikasiAktif(saved === 'true')
  }, [])

  const toggleNotifikasi = () => {
    const newValue = !notifikasiAktif
    setNotifikasiAktif(newValue)
    localStorage.setItem('notifikasiAktif', newValue)
  }

  const kirimNotifikasi = (judul, pesan) => {
    if (notifikasiAktif && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(judul, { body: pesan })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(judul, { body: pesan })
          }
        })
      }
    }
  }

  return { notifikasiAktif, toggleNotifikasi, kirimNotifikasi }
}