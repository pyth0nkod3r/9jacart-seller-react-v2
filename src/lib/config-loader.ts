/**
 * External Configuration Loader
 *
 * Loads configuration from template.config.json at runtime.
 * This allows customization without modifying source code.
 */

import type {
  ThemeConfig,
  BrandConfig,
  FeaturesConfig,
  NavigationConfig,
  ColorConfig,
  StatsItem,
  SocialLink,
  ContactInfo
} from '@/types/theme.types';

// External config JSON structure
export interface ExternalConfig {
  version: string;
  brand: BrandConfig;
  theme: {
    default: string;
    available?: string[];
    colors: Record<string, ThemeColorConfig>;
  };
  features: FeaturesConfig;
  navigation: NavigationConfig;
  stats: StatsItem[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
  seo?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    twitterHandle: string;
    siteUrl: string;
  };
  texts?: {
    hero?: {
      badge?: string;
      cta?: string;
      secondaryCta?: string;
    };
    footer?: {
      description?: string;
    };
  };
}

export interface ThemeColorConfig {
  name: string;
  isDark?: boolean;
  primary: string;
  primaryHover?: string;
  primaryLight?: string;
  primaryForeground?: string;
  secondary?: string;
  accent: string;
  background: string;
  surface?: string;
  foreground?: string;
  textSecondary?: string;
  textMuted?: string;
  muted?: string;
  border?: string;
  success?: string;
  warning?: string;
  danger?: string;
  info?: string;
  cardShadow?: string;
  sidebar?: {
    background: string;
    foreground: string;
    accent: string;
  };
}

// Singleton for loaded config
let loadedConfig: ExternalConfig | null = null;
let configLoadPromise: Promise<ExternalConfig> | null = null;

/**
 * Convert hex color to oklch color space
 */
export function hexToOklch(hex: string): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  // Convert to linear RGB
  const lr = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  const lg = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  const lb = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert to XYZ
  const x = (lr * 0.4124564 + lg * 0.3575761 + lb * 0.1804375) / 0.95047;
  const y = (lr * 0.2126729 + lg * 0.7151522 + lb * 0.0721750);
  const z = (lr * 0.0193339 + lg * 0.1191920 + lb * 0.9503041) / 1.08883;

  // Convert to Lab
  function f(t: number): number {
    return t > 0.008856 ? Math.pow(t, 1/3) : (903.3 * t + 16) / 116;
  }

  const L = 116 * f(y) - 16;
  const a = 500 * (f(x) - f(y));
  const bLab = 200 * (f(y) - f(z));

  // Convert Lab to oklch (approximate)
  const C = Math.sqrt(a * a + bLab * bLab) / 250;
  let H = Math.atan2(bLab, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return `oklch(${(L / 100).toFixed(3)} ${C.toFixed(3)} ${H.toFixed(0)})`;
}

/**
 * Generate a complete ColorConfig from theme colors
 * Maps Bootstrap-style color tokens to the React/ShadCN color system
 */
