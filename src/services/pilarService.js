const STORAGE_KEY = 'pilarScore'

export const pilarService = {
  get: () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {
      rajaMakro: 5,
      pembunuh: 5,
      sentuhanEmas: 5,
      dewaFundamental: 5,
    }
  },

  save: (skor) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skor))
    return skor
  },

  getTotal: () => {
    const skor = pilarService.get()
    return Object.values(skor).reduce((sum, s) => sum + s, 0)
  },
}