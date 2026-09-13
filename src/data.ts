import { Category, Product, Banner, Offer } from './types';

export const CATEGORIES: Category[] = [
  { id: 'coffee', name: 'Coffee', icon: 'Coffee' },
  { id: 'tea', name: 'Tea', icon: 'Leaf' },
  { id: 'milkshake', name: 'Milkshake', icon: 'Milk' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    categoryId: 'coffee',
    name: 'Special Cold Coffee',
    description: 'Signature cold brewed espresso with creamy froth and dark chocolate syrup.',
    price: 4.50,
    image: 'https://i.postimg.cc/52Fv0yC1/f7f7f32e-6709-496f-a1e2-173e733bbcad.png',
    rating: 4.9,
    reviewCount: 320,
    isPopular: true,
  },
  {
    id: '2',
    categoryId: 'coffee',
    name: 'Iced Mocha Frappe',
    description: 'Chilled rich mocha blended with milk ice and chocolate drizzle.',
    price: 5.00,
    image: 'https://i.postimg.cc/PJPJRVW7/cb767773-eaec-4ae5-a2ce-d7eedee66b24.png',
    rating: 4.8,
    reviewCount: 245,
    isPopular: true,
  },
  {
    id: '3',
    categoryId: 'coffee',
    name: 'Caramel Cream Latte',
    description: 'Smooth double espresso layered with creamy vanilla and golden caramel.',
    price: 4.75,
    image: 'https://i.postimg.cc/XNmYv8cS/e124248e-d5d7-4e04-b98d-eb76d615c0ed.png',
    rating: 4.9,
    reviewCount: 410,
    isPopular: true,
  },
  {
    id: '4',
    categoryId: 'tea',
    name: 'Iced Matcha Tea Latte',
    description: 'Premium ceremonial Japanese matcha whisked with chilled oat milk and honey.',
    price: 4.75,
    image: 'https://i.postimg.cc/J4VpmfgC/45d8619a-f852-456d-ad2c-40d51788622e.png',
    rating: 4.8,
    reviewCount: 198,
    isPopular: true,
  },
  {
    id: '5',
    categoryId: 'tea',
    name: 'Peach Citrus Iced Tea',
    description: 'Refreshing black tea infused with real peach nectar and fresh mint leaves.',
    price: 4.25,
    image: 'https://i.postimg.cc/XNmYv8cS/e124248e-d5d7-4e04-b98d-eb76d615c0ed.png',
    rating: 4.7,
    reviewCount: 175,
    isPopular: false,
  },
  {
    id: '6',
    categoryId: 'milkshake',
    name: 'Velvet Chocolate Shake',
    description: 'Rich Belgian chocolate ice cream blended with thick milk and topped with whipped cream.',
    price: 5.25,
    image: 'https://i.postimg.cc/PJPJRVW7/cb767773-eaec-4ae5-a2ce-d7eedee66b24.png',
    rating: 4.9,
    reviewCount: 290,
    isPopular: true,
  },
  {
    id: '7',
    categoryId: 'milkshake',
    name: 'Strawberry Milkshake',
    description: 'Creamy fresh strawberry ice cream shake crowned with berries and vanilla glaze.',
    price: 5.00,
    image: 'https://i.postimg.cc/52Fv0yC1/f7f7f32e-6709-496f-a1e2-173e733bbcad.png',
    rating: 4.9,
    reviewCount: 310,
    isPopular: false,
  },
  {
    id: '8',
    categoryId: 'coffee',
    name: 'Royal Gold Espresso',
    description: 'A premium blend of golden roasted beans with a smooth, velvety finish.',
    price: 5.50,
    image: 'https://i.postimg.cc/pTrryV0G/file-00000000721881fab5e8cf9e5d52050d.png',
    rating: 5.0,
    reviewCount: 156,
    isPopular: true,
  },
  {
    id: '9',
    categoryId: 'coffee',
    name: 'Cloud Cream Latte',
    description: 'Ultra-creamy latte topped with a light, airy milk cloud.',
    price: 5.25,
    image: 'https://i.postimg.cc/sXxx1fnq/file-000000006abc81fa8c110f9500a457ae.png',
    rating: 4.9,
    reviewCount: 88,
    isPopular: true,
  }
];

export const BANNERS: Banner[] = [
  {
    id: '1',
    image: 'https://i.postimg.cc/431NWRcG/file-00000000a0c481fa9d35559539ee4446.png',
    title: 'Autumn Specials',
    active: true,
  }
];

export const OFFERS: Offer[] = [
  {
    id: '1',
    title: 'Morning Coffee Deal',
    description: 'Get 20% off on all coffee items before 10 AM.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
    discount: 20,
    code: 'MORNING20'
  }
];
