const STORAGE_KEY = 'simulasi'

export const simulationService = {
  getTransaksi: () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  },

  addTransaksi: (transaksi) => {
    const all = simulationService.getTransaksi()
    const newTransaksi = { id: Date.now(), ...transaksi }
    const updated = [newTransaksi, ...all]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return newTransaksi
  },

  getSaldo: () => {
    const saved = localStorage.getItem('saldoVirtual')
    return saved ? parseInt(saved) : 10000000
  },

  setSaldo: (saldo) => {
    localStorage.setItem('saldoVirtual', saldo.toString())
  },

  reset: () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem('saldoVirtual', '10000000')
  },
}