
import React, { useState, useEffect } from 'react';

const Reviews = () => {
  // 1. Sahifa ochilganda localStorage'dan sharhlarni o'qib olish
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('smakebabs_reviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      { id: 1, name: 'Anvar', text: 'Juda mazali fast-food! Tavsiya qilaman.', rating: 5, date: '2026-08-03' }
    ];
  });

  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  // 2. Sharhlar o'zgarganda localStorage'ga saqlab borish
  useEffect(() => {
    localStorage.setItem('smakebabs_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newReview = {
      id: Date.now(),
      name: newName,
      text: newText,
      rating: Number(newRating),
      date: new Date().toISOString().split('T')[0]
    };

    // Yangi sharhni ro'yxatga qo'shish
    setReviews([newReview, ...reviews]);
    setNewName('');
    setNewText('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mijozlar sharhlari</h2>

      {/* Sharh yozish formasi */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="mb-3">
          - Ismingiz:
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border p-2 rounded mt-1" 
            placeholder="Ismingizni kiriting..."
            required 
          />
        </div>
        <div className="mb-3">
          - Fikringiz:
          <textarea 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border p-2 rounded mt-1" 
            placeholder="Taom haqida fikringiz..."
            required 
          />
        </div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Sharh qoldirish
        </button>
      </form>

      {/* Sharhlar ro'yxati */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">{rev.name}</span>
              <span className="text-gray-400 text-sm">{rev.date}</span>
            </div>
            <p className="text-gray-700">{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
