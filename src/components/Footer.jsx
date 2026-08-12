import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900 pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-black bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
              SMAKebabs
            </span>
          </div>
          <p className="text-sm mb-4 leading-relaxed">
            G'uzor tumanidagi eng mazali kebablar, pitsalar va fast-food mahsulotlari. Unutilmas lazzat va bepul yetkazib berish!
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/smakebabs?igsh=bXFmNGE0eHF5a3Nm&igsi=bXFmNGE0eHF5a3Nm&utm_source=qr"><span className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm" >Instagram</span></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4">Aloqa va Manzil</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>G'uzor tumani, Qashqadaryo viloyati</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-500 shrink-0" />
              <span className="font-semibold text-white">(90) 500-67-67</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-500 shrink-0" />
              <span>Har kuni: 09:00 - 02:00</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-4">Yetkazib berish</h3>
          <p className="text-sm mb-4">
            G'uzor tumani bo'ylab buyurtmalar tezkor va mutlaqo bepul yetkazib beriladi!
          </p>
          <div className="bg-red-950/40 border border-red-600/30 p-4 rounded-xl text-red-400 text-sm font-medium">
            🔥 Yetkazib berish - bepul!
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-900 text-center text-xs">
        © 2026 SMAKebabs. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}