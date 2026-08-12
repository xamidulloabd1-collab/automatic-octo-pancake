import React, { useState } from 'react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('lavash');
  const [deliveryType, setDeliveryType] = useState('Yetkazib berish');
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Smakebab Asosiy');

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

  const categories = Array.isArray(products) 
    ? [...new Set(products.map(p => p.category))] 
    : Object.keys(products);

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=uz`);
            const data = await response.json();
            if (data && data.display_name) {
              setCustomerAddress(data.display_name);
            } else {
              setCustomerAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
            }
          } catch (error) {
            setCustomerAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
          }
        },
        (error) => {
          alert("Joylashuvni aniqlash imkoni bo'lmadi. Iltimos, brauzer ruxsatlarini tekshiring.");
        }
      );
    } else {
      alert("Sizning brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi.");
    }
  };

const handleAddToCart = (product) => {
    // Pitsa bo'limidagi mahsulotlar oddiy qo'shiladi, faqat aksiya mahsuloti bo'lsagina oyna chiqadi
    if (product.isPromo || product.name.toLowerCase().includes('2+1') || product.name.toLowerCase().includes('aktsiyasi')) {
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

  const isHorizontalView = activeCategory === 'pitsa' || activeCategory === 'smak';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-24 antialiased">
      <main className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* Banner */}
        <div className="mb-8">
          <div className="bg-red-600 rounded-[2.5rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
            <div className="z-10 max-w-lg">
              <span className="bg-white text-red-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Aksiya 2+1</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-2">Haftaning har kuni 3 ta pitsa buyurtma qiling!</h2>
              <p className="text-white text-sm mb-6 font-normal">2 ta pitsa tanlang va 3-chisi (Margarita) bizdan sovg'a sifatida bepul qo'shiladi.</p>
              <button 
                onClick={() => handleAddToCart({ name: '2+1 Pitsa Aktsiyasi', price: 0, category: 'pitsa' })}
                className="bg-white text-red-600 hover:bg-gray-100 px-7 py-3 rounded-full font-semibold text-sm shadow-md transition-all duration-200 cursor-pointer"
              >
                Tanlash
              </button>
            </div>
            <div className="mt-6 md:mt-0 z-10">
              <div className="w-44 h-44 md:w-56 md:h-56 bg-red-700 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-5xl md:text-6xl font-black text-white tracking-tight">2+1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yetkazib berish / Olib ketish */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 border border-gray-200 p-1 rounded-full flex gap-1 max-w-sm w-full shadow-sm">
            <button
              onClick={() => {
                setDeliveryType('Yetkazib berish');
                setIsAddressModalOpen(true);
              }}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                deliveryType === 'Yetkazib berish' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {customerAddress ? `Manzil: ${customerAddress.slice(0, 16)}...` : 'Yetkazib Berish'}
            </button>
            <button
              onClick={() => {
                setDeliveryType('Olib ketish');
                setIsBranchModalOpen(true);
              }}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                deliveryType === 'Olib ketish' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {selectedBranch ? `Filial: ${selectedBranch}` : 'Olib Ketish'}
            </button>
          </div>
        </div>

        {/* Kategoriyalar paneli */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none sticky top-20 bg-white z-30 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-medium text-xs whitespace-nowrap transition-all duration-200 capitalize cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mahsulotlar: Gorizontal yoki Telefonda 2 ta ustunli Grid */}
        {isHorizontalView ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl border border-gray-200 p-4 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
              >
                <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-50 rounded-2xl overflow-hidden shrink-0 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm md:text-base text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-[11px] md:text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {product.description || "Mazali va sersuv masalliqlardan tayyorlangan maxsus mahsulot."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-red-600 font-bold text-sm md:text-base">{product.price.toLocaleString()} so'm</div>
                      {product.oldPrice && (
                        <div className="text-gray-400 text-[10px] line-through">{product.oldPrice.toLocaleString()} so'm</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
                    >
                      + Qo'shish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div>
                  <div className="relative h-36 sm:h-48 bg-gray-50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {product.discount && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {product.discount}
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 tracking-tight group-hover:text-red-600 transition-colors truncate">{product.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed mb-3">{product.description}</p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto">
                  <div>
                    <div className="text-red-600 font-bold text-sm sm:text-base tracking-tight">{product.price.toLocaleString()} so'm</div>
                    {product.oldPrice && (
                      <div className="text-gray-400 text-[10px] line-through">{product.oldPrice.toLocaleString()} so'm</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md shadow-red-200 cursor-pointer w-full sm:w-auto"
                  >
                    <span>+ Qo'shish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Yetkazib berish manzili modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-1 tracking-tight text-gray-900">Yetkazib berish manzili</h3>
            <p className="text-gray-500 text-xs mb-4">Manzilni qo'lda kiriting yoki avtomatik aniqlang:</p>
            
            <button
              onClick={handleDetectLocation}
              className="w-full bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 py-2.5 rounded-xl font-semibold mb-3 flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
            >
              📍 Mening joylashuvimni aniqlash
            </button>

            <input
              type="text"
              placeholder="Masalan: Mustaqillik ko'chasi, 12-uy"
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-red-600 mb-5"
            />
            
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-xs shadow-lg shadow-red-200 transition-all cursor-pointer"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}

      {/* Filial tanlash modal */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto border border-gray-200">
            <button
              onClick={() => setIsBranchModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 text-gray-600 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-1 tracking-tight text-gray-900">Filialni tanlang</h3>
            <p className="text-gray-500 text-xs mb-4">Olib ketish uchun o'zingizga qulay filialni belgilang:</p>
            
            <div className="flex flex-col gap-3">
              <div 
                onClick={() => {
                  setSelectedBranch('Smakebab Asosiy');
                  setIsBranchModalOpen(false);
                }}
                className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between ${
                  selectedBranch === 'Smakebab Asosiy' ? 'border-red-600 bg-red-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs text-gray-900 mb-0.5">Smakebab Asosiy</h4>
                  <p className="text-[11px] text-gray-500 mb-2">Google Maps joylashuvi</p>
                  <div className="text-[10px] text-gray-600 font-medium">
                    <span className="block font-semibold text-gray-700">Ish vaqti</span>
                    <span>09:00 dan 02:00 gacha</span>
                  </div>
                </div>
                <div>
                  <a 
                    href="https://www.google.com/maps/place/Smak+kebabs/@38.625288,66.252777,3553m/data=!3m1!1e3!4m6!3m5!1s0x3f4b93007d8eb911:0x24696e9124d541d1!8m2!3d38.6252879!4d66.2527766!16s%2Fg%2F11xm8j4xyl?hl=uz&entry=ttu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[11px] bg-red-600 text-white px-3 py-1.5 rounded-xl font-semibold shadow-sm hover:bg-red-700 inline-block transition-colors"
                  >
                    Karta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pitsa 2+1 Tanlash Modal Oynasi */}
      {activeConfigItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-gray-900 max-h-[90vh] overflow-y-auto">
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
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-xs shadow-lg shadow-red-200 transition-all cursor-pointer"
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
                  className="w-2/3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-xs shadow-lg shadow-red-200 transition-all cursor-pointer"
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