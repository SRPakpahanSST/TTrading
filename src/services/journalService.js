const STORAGE_KEY = 'jurnal'

export const journalService = {
  getAll: () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  },

  add: (entri) => {
    const all = journalService.getAll()
    const newEntri = { id: Date.now(), ...entri }
    const updated = [newEntri, ...all]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newEntri
  },

  delete: (id) => {
    const all = journalService.getAll()
    const updated = all.filter((j) => j.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY)
  },
}