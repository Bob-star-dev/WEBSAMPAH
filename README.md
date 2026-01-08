# 🗑️ Bak Sampah Otomatis - Sistem Klasifikasi Sampah

Aplikasi web untuk sistem bak sampah otomatis yang dapat mengklasifikasikan sampah menjadi organik dan non-organik menggunakan teknologi AI.

## ✨ Fitur

- **Klasifikasi Otomatis**: Sistem dapat mengidentifikasi jenis sampah (organik/non-organik) melalui:
  - Upload gambar sampah
  - Input manual nama sampah
  - Penggunaan kamera (jika tersedia)

- **Statistik Real-time**: 
  - Tracking jumlah sampah organik dan non-organik
  - Persentase dan total sampah yang telah diklasifikasi
  - Data tersimpan di browser (localStorage)

- **Antarmuka Modern**:
  - Desain responsif untuk semua perangkat
  - Animasi yang smooth dan menarik
  - UI/UX yang user-friendly

## 🚀 Cara Menggunakan

1. **Buka File `index.html`** di browser web Anda (Chrome, Firefox, Edge, dll)

2. **Klasifikasi Sampah**:
   - **Upload Gambar**: Klik tombol "Pilih Gambar" untuk mengupload foto sampah
   - **Kamera**: Klik tombol "Gunakan Kamera" untuk mengambil foto langsung
   - **Input Manual**: Ketik nama sampah di kolom input (contoh: "pisang", "botol plastik")

3. **Lihat Hasil**: Sistem akan menampilkan hasil klasifikasi dengan tingkat akurasi

4. **Cek Statistik**: Klik tab "Statistik" untuk melihat data penggunaan

## 🛠️ Teknologi

- HTML5
- CSS3 (dengan Grid dan Flexbox)
- Vanilla JavaScript
- LocalStorage untuk penyimpanan data
- Responsive Design

## 📝 Database Sampah

Aplikasi menggunakan database built-in untuk klasifikasi:

**Sampah Organik**:
- Buah-buahan (pisang, apel, jeruk, dll)
- Sayuran (bayam, kangkung, wortel, dll)
- Sisa makanan (nasi, mie, roti, dll)
- Bahan organik lainnya

**Sampah Non-Organik**:
- Plastik (botol, kantong, bungkus, dll)
- Kaca (botol, gelas, beling)
- Logam (kaleng, aluminium, besi)
- Kertas dan kardus
- Elektronik dan baterai

## 🔮 Pengembangan Selanjutnya

Untuk implementasi production, dapat ditambahkan:

- **Machine Learning Model**: Integrasi dengan TensorFlow.js atau API ML untuk klasifikasi gambar yang lebih akurat
- **Backend Server**: Untuk menyimpan data dan analitik yang lebih kompleks
- **Hardware Integration**: Koneksi dengan hardware bak sampah otomatis (Arduino/Raspberry Pi)
- **User Authentication**: Sistem login untuk tracking per pengguna
- **Database**: Penyimpanan data di cloud database

## 📄 Lisensi

Aplikasi ini dibuat untuk keperluan edukasi dan demonstrasi sistem bak sampah otomatis.

---

**Dikembangkan dengan ❤️ untuk lingkungan yang lebih baik**

