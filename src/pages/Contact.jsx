import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div>
        <h1 className="text-3xl font-black text-white">Biz bilan Bog'lanish</h1>
        <p className="text-gray-400 text-sm mt-1">G'uzordagi manzilimiz va aloqa ma'lumotlari</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-bold text-white">SMAKebabs Ofis / Kafesi</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Manzil</strong>
                  <span className="text-gray-400">G'uzor tumani, Qashqadaryo viloyati (Smak kebabs)</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Telefon raqam</strong>
                  <span className="text-gray-400 font-semibold">(90) 67-500-67</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Ish vaqti</strong>
                  <span className="text-gray-400">Har kuni: 09:00 - 02:00 (Yetkazib berish bepul)</span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-gray-800 flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-950 border border-gray-800 hover:bg-red-600 hover:text-white text-gray-300 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition flex-1 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a 
                href="https://t.me/smakebabs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-950 border border-gray-800 hover:bg-red-600 hover:text-white text-gray-300 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition flex-1 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.943z"/>
                </svg>
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-8 rounded-3xl flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Xarita / Joylashuv</h2>
            <p className="text-gray-400 text-sm">
              G'uzor tumani markazida joylashgan "Smak kebabs" oshxonamizga tashrif buyuring yoki uyingizga bepul yetkazib berish xizmatidan foydalaning!
            </p>
          </div>
          
          {/* Google Maps Iframe */}
          <div className="w-full h-64 bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden relative mt-6">
            <iframe 
              title="Smak Kebabs Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.789139543162!2d66.2527514!3d38.6253953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4b93007d8eb911%3A0x24696e9124d541d1!2sSmak%20kebabs!5e0!3m2!1suz!2suz!4v1710000000000!5m2!1suz!2suz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}