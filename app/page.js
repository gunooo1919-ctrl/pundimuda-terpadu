'use client';

import { useState } from 'react';

// Fungsi Dummy untuk pengganti Context (karena impor Context ke page.js bermasalah)
// Dalam aplikasi nyata, ini akan diganti dengan useAppContext
const useDummyContext = () => ({
    userId: 'ID_PENGGUNA_DUMMY_123456',
    userName: 'Oliver PundiMuda',
    lastLogin: new Date().getTime(),
    formatCurrency: (amount) => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount),
});


export default function HomePage() {
    // Data Dummy (mengganti Context yang sedang bermasalah di level page.js)
    const { userId, userName, formatCurrency, lastLogin } = useDummyContext();
    
    // State untuk interaktivitas hover pada kartu
    const [hoveredCard, setHoveredCard] = useState(null);

    // Data untuk setiap kartu fitur
    const features = [
        {
            href: '/challenge', 
            title: 'Tantangan Harian 🏆',
            description: 'Latih disiplin menabung 7 hari untuk mencapai target Anda.',
            bgColor: 'bg-indigo-500',
            icon: '🏆',
            id: 'challenge',
        },
        {
            href: '/simulasi', 
            title: 'Simulasi Budget 📊',
            description: 'Rencanakan dan pantau anggaran bulanan Anda secara real-time.',
            bgColor: 'bg-teal-500',
            icon: '📊',
            id: 'simulasi',
        },
        {
            href: '/materi',
            title: 'Materi Edukasi 📚',
            description: 'Akses 5 video inspiratif untuk membangun kebiasaan finansial yang baik.',
            bgColor: 'bg-yellow-500',
            icon: '📚',
            id: 'materi',
        },
    ];

    // Data Keuangan Dummy
    const totalAssets = 8500000; 
    const monthlySavingsGoal = 1500000; 

    // Komponen Kartu Navigasi (Interaktif)
    const NavCard = ({ title, description, icon, bgColor, href, id }) => (
        <a 
            href={href} 
            key={id}
            onMouseEnter={() => setHoveredCard(id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`block w-full sm:w-80 cursor-pointer transform transition-all duration-300 rounded-2xl overflow-hidden shadow-xl 
                        ${hoveredCard === id ? 'scale-[1.05] shadow-2xl' : 'scale-100 shadow-lg'} 
                        ${bgColor} border-b-4 border-opacity-70 ${bgColor.replace('500', '700')}`}
        >
            <div className="p-6 text-white h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="text-4xl">{icon}</span>
                    <span className="text-sm font-semibold opacity-80">{id.toUpperCase()}</span>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-bold mb-1">{title}</h2>
                    <p className="text-sm opacity-90">{description}</p>
                </div>
            </div>
        </a>
    );

    return (
        <div className="min-h-screen bg-gray-100 font-sans pb-20 sm:pb-0">
            <main className="max-w-4xl mx-auto p-4 sm:p-8">
                
                {/* HEADER - PERSONALISASI */}
                <header className="mb-8 p-6 bg-white rounded-2xl shadow-xl border-t-4 border-indigo-600">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-extrabold text-gray-800">Halo, {userName.split(' ')[0]}!</h1>
                        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-lg">
                            {userName[0]}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Kelola keuanganmu bersama PundiMuda. 
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        ID: {userId} | Login Terakhir: {new Date(lastLogin).toLocaleDateString('id-ID')}
                    </p>
                </header>

                {/* RINGKASAN KEUANGAN */}
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {/* Kartu Aset */}
                    <div className="p-5 bg-white rounded-2xl shadow-md border-l-4 border-green-500">
                        <p className="text-sm text-gray-500">Total Aset Saat Ini</p>
                        <h2 className="text-3xl font-bold text-green-600 mt-1">
                            {formatCurrency(totalAssets)}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Termasuk tabungan dan dana darurat</p>
                    </div>
                    
                    {/* Kartu Target */}
                    <div className="p-5 bg-white rounded-2xl shadow-md border-l-4 border-blue-500">
                        <p className="text-sm text-gray-500">Target Tabungan Bulan Ini</p>
                        <h2 className="text-3xl font-bold text-blue-600 mt-1">
                            {formatCurrency(monthlySavingsGoal)}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Ayo teruskan disiplin Anda!</p>
                    </div>
                </section>

                {/* NAVIGASI FITUR UTAMA */}
                <section>
                    <h3 className="text-xl font-semibold text-gray-800 mb-5">Fitur Unggulan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <NavCard key={feature.id} {...feature} />
                        ))}
                    </div>
                </section>
                
            </main>
            
            {/* FOOTER NAVIGASI MOBILE (PWA Experience) */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl sm:hidden z-10">
                <div className="flex justify-around py-3">
                    <a href="/" className="flex flex-col items-center text-indigo-600">
                        <span className="text-2xl">🏠</span>
                        <span className="text-xs mt-1">Home</span>
                    </a>
                    <a href="/challenge" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
                        <span className="text-2xl">🏆</span>
                        <span className="text-xs mt-1">Challenge</span>
                    </a>
                    <a href="/simulasi" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
                        <span className="text-2xl">📊</span>
                        <span className="text-xs mt-1">Budget</span>
                    </a>
                </div>
            </footer>

        </div>
    );
}
