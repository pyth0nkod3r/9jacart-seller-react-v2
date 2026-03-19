/**
 * Purple Theme - Violet Theme
 *
 * Aligned with Bootstrap version: themes.config.json "purple" theme
 * Colors: primary=#8b5cf6, background=#faf5ff, surface=#f3e8ff, sidebar=#4c1d95
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

const purpleTheme: ThemeConfig = {
  id: 'purple',
  name: 'Purple Violet',
  description: 'Modern purple theme with vibrant violet accent colors',
  author: 'SellerHub Team',
  version: '1.0.0',
  isDark: false,

  colors: {
    // Background & text — #faf5ff / #4c1d95
    background: 'oklch(0.98 0.01 300)',
    foreground: 'oklch(0.30 0.16 295)',
    card: 'oklch(0.98 0.01 300)',
    cardForeground: 'oklch(0.30 0.16 295)',
    popover: 'oklch(0.98 0.01 300)',
    popoverForeground: 'oklch(0.30 0.16 295)',

    // Primary — #8b5cf6 (violet-500)
    primary: 'oklch(0.55 0.22 290)',
    primaryForeground: 'oklch(1 0 0)',

    // Secondary — #f3e8ff (violet-100 surface)
    secondary: 'oklch(0.94 0.03 300)',
    secondaryForeground: 'oklch(0.30 0.16 295)',

    // Muted — #f3e8ff / #6b21a8 (violet-800)
    muted: 'oklch(0.94 0.03 300)',
    mutedForeground: 'oklch(0.40 0.14 295)',

    // Accent — surface for hover states
    accent: 'oklch(0.94 0.03 300)',
    accentForeground: 'oklch(0.30 0.16 295)',

    // Destructive — #ef4444
    destructive: 'oklch(0.577 0.245 27)',

    // Border — #e9d5ff (violet-200)
    border: 'oklch(0.89 0.05 295)',
    input: 'oklch(0.98 0.01 300)',
    ring: 'oklch(0.55 0.22 290)',

    // Charts — purple palette
    chart1: 'oklch(0.55 0.22 290)',
    chart2: 'oklch(0.66 0.18 290)',
    chart3: 'oklch(0.654 0.183 149)',
    chart4: 'oklch(0.588 0.189 260)',
    chart5: 'oklch(0.745 0.161 75)',

    // Sidebar — dark: #4c1d95 / #faf5ff
    sidebar: 'oklch(0.30 0.16 295)',
    sidebarForeground: 'oklch(0.98 0.01 300)',
    sidebarPrimary: 'oklch(0.55 0.22 290)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.55 0.22 290)',
    sidebarAccentForeground: 'oklch(1 0 0)',
    sidebarBorder: 'oklch(0.38 0.14 295)',
    sidebarRing: 'oklch(0.55 0.22 290)',

    // Brand colors
    brandAccent: 'oklch(0.66 0.18 290)',
    brandHighlight: 'oklch(0.66 0.18 290)',
    brandSuccess: 'oklch(0.654 0.183 149)',
    brandWarning: 'oklch(0.745 0.161 75)',
    brandInfo: 'oklch(0.55 0.22 290)',
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

export default purpleTheme;
