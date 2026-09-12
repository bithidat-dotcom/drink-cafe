import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductCustomization, Profile } from '../types';

interface AppState {
  user: Profile | null;
  cart: CartItem[];
  favorites: string[]; // Product IDs
  
  setUser: (user: Profile | null) => void;
  addToCart: (product: Product, customization: ProductCustomization, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      favorites: ['1', '2', '4', '6'],
      
      setUser: (user) => set({ user }),
      
      addToCart: (product, customization, quantity) => {
        const cart = get().cart;
        const existingItem = cart.find(item => 
          item.productId === product.id && 
          JSON.stringify(item.customization) === JSON.stringify(customization)
        );
        
        if (existingItem) {
          set({
            cart: cart.map(item => 
              item.id === existingItem.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          const newItem: CartItem = {
            id: Math.random().toString(36).substr(2, 9),
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            price: product.price,
            customization,
            quantity
          };
          set({ cart: [...cart, newItem] });
        }
      },
      
      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter(item => item.id !== cartItemId) });
      },
      
      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map(item => 
            item.id === cartItemId ? { ...item, quantity } : item
          )
        });
      },
      
      clearCart: () => set({ cart: [] }),
      
      toggleFavorite: (productId) => {
        const favorites = get().favorites;
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter(id => id !== productId) });
        } else {
          set({ favorites: [...favorites, productId] });
        }
      },
      
      isFavorite: (productId) => get().favorites.includes(productId),
    }),
    {
      name: 'drink-cafe-storage',
    }
  )
);
