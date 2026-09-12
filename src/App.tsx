import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { Favorites } from './pages/Favorites';
import { Orders } from './pages/Orders';
import { OrderTracking } from './pages/OrderTracking';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { Notifications } from './pages/Notifications';
import { Loyalty } from './pages/Loyalty';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminLogin } from './pages/admin/AdminLogin';

import { AuthProvider } from './lib/auth';

import { Welcome } from './pages/Welcome';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="loyalty" element={<Loyalty />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-tracking/:id" element={<OrderTracking />} />
        
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
