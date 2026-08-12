import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-white text-gray-900">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Biz bilan Bog'lanish</h1>
        <p className="text-gray-500 text-sm mt-1">G'uzordagi manzilimiz va aloqa ma'lumotlari</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">SMAKebabs Ofis / Kafesi</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block mb-0.5">Manzil</strong>
                  <span className="text-gray-600">G'uzor tumani, Qashqadaryo viloyati (Smak kebabs)</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block mb-0.5">Telefon raqam</strong>
                  <span className="text-gray-600 font-semibold">(90) 67-500-67</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-gray-900 block mb-0.5">Ish vaqti</strong>
                  <span className="text-gray-600">Har kuni: 09:00 - 02:00 (Yetkazib berish bepul)</span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-gray-200 flex gap-4">
              <a 
                href="https://www.instagram.com/smakebabs?igsh=bXFmNGE0eHF5a3Nm&igsi=bXFmNGE0eHF5a3Nm&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white border border-gray-300 hover:bg-red-600 hover:text-white text-gray-700 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition flex-1 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Xarita / Joylashuv</h2>
            <p className="text-gray-600 text-sm">
              G'uzor tumani markazida joylashgan "Smak kebabs" oshxonamizga tashrif buyuring yoki uyingizga bepul yetkazib berish xizmatidan foydalaning!
            </p>
          </div>
          
          <div className="w-full h-64 bg-white border border-gray-200 rounded-2xl overflow-hidden relative mt-6">
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