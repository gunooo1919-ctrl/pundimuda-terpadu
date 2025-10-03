// app/materi/page.js

// 1. Deklarasi 'use client'
// Next.js App Router perlu tahu bahwa kode ini berinteraksi dengan browser
'use client';

// 2. Import Hooks (Alat Khusus React/Next.js)
import { useState, useRef, useEffect } from 'react';

// Daftar semua materi yang akan ditampilkan
const daftarMateri = [
  {
    id: 1,
    judul: "Uang Bukan Segalanya, Tapi Cara Kamu Mengelolanya Menentukan Masa Depanmu",
    videoId: "mj2Kk4FVN40",
    caption: "“Setiap orang punya hak buat hidup layak. Bukan karena kaya, tapi karena berjuang.” Kadang orang berpikir, uang itu sumber masalah. Padahal uang cuma alat yang penting siapa yang pegang dan gimana cara pakainya. Kalau kamu bijak, uang bisa bantu kamu bantu keluarga, bantu teman, dan bikin hidupmu lebih tenang. “Uang gak menentukan siapa kamu. Tapi cara kamu memperlakukan uang bisa nentuin masa depanmu.”"
  },
  {
    id: 2,
    judul: "Mengatur Uang Kecil adalah Kunci Mengelola Uang Besar",
    videoId: "7yW_GD-RoZY",
    caption: "“Gak peduli kamu punya 10 ribu atau 10 juta — kalau gak bisa ngatur, semua habis.” Banyak orang kurang mampu bukan karena gak punya uang, tapi karena gak tau ke mana uangnya pergi. Uang kecil pun bisa jadi besar kalau kamu tau cara jaganya. “Orang hebat yang bisa ngatur uang kecil, suatu hari bakal ngatur uang besar.”"
  },
  {
    id: 3,
    judul: "Jangan Menunggu, Ciptakan Peluangmu Sendiri",
    videoId: "hXOCjdtKiks",
    caption: "“Kalau kamu terus nunggu uang datang, kamu bakal capek nunggu selamanya.” Banyak orang yang malas suka mengeluh, bukan mencipta. Padahal semua orang punya kemampuan buat hasilin nilai. Jangan nunggu keajaiban datang. Gunakan apa yang udah ada: tenaga, waktu, ide, diri kalian. “Kalau kamu bisa hasilin seribu dengan jujur, kamu sedang belajar jadi kaya dengan bermartabat.”"
  },
  {
    id: 4,
    judul: "Hidup Sederhana Tanpa Gengsi, Hati Tenang Dompet Aman",
    videoId: "4RTGbPlBXzc",
    caption: "“Banyak orang yang pengen keliatan keren bukan karena kurang uang, tapi karena gaya hidupnya melebihi dompetnya.” Sering kali, kita beli bukan karena butuh, tapi karena pengen diakui. “Hidup tanpa gengsi bikin dompet tenang dan hati ringan.”"
  },
  {
    id: 5,
    judul: "Kesempatan Selalu Ada Bagi yang Mau Sabar dan Belajar",
    videoId: "4d2IslDYY3w",
    caption: "“Setiap orang punya kesempatan buat naik meraih impian asal mau sabar, belajar, dan menunda nikmat sesaat. “Kamu gak bisa pilih lahir di mana, tapi kamu bisa pilih hidup seperti apa.””"
  }
];

