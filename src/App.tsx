import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Pages
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/register/RegisterPage';
import ResetPage from '@/pages/auth/ResetPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProductsPage from '@/pages/products/ProductsPage';
import AddProductPage from '@/pages/products/AddProductPage';
import EditProductPage from '@/pages/products/EditProductPage';
import ProductDetailPage from '@/pages/products/ProductDetailPage';
import OrdersPage from '@/pages/orders/OrdersPage';
import StorefrontPage from '@/pages/storefront/StorefrontPage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import NotificationsPage from '@/pages/notifications/NotificationsPage';
import ContactAdminPage from '@/pages/contact/ContactAdminPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import ContactPage from '@/pages/ContactPage';
import SellProductPage from '@/pages/SellProductPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import RegistrationSuccessPage from '@/pages/auth/register/RegistrationSuccessPage';

function AppContent() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/success" element={<RegistrationSuccessPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sell" element={<SellProductPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<AddProductPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="storefront" element={<StorefrontPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="contact-admin" element={<ContactAdminPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      {/*
        ThemeProvider wraps the entire app to provide theme context.
        To switch themes programmatically, use the useTheme hook:
        
        Example:
        const { setTheme } = useTheme();
        setTheme('dark'); // Switches to dark theme
        setTheme('default'); // Switches to default (green) theme
        setTheme('ocean'); // Switches to ocean (blue) theme
      */}
      <ThemeProvider defaultTheme="default" enableSystemPreference={true}>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
