// Helper untuk localStorage
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },

  clear: () => localStorage.clear(),
}

export const STORAGE_KEYS = {
  PORTFOLIO: 'portfolio',
  PILAR_SCORE: 'pilarScore',
  JURNAL: 'jurnal',
  AMAL: 'amal',
  DOSA: 'dosaLogs',
  SIMULASI: 'simulasi',
  SETTINGS: 'settings',
}