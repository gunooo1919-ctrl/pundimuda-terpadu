'use client'; 

import { useState, useEffect } from 'react'; 

// Data dasar 7 hari (Target harian)
const SAVING_TARGETS = [5000, 7000, 5000, 10000, 5000, 8000, 15000]; 
const TOTAL_TARGET = SAVING_TARGETS.reduce((sum, current) => sum + current, 0); 
const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export default function DailyChallengePage() {
  const [dailySavings, setDailySavings] = useState(new Array(7).fill(0));
  // State untuk mengontrol input yang sedang aktif
  const [inputAmount, setInputAmount] = useState('');
  // State untuk melacak hari mana yang sedang di-input pengguna
  const [activeDayIndex, setActiveDayIndex] = useState(0); 
  
  const totalSaved = dailySavings.reduce((sum, amount) => sum + amount, 0);
  const progressPercentage = ((totalSaved / TOTAL_TARGET) * 100).toFixed(1);

  // Mengambil data dari Local Storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('pundimuda_savings');
      if (savedData) {
        setDailySavings(JSON.parse(savedData));
      }
      
      // Tentukan hari pertama yang belum selesai sebagai activeDayIndex
      const firstUnsavedDayIndex = JSON.parse(savedData || '[]').findIndex(amount => amount === 0);
      if (firstUnsavedDayIndex !== -1) {
          setActiveDayIndex(firstUnsavedDayIndex);
      } else {
          // Jika semua hari sudah diisi, fokuskan pada hari terakhir
          setActiveDayIndex(6); 
      }
    }
  }, []);

  // Fungsi untuk menyimpan tabungan harian
  const handleSaveChallenge = (dayIndex, event) => {
    // Mencegah page refresh saat Enter/Submit
    if (event) {
      event.preventDefault(); 
    }

    // Hanya izinkan submit jika input berasal dari hari yang sedang aktif
    if (dayIndex !== activeDayIndex) return;

    const amount = parseInt(inputAmount); 

    if (isNaN(amount) || amount <= 0) {
      alert('Masukkan jumlah tabungan yang valid!');
      return;
    }

    // Logika penyimpanan yang sudah benar
    const newSavings = [...dailySavings];
    newSavings[dayIndex] = amount;

    // Simpan ke Local Storage
    setDailySavings(newSavings);
    localStorage.setItem('pundimuda_savings', JSON.stringify(newSavings));

    // Bersihkan input dan pindahkan fokus ke hari berikutnya
    setInputAmount('');
    if (dayIndex < 6) {
        setActiveDayIndex(dayIndex + 1);
    }

    alert(`Tabungan Hari ${dayIndex + 1} (${DAY_NAMES[dayIndex]}) sebesar Rp ${amount.toLocaleString('id-ID')} sudah tercatat!`);
  };
  
  return (
    // Memaksa mode terang (text-white) dan background hitam/gelap
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', color: '#fff', background: '#1a1a1a', minHeight: '100vh' }}>
      
      {/* JUDUL DAN PROGRESS GLOBAL */}
      <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>🎯 Daily Savings Challenge (7 Hari)</h1>
        <p style={{ fontSize: '14px', marginTop: '5px' }}>Progressmu Minggu Ini: **{progressPercentage}%**</p>
        
        {/* Progress Bar Sederhana */}
        <div style={{ background: '#333', height: '10px', borderRadius: '5px', marginTop: '10px' }}>
          <div 
            style={{ 
              background: '#FFD700', 
              height: '100%', 
              width: `${progressPercentage > 100 ? 100 : progressPercentage}%`, 
              borderRadius: '5px' 
            }} 
          />
        </div>
      </div>
      
      {/* MODUL PROGRES HARIAN (Loop untuk 7 hari) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {SAVING_TARGETS.map((target, dayIndex) => {
          const saved = dailySavings[dayIndex];
          const isCompleted = saved > 0;
          const isActive = dayIndex === activeDayIndex;

          return (
            <div 
              key={dayIndex}
              style={{ 
                border: isActive ? '2px solid #00BFFF' : '1px solid #444', 
                padding: '15px', 
                borderRadius: '8px', 
                background: isCompleted ? '#2a2a2a' : '#333', 
                opacity: isCompleted ? 0.8 : 1
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: isActive ? '#00BFFF' : (isCompleted ? '#4CAF50' : '#fff') }}>
                Hari {dayIndex + 1} ({DAY_NAMES[dayIndex]})
                {isActive && ' (SEKARANG)'}
              </h2>
              <p style={{ margin: '5px 0' }}>Target: **Rp {target.toLocaleString('id-ID')}**</p>
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Dicatat: Rp {saved.toLocaleString('id-ID')}
              </p>
              
              {/* INPUT FORM: Hanya muncul jika hari ini belum selesai DAN hari ini aktif */}
              {isActive && !isCompleted && (
                <form 
                  onSubmit={(e) => handleSaveChallenge(dayIndex, e)} 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}
                >
                  <input
                    type="number"
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    placeholder="Masukkan jumlah"
                    style={{ padding: '5px', border: '1px solid #666', borderRadius: '3px', background: '#444', color: '#fff', width: '100px' }}
                  />
                  <button
                    type="submit" 
                    style={{ padding: '8px 12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    Simpan
                  </button>
                </form>
              )}
              
              {isCompleted && (
                  <p style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: '5px' }}>✅ Selesai!</p>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #333', paddingTop: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Tabungan Minggu Ini</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00BFFF' }}>
          Rp {totalSaved.toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}
