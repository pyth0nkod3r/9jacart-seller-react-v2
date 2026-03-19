/**
 * Theme Types - Comprehensive TypeScript interfaces for theming system
 */

// Color configuration using oklch color space
export interface ColorConfig {
  /** Main background color */
  background: string;
  /** Main foreground/text color */
  foreground: string;
  /** Card background color */
  card: string;
  /** Card foreground/text color */
  cardForeground: string;
  /** Popover background color */
  popover: string;
  /** Popover foreground/text color */
  popoverForeground: string;
  /** Primary brand color */
  primary: string;
  /** Primary foreground color (text on primary) */
  primaryForeground: string;
  /** Secondary color */
  secondary: string;
  /** Secondary foreground color */
  secondaryForeground: string;
  /** Muted/subtle background color */
  muted: string;
  /** Muted foreground color */
  mutedForeground: string;
  /** Accent color for highlights */
  accent: string;
  /** Accent foreground color */
  accentForeground: string;
  /** Destructive/error color */
  destructive: string;
  /** Border color */
  border: string;
  /** Input field background color */
  input: string;
  /** Focus ring color */
  ring: string;
  /** Chart colors */
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  /** Sidebar colors */
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  /** Custom brand colors */
  brandAccent: string;
  brandHighlight: string;
  brandSuccess: string;
  brandWarning: string;
  brandInfo: string;
}

// Border radius configuration
export interface RadiusConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  base: string;
}

// Typography configuration
export interface TypographyConfig {
  fontFamily: {
    sans: string;
    serif: string;
    mono: string;
    display: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
}

// Navigation item interface
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
}

// Social link interface
export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// Contact information interface
export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  supportHours?: string;
}

// Statistics item interface
export interface StatsItem {
  value: string;
  label: string;
  description?: string;
}

// Brand configuration
export interface BrandConfig {
  /** Brand name */
  name: string;
  /** Brand tagline */
  tagline: string;
  /** Brand description */
  description: string;
  /** Logo paths */
  logo: {
    light: string;
    dark: string;
    icon: string;
  };
  /** Favicon path */
  favicon: string;
  /** Copyright text */
  copyright: string;
}

// Feature flags configuration
export interface FeaturesConfig {
  enableAnalytics: boolean;
  enableStorefront: boolean;
  enableNotifications: boolean;
  enableProducts: boolean;
  enableOrders: boolean;
  enableContactSupport: boolean;
  enableSettings: boolean;
  enableDarkMode: boolean;
  enableMultiLanguage: boolean;
  enableMultiCurrency: boolean;
  enableRealTimeUpdates: boolean;
  enableFileUpload: boolean;
  enableImageOptimization: boolean;
  enableSeoOptimization: boolean;
}

// Navigation configuration
export interface NavigationConfig {
  /** Main navigation items for public pages */
  mainNav: NavigationItem[];
  /** Dashboard sidebar navigation items */
  dashboardNav: NavigationItem[];
  /** Footer navigation items */
  footerNav: NavigationItem[];
  /** Legal links */
  legalLinks: NavigationItem[];
}

// Complete theme configuration
export interface ThemeConfig {
  /** Theme identifier */
  id: string;
  /** Theme display name */
  name: string;
  /** Theme description */
  description: string;
  /** Theme author */
  author?: string;
  /** Theme version */
  version?: string;
  /** Whether this is a dark theme */
  isDark: boolean;
  /** Color configuration */
  colors: ColorConfig;
  /** Border radius configuration */
  radius: RadiusConfig;
  /** Typography configuration */
  typography: TypographyConfig;
  /** Brand configuration */
  brand: BrandConfig;
  /** Feature flags */
  features: FeaturesConfig;
  /** Navigation configuration */
  navigation: NavigationConfig;
  /** Contact information */
  contact: ContactInfo;
  /** Social links */
  socialLinks: SocialLink[];
  /** Statistics for display */
  stats: StatsItem[];
}

// Theme context value interface
export interface ThemeContextValue {
  /** Current theme configuration */
  theme: ThemeConfig;
  /** Current theme ID */
  themeId: string;
  /** Available themes list */
  availableThemes: { id: string; name: string; isDark: boolean }[];
  /** Set theme by ID */
  setTheme: (themeId: string) => void;
  /** Get theme value from path */
  getThemeValue: <T>(path: string, defaultValue?: T) => T | undefined;
  /** Get brand configuration */
  brand: BrandConfig;
  /** Get feature flags */
  features: FeaturesConfig;
  /** Get navigation items */
  navigation: NavigationConfig;
  /** Get colors */
  colors: ColorConfig;
  /** Check if current theme is dark */
  isDark: boolean;
  /** Get statistics */
  stats: StatsItem[];
  /** Get social links */
  socialLinks: SocialLink[];
  /** Get contact information */
  contact: ContactInfo;
}

// Theme registry type
export type ThemeRegistry = Record<string, ThemeConfig>;

// CSS variable mapping type
export type CSSVariableMap = Record<string, string>;
