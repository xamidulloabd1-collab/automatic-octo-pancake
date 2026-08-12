import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('smakebabs_reviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      { id: 1, name: 'Anvar', text: 'Juda mazali fast-food! Tavsiya qilaman.', rating: 5, date: '2026-08-03' }
    ];
  });

  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);

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

    setReviews([newReview, ...reviews]);
    setNewName('');
    setNewText('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white text-gray-900 min-h-screen">
      <h2 className="text-2xl font-black mb-6 text-gray-900">Mijozlar sharhlari</h2>

      <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm mb-8">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Ismingiz:</label>
          <input 
            type="text" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            className="w-full bg-white border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:border-red-600" 
            placeholder="Ismingizni kiriting..."
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fikringiz:</label>
          <textarea 
            value={newText} 
            onChange={(e) => setNewText(e.target.value)}
            className="w-full bg-white border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:border-red-600" 
            placeholder="Taom haqida fikringiz..."
            rows="3"
            required 
          />
        </div>
        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md shadow-red-600/20 cursor-pointer text-sm">
          Sharh qoldirish
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-900">{rev.name}</span>
              <span className="text-gray-400 text-xs">{rev.date}</span>
            </div>
            <p className="text-gray-700 text-sm">{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;