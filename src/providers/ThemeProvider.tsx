/**
 * Theme Provider - External Config Version
 * 
 * React Context provider for theme management with:
 * - External configuration loading from template.config.json
 * - Theme switching capability
 * - CSS variable injection
 * - Local storage persistence
 * - System preference detection
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  ThemeConfig,
  ThemeContextValue,
  CSSVariableMap,
  BrandConfig,
  FeaturesConfig,
  NavigationConfig,
  ColorConfig,
  StatsItem,
  SocialLink,
  ContactInfo,
} from '@/types/theme.types';
import {
  loadExternalConfig,
  generateThemesFromConfig,
  type ExternalConfig,
} from '@/lib/config-loader';

// Storage key for theme preference
const THEME_STORAGE_KEY = 'sellerhub-theme-preference';

// Create context with undefined default
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Loading state context
const ConfigLoadingContext = createContext<boolean>(true);

/**
 * Convert ThemeConfig colors to CSS variable map
 */
function themeToCSSVariables(theme: ThemeConfig): CSSVariableMap {
  const cssVars: CSSVariableMap = {};

  const colorMap: Record<keyof ThemeConfig['colors'], string> = {
    background: '--background',
    foreground: '--foreground',
    card: '--card',
    cardForeground: '--card-foreground',
    popover: '--popover',
    popoverForeground: '--popover-foreground',
    primary: '--primary',
    primaryForeground: '--primary-foreground',
    secondary: '--secondary',
    secondaryForeground: '--secondary-foreground',
    muted: '--muted',
    mutedForeground: '--muted-foreground',
    accent: '--accent',
    accentForeground: '--accent-foreground',
    destructive: '--destructive',
    border: '--border',
    input: '--input',
    ring: '--ring',
    chart1: '--chart-1',
    chart2: '--chart-2',
    chart3: '--chart-3',
    chart4: '--chart-4',
    chart5: '--chart-5',
    sidebar: '--sidebar',
    sidebarForeground: '--sidebar-foreground',
    sidebarPrimary: '--sidebar-primary',
    sidebarPrimaryForeground: '--sidebar-primary-foreground',
    sidebarAccent: '--sidebar-accent',
    sidebarAccentForeground: '--sidebar-accent-foreground',
    sidebarBorder: '--sidebar-border',
    sidebarRing: '--sidebar-ring',
    brandAccent: '--brand-accent',
    brandHighlight: '--brand-highlight',
    brandSuccess: '--brand-success',
    brandWarning: '--brand-warning',
    brandInfo: '--brand-info',
  };

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssKey = colorMap[key as keyof ThemeConfig['colors']];
    if (cssKey) {
      cssVars[cssKey] = value;
    }
  });

  cssVars['--radius'] = theme.radius.base;
  cssVars['--brand-name'] = theme.brand.name;
  cssVars['--brand-tagline'] = theme.brand.tagline;

  return cssVars;
}

/**
 * Apply CSS variables to document root
 */
function applyCSSVariables(cssVars: CSSVariableMap): void {
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Get system preferred theme
 */
function getSystemPreferredTheme(): string {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
  }
  return 'default';
}

/**
 * Get stored theme preference
 */
function getStoredTheme(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(THEME_STORAGE_KEY);
  }
  return null;
}

/**
 * Store theme preference
 */
function storeTheme(themeId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  }
}

