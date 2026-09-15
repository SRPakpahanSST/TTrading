import { deteksiDosa } from '../utils/dosaRules'

const STORAGE_KEY = 'dosaLogs'

export const dosaService = {
  getAll: () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  },

  deteksi: (data) => {
    const dosa = deteksiDosa(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dosa))
    return dosa
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY)
  },
}