import React, { useEffect, useState } from 'react';

export default function AdminPanel({ onLogout }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('smakebabs_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const clearOrders = () => {
    localStorage.removeItem('smakebabs_orders');
    setOrders([]);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-red-600">SMAKebabs - Admin Panel</h1>
            <p className="text-sm text-gray-500">Kelib tushgan buyurtmalar nazorati</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearOrders}
              className="bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Barchasini tozalash
            </button>
            <button
              onClick={onLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-3">📭</p>
            <p className="font-medium">Hozircha yangi buyurtmalar yo'q</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                  <span className="font-bold text-red-600">Buyurtma #{orders.length - idx}</span>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-700 mb-4">
                  <p>👤 <b>Mijoz:</b> {order.name}</p>
                  <p>📞 <b>Telefon:</b> {order.phone}</p>
                  <p>📍 <b>Manzil:</b> {order.address}</p>
                  {order.comment && <p>💬 <b>Izoh:</b> {order.comment}</p>}
                </div>
                <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2">TAOMLAR:</p>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-gray-800">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="text-gray-500">{item.price * item.quantity} so'm</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center font-bold text-base pt-2 border-t border-gray-100 text-gray-900">
                  <span>Jami:</span>
                  <span className="text-red-600">{order.totalAmount} so'm</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}