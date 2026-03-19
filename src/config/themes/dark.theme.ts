/**
 * Dark Theme - SellerHub Dark Mode
 *
 * Aligned with Bootstrap version: themes.config.json "dark" theme
 * Colors: primary=#22c55e, background=#0f172a, surface=#1e293b, sidebar=#020617
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

const darkTheme: ThemeConfig = {
  id: 'dark',
  name: 'Dark Mode',
  description: 'Dark theme for reduced eye strain',
  author: 'SellerHub Team',
  version: '1.0.0',
  isDark: true,

  colors: {
    // Background & text — #0f172a (slate-900) / #f1f5f9 (slate-100)
    background: 'oklch(0.15 0.03 265)',
    foreground: 'oklch(0.966 0.005 264)',
    card: 'oklch(0.234 0.025 264)',
    cardForeground: 'oklch(0.966 0.005 264)',
    popover: 'oklch(0.234 0.025 264)',
    popoverForeground: 'oklch(0.966 0.005 264)',

    // Primary — #22c55e (green-500, lighter for dark mode)
    primary: 'oklch(0.654 0.183 149)',
    primaryForeground: 'oklch(1 0 0)',

    // Secondary — #1e293b (slate-800 surface)
    secondary: 'oklch(0.234 0.025 264)',
    secondaryForeground: 'oklch(0.966 0.005 264)',

    // Muted — #1e293b / #94a3b8 (slate-400)
    muted: 'oklch(0.234 0.025 264)',
    mutedForeground: 'oklch(0.698 0.019 256)',

    // Accent — surface color for hover states
    accent: 'oklch(0.234 0.025 264)',
    accentForeground: 'oklch(0.966 0.005 264)',

    // Destructive — #ef4444
    destructive: 'oklch(0.577 0.245 27)',

    // Border — #334155 (slate-700)
    border: 'oklch(0.332 0.022 264)',
    input: 'oklch(0.234 0.025 264)',
    ring: 'oklch(0.654 0.183 149)',

    // Charts
    chart1: 'oklch(0.654 0.183 149)',
    chart2: 'oklch(0.765 0.177 149)',
    chart3: 'oklch(0.654 0.183 149)',
    chart4: 'oklch(0.588 0.189 260)',
    chart5: 'oklch(0.745 0.161 75)',

    // Sidebar — very dark: #020617 / #f1f5f9
    sidebar: 'oklch(0.06 0.025 270)',
    sidebarForeground: 'oklch(0.966 0.005 264)',
    sidebarPrimary: 'oklch(0.654 0.183 149)',
    sidebarPrimaryForeground: 'oklch(1 0 0)',
    sidebarAccent: 'oklch(0.654 0.183 149)',
    sidebarAccentForeground: 'oklch(1 0 0)',
    sidebarBorder: 'oklch(0.332 0.022 264)',
    sidebarRing: 'oklch(0.654 0.183 149)',

    // Brand colors
    brandAccent: 'oklch(0.654 0.183 149)',
    brandHighlight: 'oklch(0.765 0.177 149)',
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

export default darkTheme;
