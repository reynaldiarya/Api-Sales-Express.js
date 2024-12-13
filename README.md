# API Penjualan Makanan  

Proyek ini adalah implementasi API untuk sistem penjualan makanan yang dibangun menggunakan TypeScript. API ini menyediakan berbagai fitur seperti manajemen menu, pemrosesan pesanan, dan pengelolaan pelanggan. Proyek ini dibuat sebagai bagian dari mata kuliah **Pemrograman Backend Lanjut**.

## Teknologi yang Digunakan  
- **Node.js** dengan **TypeScript**  
- **Express.js**: Untuk pengelolaan rute dan middleware. 
- **JWT (JSON Web Token)**: Untuk autentikasi dan autorisasi.  
- **MongoDB**: Basis data utama untuk menyimpan data aplikasi.  

## Instalasi  
1. **Clone repositori ini**  
   ```bash
   git clone https://github.com/reynaldiarya/api-sales-express-js.git
   cd api-penjualan-makanan
   ```

2. **Instal dependensi**  
   Pastikan Node.js dan npm/yarn telah terinstal di sistem Anda.  
   ```bash
   npm install
   # atau menggunakan yarn
   yarn install
   ```

3. **Konfigurasi Basis Data**  
   - Pastikan MongoDB berjalan di sistem Anda atau gunakan layanan MongoDB seperti MongoDB Atlas.  
   - Ubah file `index.ts` pada folder config:  
     ```env
     export const MONGO_URI = "mongourl";
     export const APP_SECRET = "secretkey";
     ```

4. **Jalankan Server**  
   ```bash
   npm start
   ```
   Server akan berjalan di `http://localhost:8000`.  


## Kontribusi  
Kontribusi sangat diterima! Silakan *fork* repositori ini, buat *branch* baru, dan ajukan *pull request*. Pastikan kode Anda mengikuti standar dan telah diuji sebelum diajukan.  

## Lisensi  
Proyek ini dilisensikan di bawah MIT License. Silakan lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.  
