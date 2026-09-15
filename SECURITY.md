# 🔒 Kebijakan Keamanan

## Komitmen Keamanan

Tim **T Trading (Tenang Trading)** berkomitmen untuk menjaga keamanan data pengguna dan integritas aplikasi. Kami menghargai upaya komunitas dalam membantu kami mengidentifikasi dan mengatasi masalah keamanan.

---

## 📋 Versi yang Didukung

Kami memberikan pembaruan keamanan untuk versi berikut:

| **Versi** | **Didukung** | **Catatan** |
|:---|:---|:---|
| **1.0.x** | ✅ Ya | Versi stabil saat ini |
| **0.9.x** | ⚠️ Terbatas | Hanya perbaikan kritis |
| **< 0.9** | ❌ Tidak | Tidak didukung lagi |

---

## 🚨 Melaporkan Kerentanan

### Cara Melaporkan

**JANGAN** melaporkan kerentanan keamanan melalui **Issue publik**, karena dapat membahayakan pengguna lain.

Sebagai gantinya, laporkan secara **private** melalui:

| **Saluran** | **Keterangan** |
|:---|:---|
| **Email** | pmd.impact.invest@gmail.com |
| **Subject** | `[SECURITY] Laporan Kerentanan - [Nama Kerentanan]` |
| **GitHub Security Advisory** | [Buat advisory](https://github.com/USERNAME/tenang-trading/security/advisories/new) |

### Informasi yang Perlu Disertakan

Saat melaporkan, sertakan:

```markdown
**Jenis Kerentanan:**
[Deskripsi singkat]

**Lokasi:**
[File/halaman yang terpengaruh]

**Langkah Reproduksi:**
1. Buka '...'
2. Klik '...'
3. Lihat error

**Dampak:**
[Apa yang bisa dilakukan penyerang]

**Bukti Konsep (PoC):**
[Jika ada]

**Saran Perbaikan:**
[Jika ada]

**Lingkungan:**
- OS: [misal Windows 11]
- Browser: [misal Chrome 120]
- Versi Aplikasi: [misal 1.0.0]
```

---

⏱️ Proses Penanganan

Tahap Waktu Keterangan
Konfirmasi 1x24 jam Kami akan mengonfirmasi laporan diterima
Investigasi 3-7 hari Kami akan menyelidiki kerentanan
Perbaikan 7-30 hari Tergantung tingkat keparahan
Rilis Segera setelah perbaikan Patch akan dirilis
Pengumuman Setelah rilis Kami akan mengumumkan secara publik

---

🏆 Pengakuan Pelapor

Kami sangat menghargai pelapor yang bertanggung jawab. Jika Anda melaporkan kerentanan yang valid:

· Nama Anda akan dicantumkan di SECURITY.md (jika diinginkan).
· Kontribusi Anda akan diakui di CHANGELOG.md.
· Anda akan mendapat penghargaan di komunitas PMD Impact Invest.

Hall of Fame Pelapor

Nama Kerentanan Tanggal
(Belum ada) - -

---

🛡️ Praktik Keamanan Saat Ini

1. Penyimpanan Data

· Semua data disimpan di localStorage browser (sementara).
· Tidak ada data yang dikirim ke server (belum ada backend).
· Tidak ada data pribadi yang dikumpulkan saat ini.

2. Autentikasi

· Belum ada autentikasi (akan ditambahkan di Fase 2).
· Nanti akan menggunakan Supabase Auth dengan enkripsi end-to-end.

3. Enkripsi

· Semua koneksi menggunakan HTTPS (otomatis dari GitHub Pages).
· Tidak ada data sensitif yang disimpan saat ini.

4. Dependensi

· Semua dependensi diperbarui secara berkala.
· Menggunakan Dependabot untuk memantau kerentanan.
· Audit keamanan dilakukan setiap bulan.

5. Kode

· Kode ditinjau sebelum di-merge.
· Tidak ada hardcoded credentials.
· Tidak ada secret yang di-commit ke repository.

---

⚠️ Risiko yang Diketahui

1. localStorage

· Risiko: Data bisa diakses oleh JavaScript di halaman yang sama.
· Mitigasi: Tidak menyimpan data sensitif. Akan diganti dengan database saat migrasi ke Supabase.

2. Tidak Ada Autentikasi

· Risiko: Siapa pun bisa mengakses aplikasi.
· Mitigasi: Belum ada data pribadi yang disimpan. Autentikasi akan ditambahkan di Fase 2.

3. Dependensi Pihak Ketiga

· Risiko: Kerentanan di library pihak ketiga.
· Mitigasi: Menggunakan Dependabot, audit bulanan, dan pembaruan berkala.

---

🚫 Yang Tidak Kami Lakukan

Kami TIDAK:

· Menjual data pengguna ke pihak ketiga.
· Melacak pengguna tanpa izin.
· Menyimpan kata sandi dalam bentuk teks biasa.
· Menggunakan cookie untuk iklan.
· Membagikan data ke pihak yang tidak berwenang.

---

📚 Sumber Daya Keamanan

Untuk Pengguna

· Cara Membuat Kata Sandi yang Kuat
· Cara Mengenali Phishing
· Cara Mengamankan Perangkat

Untuk Kontributor

· OWASP Top 10
· GitHub Security Best Practices
· Node.js Security Best Practices

---

📞 Kontak Keamanan

Saluran Keterangan
Email pmd.impact.invest@gmail.com
Subject [SECURITY] ...
GitHub Buat Security Advisory

---

🔄 Pembaruan Kebijakan

Kebijakan ini akan ditinjau dan diperbarui:

· Setiap 6 bulan sekali.
· Setelah insiden keamanan besar.
· Setelah migrasi ke platform baru (Vercel + Supabase).

Versi Terakhir: 1.0.0 (15 September 2026)

---

💎 Motto Keamanan

"Keamanan bukanlah fitur,
melainkan fondasi.
Tanpa keamanan,
tidak ada ketenangan."

---

<div align="center">

🌱 Terima kasih telah membantu menjaga T Trading tetap aman! 🌱

"Cuan Berkah, Dampak Nyata"

</div>
```

---