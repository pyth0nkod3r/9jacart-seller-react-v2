/**
 * Ocean Theme - Blue Ocean Theme
 *
 * Aligned with Bootstrap version: themes.config.json "ocean" theme
 * Colors: primary=#0ea5e9, background=#f0f9ff, surface=#e0f2fe, sidebar=#0c4a6e
 */

import type { ThemeConfig, BrandConfig, NavigationItem } from '@/types/theme.types';
import {
  featuresConfig,
  contactInfo,
  socialLinks,
  statsConfig,
  typographyConfig,
} from '../template.config';

// Ocean-specific brand configuration
const oceanBrand: BrandConfig = {
  name: 'OceanCart',
  tagline: 'Navigate Your Business Success',
  description: 'A serene e-commerce platform with powerful tools and analytics for modern sellers.',
  logo: {
    light: '/logo.svg',
    dark: '/logo.svg',
    icon: '/9Jacart Icon SVG.svg',
  },
  favicon: '/logo.svg',
  copyright: 'OceanCart. All rights reserved.',
};

// Ocean-specific navigation
const oceanMainNav: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Sell on OceanCart', href: '/sell' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/#faq' },
];

const oceanTheme: ThemeConfig = {
  id: 'ocean',
  name: 'Ocean Blue',
  description: 'Calm blue theme inspired by the ocean',
  author: 'SellerHub Team',
  version: '1.0.0',
  isDark: false,

  colors: {
    // Background & text — #f0f9ff / #0c4a6e
    background: 'oklch(0.978 0.008 230)',
    foreground: 'oklch(0.35 0.06 235)',
    card: 'oklch(0.978 0.008 230)',
    cardForeground: 'oklch(0.35 0.06 235)',
    popover: 'oklch(0.978 0.008 230)',
    popoverForeground: 'oklch(0.35 0.06 235)',

    // Primary — #0ea5e9 (sky-500)
    primary: 'oklch(0.64 0.15 230)',
    primaryForeground: 'oklch(1 0 0)',

    // Secondary — #e0f2fe (sky-100 surface)
    secondary: 'oklch(0.93 0.025 230)',
    secondaryForeground: 'oklch(0.35 0.06 235)',

    // Muted — #e0f2fe / #0369a1 (sky-700)
    muted: 'oklch(0.93 0.025 230)',
    mutedForeground: 'oklch(0.45 0.06 235)',

    // Accent — surface for hover states
    accent: 'oklch(0.93 0.025 230)',
    accentForeground: 'oklch(0.35 0.06 235)',

    // Destructive — #ef4444
    destructive: 'oklch(0.577 0.245 27)',

    // Border — #bae6fd (sky-200)
    border: 'oklch(0.88 0.04 230)',
    input: 'oklch(0.978 0.008 230)',
    ring: 'oklch(0.64 0.15 230)',

    // Charts — ocean palette
    chart1: 'oklch(0.64 0.15 230)',
    chart2: 'oklch(0.72 0.14 230)',
    chart3: 'oklch(0.654 0.183 149)',
    chart4: 'oklch(0.588 0.189 260)',
    chart5: 'oklch(0.745 0.161 75)',

    // Sidebar — dark: #0c4a6e / #f0f9ff
    sidebar: 'oklch(0.35 0.06 235)',
    sidebarForeground: 'oklch(0.978 0.008 230)',
    sidebarPrimary: 'oklch(0.64 0.15 230)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.64 0.15 230)',
    sidebarAccentForeground: 'oklch(1 0 0)',
    sidebarBorder: 'oklch(0.25 0.04 235)',
    sidebarRing: 'oklch(0.64 0.15 230)',

    // Brand colors
    brandAccent: 'oklch(0.72 0.14 230)',
    brandHighlight: 'oklch(0.72 0.14 230)',
    brandSuccess: 'oklch(0.654 0.183 149)',
    brandWarning: 'oklch(0.745 0.161 75)',
    brandInfo: 'oklch(0.64 0.15 230)',
  },

  radius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
    base: '0.5rem',
  },

  typography: typographyConfig,

  brand: oceanBrand,

  features: featuresConfig,

  navigation: {
    mainNav: oceanMainNav,
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
      { name: 'Sell on OceanCart', href: '/sell' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/#faq' },
    ],
    legalLinks: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
    ],
  },

  contact: contactInfo,

  socialLinks: socialLinks,

  stats: statsConfig,
};

export default oceanTheme;
