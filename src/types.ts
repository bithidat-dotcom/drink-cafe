export type ProductSize = 'Small' | 'Medium' | 'Large';
export type Temperature = 'Hot' | 'Cold';
export type MilkType = 'Regular' | 'Low Fat' | 'Oat' | 'Almond';
export type SugarLevel = 'No Sugar' | 'Low' | 'Normal' | 'Extra';

export interface ProductCustomization {
  id: string;
  productId: string;
  size: ProductSize;
  temperature: Temperature;
  milk: MilkType;
  sugar: SugarLevel;
  extras: string[]; // ['Extra Shot', 'Whipped Cream', etc.]
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  customization: ProductCustomization;
  quantity: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customization: any;
}

export type OrderStatus = 'ORDER PLACED' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT FOR DELIVERY' | 'DELIVERED';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: any;
  items: OrderItem[];
  deliveryMethod: 'Delivery' | 'Pickup';
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'Cash on Delivery' | 'Mobile Payment' | 'Card';
}

export interface Profile {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoUrl?: string;
  loyaltyPoints: number;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  points: number;
  type: 'earn' | 'redeem';
  description: string;
  createdAt: any;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  code?: string;
}

export interface Banner {
  id: string;
  image: string;
  title?: string;
  active: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: any;
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: any;
}
