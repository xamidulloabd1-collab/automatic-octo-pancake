import React, { useState } from 'react';

export default function LoginModal({ onLoginSuccess }) {
  const [role, setRole] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');

  const ADMIN_SECRET_KEY = "smakebabs2026"; // Admin maxfiy kodi

  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    const userData = { role: 'client', name, phone };
    localStorage.setItem('smakebabs_user', JSON.stringify(userData));
    onLoginSuccess(userData);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (adminCode === ADMIN_SECRET_KEY) {
      const adminData = { role: 'admin', name: 'Admin' };
      localStorage.setItem('smakebabs_user', JSON.stringify(adminData));
      onLoginSuccess(adminData);
    } else {
      setError("Noto'g'ri maxfiy kod!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-red-500">SMAKebabs</h2>
          <p className="text-gray-400 text-sm mt-1">Xush kelibsiz! Davom etish uchun o'zingizni tanlang.</p>
        </div>

        {!role ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole('client')}
              className="p-4 bg-gray-800 hover:bg-red-600/20 border border-gray-700 hover:border-red-500 rounded-xl transition font-medium flex flex-col items-center gap-2 group cursor-pointer"
            >
              <span className="text-3xl">🛒</span>
              <span className="group-hover:text-red-400">Mijozman</span>
            </button>
            <button
              onClick={() => setRole('admin')}
              className="p-4 bg-gray-800 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-500 rounded-xl transition font-medium flex flex-col items-center gap-2 group cursor-pointer"
            >
              <span className="text-3xl">🔐</span>
              <span className="group-hover:text-blue-400">Adminman</span>
            </button>
          </div>
        ) : role === 'client' ? (
          <form onSubmit={handleClientSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Mijoz ma'lumotlari</h3>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Ismingiz</label>
              <input
                type="text"
                placeholder="Masalan: Aziz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Telefon raqamingiz</label>
              <input
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRole(null)}
                className="w-1/3 bg-gray-800 hover:bg-gray-700 py-2.5 rounded-lg text-sm transition cursor-pointer"
              >
                Orqaga
              </button>
              <button
                type="submit"
                className="w-2/3 bg-red-600 hover:bg-red-700 py-2.5 rounded-lg font-semibold transition cursor-pointer"
              >
                Kirish
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">Admin maxfiy kodi</h3>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Maxfiy kodni kiriting</label>
              <input
                type="password"
                placeholder="••••••••"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRole(null)}
                className="w-1/3 bg-gray-800 hover:bg-gray-700 py-2.5 rounded-lg text-sm transition cursor-pointer"
              >
                Orqaga
              </button>
              <button
                type="submit"
                className="w-2/3 bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg font-semibold transition cursor-pointer"
              >
                Tasdiqlash
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}