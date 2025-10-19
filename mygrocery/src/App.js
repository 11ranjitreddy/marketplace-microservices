import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import OffersPage from './pages/OffersPage';
import HelpPage from './pages/HelpPage';
import SignUpPage from './pages/SingUpPage';
// import ResetPasswordPage from './pages/ResetPasswordPage';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import AdminLoginPage from './pages/AdminLoginPage';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminProductsPage from './pages/AdminProductsPage';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user =JSON.parse(localStorage.getItem('user' || '{}'));
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path ="/signup" element={<SignUpPage/>}/>
                {/* <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                <Route path="/reset-password" element={<ResetPasswordPage/>}/> */}
                {/* <Route path="/admin/login" element={<AdminLoginPage/>}/> */}
                <Route path="/offers" element={<OffersPage />} />
                {/* <Route path="/admin/Products" element ={<AdminProductsPage/>}/>
                <Route path="/admin/Dashboard" element={<AdminDashboard/>}/> */}
                <Route path="/help" element={<HelpPage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payment" 
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/order-confirmation" 
                  element={
                    <ProtectedRoute>
                      <OrderConfirmationPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } 
                />
                {/* <Route 
                 path="/admin/dashboard"
                 element={
                  <ProtectedRoute>
                    <AdminDashboard/>
                  </ProtectedRoute>
                 }
                />
               
              <Route
              path="/admin/Login"
              element={
                <ProtectedRoute>
                  <AdminLoginPage/>
                </ProtectedRoute>
              }
               />

               <Route
               path="/admin/Product"
               element={
                <ProtectedRoute>
                  <AdminProductsPage/>
                </ProtectedRoute>
               }
                 /> */}

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;