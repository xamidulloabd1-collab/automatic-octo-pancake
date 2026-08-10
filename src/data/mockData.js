export const categories = [
  { id: 'all', name: 'Barchasi' },
  { id: 'pitsa', name: 'Pitsa' },
  { id: 'fastfood', name: 'Fast Food' },
  { id: 'kebab', name: 'Kebab' },
  { id: 'drinks', name: 'Yaxna Ichimliklar' },
  { id: 'smakcream', name: 'SMAKCream & Shirinlik' },
];

export const products = [
  // --- PITSA ---
  {
    id: 1,
    name: 'Margarita Pitsa',
    category: 'pitsa',
    price: 45000,
    largePrice: 85000,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500',
    description: 'Klassik pitsa: pomidor sousi, mozzarella pishloog\'i, yangi rayhon.',
  },
  {
    id: 2,
    name: 'Pepperoni Pitsa',
    category: 'pitsa',
    price: 55000,
    largePrice: 95000,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
    description: 'Achchiqqina pepperoni kolbasalari, maxsus sous va sershira pishloq.',
  },
  {
    id: 3,
    name: 'Alfredo Pitsa',
    category: 'pitsa',
    price: 55000,
    largePrice: 95000,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
    description: 'Tovuq go\'shti, qo\'ziqorin, alfredo oq sousi va mozzarella.',
  },
  {
    id: 4,
    name: 'Smak Pitsa',
    category: 'pitsa',
    price: 65000,
    largePrice: 105000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    description: 'Firmaviy maxsus pitsa: barcha turdagi masalliqlar va mazali tansiq ta\'m.',
  },

  // --- KEBAB ---
  {
    id: 5,
    name: 'Smak Kebab',
    category: 'kebab',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500',
    description: 'Sharqona uslubda tayyorlangan maxsus kabob, tansiq tansiq tansiq.',
  },
  {
    id: 6,
    name: 'Mini Smak Kebab',
    category: 'kebab',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
    description: 'Kichik hajmli ishtaha ochar smak kebab.',
  },

  // --- FAST FOOD (Burgerlar, Lavashlar, Donarlar, Hot-doglar, Garnirlar) ---
  {
    id: 7,
    name: 'Klassik Burger',
    category: 'fastfood',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    description: 'Mol go\'shtidan kotlet, yangi salat bargi, pomidor va maxsus sous.',
  },
  {
    id: 8,
    name: 'Chizburger',
    category: 'fastfood',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500',
    description: 'Erigan chehedor pishloqi va sershira mol go\'shti kotleti bilan.',
  },
  {
    id: 9,
    name: 'Big Burger',
    category: 'fastfood',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
    description: 'Ikki qavatli gigant kotlet va maxsus firmaviy sous.',
  },
  {
    id: 10,
    name: 'Chicken Burger',
    category: 'fastfood',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500',
    description: 'Crispy tovuq filesi, maxsus burger sousi va yangi bodring.',
  },
  {
    id: 11,
    name: 'Mol Go\'shtli Lavash (Klassik)',
    category: 'fastfood',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500',
    description: 'Sershira mol go\'shti, maxsus oq sous, pomidor, qarsildoq friti va pishloq.',
  },
  {
    id: 12,
    name: 'Tovuqli Lavash',
    category: 'fastfood',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
    description: 'Tovuq go\'shti, maxsus sous, bodring, pomidor va kartoshka fri.',
  },
  {
    id: 13,
    name: 'Gigant Donar (Mol go\'shtli)',
    category: 'fastfood',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    description: 'G\'uzorda o\'xshashi yo\'q ulkan hajm va unutilmas lazzatli gigant donar.',
  },
  {
    id: 14,
    name: 'Shourma Tovuqli',
    category: 'fastfood',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1633337474564-1d9475ca7b2e?w=500',
    description: 'Tovuq go\'shti, maxsus sous, bodring va kartoshka fri.',
  },
  {
    id: 15,
    name: 'Klassik Hot-Dog',
    category: 'fastfood',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?w=500',
    description: 'Sershira sosiska, bulochka, ketchup, mayonez va xantal.',
  },
  {
    id: 16,
    name: 'Royal Hot-Dog (Pishloqli)',
    category: 'fastfood',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=500',
    description: 'Mol go\'shtidan tayyorlangan premium sosiska, chehedor pishloq va maxsus sous.',
  },
  {
    id: 17,
    name: 'Kartoshka Fri',
    category: 'fastfood',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
    description: 'Tilla rang va qarsildoq qaynoq fri.',
  },
  {
    id: 18,
    name: 'Fri Pishloqli',
    category: 'fastfood',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=500',
    description: 'Qarsildoq fri kartoshka ustidan eritilgan maxsus pishloq sousi.',
  },

  // --- YAXNA ICHIMLIKLAR (Alohida bo'lim) ---
  {
    id: 19,
    name: 'Coca-Cola (0.5 l)',
    category: 'drinks',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500',
    description: 'Muzdek salqin gazli ichimlik.',
  },
  {
    id: 20,
    name: 'Coca-Cola (1.0 l)',
    category: 'drinks',
    price: 13000,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500',
    description: 'Katta hajmda, do\'stlar davrasi uchun muzdek Coca-Cola.',
  },
  {
    id: 21,
    name: 'Fanta (0.5 l)',
    category: 'drinks',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1624638760439-012574e44280?w=500',
    description: 'Apelsin ta\'mli tetiklashtiruvchi gazli ichimlik.',
  },
    {
    id: 26,
    name: 'Fanta (1.0 l)',
    category: 'drinks',
    price: 13000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfncZcH1IWRAhh_wWx_KAzbQQ529DR_2SvoTttbyUqw&s',
    description: 'Apelsin ta\'mli tetiklashtiruvchi gazli ichimlik.',
  },
  {
    id: 22,
    name: 'Sprite (0.5 l)',
    category: 'drinks',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500',
    description: 'Limon-laym ta\'mli muzdek gazli ichimlik.',
  },
    {
    id: 25,
    name: 'Sprite (1.5 l)',
    category: 'drinks',
    price: 16000,
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500',
    description: 'Limon-laym ta\'mli muzdek gazli ichimlik.',
  },
  
  {
    id: 23,
    name: 'Milliy Ayron (0.4 l)',
    category: 'drinks',
    price: 6000,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500',
    description: 'Issiq kunda chanqoqni bosuvchi tabobatli sovuq ayron.',
  },

  // --- SMAKCREAM & SHIRINLIK ---
  {
    id: 24,
    name: 'SMAKCream Muzqaymoq',
    category: 'smakcream',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500',
    description: 'Tabiiy qaymoqli yumshoq va tansiq muzqaymoq.',
  },
    {
    id: 27,
    name: 'SMAKCream Muzqaymoq',
    category: 'smakcream',
    price: 12000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81iLmNdiwJ2vctV6X9sGM9hATstrRytxE-pd4enldhg&s=10',
    description: 'Tabiiy qaymoqli yumshoq va tansiq muzqaymoq.',
  }
];

