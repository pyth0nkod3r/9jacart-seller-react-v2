/**
 * Sunset Theme - Orange/Warm Theme
 *
 * Aligned with Bootstrap version: themes.config.json "sunset" theme
 * Colors: primary=#f97316, background=#fffbeb, surface=#fef3c7, sidebar=#78350f
 */

import type { ThemeConfig } from '@/types/theme.types';
import {
  brandConfig,
  featuresConfig,
  navigationConfig,
  contactInfo,
  socialLinks,
  statsConfig,
  typographyConfig,
} from '../template.config';

const sunsetTheme: ThemeConfig = {
  id: 'sunset',
  name: 'Sunset Orange',
  description: 'Warm sunset theme with vibrant orange accent colors',
  author: 'SellerHub Team',
  version: '1.0.0',
  isDark: false,

  colors: {
    // Background & text — #fffbeb / #78350f
    background: 'oklch(0.99 0.01 85)',
    foreground: 'oklch(0.36 0.1 50)',
    card: 'oklch(0.99 0.01 85)',
    cardForeground: 'oklch(0.36 0.1 50)',
    popover: 'oklch(0.99 0.01 85)',
    popoverForeground: 'oklch(0.36 0.1 50)',

    // Primary — #f97316 (orange-500)
    primary: 'oklch(0.67 0.19 45)',
    primaryForeground: 'oklch(1 0 0)',

    // Secondary — #fef3c7 (amber-100 surface)
    secondary: 'oklch(0.96 0.05 90)',
    secondaryForeground: 'oklch(0.36 0.1 50)',

    // Muted — #fef3c7 / #92400e (amber-800)
    muted: 'oklch(0.96 0.05 90)',
    mutedForeground: 'oklch(0.45 0.1 50)',

    // Accent — surface for hover states
    accent: 'oklch(0.96 0.05 90)',
    accentForeground: 'oklch(0.36 0.1 50)',

    // Destructive — #ef4444
    destructive: 'oklch(0.577 0.245 27)',

    // Border — #fde68a (amber-200)
    border: 'oklch(0.93 0.08 90)',
    input: 'oklch(0.99 0.01 85)',
    ring: 'oklch(0.67 0.19 45)',

    // Charts — warm palette
    chart1: 'oklch(0.67 0.19 45)',
    chart2: 'oklch(0.75 0.15 55)',
    chart3: 'oklch(0.654 0.183 149)',
    chart4: 'oklch(0.588 0.189 260)',
    chart5: 'oklch(0.745 0.161 75)',

    // Sidebar — dark: #78350f / #fffbeb
    sidebar: 'oklch(0.36 0.1 50)',
    sidebarForeground: 'oklch(0.99 0.01 85)',
    sidebarPrimary: 'oklch(0.67 0.19 45)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.67 0.19 45)',
    sidebarAccentForeground: 'oklch(1 0 0)',
    sidebarBorder: 'oklch(0.45 0.08 50)',
    sidebarRing: 'oklch(0.67 0.19 45)',

    // Brand colors
    brandAccent: 'oklch(0.75 0.15 55)',
    brandHighlight: 'oklch(0.75 0.15 55)',
    brandSuccess: 'oklch(0.654 0.183 149)',
    brandWarning: 'oklch(0.745 0.161 75)',
    brandInfo: 'oklch(0.588 0.189 260)',
  },

  radius: {
    sm: 'calc(var(--radius) - 4px)',
    md: 'calc(var(--radius) - 2px)',
    lg: 'var(--radius)',
    xl: 'calc(var(--radius) + 4px)',
    base: '0.5rem',
  },

  typography: typographyConfig,

  brand: brandConfig,

  features: featuresConfig,

  navigation: navigationConfig,

  contact: contactInfo,

  socialLinks: socialLinks,

  stats: statsConfig,
};

export default sunsetTheme;
