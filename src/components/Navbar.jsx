import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinkClass = ({ isActive }) =>
    `transition-colors font-medium ${
      isActive ? 'text-yellow-400 font-bold' : 'text-gray-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
         <Link to="/" className="flex items-center gap-3">
           <img 
             src="/smakebabs.png" 
             alt="SMAKebabs Logo" 
             className="h-10 w-auto object-contain" 
           />
           <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
             SMAKebabs
           </span>
         </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>Asosiy</NavLink>
          <NavLink to="/menu" className={navLinkClass}>Menyu</NavLink>
          <NavLink to="/promos" className={navLinkClass}>Aksiyalar</NavLink>
          <NavLink to="/reviews" className={navLinkClass}>Sharhlar</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Bog'lanish</NavLink>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-red-600/30"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline font-semibold">Savat</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            {isOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-4 pt-2 pb-6 space-y-3">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-yellow-400">Asosiy</NavLink>
          <NavLink to="/menu" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-yellow-400">Menyu</NavLink>
          <NavLink to="/promos" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-yellow-400">Aksiyalar</NavLink>
          <NavLink to="/reviews" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-yellow-400">Sharhlar</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-yellow-400">Bog'lanish</NavLink>
        </div>
      )}
    </header>
  );
}