function generateColorConfig(colors: ThemeColorConfig): ColorConfig {
  const isDark = colors.isDark || false;

  // Resolve colors with Bootstrap-matching defaults
  const foreground = colors.foreground || (isDark ? '#f1f5f9' : '#1e293b');
  const surface = colors.surface || (isDark ? '#1e293b' : '#f8fafc');
  const textSecondary = colors.textSecondary || (isDark ? '#94a3b8' : '#64748b');
  const borderColor = colors.border || (isDark ? '#334155' : '#e2e8f0');
  const primaryLight = colors.primaryLight || colors.primary;
  const success = colors.success || '#22c55e';
  const warning = colors.warning || '#f59e0b';
  const danger = colors.danger || '#ef4444';
  const info = colors.info || '#3b82f6';

  return {
    // Page background and text
    background: hexToOklch(colors.background),
    foreground: hexToOklch(foreground),

    // Card uses page background (white in light mode) — matches Bootstrap .card { background-color: var(--background-color) }
    card: hexToOklch(colors.background),
    cardForeground: hexToOklch(foreground),

    // Popover same as card
    popover: hexToOklch(colors.background),
    popoverForeground: hexToOklch(foreground),

    // Primary brand color — matches Bootstrap .btn-primary { background-color: var(--primary-color) }
    primary: hexToOklch(colors.primary),
    primaryForeground: hexToOklch(colors.primaryForeground || '#ffffff'),

    // Secondary/surface — matches Bootstrap var(--surface-color) used for card headers, table headers, hover states
    secondary: hexToOklch(surface),
    secondaryForeground: hexToOklch(foreground),

    // Muted — matches Bootstrap var(--surface-color) for subtle backgrounds
    muted: hexToOklch(surface),
    mutedForeground: hexToOklch(textSecondary),

    // Accent — hover/focus background, matches Bootstrap surface for interactive hover states
    accent: hexToOklch(surface),
    accentForeground: hexToOklch(foreground),

    // Destructive — matches Bootstrap var(--danger-color)
    destructive: hexToOklch(danger),

    // Border — matches Bootstrap var(--border-color)
    border: hexToOklch(borderColor),

    // Input background — matches Bootstrap .form-control { background-color: var(--background-color) }
    input: hexToOklch(colors.background),

    // Focus ring — uses primary color
    ring: hexToOklch(colors.primary),

    // Chart colors
    chart1: hexToOklch(colors.primary),
    chart2: hexToOklch(primaryLight),
    chart3: hexToOklch(success),
    chart4: hexToOklch(info),
    chart5: hexToOklch(warning),

    // Sidebar — matches Bootstrap .sidebar { background-color: var(--sidebar-bg); color: var(--sidebar-text) }
    sidebar: hexToOklch(colors.sidebar?.background || (isDark ? '#020617' : '#1e293b')),
    sidebarForeground: hexToOklch(colors.sidebar?.foreground || '#f1f5f9'),

    // Sidebar active item — matches Bootstrap .sidebar .nav-link.active { background-color: var(--primary-color); color: white }
    sidebarPrimary: hexToOklch(colors.primary),
    sidebarPrimaryForeground: hexToOklch('#ffffff'),

    // Sidebar hover — matches Bootstrap .sidebar .nav-link:hover { background-color: rgba(255,255,255,0.1) }
    sidebarAccent: hexToOklch(colors.sidebar?.accent || colors.primary),
    sidebarAccentForeground: hexToOklch('#ffffff'),

    // Sidebar border — dark border for dark sidebar
    sidebarBorder: hexToOklch(isDark ? '#334155' : '#334155'),
    sidebarRing: hexToOklch(colors.primary),

    // Brand colors — matches Bootstrap status colors
    brandAccent: hexToOklch(primaryLight),
    brandHighlight: hexToOklch(primaryLight),
    brandSuccess: hexToOklch(success),
    brandWarning: hexToOklch(warning),
    brandInfo: hexToOklch(info),
  };
}

/**
 * Generate a ThemeConfig from external config
 */
