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
}

export const STORAGE_KEYS = {
  PORTFOLIO: 'portfolio',
  PILAR_SCORE: 'pilarScore',
  JURNAL: 'jurnal',
  AMAL: 'amal',
  DOSA: 'dosaLogs',
  SIMULASI: 'simulasi',
  SETTINGS: 'settings',
  WATCHLIST: 'watchlist',
  STREAK: 'streak',
  BADGES: 'badges',
  SYUKUR: 'syukur',
  LEADERBOARD: 'leaderboard',
}