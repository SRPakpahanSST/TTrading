# TTrading
TTrading: "Tenang Trading", 
Tagline: "Cuan Berkah, Dampak Nyata",
Sub-tagline: "Trading dengan Hati yang Tenang, Tangan yang Cepat", 
Motto: "Hati adalah grafik Candlestick terbesar.", 
Maskot: 🧘 (orang meditasi) atau 🌱 (benih tumbuh), 
Warna Utama Amber (#f59e0b) — melambangkan kehangatan, kebijaksanaan, dan cahaya.


# 🌱 T Trading (Tenang Trading)

> **"Cuan Berkah, Dampak Nyata"**
>
> *"Trading dengan Hati yang Tenang, Tangan yang Cepat"*

[![Deploy to GitHub Pages](https://github.com/USERNAME/tenang-trading/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/tenang-trading/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)

---

## 📖 Tentang Aplikasi

**T Trading (Tenang Trading)** adalah aplikasi web untuk komunitas **PMD Impact Invest** yang membantu trader pemula:

- 🎮 **Berlatih trading** tanpa risiko (Mode Simulasi)
- 📊 **Memantau 4 Pilar Trader Legendaris** setiap hari
- 🧠 **Mendeteksi & mengatasi 7 Dosa Dagang**
- 📓 **Mencatat jurnal** trading secara otomatis
- 🤝 **Menyisihkan 2% profit** untuk amal sosial
- 🧘 **Melatih mental** dengan meditasi trading

Aplikasi ini dibangun berdasarkan filosofi **4 Trader Legendaris**:

| **Pilar** | **Filosofi** | **Fokus** |
|:---|:---|:---|
| 🧘 **Raja Makro** | *"Bukan siapa yang paling sibuk, tapi siapa yang bisa menunggu."* | Kesabaran & titik masuk |
| 🐺 **Pembunuh Jangka Pendek** | *"Transaksi ibarat menari dengan serigala."* | Momentum & keberanian |
| ✨ **Sentuhan Emas** | *"Di atas garis adalah Raja, di bawah garis adalah bandit."* | Tren & disiplin |
| 💎 **Dewa Fundamental** | *"Hati adalah grafik Candlestick terbesar."* | Hati & amal |

---

## ✨ Fitur Utama

### 1. 📊 Dashboard
- Ringkasan portofolio (total aset, profit/loss, target)
- Skor 4 Pilar Trader Legendaris
- Deteksi 7 Dosa Dagang secara real-time
- Mantra harian

### 2. 🎮 Mode Simulasi
- Saldo virtual Rp 10.000.000
- Latihan beli/jual tanpa risiko
- Riwayat transaksi simulasi

### 3. 📓 Jurnal Trading
- Catat setiap transaksi & refleksi
- Tag emosi & pilar yang digunakan
- Hitung skor 4 pilar otomatis
- Hitung amal 2% otomatis

### 4. 📈 Analisis
- Grafik Bull-Bear otomatis (MA200)
- Aliran dana asing
- Screener saham

### 5. 🧠 7 Dosa Dagang
- Deteksi: Keserakahan, Ketakutan, Harapan, Penyesalan, Kesombongan, Keraguan, Kebingungan
- Modul latihan per dosa
- Statistik perkembangan dosa

### 6. 🧘 Meditasi Trading
- Timer meditasi 5 menit
- Cek emosi sebelum trading
- Mantra harian

### 7. 💰 Kalkulator
- Hitung lot berdasarkan modal
- Hitung stop loss & take profit
- Hitung amal 2% otomatis

### 8. 🤝 Amal
- Catat setiap donasi
- Total amal terkumpul
- Riwayat amal

### 9. ⚙️ Pengaturan
- Profil pengguna
- Target profit & max drawdown
- Komitmen amal
- Notifikasi

---

## 🛠️ Teknologi

| **Layer** | **Teknologi** |
|:---|:---|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **Routing** | React Router DOM v6 |
| **Chart** | Recharts |
| **Date** | date-fns |
| **Storage** | localStorage (sementara) |
| **Deploy** | GitHub Pages → Vercel (nanti) |
| **Backend** | Supabase (nanti) |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js v18+ ([download](https://nodejs.org/))
- npm atau yarn
- Git

### Langkah 1: Clone Repository

```bash
git clone https://github.com/USERNAME/tenang-trading.git
cd tenang-trading
```

Langkah 2: Install Dependencies

```bash
npm install
```

Langkah 3: Jalankan Development Server

```bash
npm run dev
```

Buka http://localhost:5173 di browser.

Langkah 4: Build untuk Production

```bash
npm run build
```

Hasil build ada di folder dist/.

Langkah 5: Preview Build

```bash
npm run preview
```

---

📁 Struktur Folder

```
tenang-trading/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deploy
├── public/
│   ├── 404.html                    # SPA fallback
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/                 # Layout (Header, Sidebar, Footer)
│   │   ├── ui/                     # UI dasar (Card, Button, dll.)
│   │   └── shared/                 # Komponen khusus (PilarScore, dll.)
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Simulasi/
│   │   ├── Jurnal/
│   │   ├── Analisis/
│   │   ├── DosaDagang/
│   │   ├── Meditasi/
│   │   ├── Kalkulator/
│   │   ├── Amal/
│   │   └── Pengaturan/
│   ├── hooks/                      # Custom React hooks
│   ├── services/                   # API & logika bisnis
│   ├── store/                      # State management (Zustand)
│   ├── utils/                      # Fungsi utilitas
│   ├── data/                       # Data statis
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

🌐 Deploy ke GitHub Pages

1. Buat Repository di GitHub

· Nama repository: tenang-trading
· Visibility: Public

2. Push Kode ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: T Trading"
git branch -M main
git remote add origin https://github.com/USERNAME/tenang-trading.git
git push -u origin main
```

3. Aktifkan GitHub Pages

· Buka Settings → Pages
· Source: GitHub Actions
· Klik Save

4. Atur Workflow Permissions

· Buka Settings → Actions → General
· Workflow permissions: Read and write permissions
· Klik Save

5. Tunggu Deploy Selesai

· Buka tab Actions untuk melihat progress
· Setelah selesai, aplikasi live di: https://USERNAME.github.io/tenang-trading/

---

🔄 Migrasi ke Vercel (Nanti)

Saat butuh backend (login, database, API saham), migrasi ke Vercel:

1. Import Repository ke Vercel

· Buka vercel.com
· Klik Add New → Project
· Pilih repository tenang-trading

2. Konfigurasi Build

Setting Nilai
Framework Preset Vite
Build Command npm run build
Output Directory dist
Install Command npm install

3. Hapus Konfigurasi GitHub Pages

· Hapus base di vite.config.js
· Hapus basename di main.jsx
· Hapus file .github/workflows/deploy.yml
· Hapus public/404.html

4. Deploy

· Klik Deploy
· Aplikasi live di https://tenang-trading.vercel.app

---

🎨 Palet Warna

Warna Kode Hex Penggunaan
Amber #F59E0B Warna utama (huruf T, aksen)
Slate #1E293B Warna sekunder (latar, teks)
Green #22C55E Aksen (tunas, pertumbuhan)
White #FFFFFF Latar terang
Light Slate #F1F5F9 Latar sekunder

---

📋 Roadmap

✅ Fase 1: Frontend Statis (Selesai)

☑ Setup proyek React + Vite
☑ Dashboard UI
☑ Halaman Simulasi
☑ Halaman Jurnal
☑ Halaman Analisis
☑ Halaman 7 Dosa Dagang
☑ Halaman Meditasi
☑ Halaman Kalkulator
☑ Halaman Amal
☑ Halaman Pengaturan
☑ Deploy ke GitHub Pages

🔜 Fase 2: Backend & Database

☐ Migrasi ke Vercel
☐ Setup Supabase (database + auth)
☐ Login user multi-device
☐ Sinkronisasi data antar device

🔜 Fase 3: API & Real-time

☐ API data saham real-time
☐ API aliran dana asing
☐ Notifikasi push
☐ Deteksi dosa otomatis (AI/ML)

🔜 Fase 4: Komunitas

☐ Dashboard komunitas PMD Impact Invest
☐ Laporan amal transparan
☐ Leaderboard 4 pilar
☐ Sharing jurnal antar anggota

🔜 Fase 5: Mobile App

☐ PWA (Progressive Web App)
☐ Android app (React Native)
☐ iOS app (React Native)

---

🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. Fork repository ini
2. Buat branch baru (git checkout -b fitur-baru)
3. Commit perubahan (git commit -m 'Menambah fitur baru')
4. Push ke branch (git push origin fitur-baru)
5. Buat Pull Request

---

📄 Lisensi

Proyek ini dilisensikan di bawah MIT License — lihat file LICENSE untuk detail.

---

👥 Tim

PMD Impact Invest

· Komunitas investor pemula yang fokus pada fundamental, rutin investasi, dan dampak sosial.

---

📞 Kontak

· GitHub: @srpakpahansst
· Grup WhatsApp: PMD Impact Invest
· Email: pmd.impact.invest@gmail.com

---

🙏 Ucapan Terima Kasih

· 4 Trader Legendaris — atas filosofi yang menginspirasi
· PMD Impact Invest — atas semangat kebersamaan
· Anda — karena telah membaca hingga selesai

---

💎 Motto

"Hati adalah grafik Candlestick terbesar.
Kalau hati sudah kacau,
sejelas apa pun pergerakan pasar pasti akan sia-sia."

---

<div align="center">

🌱 Dibangun dengan 🖤 untuk trader yang tenang 🌱

"Cuan Berkah, Dampak Nyata"

</div>
```

---

📝 CATATAN PENTING

Sebelum push ke GitHub, ganti bagian berikut di README.md:

Bagian Ganti dengan
USERNAME Username GitHub Anda
pmd.impact.invest@gmail.com Email Anda
Link WhatsApp Link grup Anda (sudah ada)

---