import React from 'react';
import { promosData } from '../data/mockData';
import { Sparkles } from 'lucide-react';

export default function Promos() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-400" /> Maxsus Aksiyalar
        </h1>
        <p className="text-gray-400 text-sm mt-1">SMAKebabs mijozlari uchun eng foydali takliflar va chegirmalar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promosData.map((promo) => (
          <div key={promo.id} className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative h-56">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full uppercase shadow">
                {promo.tag}
              </span>
            </div>
            <div className="p-6 space-y-3">
              <h2 className="text-xl font-bold text-white">{promo.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{promo.description}</p>
            </div>
            <div className="px-6 pb-6">
              <span className="text-yellow-400 font-semibold text-sm">G'uzor bo'ylab amal qiladi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}