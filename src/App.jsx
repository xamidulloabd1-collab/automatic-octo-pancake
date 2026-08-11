// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import LoginModal from './components/LoginModal';

import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Promos from './pages/Promos';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('smakebabs_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('smakebabs_user');
    setUser(null);
  };

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
          {!user && <LoginModal onLoginSuccess={(userData) => setUser(userData)} />}

          {user?.role === 'admin' ? (
            <AdminPanel onLogout={handleLogout} />
          ) : (
            <>
              <Navbar user={user} onLogout={handleLogout} />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/menu/:id" element={<ProductDetail />} />
                  <Route path="/promos" element={<Promos />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout user={user} />} />
                </Routes>
              </main>
              <Footer />
              <BottomNav />
            </>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}