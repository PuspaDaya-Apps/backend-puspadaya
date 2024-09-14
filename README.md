API Autentikasi dengan NestJS
Ini adalah API autentikasi sederhana yang dibangun menggunakan NestJS, TypeORM, dan PostgreSQL, yang menyediakan endpoint untuk registrasi pengguna, login, dan validasi pengguna. Proyek ini telah dikontainerisasi menggunakan Docker untuk mempermudah pengaturan.

Fitur
Registrasi pengguna dengan enkripsi kata sandi
Login pengguna dengan validasi email dan kata sandi
Validasi pengguna dengan pembandingan kata sandi terenkripsi
Integrasi database menggunakan PostgreSQL dan TypeORM
Lingkungan yang dikontainerisasi menggunakan Docker
Prasyarat
Pastikan Anda sudah menginstal perangkat lunak berikut di mesin Anda:

Node.js
Docker
Docker Compose
NestJS CLI
Pengaturan Proyek
1. Clone repositori
bash
Copy code
git clone <repository-url>
cd <project-directory>
2. Buat file lingkungan (environment)
Buat file .env di root direktori proyek dan tambahkan variabel-variabel lingkungan berikut:

bash
Copy code
# Pengaturan database PostgreSQL
DB_HOST=alamat_host_db
DB_PORT=5432
DB_USER=nama_pengguna_db
DB_PASS=kata_sandi_db
DB_NAME=nama_database

# Pengaturan lainnya
JWT_SECRET=jwt_secret_anda
PORT=3000
Gantilah alamat_host_db, nama_pengguna_db, kata_sandi_db, dan nama_database sesuai dengan konfigurasi PostgreSQL yang Anda miliki.

3. Jalankan Docker
Jalankan kontainer Docker dengan perintah berikut:

bash
Copy code
docker-compose up --build
Ini akan menjalankan API dan menghubungkannya dengan kontainer PostgreSQL.

4. Jalankan Migrasi
Untuk memastikan skema database Anda sudah sesuai, jalankan migrasi menggunakan perintah TypeORM CLI (atau jika Anda menggunakan mode synchronize, tabel akan dibuat secara otomatis):

bash
Copy code
docker exec -it <nama_kontainer> npm run typeorm migration:run
5. Endpoint API
Berikut adalah endpoint API yang tersedia:

Registrasi pengguna baru
URL: /auth/register
Metode: POST
Payload:
json
Copy code
{
  "email": "user@example.com",
  "password": "your_password"
}
Login Pengguna
URL: /auth/login
Metode: POST
Payload:
json
Copy code
{
  "email": "user@example.com",
  "password": "your_password"
}
Validasi Pengguna
Fitur ini digunakan secara internal untuk keperluan autentikasi dan tidak diekspos sebagai endpoint API publik.
6. Menjalankan Tes
Untuk menjalankan tes unit, gunakan perintah berikut:

bash
Copy code
npm run test
Untuk menjalankan tes end-to-end:

bash
Copy code
npm run test:e2e
7. Menghentikan Kontainer Docker
Untuk menghentikan kontainer yang sedang berjalan:

bash
Copy code
docker-compose down
Struktur Proyek
bash
Copy code
src/
│
├── auth/
│   ├── auth.controller.ts  # Berisi route autentikasi
│   ├── auth.service.ts     # Logika bisnis untuk autentikasi
│   └── auth.module.ts      # Modul autentikasi
│
├── entities/
│   └── user.entity.ts      # Mendefinisikan entitas User
│
├── app.module.ts           # Modul utama aplikasi
├── main.ts                 # Entry point aplikasi
└── ...
Lisensi
Proyek ini dilisensikan di bawah lisensi MIT.