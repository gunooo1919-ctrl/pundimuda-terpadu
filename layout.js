// pundimuda/app/layout.js

// Biarkan semua import font (geistmono) di sini
import './globals.css'; 

// HAPUS SEMUA BARIS DUPLIKAT DI BAGIAN BAWAH

// Ganti isian metadata (judul dan deskripsi)
export const metadata = {
  title: 'PundiMuda | PWA Savings Challenge',
  description: 'PWA untuk tantangan menabung dan simulasi keuangan 7 hari.',
}

// Hanya ada SATU export default
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* ==================================================
        PASTIKAN SEMUA PENAMBAHAN PWA ADA DI SINI
        ================================================== 
      */}
      <head>
        {/* Tambahan Link untuk PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Tambahan Meta Tag untuk PWA Theme Color */}
        <meta name="theme-color" content="#0070f3" />
      </head>
      
      <body>
        {/* Jika ada className dari GeistMono, biarkan saja */}
        {children} 
      </body>
    </html>
  );
}
