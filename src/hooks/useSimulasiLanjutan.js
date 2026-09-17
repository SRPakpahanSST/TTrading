import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import skenarioData from '../data/skenarioPasar.json'

const STORAGE_KEY = 'simulasiLanjutan'

export function useSimulasiLanjutan() {
  const [sesi, setSesi] = useState(null)
  const [riwayat, setRiwayat] = useState([])

  const load = useCallback(() => {
    const saved = storage.get(STORAGE_KEY, { sesi: null, riwayat: [] })
    setSesi(saved.sesi)
    setRiwayat(saved.riwayat || [])
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const simpan = (data) => {
    storage.set(STORAGE_KEY, data)
  }

  const mulaiSesi = (skenarioId) => {
    const skenario = skenarioData.skenario.find((s) => s.id === skenarioId)
    if (!skenario) return

    const newSesi = {
      skenarioId,
      skenario,
      saldoAwal: 10000000,
      saldo: 10000000,
      posisi: {}, // { kode: { lot, hargaBeli } }
      transaksi: [],
      mulai: new Date().toISOString(),
      selesai: false,
    }

    setSesi(newSesi)
    simpan({ sesi: newSesi, riwayat })
  }

  const beli = (kode, lot) => {
    if (!sesi || sesi.selesai) return { sukses: false, pesan: 'Sesi tidak aktif' }

    const saham = sesi.skenario.saham.find((s) => s.kode === kode)
    if (!saham) return { sukses: false, pesan: 'Saham tidak ditemukan' }

    // Harga saat ini (simulasi: pakai harga awal + sedikit naik/turun random)
    const hargaSekarang = getHargaSekarang(saham)
    const total = hargaSekarang * lot * 100
    const biaya = total * 0.0015
    const grandTotal = total + biaya

    if (grandTotal > sesi.saldo) {
      return { sukses: false, pesan: 'Saldo tidak cukup' }
    }

    const posisiBaru = { ...sesi.posisi }
    if (posisiBaru[kode]) {
      // Tambah posisi (average)
      const totalLot = posisiBaru[kode].lot + lot
      const totalHarga =
        posisiBaru[kode].hargaBeli * posisiBaru[kode].lot + hargaSekarang * lot
      posisiBaru[kode] = {
        lot: totalLot,
        hargaBeli: totalHarga / totalLot,
      }
    } else {
      posisiBaru[kode] = { lot, hargaBeli: hargaSekarang }
    }

    const transaksi = [
      {
        id: Date.now(),
        tipe: 'beli',
        kode,
        lot,
        harga: hargaSekarang,
        total: grandTotal,
        tanggal: new Date().toISOString(),
      },
      ...sesi.transaksi,
    ]

    const newSesi = {
      ...sesi,
      saldo: sesi.saldo - grandTotal,
      posisi: posisiBaru,
      transaksi,
    }

    setSesi(newSesi)
    simpan({ sesi: newSesi, riwayat })
    return { sukses: true, pesan: `Berhasil beli ${lot} lot ${kode}` }
  }

  const jual = (kode, lot) => {
    if (!sesi || sesi.selesai) return { sukses: false, pesan: 'Sesi tidak aktif' }

    const posisi = sesi.posisi[kode]
    if (!posisi || posisi.lot < lot) {
      return { sukses: false, pesan: 'Posisi tidak cukup' }
    }

    const saham = sesi.skenario.saham.find((s) => s.kode === kode)
    const hargaSekarang = getHargaSekarang(saham)
    const total = hargaSekarang * lot * 100
    const biaya = total * 0.0025
    const grandTotal = total - biaya

    const posisiBaru = { ...sesi.posisi }
    if (posisi.lot === lot) {
      delete posisiBaru[kode]
    } else {
      posisiBaru[kode] = { ...posisi, lot: posisi.lot - lot }
    }

    const profit = (hargaSekarang - posisi.hargaBeli) * lot * 100 - biaya

    const transaksi = [
      {
        id: Date.now(),
        tipe: 'jual',
        kode,
        lot,
        harga: hargaSekarang,
        total: grandTotal,
        profit,
        tanggal: new Date().toISOString(),
      },
      ...sesi.transaksi,
    ]

    const newSesi = {
      ...sesi,
      saldo: sesi.saldo + grandTotal,
      posisi: posisiBaru,
      transaksi,
    }

    setSesi(newSesi)
    simpan({ sesi: newSesi, riwayat })
    return { sukses: true, pesan: `Berhasil jual ${lot} lot ${kode}` }
  }

  const getHargaSekarang = (saham) => {
    // Simulasi: harga bergerak naik/turun sedikit dari harga awal
    const base = saham.hargaAwal
    const range = (saham.hargaAkhir - saham.hargaAwal) * 0.3
    const random = (Math.random() - 0.5) * 2 * range
    return Math.round(base + random)
  }

  const selesaikanSesi = () => {
    if (!sesi) return null

    // Hitung nilai posisi yang masih dipegang
    let nilaiPosisi = 0
    Object.entries(sesi.posisi).forEach(([kode, pos]) => {
      const saham = sesi.skenario.saham.find((s) => s.kode === kode)
      if (saham) {
        const hargaSekarang = getHargaSekarang(saham)
        nilaiPosisi += hargaSekarang * pos.lot * 100
      }
    })

    const totalAset = sesi.saldo + nilaiPosisi
    const profit = totalAset - sesi.saldoAwal
    const profitPersen = (profit / sesi.saldoAwal) * 100

    // Statistik trading
    const transaksiJual = sesi.transaksi.filter((t) => t.tipe === 'jual')
    const menang = transaksiJual.filter((t) => (t.profit || 0) > 0).length
    const kalah = transaksiJual.filter((t) => (t.profit || 0) < 0).length
    const winRate = transaksiJual.length > 0 ? (menang / transaksiJual.length) * 100 : 0

    const hasil = {
      skenarioId: sesi.skenarioId,
      skenarioNama: sesi.skenario.nama,
      saldoAwal: sesi.saldoAwal,
      saldoAkhir: totalAset,
      profit,
      profitPersen: profitPersen.toFixed(2),
      jumlahTrade: transaksiJual.length,
      menang,
      kalah,
      winRate: winRate.toFixed(0),
      mulai: sesi.mulai,
      selesai: new Date().toISOString(),
    }

    const newSesi = { ...sesi, selesai: true, hasil }
    const newRiwayat = [hasil, ...riwayat].slice(0, 20)

    setSesi(newSesi)
    setRiwayat(newRiwayat)
    simpan({ sesi: newSesi, riwayat: newRiwayat })

    return hasil
  }

  const resetSesi = () => {
    setSesi(null)
    simpan({ sesi: null, riwayat })
  }

  const resetSemua = () => {
    setSesi(null)
    setRiwayat([])
    storage.remove(STORAGE_KEY)
  }

  // Evaluasi performa
  const evaluasiPerforma = (hasil) => {
    const catatan = []
    const winRate = parseFloat(hasil.winRate)
    const profitPersen = parseFloat(hasil.profitPersen)

    if (winRate >= 60) {
      catatan.push({ tipe: 'baik', pesan: '✅ Win rate Anda bagus (> 60%)' })
    } else if (winRate >= 40) {
      catatan.push({ tipe: 'sedang', pesan: '⚠️ Win rate sedang (40-60%). Perbaiki analisis entry.' })
    } else {
      catatan.push({ tipe: 'buruk', pesan: '❌ Win rate rendah (< 40%). Baca ulang materi Level 3.' })
    }

    if (profitPersen >= 10) {
      catatan.push({ tipe: 'baik', pesan: '✅ Profit sangat baik (> 10%)' })
    } else if (profitPersen >= 0) {
      catatan.push({ tipe: 'sedang', pesan: '⚠️ Profit kecil (0-10%). Bisa lebih baik.' })
    } else {
      catatan.push({ tipe: 'buruk', pesan: '❌ Anda rugi. Fokus pada manajemen risiko (Level 4).' })
    }

    if (hasil.jumlahTrade < 5) {
      catatan.push({ tipe: 'sedang', pesan: '💡 Anda baru melakukan sedikit trade. Latih lagi!' })
    } else if (hasil.jumlahTrade > 20) {
      catatan.push({ tipe: 'sedang', pesan: '💡 Terlalu banyak trade. Fokus pada kualitas.' })
    } else {
      catatan.push({ tipe: 'baik', pesan: '✅ Jumlah trade ideal (5-20)' })
    }

    return catatan
  }

  return {
    skenario: skenarioData.skenario,
    sesi,
    riwayat,
    mulaiSesi,
    beli,
    jual,
    selesaikanSesi,
    resetSesi,
    resetSemua,
    evaluasiPerforma,
    getHargaSekarang,
  }
}