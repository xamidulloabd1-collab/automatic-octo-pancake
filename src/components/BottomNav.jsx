import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Utensils, Tag, ShoppingCart, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const { totalItems } = useCart();

  const itemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center w-full h-full text-xs font-medium transition ${
      isActive ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-800 h-16 z-50 flex items-center justify-around px-2">
      <NavLink to="/" className={itemClass}>
        <Home className="w-5 h-5 mb-1" />
        Asosiy
      </NavLink>
      <NavLink to="/menu" className={itemClass}>
        <Utensils className="w-5 h-5 mb-1" />
        Menyu
      </NavLink>
      <NavLink to="/promos" className={itemClass}>
        <Tag className="w-5 h-5 mb-1" />
        Aksiyalar
      </NavLink>
      <NavLink to="/cart" className={itemClass + ' relative'}>
        <ShoppingCart className="w-5 h-5 mb-1" />
        Savat
        {totalItems > 0 && (
          <span className="absolute top-1 right-5 bg-red-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </NavLink>
      <NavLink to="/contact" className={itemClass}>
        <MapPin className="w-5 h-5 mb-1" />
        Manzil
      </NavLink>
    </div>
  );
}