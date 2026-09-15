# 🤝 Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada **T Trading (Tenang Trading)**! 

Proyek ini adalah milik komunitas **PMD Impact Invest**, dan kami sangat menghargai setiap kontribusi—baik itu kode, dokumentasi, desain, atau ide.

---

## 📜 Kode Etik

Dengan berpartisipasi dalam proyek ini, Anda setuju untuk:

1. **Menjaga sikap hormat** kepada semua kontributor, tanpa memandang latar belakang.
2. **Tidak melakukan diskriminasi** berdasarkan suku, agama, ras, golongan, atau gender.
3. **Menerima kritik dengan baik** dan memberikan kritik yang membangun.
4. **Fokus pada tujuan bersama**—membantu trader pemula belajar dengan tenang.
5. **Menjaga semangat "Cuan Berkah, Dampak Nyata"** dalam setiap kontribusi.

---

## 🎯 Cara Berkontribusi

### 1. 🐛 Melaporkan Bug

Jika menemukan bug, buat **Issue** di GitHub dengan format:

```markdown
**Deskripsi Bug:**
[Jelaskan bug yang ditemukan]

**Langkah Reproduksi:**
1. Buka halaman '...'
2. Klik tombol '...'
3. Lihat error

**Perilaku yang Diharapkan:**
[Apa yang seharusnya terjadi]

**Perilaku Aktual:**
[Apa yang sebenarnya terjadi]

**Screenshot:**
[Jika ada]

**Lingkungan:**
- OS: [misal Windows 11]
- Browser: [misal Chrome 120]
- Versi Aplikasi: [misal 1.0.0]
```

2. 💡 Mengusulkan Fitur

Jika punya ide fitur baru, buat Issue dengan format:

```markdown
**Nama Fitur:**
[Nama fitur yang diusulkan]

**Deskripsi:**
[Jelaskan fitur ini]

**Manfaat:**
[Mengapa fitur ini berguna untuk komunitas]

**Contoh Penggunaan:**
[Bagaimana fitur ini akan digunakan]

**Prioritas:**
- [ ] Tinggi
- [ ] Sedang
- [ ] Rendah
```

3. 🔧 Mengirim Pull Request

Langkah 1: Fork Repository

Klik tombol Fork di pojok kanan atas repository.

Langkah 2: Clone Fork Anda

```bash
git clone https://github.com/USERNAME-ANDA/tenang-trading.git
cd tenang-trading
```

Langkah 3: Buat Branch Baru

```bash
git checkout -b fitur/nama-fitur
# atau
git checkout -b bugfix/nama-bug
```

Format nama branch:

· fitur/ untuk fitur baru
· bugfix/ untuk perbaikan bug
· docs/ untuk dokumentasi
· refactor/ untuk refactoring
· style/ untuk perubahan styling

Langkah 4: Install Dependencies

```bash
npm install
```

Langkah 5: Buat Perubahan

· Ikuti standar kode (lihat bagian di bawah)
· Tulis komentar yang jelas
· Pastikan tidak ada error saat npm run dev

Langkah 6: Test Perubahan

```bash
npm run build
npm run preview
```

Langkah 7: Commit Perubahan

```bash
git add .
git commit -m "feat: menambah fitur X"
```

Format commit message:

· feat: untuk fitur baru
· fix: untuk perbaikan bug
· docs: untuk dokumentasi
· style: untuk styling
· refactor: untuk refactoring
· test: untuk testing
· chore: untuk maintenance

Langkah 8: Push ke Fork

```bash
git push origin fitur/nama-fitur
```

Langkah 9: Buat Pull Request

1. Buka repository asli di GitHub
2. Klik New Pull Request
3. Pilih branch Anda
4. Isi deskripsi PR dengan jelas
5. Klik Create Pull Request

---

📐 Standar Kode

1. Struktur File

```
src/
├── components/
│   ├── layout/       # Komponen layout
│   ├── ui/           # Komponen UI dasar
│   └── shared/       # Komponen khusus
├── pages/            # Halaman
├── hooks/            # Custom hooks
├── services/         # API & logika bisnis
├── store/            # State management
├── utils/            # Fungsi utilitas
└── data/             # Data statis
```

2. Penamaan File

Jenis Format Contoh
Komponen PascalCase Card.jsx, Header.jsx
Halaman PascalCase Dashboard.jsx
Hook camelCase useAuth.js
Service camelCase stockService.js
Store camelCase authStore.js
Util camelCase format.js
Data camelCase dosaList.js

