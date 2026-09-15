const STORAGE_KEY = 'amal'

export const amalService = {
  getAll: () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  },

  add: (entri) => {
    const all = amalService.getAll()
    const newEntri = { id: Date.now(), ...entri }
    const updated = [newEntri, ...all]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newEntri
  },

  getTotal: () => {
    const all = amalService.getAll()
    return all.reduce((sum, a) => sum + a.jumlah, 0)
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY)
  },
}