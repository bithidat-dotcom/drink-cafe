import { Category, Product, Banner, Offer } from './types';

export const CATEGORIES: Category[] = [
  { id: 'hot-coffee', name: 'Hot Coffee', icon: 'Coffee' },
  { id: 'iced-coffee', name: 'Iced Coffee', icon: 'CupSoda' },
  { id: 'frappuccino', name: 'Frappuccino', icon: 'Leaf' },
  { id: 'mocha', name: 'Mocha', icon: 'Cookie' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    categoryId: 'iced-coffee',
    name: 'Espresso',
    description: 'Rich, intense, and perfectly extracted espresso shot.',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1599557431284-0a307c9fb377?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviewCount: 200,
    isPopular: true,
  },
  {
    id: '2',
    categoryId: 'hot-coffee',
    name: 'Vanilla Latte',
    description: 'Smooth espresso with steamed milk and vanilla syrup.',
    price: 2.00,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    isPopular: true,
  },
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
  },
  {
    id: '2',
    title: 'Buy 1 Get 1',
    description: 'Buy any large latte and get a regular americano free!',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400',
    discount: 50,
    code: 'BOGO'
  }
];
