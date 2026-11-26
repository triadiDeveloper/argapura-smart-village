# Argapura — Portal Warga

Prototipe UI React untuk Desa Argapura, Kecamatan Cigudeg, Kabupaten Bogor, Jawa Barat. Bukan situs resmi pemerintah desa. Tidak menggunakan data pribadi warga.

## Menjalankan di Windows

Backup project lama, ekstrak ZIP ke folder baru (atau replace source setelah backup), lalu:

```powershell
npm ci
npm run dev
```

Buka URL yang ditampilkan Vite. Untuk production candidate:

```powershell
npm run lint
npm test
npm run build
npm start
```

Server production menggunakan port 3000 secara default. API gateway existing dipertahankan; akses cuaca BMKG menggunakan kode 32.01.22.2006 (https://www.bmkg.go.id/cuaca/prakiraan-cuaca/32.01.22.2006). Respons live perlu diuji. Harga pangan dan sumber bantuan berupa tautan resmi. Nomor kontak lokal serta jadwal bantuan belum terverifikasi, tidak dibuat-buat. Nomor nasional 110 dan 119 tersedia sebagai tel links. Ilustrasi SVG bukan foto desa.

## Scope desain awal
- Public homepage, desktop/mobile, navigasi, light/dark theme.
- Halaman bantuan, darurat, profil, pelayanan, kabar, ekonomi, transparansi, wisata, chat.
- Cuaca melalui gateway; modul gempa dan libur existing masih dapat diakses melalui URL /earthquake dan /holiday.
- Konten lokal kosong dengan status jelas. Tidak ada formulir pengajuan atau pengiriman chat aktif.

## Belum diimplementasikan
CMS, ASP.NET Core, SQL Server, SignalR, authentication, PWA, Capacitor Android, push notification, data lokal resmi, dan deployment. Jangan publish sebagai situs resmi sebelum verifikasi dan izin desa. Lakukan build, tes browser dan live API di lingkungan target.

Konfigurasi desa: `src/config/village.ts`. Layout: `src/components/layout/MainLayout.tsx`. UI: `src/pages/Home/HomePage.tsx`, `src/pages/Explore/VillagePages.tsx`, `src/index.css`.

## v2 — Dekat dengan Warga
- Homepage layanan-first dengan pencarian lokal dan navigasi mobile.
- Pengaturan aksesibilitas (ikon orang): tulisan besar, mode sederhana, dark mode. Preferensi tersimpan di localStorage.
- Mode sederhana menyembunyikan hero dekoratif, memperbesar teks dan mengurangi animasi. CSS menghormati prefers-reduced-motion.
- Animasi CSS ringan, tanpa dependency tambahan. Font Plus Jakarta Sans menggunakan fallback sistem bila tidak terpasang.
- Cuaca BMKG dan API Gateway sebelumnya dipertahankan. Jadwal bantuan, kontak lokal dan konten desa belum diverifikasi. Chat masih placeholder; SignalR, CMS, Android dan backend .NET belum diimplementasikan.
- Validasi: TypeScript, ESLint dan 3 unit test gateway lulus. Build Vite belum lolos di Linux karena native Rolldown Windows pada dependencies yang tersedia. Uji `npm ci`, `npm run build`, dan tampilan browser di Windows sebelum deployment.

## v3 — Interactive Demo (November 2026)

Default: **mock mode**, with a persistent demo warning on all routes. No backend is needed for the mock datasets. All dates, population counts, prices, budgets, service status and local stories are fictional. National telephone numbers 110 and 119 remain real; do not use them for testing. Local numbers and emergency incidents are deliberately not fabricated. No form or chat message is transmitted or persisted; demo state resets when leaving the page. Do not enter personal data.

```powershell
npm ci
npm run dev
```

To restore the previous live public-data integrations, copy `.env.example` to `.env.local`, set `VITE_USE_MOCK_DATA=false`, and restart Vite (or rebuild for deployment). This restores v2 placeholders for local content; it does not enable a CMS, SignalR, or ASP.NET Core. Mock mode is a build-time setting. Existing public API gateway is unchanged.

### Changed / added files
- Added `src/mocks/data.ts`, `src/mocks/api.ts`, `src/config/demo.ts`, `src/pages/Explore/DemoPages.tsx`, `.env.example`.
- Updated `src/App.tsx`, `src/services/api.ts`, `src/components/common/DataState.tsx`, `src/components/layout/MainLayout.tsx`, `src/pages/Home/HomePage.tsx`, `src/pages/Explore/ExplorePage.tsx`, `src/index.css`, `README.md`.
- Added 10 aid programs, 8 news/agenda items, 10 food prices, 6 sample products, 4 economy entries, 7 tourism/facility entries, 4 development projects, 8 local contact entries, and 10 service choices. Population and budget visualizations, notifications, search/filter/detail, local chat and service form simulation are included. Existing v2 accessible layout retained; no new dependencies. Existing illustrations retained; real photo gallery, maps, actual payment/order functions, notification delivery, CMS, SignalR and Android packaging are future work.

### Validation
TypeScript compilation, ESLint, and three existing server tests passed using the dependencies from the original upload. Full Vite production build could not run on Linux due to missing platform-specific Rolldown binding in the Windows dependency archive. Browser and interaction tests remain to be performed locally. This is a demo, not an official production release.

### Analisis kampung (v3.1)
Halaman `/profil` memiliki daftar kampung, pencarian, pengurutan, filter analisis, perbandingan penduduk, komposisi gender, KK penerima bantuan, UMKM, RT/RW, fasilitas dan proyek. Data di `src/mocks/kampung.ts` menggunakan enam nama kampung yang diberikan pengguna (v3.2). Pembagian dusun, RT/RW dan seluruh statistik tetap simulasi; nama belum diverifikasi secara administratif. Total penduduk, KK, gender, UMKM, dusun dan proyek konsisten dengan data demo v3. Filter analisis hanya memengaruhi ringkasan kampung; grafik perbandingan tetap mencakup seluruh kampung. Mode live tidak menampilkan data simulasi ini.
