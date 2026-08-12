import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6 bg-white text-gray-900">
        <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto text-gray-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Savatingiz bo'sh</h2>
        <p className="text-gray-500 text-sm">Hali hech qanday mahsulot qo'shmadingiz.</p>
        <Link
          to="/menu"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition shadow-lg shadow-red-600/20"
        >
          Menyuga o'tish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-gray-900">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-gray-900">Savat</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-semibold flex items-center gap-1 transition cursor-pointer"
        >
          <Trash2 className="w-4 h-4" /> Savatni tozalash
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div>
                  <h3 className="text-gray-900 font-bold">{item.name}</h3>
                  <p className="text-red-600 font-extrabold text-sm mt-1">{item.price.toLocaleString()} so'm</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="p-2 text-gray-500 hover:text-gray-900 transition cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-gray-900 font-bold text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="p-2 text-gray-500 hover:text-gray-900 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-3xl h-fit space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Buyurtma xulosasi</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Mahsulotlar narxi:</span>
              <span className="text-gray-900 font-semibold">{totalAmount.toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Yetkazib berish:</span>
              <span className="text-red-600 font-bold">Tekin (0 so'm)</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-black text-gray-900">
              <span>Jami summa:</span>
              <span className="text-red-600">{totalAmount.toLocaleString()} so'm</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            Rasmiylashtirishga o'tish <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}