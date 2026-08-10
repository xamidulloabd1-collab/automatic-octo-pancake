import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { products, promosData } from '../data/mockData';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const popularProducts = products.slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 py-20 lg:py-32 overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-red-950/80 border border-red-600/40 text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> G'uzordagi eng sara fast-food
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Mazali kebablar, <br />
              <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                unutilmas lazzat!
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
              Eng sifatli masalliqlar, shershira pitsalar, gigant donarlar va tansiq fast-food taomlari. G'uzor bo'ylab yetkazib berish tekin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/menu"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2"
              >
                Menyuni ko'rish <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/promos"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-8 py-4 rounded-xl transition border border-gray-700 flex items-center justify-center gap-2"
              >
                Aksiyalar 🔥
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
                alt="SMAKebabs Hero"
                className="w-full h-[400px] object-cover transform hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-gray-900/90 backdrop-blur p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold">Yetkazib berish</h4>
                  <p className="text-yellow-400 font-extrabold text-sm">TEKIN (0 so'm)</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white">
                  <Truck className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">Qaynoq va Yangi</h3>
              <p className="text-gray-400 text-sm">Har bir buyurtma maxsus tayyorlanadi</p>
            </div>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">Bepul Yetkazish</h3>
              <p className="text-gray-400 text-sm">G'uzor tumani bo'ylab tezkor dostavka</p>
            </div>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold">Yuqori Sifat</h3>
              <p className="text-gray-400 text-sm">Halol va tanlangan mahsulotlar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mashhur Taomlar</h2>
            <p className="text-gray-400 text-sm mt-1">Mijozlarimiz eng ko'p tanlaydigan tansiq taomlar</p>
          </div>
          <Link to="/menu" className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm flex items-center gap-1">
            Barchasini ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group flex flex-col justify-between">
              <div>
                <Link to={`/menu/${product.id}`} className="block overflow-hidden relative h-48">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                    {product.category.toUpperCase()}
                  </span>
                </Link>
                <div className="p-5 space-y-2">
                  <Link to={`/menu/${product.id}`} className="text-white font-bold text-lg hover:text-yellow-400 transition block">
                    {product.name}
                  </Link>
                  <p className="text-gray-400 text-xs line-clamp-2">{product.description}</p>
                </div>
              </div>
              <div className="p-5 pt-0 flex items-center justify-between">
                <span className="text-yellow-400 font-black text-lg">{product.price.toLocaleString()} so'm</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-red-600/30"
                >
                  Savatga
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promos Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-950 via-gray-900 to-gray-950 border border-red-600/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <span className="bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">Super Taklif</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">2+1 Pitsa Aksiyasi Davom Etmoqda!</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sevimli pitsalaringizdan 2 tasini oling va 1 ta Margarita pitsani mutlaqo bepul qo'lga kiriting. Imkoniyatni qo'ldan boy bermang!
            </p>
            <Link
              to="/promos"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg"
            >
              Aksiyalar haqida batafsil
            </Link>
          </div>
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-gray-800 shadow-xl h-64">
            <img src={promosData[0].image} alt="Promo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}