import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Search } from 'lucide-react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = products.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">Bizning Menyu</h1>
        <p className="text-gray-400 text-sm mt-1">Mazali pitsalar, fast-food va shirinliklarni tanlang</p>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Taomlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group flex flex-col justify-between">
            <div>
              <Link to={`/menu/${product.id}`} className="block overflow-hidden relative h-52">
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
                {product.largePrice && (
                  <p className="text-xs text-gray-400 pt-1">Katta hajm narxi: <span className="text-white font-semibold">{product.largePrice.toLocaleString()} so'm</span></p>
                )}
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-3xl">
          <p className="text-gray-400 text-lg">Hech qanday mahsulot topilmadi.</p>
        </div>
      )}
    </div>
  );
}