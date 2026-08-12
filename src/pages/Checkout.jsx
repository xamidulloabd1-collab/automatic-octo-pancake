import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, User, CheckCircle } from 'lucide-react';
import { sendOrderToTelegram } from '../services/telegram';

export default function Checkout() {
  const { cart, clearCart, totalAmount } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    locationCoords: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('998')) {
      val = val.slice(3);
    }
    if (val.length > 9) {
      val = val.slice(0, 9);
    }
    setFormData({ ...formData, phone: val });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setFormData((prev) => ({
            ...prev,
            address: `GPS Manzil (${lat.toFixed(5)}, ${lng.toFixed(5)})`,
            locationCoords: { lat, lng }
          }));
          setLoading(false);
        },
        (error) => {
          alert("Joylashuvni aniqlab bo'lmadi. Iltimos, qo'lda yozing yoki ruxsat bering.");
          setLoading(false);
        }
      );
    } else {
      alert("Sizning brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    const finalAddress = formData.locationCoords 
      ? `GPS Manzil (${formData.locationCoords.lat.toFixed(5)}, ${formData.locationCoords.lng.toFixed(5)})`
      : formData.address;

    const orderData = {
      name: formData.name,
      phone: `+998 ${formData.phone}`,
      address: finalAddress,
      items: cart,
      totalAmount: totalAmount,
    };

    try {
      await sendOrderToTelegram(orderData);

      if (formData.locationCoords) {
        const BOT_TOKEN = "8807636347:AAFDoCYE1ZcF8nkB9Xo3MS-gPpbFQy2aEv0";
        const CHAT_ID = "5412360326";
        
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendLocation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            latitude: formData.locationCoords.lat,
            longitude: formData.locationCoords.lng,
          })
        });
      }

      setIsSubmitted(true);
      clearCart();
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Buyurtma yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white border border-gray-200 p-8 rounded-3xl text-center space-y-4 shadow-sm">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
        <h2 className="text-2xl font-black text-gray-900">Buyurtmangiz qabul qilindi!</h2>
        <p className="text-gray-500 text-sm">Tez orada operatorimiz siz bilan bog'lanadi va kuryer manzilga yo'l oladi.</p>
        <a href="/" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition">
          Asosiy sahifaga qaytish
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-white text-gray-900">
      <h1 className="text-3xl font-black text-gray-900 mb-6">Buyurtmani Rasmiylashtirish</h1>

      <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-red-600" /> Ismingiz
          </label>
          <input 
            type="text" 
            required
            placeholder="Masalan: Bekzod"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4 text-red-600" /> Telefon raqam
          </label>
          <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden focus-within:border-red-600">
            <span className="bg-gray-100 text-gray-600 px-4 flex items-center font-semibold select-none">+998</span>
            <input 
              type="tel" 
              required
              maxLength="9"
              placeholder="901234567"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full bg-transparent px-4 py-3 text-gray-900 focus:outline-none tracking-widest"
            />
          </div>
          <p className="text-xs text-gray-500">Faqat 9 xonali raqamingizni kiriting (masalan: 901234567)</p>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 text-sm font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" /> Yetkazib berish manzili (Xarita orqali)
          </label>
          
          <div className="flex gap-3">
            <input 
              type="text" 
              required
              readOnly
              placeholder="Xaritadan turgan joyingizni belgilang 📍"
              value={formData.address}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none cursor-not-allowed text-sm"
            />
            <button 
              type="button"
              onClick={handleGetLocation}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer text-sm"
            >
              {loading ? "Aniqlanmoqda..." : "📍 Joylashuvni olish"}
            </button>
          </div>
          <p className="text-xs text-gray-500">Tugmani bosing shunda GPS orqali turgan manzilingiz aniqlanib adminga yuboriladi.</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-gray-900 font-bold text-lg mb-4">
            <span>Jami to'lov:</span>
            <span className="text-red-600">{totalAmount} so'm</span>
          </div>

          <button 
            type="submit"
            disabled={cart.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black py-4 rounded-xl transition shadow-lg shadow-red-600/20 cursor-pointer"
          >
            Buyurtmani Tasdiqlash
          </button>
        </div>
      </form>
    </div>
  );
}