export const promosData = [
  {
    id: 1,
    title: '2+1 Pitsa Aksiyasi',
    description: 'Iloji boricha sevimli pitsalaringizdan 2 tasini oling va 1 ta MARGARITA Pitsa TEKIN!',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    tag: 'SUPER AKSIYA'
  },
  {
    id: 2,
    title: 'G\'uzor Tumani bo\'ylab Bepul Yetkazish!',
    description: 'Barcha turdagi buyurtmalar uchun G\'uzor bo\'ylab yetkazib berish mutlaqo bepul.',
    image: 'https://images.unsplash.com/photo-1526367460882-1c61088066af?w=600',
    tag: 'TEKIN DOSTAVKA'
  },
  {
    id: 3,
    title: 'Gigant Donar Yangiligi',
    description: 'G\'uzorda o\'xshashi yo\'q ulkan hajm va unutilmas lazzatli gigant donar.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600',
    tag: 'YANGILIK'
  }
];

export const reviewsData = [
  { id: 1, name: 'Jasurbek Tursunov', rating: 5, comment: 'Mazali kebablar va juda tez yetkazib berishdi. G\'uzorda eng zo\'ri!', date: '2026-08-01' },
  { id: 2, name: 'Madina Karimova', rating: 5, comment: 'Pitsalari juda yumshoq va mazali ekan. 2+1 aksiyasi ham zo\'r foyda berdi.', date: '2026-07-28' },
  { id: 3, name: 'Sardor Nurmatov', rating: 4, comment: 'Burgerlari shershira, xizmat ko\'rsatish alo darajada.', date: '2026-07-25' }
];