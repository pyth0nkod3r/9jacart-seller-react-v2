/**
 * Default Theme - SellerHub Green Theme
 *
 * Aligned with Bootstrap version: themes.config.json "default" theme
 * Colors: primary=#16a34a, background=#ffffff, surface=#f8fafc, sidebar=#1e293b
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

const defaultTheme: ThemeConfig = {
  id: 'default',
  name: 'Default Green',
  description: 'Clean green theme with vibrant accent colors',
  author: 'SellerHub Team',
  version: '1.0.0',
  isDark: false,

  colors: {
    // Background & text — #ffffff / #1e293b (slate-800)
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.234 0.025 264)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.234 0.025 264)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.234 0.025 264)',

    // Primary — #16a34a (green-600)
    primary: 'oklch(0.553 0.152 152)',
    primaryForeground: 'oklch(1 0 0)',

    // Secondary — #f8fafc (slate-50 surface)
    secondary: 'oklch(0.984 0.003 264)',
    secondaryForeground: 'oklch(0.234 0.025 264)',

    // Muted — #f8fafc / #64748b (slate-500 text)
    muted: 'oklch(0.984 0.003 264)',
    mutedForeground: 'oklch(0.541 0.025 256)',

    // Accent — surface color for hover states
    accent: 'oklch(0.984 0.003 264)',
    accentForeground: 'oklch(0.234 0.025 264)',

    // Destructive — #ef4444
    destructive: 'oklch(0.577 0.245 27)',

    // Border — #e2e8f0 (slate-200)
    border: 'oklch(0.916 0.009 264)',
    input: 'oklch(1 0 0)',
    ring: 'oklch(0.553 0.152 152)',

    // Charts
    chart1: 'oklch(0.553 0.152 152)',
    chart2: 'oklch(0.654 0.183 149)',
    chart3: 'oklch(0.654 0.183 149)',
    chart4: 'oklch(0.588 0.189 260)',
    chart5: 'oklch(0.745 0.161 75)',

    // Sidebar — dark: #1e293b / #f1f5f9
    sidebar: 'oklch(0.234 0.025 264)',
    sidebarForeground: 'oklch(0.966 0.005 264)',
    sidebarPrimary: 'oklch(0.553 0.152 152)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.553 0.152 152)',
    sidebarAccentForeground: 'oklch(1 0 0)',
    sidebarBorder: 'oklch(0.332 0.022 264)',
    sidebarRing: 'oklch(0.553 0.152 152)',

    // Brand colors
    brandAccent: 'oklch(0.654 0.183 149)',
    brandHighlight: 'oklch(0.654 0.183 149)',
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

export default defaultTheme;
