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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-gray-900">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Bizning Menyu</h1>
        <p className="text-gray-500 text-sm mt-1">Mazali pitsalar, fast-food va shirinliklarni tanlang</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                  : 'bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Taomlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-red-600 shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-lg transition">
            <div>
              <Link to={`/menu/${product.id}`} className="block overflow-hidden relative h-52 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <span className="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
                  {product.category.toUpperCase()}
                </span>
              </Link>
              <div className="p-5 space-y-2">
                <Link to={`/menu/${product.id}`} className="text-gray-900 font-bold text-lg hover:text-red-600 transition block">
                  {product.name}
                </Link>
                <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>
                {product.largePrice && (
                  <p className="text-xs text-gray-500 pt-1">Katta hajm narxi: <span className="text-gray-900 font-semibold">{product.largePrice.toLocaleString()} so'm</span></p>
                )}
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between">
              <span className="text-red-600 font-black text-lg">{product.price.toLocaleString()} so'm</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-red-200 cursor-pointer"
              >
                Savatga
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-3xl">
          <p className="text-gray-500 text-lg">Hech qanday mahsulot topilmadi.</p>
        </div>
      )}
    </div>
  );
}