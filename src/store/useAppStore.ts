import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductCustomization, Profile } from '../types';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { PRODUCTS as initialProducts } from '../data';

interface AppState {
  user: Profile | null;
  loading: boolean;
  cart: CartItem[];
  favorites: string[]; // Product IDs
  products: Product[]; // Combined server and static products
  
  setUser: (user: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  fetchProducts: () => void;
  
  login: (phone: string, password: string) => Promise<void>;
  register: (phone: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  
  addToCart: (product: Product, customization: ProductCustomization, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

let isFetchingProducts = false;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      cart: [],
      favorites: ['1', '2', '4', '6'],
      products: initialProducts,
      
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      
      fetchProducts: () => {
        if (isFetchingProducts) return;
        isFetchingProducts = true;
        try {
          onSnapshot(collection(db, 'products'), (snapshot) => {
            const serverProds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
            // Merge server products with initial products. Server products take precedence by ID.
            const merged = [...initialProducts];
            serverProds.forEach(sp => {
              const idx = merged.findIndex(p => p.id === sp.id);
              if (idx >= 0) merged[idx] = sp;
              else merged.push(sp);
            });
            set({ products: merged });
          });
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
      
      login: async (phone, password) => {
        set({ loading: true });
        try {
          const userDoc = await getDoc(doc(db, 'users', phone));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.password === password) {
              set({ user: userData as Profile });
            } else {
              throw new Error('Invalid phone number or password');
            }
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      register: async (phone, password, name) => {
        set({ loading: true });
        try {
          const userDoc = await getDoc(doc(db, 'users', phone));
          if (userDoc.exists()) {
            throw new Error('Phone number already registered');
          }

          const newProfile: Profile & { password?: string } = {
            id: phone,
            name,
            phone,
            email: '',
            loyaltyPoints: 0,
            password
          };

          await setDoc(doc(db, 'users', phone), newProfile);
          set({ user: newProfile as Profile });
        } catch (error) {
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null });
      },

      updateProfile: async (updates) => {
        const user = get().user;
        if (!user) return;

        set({ loading: true });
        try {
          const updatedUser = { ...user, ...updates };
          await updateDoc(doc(db, 'users', user.id), updates);
          set({ user: updatedUser });
        } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}`);
        } finally {
          set({ loading: false });
        }
      },
      
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
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        user: state.user
      }),
    }
  )
);