export default function MateriHarian() {
  // 3. useState: Menyimpan status video mana saja yang sudah selesai
  // Bentuknya objek, contoh: { materi_1: true, materi_2: false }
  const [materiSelesai, setMateriSelesai] = useState({});

  // 4. useRef: Membuat "kotak" untuk menyimpan referensi ke semua elemen video
  const videoRefs = useRef({});

  // 5. useEffect: Melakukan Aksi Sampingan setelah komponen dimuat
  useEffect(() => {
    const statusAwal = {};
    daftarMateri.forEach(materi => {
      // A. Cek status setiap materi di Local Storage
      const statusDisimpan = localStorage.getItem(`materi_${materi.id}_selesai`);
      if (statusDisimpan === 'true') {
        statusAwal[`materi_${materi.id}`] = true;
      } else {
        statusAwal[`materi_${materi.id}`] = false;
      }
    });
    setMateriSelesai(statusAwal);

    // B. Logika untuk event listener 'ended' tidak lagi diperlukan jika menggunakan YouTube Player
    // YouTube Player API akan menangani ini dengan lebih baik.
    // Namun untuk video HTML5 biasa, logika lama bisa diadaptasi di sini.

  }, []); // Array kosong [] artinya kode ini hanya dijalankan sekali

  const handleVideoEnd = (materiId) => {
    // Fungsi ini dipanggil saat video selesai
    const kunciMateri = `materi_${materiId}`;
    
    setMateriSelesai(prevStatus => ({
      ...prevStatus,
      [kunciMateri]: true
    }));
    
    localStorage.setItem(`${kunciMateri}_selesai`, 'true');
  };

  const handleLanjut = () => {
    alert('SELAMAT! Anda bisa melanjutkan ke Tantangan Menabung!');
    // Di sini Anda bisa menambahkan navigasi ke halaman selanjutnya
    // Misalnya menggunakan router dari Next.js: router.push('/tantangan')
  };

  // Hitung jumlah video yang sudah selesai ditonton
  const jumlahSelesai = Object.values(materiSelesai).filter(status => status === true).length;
  const semuaSelesai = jumlahSelesai === daftarMateri.length;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Materi Harian PundiMuda</h1>
        <p style={{ color: '#555', fontSize: '1.1em' }}>Tonton semua video untuk membuka tantangan menabung harian Anda!</p>
        <div style={{
            marginTop: '20px',
            backgroundColor: '#e9ecef',
            borderRadius: '8px',
            padding: '10px'
        }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
                Progress: {jumlahSelesai} / {daftarMateri.length} Video Selesai
            </p>
            <div style={{
                width: '100%',
                backgroundColor: '#ccc',
                borderRadius: '5px',
                marginTop: '5px'
            }}>
                <div style={{
                    width: `${(jumlahSelesai / daftarMateri.length) * 100}%`,
                    height: '20px',
                    backgroundColor: '#28a745',
                    borderRadius: '5px',
                    transition: 'width 0.5s ease-in-out'
                }}></div>
            </div>
        </div>
      </header>

      <main>
        {daftarMateri.map((materi, index) => (
          <section key={materi.id} style={{ 
            marginBottom: '40px', 
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: materiSelesai[`materi_${materi.id}`] ? '#e8f5e9' : 'white', // Latar hijau jika selesai
            borderLeft: `5px solid ${materiSelesai[`materi_${materi.id}`] ? '#4caf50' : '#0070f3'}`
          }}>
            <h2>Materi #{index + 1}: {materi.judul}</h2>
            
            {/* 6. Elemen Video menggunakan Iframe YouTube */}
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginBottom: '20px', borderRadius: '8px' }}>
              <iframe
                ref={el => videoRefs.current[materi.id] = el}
                src={`https://www.youtube.com/embed/${materi.videoId}?enablejsapi=1`}
                title={materi.judul}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onLoad={() => {
                    // Script untuk mendeteksi saat video YouTube selesai
                    const player = new YT.Player(videoRefs.current[materi.id], {
                        events: {
                            'onStateChange': (event) => {
                                if (event.data === YT.PlayerState.ENDED) {
                                    handleVideoEnd(materi.id);
                                }
                            }
                        }
                    });
                }}
              ></iframe>
            </div>

            <blockquote style={{
              margin: 0,
              padding: '15px',
              borderLeft: '4px solid #858080ff',
              backgroundColor: '#f8f9fa',
              fontStyle: 'italic',
              color: '#333'
            }}>
              <p>{materi.caption}</p>
            </blockquote>
            
            {materiSelesai[`materi_${materi.id}`] && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>✅ Selesai ditonton</p>}
          </section>
        ))}
      </main>

      {/* 7. Conditional Rendering: Tombol hanya muncul jika SEMUA video selesai */}
      <footer style={{ textAlign: 'center', marginTop: '30px', padding: '20px', backgroundColor: '#f1f1f1', borderRadius: '8px' }}>
        {semuaSelesai ? (
          <button
            onClick={handleLanjut}
            style={{
              padding: '15px 30px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            🎉 Selamat! Lanjut ke Tantangan Menabung
          </button>
        ) : (
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
            Tonton semua video untuk melanjutkan.
          </p>
        )}
      </footer>

      {/* Script untuk YouTube IFrame Player API */}
      <script src="https://www.youtube.com/iframe_api"></script>
    </div>
  );
}
+
