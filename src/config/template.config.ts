/**
 * Central Template Configuration
 * 
 * This file contains all configurable branding, features, and settings
 * that can be customized for different deployments of the seller platform.
 */

import type {
  BrandConfig,
  FeaturesConfig,
  NavigationConfig,
  ContactInfo,
  SocialLink,
  StatsItem,
  TypographyConfig,
} from '@/types/theme.types';

// =============================================================================
// BRAND CONFIGURATION
// =============================================================================

export const brandConfig: BrandConfig = {
  name: 'SellerHub',
  tagline: 'Grow Your Business with SellerHub',
  description: 'The complete e-commerce platform for Nigerian sellers. Manage your products, track orders, and grow your business with powerful tools and analytics.',
  logo: {
    light: '/logo.svg',
    dark: '/logo.svg',
    icon: '/9Jacart Icon SVG.svg',
  },
  favicon: '/logo.svg',
  copyright: 'SellerHub. All rights reserved.',
};

// =============================================================================
// FEATURE FLAGS CONFIGURATION
// =============================================================================

export const featuresConfig: FeaturesConfig = {
  enableAnalytics: true,
  enableStorefront: true,
  enableNotifications: true,
  enableProducts: true,
  enableOrders: true,
  enableContactSupport: true,
  enableSettings: true,
  enableDarkMode: true,
  enableMultiLanguage: false,
  enableMultiCurrency: false,
  enableRealTimeUpdates: true,
  enableFileUpload: true,
  enableImageOptimization: true,
  enableSeoOptimization: true,
};

// =============================================================================
// NAVIGATION CONFIGURATION
// =============================================================================

export const navigationConfig: NavigationConfig = {
  mainNav: [
    { name: 'Home', href: '/' },
    { name: 'Sell on SellerHub', href: '/sell' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/#faq' },
  ],
  dashboardNav: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Products', href: '/dashboard/products', icon: '📦' },
    { name: 'Orders', href: '/dashboard/orders', icon: '🛒' },
    { name: 'Storefront', href: '/dashboard/storefront', icon: '🏪' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { name: 'Notifications', href: '/dashboard/notifications', icon: '🔔' },
    { name: 'Contact Support', href: '/dashboard/contact-admin', icon: '✉️' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ],
  footerNav: [
    { name: 'Home', href: '/' },
    { name: 'Sell on SellerHub', href: '/sell' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/#faq' },
  ],
  legalLinks: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
};

// =============================================================================
// CONTACT INFORMATION
// =============================================================================

export const contactInfo: ContactInfo = {
  email: 'support@sellerhub.com',
  phone: '+234 123 456 7890',
  address: 'Lagos, Nigeria',
  supportHours: 'Mon-Fri 9:00 AM - 6:00 PM WAT',
};

// =============================================================================
// SOCIAL LINKS
// =============================================================================

export const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/sellerhub',
    icon: 'twitter',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/sellerhub',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/sellerhub',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/sellerhub',
    icon: 'linkedin',
  },
];

// =============================================================================
// STATISTICS
// =============================================================================

export const statsConfig: StatsItem[] = [
  {
    value: '10K+',
    label: 'Active Sellers',
    description: 'Join thousands of successful Nigerian entrepreneurs',
  },
  {
    value: '500K+',
    label: 'Products Listed',
    description: 'Millions of products available on our platform',
  },
  {
    value: '99.9%',
    label: 'Uptime',
    description: 'Reliable service you can count on',
  },
];

// =============================================================================
// TYPOGRAPHY CONFIGURATION
// =============================================================================

export const typographyConfig: TypographyConfig = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: 'Georgia, Cambria, "Times New Roman", serif',
    mono: 'JetBrains Mono, Menlo, Monaco, monospace',
    display: 'Inter, system-ui, -apple-system, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.3',
    normal: '1.6',
    relaxed: '1.625',
    loose: '2',
  },
};

// =============================================================================
// SEO & META CONFIGURATION
// =============================================================================

export const seoConfig = {
  title: `${brandConfig.name} - ${brandConfig.tagline}`,
  description: brandConfig.description,
  keywords: [
    'ecommerce',
    'nigeria',
    'online marketplace',
    'sell online',
    'african marketplace',
    'nigerian sellers',
    'online business',
    'products',
    'orders',
  ],
  ogImage: '/og-image.png',
  twitterHandle: '@sellerhub',
  siteUrl: 'https://sellerhub.com',
};

// =============================================================================
// APP CONFIGURATION (Combined)
// =============================================================================

export const appConfig = {
  brand: brandConfig,
  features: featuresConfig,
  navigation: navigationConfig,
  contact: contactInfo,
  socialLinks,
  stats: statsConfig,
  typography: typographyConfig,
  seo: seoConfig,
};

export default appConfig;
