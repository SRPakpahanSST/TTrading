// Konfigurasi API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  TIMEOUT: 10000,
}

export const fetchAPI = async (endpoint, options = {}) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!response.ok) throw new Error('API Error')
    return await response.json()
  } catch (error) {
    clearTimeout(timeout)
    throw error
  }
}