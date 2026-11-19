/*
 * DEMO DATA. Replace with a call to the API (GET /api/offers).
 * `emoji` + `tone` are used as a temporary image: replace with `image: '/images/xxx.jpg'`
 * (see FoodImage component).
 */
export const CATEGORIES = ['Meals', 'Sandwiches', 'Pastries', 'Drinks'];

export const offers = [
  { id: 1, title: 'Sandwich club', restaurant: 'Café ESSECT', category: 'Sandwiches', price: 5, oldPrice: 8.5, quantity: 6, pickup: '17:00 – 18:30', emoji: '🥪', tone: ['#f6d58e', '#e0a04a'], description: 'Generous club sandwich: grilled chicken, lettuce, tomato, cheese and house sauce in fresh bread baked today.' },
  { id: 2, title: 'Bolognese pasta', restaurant: 'Campus Restaurant', category: 'Meals', price: 7, oldPrice: 10, quantity: 4, pickup: '14:30 – 15:30', emoji: '🍝', tone: ['#f3b08a', '#d9663a'], description: 'Portion of pasta with bolognese sauce prepared this morning, perfect for a complete lunch.' },
  { id: 3, title: 'Fresh salad', restaurant: 'Healthy Food', category: 'Meals', price: 4, oldPrice: 8, quantity: 8, pickup: '15:00 – 16:30', emoji: '🥗', tone: ['#b9dd9c', '#5fa35a'], description: 'Mixed salad with seasonal raw vegetables, tuna and olives, with the dressing on the side.' },
  { id: 4, title: 'Butter croissant', restaurant: 'Bakery', category: 'Pastries', price: 2, oldPrice: 3.5, quantity: 12, pickup: '18:00 – 19:00', emoji: '🥐', tone: ['#f4d9a0', '#d19a45'], description: 'All-butter croissants of the day, to pick up at the end of the day at a reduced price.' },
  { id: 5, title: 'Tomato sauce pasta', restaurant: 'Campus Restaurant', category: 'Meals', price: 7, oldPrice: 10, quantity: 5, pickup: '14:30 – 15:30', emoji: '🍅', tone: ['#f2a38f', '#c8452f'], description: 'Pasta with tomato and basil sauce, vegetarian version, light and tasty.' },
  { id: 6, title: 'Tunisian tajine', restaurant: 'Campus Restaurant', category: 'Meals', price: 6.5, oldPrice: 10, quantity: 3, pickup: '14:00 – 15:00', emoji: '🍳', tone: ['#f1c988', '#c9822f'], description: 'Tunisian tajine with chicken and vegetables, a traditional dish prepared the same day.' },
  { id: 7, title: 'Chicken panini', restaurant: 'Café ESSECT', category: 'Sandwiches', price: 4.5, oldPrice: 7, quantity: 7, pickup: '17:30 – 18:30', emoji: '🥙', tone: ['#efd29c', '#c58a3e'], description: 'Grilled chicken panini with melted cheese and vegetables, served hot on site.' },
  { id: 8, title: 'Mille-feuille', restaurant: 'Bakery', category: 'Pastries', price: 2.5, oldPrice: 4.5, quantity: 5, pickup: '18:00 – 19:00', emoji: '🍰', tone: ['#f7dbe0', '#d98ca0'], description: 'Mille-feuille with pastry cream, prepared this morning by our partner bakery.' },
  { id: 9, title: 'Fresh orange juice', restaurant: 'Healthy Food', category: 'Drinks', price: 2, oldPrice: 3.5, quantity: 10, pickup: '15:00 – 17:00', emoji: '🍊', tone: ['#ffd98a', '#f29a2e'], description: 'Freshly squeezed orange juice, 100% fruit, no added sugar.' },
];

export const discountOf = (o) => Math.round((1 - o.price / o.oldPrice) * 100);
export const formatPrice = (n) => (Number.isInteger(n) ? n : n.toFixed(1)) + ' TND';
