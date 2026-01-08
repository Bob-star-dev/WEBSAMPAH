# 🗑️ Bak Sampah Pintar - Smart Trash Bin Web App

Aplikasi web mobile-first untuk sistem bak sampah pintar yang terintegrasi dengan IoT (ESP32Cam + Servo) untuk pemilahan sampah otomatis menggunakan AI.

## ✨ Fitur Utama

### 📱 Mobile-First Design
- Desain elegan dan premium dengan dark theme
- Responsif untuk semua perangkat mobile
- Navigasi bottom bar yang mudah digunakan
- UI/UX yang modern dan intuitif

### 🏠 Dashboard
- Statistik real-time (Organik, Non-Organik, Total)
- Data hari ini dengan visualisasi
- Riwayat 7 hari terakhir
- Aksi cepat ke halaman lain

### 📊 Analitik
- Grafik interaktif dengan Chart.js
- Tampilan harian, mingguan, dan bulanan
- Ringkasan statistik lengkap
- Insight & analisis otomatis

### 🤖 Rekomendasi AI
- Analisis pintar berdasarkan pola penggunaan
- Rekomendasi personal untuk mengurangi sampah
- Analisis detail dengan breakdown data
- Tips & trik ramah lingkungan

### 👤 Profil
- Ringkasan aktivitas pengguna
- Informasi sistem IoT
- Pengaturan aplikasi
- Informasi tentang sistem

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js
- **Storage**: LocalStorage (sementara, akan diganti Firebase)
- **Design**: Mobile-first, Dark theme, Premium UI
- **IoT Integration**: Siap untuk integrasi Firebase (saat ini menggunakan dummy data)

## 🚀 Cara Menggunakan

1. **Buka File `index.html`** di browser web (akan redirect ke dashboard)
2. **Atau langsung buka `dashboard.html`** untuk halaman utama
3. **Navigasi**: Gunakan bottom navigation untuk berpindah halaman
   - 🏠 Dashboard - Halaman utama dengan statistik
   - 📊 Analitik - Grafik dan analisis data
   - 💡 Rekomendasi - Saran dari AI
   - 👤 Profil - Pengaturan dan info

## 📁 Struktur File

```
WEBSAMPAH/
├── index.html          # Landing page (redirect ke dashboard)
├── dashboard.html      # Halaman dashboard utama
├── analitik.html       # Halaman analitik dengan grafik
├── rekomendasi.html    # Halaman rekomendasi AI
├── profil.html         # Halaman profil dan pengaturan
├── style.css           # Stylesheet utama (mobile-first, premium)
├── app.js              # JavaScript shared functions
├── data.js             # Data manager & dummy data generator
└── README.md           # Dokumentasi
```

## 🔌 Integrasi IoT

### Sistem Hardware
- **ESP32Cam**: Menangkap gambar sampah
- **Servo Motor**: Menggerakkan papan pengarah sampah
- **ESP32**: Mengirim data ke Firebase

### Alur Kerja
1. Sampah diletakkan di area sensor bak sampah
2. ESP32Cam menangkap gambar sampah
3. AI memproses gambar dan mengklasifikasikan (Organik/Non-Organik)
4. Servo menggerakkan papan ke kiri (organik) atau kanan (non-organik)
5. ESP32 mengirim data ke Firebase (jumlah organik & non-organik per hari)
6. Web app membaca data dari Firebase dan menampilkan analisis

### Data Dummy
Saat ini aplikasi menggunakan **data dummy** yang digenerate otomatis. Data akan diganti dengan Firebase saat sistem IoT siap.

## 🎨 Fitur Desain

- **Dark Theme**: Tema gelap yang elegan
- **Gradient Accents**: Gradient modern untuk elemen penting
- **Glass Morphism**: Efek kaca pada beberapa elemen
- **Smooth Animations**: Animasi halus untuk interaksi
- **Responsive**: Optimal di semua ukuran layar

## 📊 Data & Statistik

### Tipe Data
- **Harian**: Data per hari (7 hari terakhir)
- **Mingguan**: Agregasi per minggu (4 minggu terakhir)
- **Bulanan**: Agregasi per bulan (12 bulan terakhir)

### Metrik yang Ditampilkan
- Total sampah organik
- Total sampah non-organik
- Total keseluruhan
- Rata-rata per hari
- Persentase organik vs non-organik
- Tren penggunaan

## 🤖 AI Recommendations

Sistem AI menganalisis data dan memberikan rekomendasi seperti:
- "Kurangi menggunakan bahan anorganik, dalam sehari sudah 4 anorganik yang kamu buang"
- Analisis rasio organik vs non-organik
- Tips untuk mengurangi penggunaan plastik
- Saran berdasarkan tren penggunaan

## 🔄 Update Mendatang

- [ ] Integrasi Firebase Real-time
- [ ] Notifikasi push
- [ ] Tema (dark/light)
- [ ] Multi-language support
- [ ] Export data (PDF/Excel)
- [ ] User authentication
- [ ] Multiple device support

## 📝 Catatan

- Saat ini menggunakan **dummy data** karena Firebase belum terhubung
- Data disimpan di localStorage browser
- Aplikasi siap untuk integrasi Firebase
- Desain mobile-first, optimal di smartphone

## 🌱 Tentang Proyek

Proyek ini dikembangkan untuk mendukung sistem IoT bak sampah pintar yang membantu pemilahan sampah otomatis, sehingga dapat meningkatkan efisiensi daur ulang dan mengurangi dampak lingkungan.

---

**Dikembangkan dengan ❤️ untuk lingkungan yang lebih baik** 🌍