/**
 * Theme Provider Component
 */
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  enableSystemPreference?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme: initialTheme,
  enableSystemPreference = true,
}: ThemeProviderProps) {
  // Config and themes state
  const [, setConfig] = useState<ExternalConfig | null>(null);
  const [themes, setThemes] = useState<Record<string, ThemeConfig>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Current theme ID
  const [themeId, setThemeId] = useState<string>(() => {
    const stored = getStoredTheme();
    if (stored) return stored;
    if (enableSystemPreference) return getSystemPreferredTheme();
    return initialTheme || 'default';
  });

  // Load external config on mount
  useEffect(() => {
    loadExternalConfig()
      .then((loadedConfig) => {
        setConfig(loadedConfig);
        setThemes(generateThemesFromConfig(loadedConfig));

        // Set default theme from config if no stored preference
        if (!getStoredTheme() && !initialTheme) {
          setThemeId(loadedConfig.theme.default);
        }

        // Update page title
        document.title = `${loadedConfig.brand.name} - ${loadedConfig.brand.tagline}`;

        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load config:', err);
        setError(err);
        setIsLoading(false);
      });
  }, [initialTheme, enableSystemPreference]);

  // Get current theme
  const theme = useMemo(() => {
    return themes[themeId] || Object.values(themes)[0] || null;
  }, [themes, themeId]);

  // Available themes list
  const availableThemes = useMemo(() => {
    return Object.values(themes).map((t) => ({
      id: t.id,
      name: t.name,
      isDark: t.isDark,
    }));
  }, [themes]);

  // Set theme by ID
  const setTheme = useCallback((newThemeId: string) => {
    if (themes[newThemeId]) {
      setThemeId(newThemeId);
      storeTheme(newThemeId);
    } else {
      console.warn(
        `Theme "${newThemeId}" not found. Available themes: ${Object.keys(themes).join(', ')}`
      );
    }
  }, [themes]);

  // Get nested value from theme
  const getThemeValue = useCallback(
    <T,>(path: string, defaultValue?: T): T | undefined => {
      if (!theme) return defaultValue;

      const keys = path.split('.');
      let result: unknown = theme;

      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = (result as Record<string, unknown>)[key];
        } else {
          return defaultValue;
        }
      }

      return result as T;
    },
    [theme]
  );

  // Apply theme to DOM
  useEffect(() => {
    if (!theme) return;

    const cssVars = themeToCSSVariables(theme);
    applyCSSVariables(cssVars);

    const root = document.documentElement;
    if (theme.isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    // Toggle a `theme-{id}` class for non-default/dark themes so the static
    // CSS fallbacks in `index.css` (.theme-ocean / .theme-purple / .theme-sunset)
    // engage immediately on load and prevent a flash of the wrong palette.
    const themeClassPrefix = 'theme-';
    Array.from(root.classList)
      .filter((c) => c.startsWith(themeClassPrefix))
      .forEach((c) => root.classList.remove(c));
    if (themeId && themeId !== 'default' && themeId !== 'dark') {
      root.classList.add(`${themeClassPrefix}${themeId}`);
    }
  }, [theme, themeId]);

  // Listen for system preference changes
  useEffect(() => {
    if (!enableSystemPreference) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        setThemeId(e.matches ? 'dark' : 'default');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystemPreference]);

  // Context value
  const contextValue = useMemo<ThemeContextValue | null>(() => {
    if (!theme) return null;

    return {
      theme,
      themeId,
      availableThemes,
      setTheme,
      getThemeValue,
      brand: theme.brand,
      features: theme.features,
      navigation: theme.navigation,
      colors: theme.colors,
      isDark: theme.isDark,
      stats: theme.stats,
      socialLinks: theme.socialLinks,
      contact: theme.contact,
    };
  }, [theme, themeId, availableThemes, setTheme, getThemeValue]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !contextValue) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center text-destructive">
          <p>Failed to load configuration</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ConfigLoadingContext.Provider value={isLoading}>
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    </ConfigLoadingContext.Provider>
  );
}

/**
 * Hook to check if config is loading
 */
export function useConfigLoading(): boolean {
  return useContext(ConfigLoadingContext);
}

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

/**
 * Hook to get current theme configuration
 */
export function useThemeConfig(): ThemeConfig {
  const { theme } = useTheme();
  return theme;
}

/**
 * Hook to get brand configuration
 */
export function useBrand(): BrandConfig {
  const { brand } = useTheme();
  return brand;
}

/**
 * Hook to get feature flags
 */
export function useFeatures(): FeaturesConfig {
  const { features } = useTheme();
  return features;
}

/**
 * Hook to get navigation items
 */
export function useNavigation(): NavigationConfig {
  const { navigation } = useTheme();
  return navigation;
}

/**
 * Hook to get color palette
 */
export function useColors(): ColorConfig {
  const { colors } = useTheme();
  return colors;
}

/**
 * Hook to check if current theme is dark
 */
export function useIsDark(): boolean {
  const { isDark } = useTheme();
  return isDark;
}

/**
 * Hook to get statistics
 */
export function useStats(): StatsItem[] {
  const { stats } = useTheme();
  return stats;
}

/**
 * Hook to get social links
 */
export function useSocialLinks(): SocialLink[] {
  const { socialLinks } = useTheme();
  return socialLinks;
}

/**
 * Hook to get contact information
 */
export function useContact(): ContactInfo {
  const { contact } = useTheme();
  return contact;
}

export default ThemeProvider;
