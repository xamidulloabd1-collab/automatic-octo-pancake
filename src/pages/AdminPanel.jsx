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
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-red-500">SMAKebabs - Admin Panel</h1>
            <p className="text-sm text-gray-400">Kelib tushgan buyurtmalar nazorati</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearOrders}
              className="bg-red-600/20 border border-red-500/50 hover:bg-red-600 text-red-400 hover:text-white px-4 py-2 rounded-lg text-sm transition cursor-pointer"
            >
              Barchasini tozalash
            </button>
            <button
              onClick={onLogout}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-3">📭</p>
            <p>Hozircha yangi buyurtmalar yo'q</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-3 border-b border-gray-800 pb-2">
                  <span className="font-bold text-red-400">Buyurtma #{orders.length - idx}</span>
                  <span className="text-xs text-gray-400">{order.date}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-300 mb-4">
                  <p>👤 <b>Mijoz:</b> {order.name}</p>
                  <p>📞 <b>Telefon:</b> {order.phone}</p>
                  <p>📍 <b>Manzil:</b> {order.address}</p>
                  {order.comment && <p>💬 <b>Izoh:</b> {order.comment}</p>}
                </div>
                <div className="bg-gray-950 rounded-lg p-3 mb-3">
                  <p className="text-xs font-semibold text-gray-400 mb-2">TAOMLAR:</p>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="text-gray-400">{item.price * item.quantity} so'm</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center font-bold text-base pt-2 border-t border-gray-800">
                  <span>Jami:</span>
                  <span className="text-red-500">{order.totalAmount} so'm</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}