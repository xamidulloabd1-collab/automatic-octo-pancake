import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white font-bold mb-4">Mahsulot topilmadi</h2>
        <button onClick={() => navigate('/menu')} className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-semibold">
          Menyuga qaytish
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 font-medium transition"
      >
        <ArrowLeft className="w-5 h-5" /> Orqaga qaytish
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl">
        <div className="h-80 md:h-full relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <span className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase shadow">
            {product.category}
          </span>
        </div>

        <div className="p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-black text-white">{product.name}</h1>
            <p className="text-yellow-400 text-2xl font-black">{product.price.toLocaleString()} so'm</p>
            {product.largePrice && (
              <p className="text-sm text-gray-400">Katta hajmdagi narxi: <span className="text-white font-bold">{product.largePrice.toLocaleString()} so'm</span></p>
            )}
            <p className="text-gray-300 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t border-gray-800 pt-6 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>🚀 G'uzor bo'ylab bepul yetkazib berish</span>
            </div>
            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
              }`}
            >
              {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
              {added ? "Savatga qo'shildi!" : "Savatga qo'shish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}