import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Search } from 'lucide-react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [activeConfigItem, setActiveConfigItem] = useState(null);

  const [selectedPizzas, setSelectedPizzas] = useState({
    step: 1, 
    pitsa1: { name: 'Margarita Pitsa', price: 45000, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300' },
    pitsa2: { name: 'Pepperoni Pitsa', price: 55000, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
    pitsa3: 'Margarita Pitsa (Bepul)'
  });

  const pizzaOptions = products.filter(p => p.category === 'pitsa').map(p => ({
    name: p.name,
    price: p.price,
    image: p.image
  }));

  const filteredProducts = products.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product) => {
    if (product.category === 'pitsa' || product.isConfigurable || product.name.toLowerCase().includes('pitsa') || product.name.toLowerCase().includes('2+1')) {
      setActiveConfigItem(product);
      setSelectedPizzas({
        step: 1,
        pitsa1: pizzaOptions[0] || { name: 'Margarita Pitsa', price: 45000, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300' },
        pitsa2: pizzaOptions[1] || { name: 'Pepperoni Pitsa', price: 55000, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
        pitsa3: 'Margarita Pitsa (Bepul)'
      });
      return;
    }
    addToCart(product);
  };

  const handleConfigSubmit = () => {
    if (activeConfigItem) {
      const totalPrice = (selectedPizzas.pitsa1?.price || 0) + (selectedPizzas.pitsa2?.price || 0);
      const configText = `1-pitsa: ${selectedPizzas.pitsa1.name} (${selectedPizzas.pitsa1.price} so'm), 2-pitsa: ${selectedPizzas.pitsa2.name} (${selectedPizzas.pitsa2.price} so'm), 3-pitsa: ${selectedPizzas.pitsa3} (Bepul)`;
      
      addToCart({ 
        ...activeConfigItem, 
        price: totalPrice,
        name: `${activeConfigItem.name} (${configText})` 
      });
      setActiveConfigItem(null);
    }
  };

  // Pitsa yoki Smak uchun gorizontal qator ko'rinishida qoladi
  const isHorizontalView = activeCategory === 'pitsa' || activeCategory === 'smak';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-gray-900">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Bizning Menyu</h1>
        <p className="text-gray-500 text-sm mt-1">Mazali pitsalar, fast-food va shirinliklarni tanlang</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                : 'bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Barchasi
          </button>
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

      {/* Mahsulotlar: Shartga ko'ra gorizontal yoki telefonda 2 ta ustunli grid */}
      {isHorizontalView ? (
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-3xl border border-gray-200 p-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
            >
              <Link to={`/menu/${product.id}`} className="w-28 h-28 md:w-36 md:h-36 bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative block">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                  {product.category.toUpperCase()}
                </span>
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/menu/${product.id}`} className="font-bold text-sm md:text-base text-gray-900 mb-1 truncate block hover:text-red-600 transition">
                  {product.name}
                </Link>
                <p className="text-[11px] md:text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-red-600 font-black text-sm md:text-base">{product.price.toLocaleString()} so'm</div>
                    {product.largePrice && (
                      <div className="text-gray-400 text-[10px]">Katta: {product.largePrice.toLocaleString()} so'm</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition shadow-md shadow-red-200 cursor-pointer"
                  >
                    Savatga
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-lg transition">
              <div>
                <Link to={`/menu/${product.id}`} className="block overflow-hidden relative h-36 sm:h-52 bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full shadow">
                    {product.category.toUpperCase()}
                  </span>
                </Link>
                <div className="p-3 sm:p-5 space-y-1.5 sm:space-y-2">
                  <Link to={`/menu/${product.id}`} className="text-gray-900 font-bold text-sm sm:text-lg hover:text-red-600 transition block truncate">
                    {product.name}
                  </Link>
                  <p className="text-gray-500 text-[11px] sm:text-xs line-clamp-2">{product.description}</p>
                  {product.largePrice && (
                    <p className="text-[10px] sm:text-xs text-gray-500 pt-1">Katta hajm: <span className="text-gray-900 font-semibold">{product.largePrice.toLocaleString()} so'm</span></p>
                  )}
                </div>
              </div>
              <div className="p-3 sm:p-5 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-red-600 font-black text-sm sm:text-lg">{product.price.toLocaleString()} so'm</span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs transition shadow-md shadow-red-200 cursor-pointer w-full sm:w-auto text-center"
                >
                  Savatga
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-3xl">
          <p className="text-gray-500 text-lg">Hech qanday mahsulot topilmadi.</p>
        </div>
      )}

      {/* Pitsa 2+1 Tanlash Modal Oynasi */}
      {activeConfigItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white border border-gray-200 rounded-[2rem] max-w-lg w-full p-6 shadow-2xl relative text-gray-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveConfigItem(null)}
              className="absolute top-4 right-4 bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
            
            <h2 className="text-lg font-bold mb-1 tracking-tight text-gray-900">
              {selectedPizzas.step === 1 ? '1-Pitsa tanlang' : '2-Pitsa tanlang'}
            </h2>
            <p className="text-gray-500 text-xs mb-3">
              {selectedPizzas.step === 1 ? 'Aksiyadagi 1-pitsani tanlang (3-chisi Margarita bepul qo\'shiladi)' : 'Aksiyadagi 2-pitsani tanlang'}
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-4 flex flex-col gap-1 text-[11px] font-medium">
              <div className="flex justify-between">
                <span className={selectedPizzas.step === 1 ? 'text-red-600 font-bold underline' : 'text-gray-700'}>
                  1-pitsa: {selectedPizzas.pitsa1.name} ({selectedPizzas.pitsa1.price?.toLocaleString()} so'm)
                </span>
              </div>
              <div className="flex justify-between">
                <span className={selectedPizzas.step === 2 ? 'text-red-600 font-bold underline' : 'text-gray-700'}>
                  2-pitsa: {selectedPizzas.pitsa2.name} ({selectedPizzas.pitsa2.price?.toLocaleString()} so'm)
                </span>
              </div>
              <div className="text-right text-red-600 font-bold pt-1 border-t border-gray-200 mt-1 text-xs">
                Jami: {((selectedPizzas.pitsa1?.price || 0) + (selectedPizzas.pitsa2?.price || 0)).toLocaleString()} so'm
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-5">
              {pizzaOptions.map((pizza, idx) => {
                const currentSelectedName = selectedPizzas.step === 1 ? selectedPizzas.pitsa1.name : selectedPizzas.pitsa2.name;
                const isSelected = currentSelectedName === pizza.name;

                return (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (selectedPizzas.step === 1) {
                        setSelectedPizzas({ ...selectedPizzas, pitsa1: pizza });
                      } else {
                        setSelectedPizzas({ ...selectedPizzas, pitsa2: pizza });
                      }
                    }}
                    className={`border-2 rounded-2xl p-3 cursor-pointer flex flex-col items-center text-center transition-all ${
                      isSelected ? 'border-red-600 bg-red-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <img src={pizza.image} alt={pizza.name} className="w-16 h-16 object-cover rounded-full mb-2 shadow-inner" />
                    <h4 className="font-semibold text-xs text-gray-900 mb-0.5 line-clamp-1">{pizza.name}</h4>
                    <span className="text-gray-500 text-[10px] mb-2 font-normal">{pizza.price.toLocaleString()} so'm</span>
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-xl shadow-sm transition-all ${
                      isSelected ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {isSelected ? 'Tanlandi ✓' : 'Tanlash'}
                    </span>
                  </div>
                );
              })}
            </div>

            {selectedPizzas.step === 1 ? (
              <button
                onClick={() => setSelectedPizzas({ ...selectedPizzas, step: 2 })}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-xs shadow-lg shadow-red-500/20 transition-all cursor-pointer"
              >
                Keyingisi (2-pitsa)
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPizzas({ ...selectedPizzas, step: 1 })}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer"
                >
                  Orqaga
                </button>
                <button
                  onClick={handleConfigSubmit}
                  className="w-2/3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-xs shadow-lg shadow-red-500/20 transition-all cursor-pointer"
                >
                  Savatga qo'shish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}