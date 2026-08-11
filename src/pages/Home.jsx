// src/pages/Home.jsx
import React, { useState } from 'react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('lavash');
  const [deliveryType, setDeliveryType] = useState('Yetkazib berish');
  const { addToCart } = useCart();
  
  const [activeConfigItem, setActiveConfigItem] = useState(null);
  
  // 2+1 aktsiyasi uchun tanlangan pitsalar va ularning narxlari
  const [selectedPizzas, setSelectedPizzas] = useState({
    step: 1, 
    pitsa1: { name: 'Margarita Pitsa', price: 45000, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300' },
    pitsa2: { name: 'Pepperoni Pitsa', price: 55000, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300' },
    pitsa3: 'Margarita Pitsa (Bepul)'
  });

  // Haqiqiy pitsa mahsulotlarini va ularning narxlarini to'g'ridan-to'g'ri mockData dan olamiz
  const pizzaOptions = products.filter(p => p.category === 'pitsa').map(p => ({
    name: p.name,
    price: p.price,
    image: p.image
  }));

  const categories = Array.isArray(products) 
    ? [...new Set(products.map(p => p.category))] 
    : Object.keys(products);

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

  const filteredProducts = Array.isArray(products)
    ? products.filter(p => p.category === activeCategory)
    : (products[activeCategory] || []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-24">
      <main className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* Banner / Aksiya slayderi */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-900 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="z-10 max-w-lg">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Aksiya 2+1</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-2">Haftaning har kuni 3 ta pitsa buyurtma qiling!</h2>
              <p className="text-red-100 text-sm mb-6">2 ta pitsa tanlang va 3-chisi (Margarita) bizdan sovg'a sifatida bepul qo'shiladi.</p>
              <button 
                onClick={() => handleAddToCart({ name: '2+1 Pitsa Aktsiyasi', price: 0, category: 'pitsa' })}
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3.5 rounded-full font-extrabold shadow-xl transition transform active:scale-95"
              >
                Tanlash
              </button>
            </div>
            <div className="mt-6 md:mt-0 z-10">
              <div className="w-44 h-44 md:w-56 md:h-56 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
                <span className="text-5xl md:text-6xl font-black text-white">2+1</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Yetkazib berish / Olib ketish */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 border border-gray-200 p-1.5 rounded-full flex gap-1 max-w-sm w-full shadow-inner">
            <button
              onClick={() => setDeliveryType('Yetkazib berish')}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition ${
                deliveryType === 'Yetkazib berish' ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yetkazib Berish
            </button>
            <button
              onClick={() => setDeliveryType('Olib ketish')}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition ${
                deliveryType === 'Olib ketish' ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Olib Ketish
            </button>
          </div>
        </div>

        {/* Kategoriyalar paneli */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none sticky top-20 bg-white z-30 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition shadow-sm capitalize ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mahsulotlar Gridi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:border-red-600/50 hover:shadow-2xl hover:shadow-gray-200 transition duration-300 group">
              <div>
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  {product.discount && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-red-600 font-black text-lg">{product.price.toLocaleString()} so'm</div>
                  {product.oldPrice && (
                    <div className="text-gray-400 text-xs line-through">{product.oldPrice.toLocaleString()} so'm</div>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-2xl font-bold flex items-center gap-2 transition duration-200 shadow-lg shadow-red-200"
                >
                  <span>+ Qo'shish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Pitsa 2+1 Vizual Tanlash Modal Oynasi (Har xil narxlarda) */}
      {activeConfigItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative text-gray-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveConfigItem(null)}
              className="absolute top-4 right-4 bg-gray-100 text-gray-600 hover:bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center font-bold shadow"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-black mb-1 text-red-600">
              {selectedPizzas.step === 1 ? '1-Pitsa tanlang' : '2-Pitsa tanlang'}
            </h2>
            <p className="text-gray-500 text-xs mb-4">
              {selectedPizzas.step === 1 ? 'Aksiyadagi 1-pitsani tanlang (3-chisi Margarita bepul qo\'shiladi)' : 'Aksiyadagi 2-pitsani tanlang'}
            </p>

            {/* Tanlanganlarni va umumiy hisobni ko'rsatib turish */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 mb-4 flex flex-col gap-1 text-xs font-semibold">
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
              <div className="text-right text-red-600 font-black pt-1 border-t border-gray-200 mt-1">
                Jami: {((selectedPizzas.pitsa1?.price || 0) + (selectedPizzas.pitsa2?.price || 0)).toLocaleString()} so'm
              </div>
            </div>
            
            {/* Vizual Pitsa Kartochkalari Gridi (Haqiqiy narxlari bilan) */}
            <div className="grid grid-cols-2 gap-3 mb-6">
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
                    className={`border-2 rounded-2xl p-3 cursor-pointer flex flex-col items-center text-center transition ${
                      isSelected ? 'border-green-600 bg-green-50/50 shadow-md' : 'border-gray-200 hover:border-red-400 bg-white'
                    }`}
                  >
                    <img src={pizza.image} alt={pizza.name} className="w-20 h-20 object-cover rounded-full mb-2 shadow-inner" />
                    <h4 className="font-bold text-xs text-gray-900 mb-1 line-clamp-1">{pizza.name}</h4>
                    <span className="text-gray-500 text-[10px] mb-2 font-medium">{pizza.price.toLocaleString()} so'm</span>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm ${
                      isSelected ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {isSelected ? 'Tanlandi ✓' : 'Tanlash'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bosqichlar bo'yicha tugma */}
            {selectedPizzas.step === 1 ? (
              <button
                onClick={() => setSelectedPizzas({ ...selectedPizzas, step: 2 })}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-red-200 transition"
              >
                Keyingisi (2-pitsa)
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPizzas({ ...selectedPizzas, step: 1 })}
                  className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3.5 rounded-2xl font-bold transition"
                >
                  Orqaga
                </button>
                <button
                  onClick={handleConfigSubmit}
                  className="w-2/3 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-red-200 transition"
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
};

export default Home;