3. Penamaan Variabel

```jsx
// ✅ Benar
const totalAset = 379143
const handleSubmit = () => {}
const isLoggedIn = true

// ❌ Salah
const total_aset = 379143
const handlesubmit = () => {}
const loggedin = true
```

4. Komponen React

```jsx
// ✅ Benar
export default function Card({ children, className = '', title, icon }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <span className="text-xl">{icon}</span>}
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h2>
        </div>
      )}
      {children}
    </div>
  )
}

// ❌ Salah
export default function card(props) {
  return <div>{props.children}</div>
}
```

5. Styling dengan Tailwind

```jsx
// ✅ Benar — gunakan Tailwind utility classes
<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">

// ❌ Salah — hindari inline style
<div style={{ backgroundColor: 'white', padding: '24px' }}>
```

6. Komentar

```jsx
// ✅ Benar — komentar yang menjelaskan "mengapa", bukan "apa"
// Gunakan useMemo untuk mencegah perhitungan ulang saat render
const total = useMemo(() => hitungTotal(data), [data])

// ❌ Salah — komentar yang jelas dari kode
// Set total ke 0
const total = 0
```

---

🎨 Standar Desain

1. Palet Warna

Warna Kode Hex Penggunaan
Amber #F59E0B Warna utama
Slate #1E293B Warna sekunder
Green #22C55E Aksen
White #FFFFFF Latar terang

2. Tipografi

· Font: System UI / Inter
· Ukuran: text-sm, text-base, text-lg, text-xl, text-3xl
· Berat: font-normal, font-semibold, font-bold

3. Spacing

· Gunakan kelipatan 4: p-4, p-6, p-8
· Gap: gap-2, gap-4, gap-6

4. Dark Mode

Semua komponen wajib mendukung dark mode:

```jsx
<div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
```

---

🧪 Testing

Menjalankan Test

```bash
npm run test
```

Menulis Test

```javascript
import { describe, it, expect } from 'vitest'
import { hitungLot } from '../utils/calculations'

describe('hitungLot', () => {
  it('menghitung lot dengan benar', () => {
    expect(hitungLot(1000000, 1800)).toBe(5)
  })
})
```

---

📝 Dokumentasi

1. Komentar Kode

· Gunakan JSDoc untuk fungsi kompleks
· Tulis komentar dalam Bahasa Indonesia atau Inggris

2. Update README

Jika menambah fitur baru, update README.md:

· Tambahkan di bagian Fitur Utama
· Update Roadmap jika perlu

3. Update CHANGELOG

Jika ada, update CHANGELOG.md dengan format:

```markdown
## [1.1.0] - 2026-10-01
### Added
- Fitur X
### Fixed
- Bug Y
```

---

🎯 Prioritas Kontribusi

Kami sangat menghargai kontribusi dalam urutan prioritas berikut:

Prioritas Jenis Kontribusi
🔴 Tinggi Perbaikan bug, keamanan, aksesibilitas
🟡 Sedang Fitur baru, peningkatan UI/UX
🟢 Rendah Dokumentasi, terjemahan, refactoring

---

🏆 Pengakuan Kontributor

Semua kontributor akan dicantumkan di:

· README.md (bagian Kontributor)
· Halaman About aplikasi (nanti)

---

📞 Butuh Bantuan?

Jika ada pertanyaan:

· Buat Issue dengan label question
· Hubungi di grup PMD Impact Invest
· Email: pmd.impact.invest@gmail.com

---

💎 Motto Kontribusi

"Satu baris kode yang baik,
lebih berharga dari seribu baris yang buruk.
Satu kontribusi yang ikhlas,
lebih bermakna dari seribu kata."

---

<div align="center">

🌱 Terima kasih telah berkontribusi! 🌱

"Cuan Berkah, Dampak Nyata"

</div>
```

---

📋 CHECKLIST FILE YANG SUDAH DIBUAT

No File Status
1 README.md ✅ Sudah
2 LICENSE ✅ Sudah
3 CONTRIBUTING.md ✅ Sudah
4 CHANGELOG.md 🔜 Belum
5 CODE_OF_CONDUCT.md 🔜 Belum
6 .env.example ✅ Sudah
7 .gitignore ✅ Sudah

---