export function generateThemeConfig(
  themeId: string,
  colors: ThemeColorConfig,
  config: ExternalConfig
): ThemeConfig {
  return {
    id: themeId,
    name: colors.name,
    description: `${colors.name} theme for ${config.brand.name}`,
    isDark: colors.isDark || false,

    colors: generateColorConfig(colors),

    radius: {
      sm: 'calc(var(--radius) - 4px)',
      md: 'calc(var(--radius) - 2px)',
      lg: 'var(--radius)',
      xl: 'calc(var(--radius) + 4px)',
      base: '0.5rem',
    },

    typography: {
      fontFamily: {
        sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        serif: 'Georgia, Cambria, "Times New Roman", serif',
        mono: 'JetBrains Mono, Menlo, Monaco, monospace',
        display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
    },

    brand: config.brand,
    features: config.features,
    navigation: config.navigation,
    contact: config.contact,
    socialLinks: config.socialLinks,
    stats: config.stats,
  };
}

/**
 * Load external configuration from template.config.json
 */
export async function loadExternalConfig(): Promise<ExternalConfig> {
  // Return cached config if available
  if (loadedConfig) {
    return loadedConfig;
  }

  // Return existing promise if loading
  if (configLoadPromise) {
    return configLoadPromise;
  }

  configLoadPromise = (async () => {
    try {
      // Fetch the config file from public directory
      const response = await fetch('/template.config.json');

      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.status}`);
      }

      const config: ExternalConfig = await response.json();
      loadedConfig = config;

      console.log('[ConfigLoader] External config loaded successfully:', config.brand.name);

      return config;
    } catch (error) {
      console.error('[ConfigLoader] Failed to load external config, using fallback:', error);

      // Return a minimal fallback config
      return getFallbackConfig();
    }
  })();

  return configLoadPromise;
}

/**
 * Get fallback configuration if external config fails to load
 */
function getFallbackConfig(): ExternalConfig {
  return {
    version: '1.0.0',
    brand: {
      name: 'SellerHub',
      tagline: 'Grow Your Business',
      description: 'The complete e-commerce seller platform.',
      logo: { light: '/logo.svg', dark: '/logo.svg', icon: '/vite.svg' },
      favicon: '/logo.svg',
      copyright: 'All rights reserved.',
    },
    theme: {
      default: 'default',
      colors: {
        default: {
          name: 'Default Green',
          primary: '#16a34a',
          primaryHover: '#15803d',
          primaryLight: '#22c55e',
          accent: '#f59e0b',
          background: '#ffffff',
          surface: '#f8fafc',
          foreground: '#1e293b',
          textSecondary: '#64748b',
          border: '#e2e8f0',
          success: '#22c55e',
          danger: '#ef4444',
          sidebar: { background: '#1e293b', foreground: '#f1f5f9', accent: '#16a34a' },
        },
        dark: {
          name: 'Dark Mode',
          isDark: true,
          primary: '#22c55e',
          primaryHover: '#16a34a',
          primaryLight: '#4ade80',
          accent: '#f59e0b',
          background: '#0f172a',
          surface: '#1e293b',
          foreground: '#f1f5f9',
          textSecondary: '#94a3b8',
          border: '#334155',
          success: '#22c55e',
          danger: '#ef4444',
          sidebar: { background: '#020617', foreground: '#f1f5f9', accent: '#22c55e' },
        },
      },
    },
    features: {
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
    },
    navigation: {
      mainNav: [{ name: 'Home', href: '/' }],
      dashboardNav: [{ name: 'Dashboard', href: '/dashboard', icon: '📊' }],
      footerNav: [{ name: 'Home', href: '/' }],
      legalLinks: [{ name: 'Privacy', href: '/privacy-policy' }],
    },
    stats: [
      { value: '10K+', label: 'Sellers' },
      { value: '500K+', label: 'Products' },
      { value: '99.9%', label: 'Uptime' },
    ],
    contact: { email: 'support@example.com' },
    socialLinks: [],
  };
}

/**
 * Generate all themes from external config
 */
export function generateThemesFromConfig(config: ExternalConfig): Record<string, ThemeConfig> {
  const themes: Record<string, ThemeConfig> = {};

  for (const [themeId, colors] of Object.entries(config.theme.colors)) {
    themes[themeId] = generateThemeConfig(themeId, colors, config);
  }

  return themes;
}

/**
 * Get the external config synchronously (must be loaded first)
 */
export function getConfig(): ExternalConfig | null {
  return loadedConfig;
}

/**
 * Reset the loaded config (useful for testing)
 */
export function resetConfig(): void {
  loadedConfig = null;
  configLoadPromise = null;
}
