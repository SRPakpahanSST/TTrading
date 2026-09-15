import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  login: (userData) => {
    set({ user: userData, isLoggedIn: true })
    localStorage.setItem('user', JSON.stringify(userData))
  },

  logout: () => {
    set({ user: null, isLoggedIn: false })
    localStorage.removeItem('user')
  },

  loadUser: () => {
    const saved = localStorage.getItem('user')
    if (saved) {
      set({ user: JSON.parse(saved), isLoggedIn: true })
    }
  },
}))