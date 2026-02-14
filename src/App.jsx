import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import ServicesPage from './pages/ServicesPage'

import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AdminWatchForm from './pages/AdminWatchForm';
import Wishlist from './pages/Wishlist';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieBanner from './components/CookieBanner';
import AdminRoute from './components/AdminRoute';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-luxury-black text-white font-sans selection:bg-luxury-gold selection:text-black">
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/new"
            element={
              <AdminRoute>
                <AdminWatchForm />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <AdminWatchForm />
              </AdminRoute>
            }
          />

        </Routes>
      </AnimatePresence>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default App
