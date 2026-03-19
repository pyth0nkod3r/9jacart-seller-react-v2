# Theming System Documentation

This document explains how to customize the SellerHub template using the comprehensive theming system.

## Overview

The SellerHub template features a fully customizable theming system with:
- **3 Predefined Themes**: Default (Green), Dark, and Ocean (Blue)
- **Single-line Theme Switching**: Change themes programmatically with one function call
- **Central Configuration**: All branding, colors, and features configurable from one place
- **CSS Variable-Based**: Runtime theme changes without page reload
- **Local Storage Persistence**: Theme preference is saved automatically

## Quick Start

### Switching Themes

```tsx
import { useTheme } from '@/providers/ThemeProvider';

function MyComponent() {
  const { setTheme, themeId } = useTheme();

  return (
    <div>
      <p>Current theme: {themeId}</p>
      <button onClick={() => setTheme('default')}>Green Theme</button>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
      <button onClick={() => setTheme('ocean')}>Ocean Theme</button>
    </div>
  );
}
```

### Using Theme Values

```tsx
import { useTheme, useBrand, useFeatures, useColors } from '@/providers/ThemeProvider';

function MyComponent() {
  const { brand, features, colors } = useTheme();
  // Or use convenience hooks:
  const brand = useBrand();
  const features = useFeatures();
  const colors = useColors();

  return (
    <div>
      <h1>{brand.name}</h1>
      <p>{brand.description}</p>
      {features.enableAnalytics && <AnalyticsWidget />}
      <div style={{ backgroundColor: colors.brandAccent }}>Accent Color</div>
    </div>
  );
}
```

## Configuration File

All configurable options are in `src/config/template.config.ts`:

### Brand Configuration

```typescript
export const brandConfig: BrandConfig = {
  name: 'SellerHub',                    // Brand name displayed throughout the app
  tagline: 'Grow Your Business with SellerHub',
  description: 'The complete e-commerce platform...',
  logo: {
    light: '/logo.svg',              // Light mode logo
    dark: '/logo.svg',               // Dark mode logo
    icon: '/9Jacart Icon SVG.svg',   // Favicon/icon
  },
  favicon: '/vite.svg',
  copyright: 'SellerHub. All rights reserved.',
};
```

### Feature Flags

```typescript
export const featuresConfig: FeaturesConfig = {
  enableAnalytics: true,             // Show/hide analytics section
  enableStorefront: true,            // Enable storefront customization
  enableNotifications: true,         // Enable notification features
  enableProducts: true,              // Enable product management
  enableOrders: true,                // Enable order management
  enableContactSupport: true,        // Show contact support option
  enableSettings: true,              // Enable settings page
  enableDarkMode: true,              // Enable theme switching
  enableMultiLanguage: false,        // Future: multi-language support
  enableMultiCurrency: false,        // Future: multi-currency support
  enableRealTimeUpdates: true,       // Enable real-time features
  enableFileUpload: true,            // Enable file upload features
  enableImageOptimization: true,     // Enable image optimization
  enableSeoOptimization: true,       // Enable SEO features
};
```

### Navigation Configuration

```typescript
export const navigationConfig: NavigationConfig = {
  mainNav: [
    { name: 'Home', href: '/' },
    { name: 'Sell on SellerHub', href: '/sell' },
    // Add more navigation items...
  ],
  dashboardNav: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Products', href: '/products', icon: '📦' },
    // Add more dashboard items...
  ],
  footerNav: [...],
  legalLinks: [...],
};
```

### Statistics Configuration

```typescript
export const statsConfig: StatsItem[] = [
  { value: '10K+', label: 'Active Sellers', description: '...' },
  { value: '500K+', label: 'Products Listed', description: '...' },
  { value: '99.9%', label: 'Uptime', description: '...' },
];
```

## Creating a Custom Theme

### 1. Create Theme File

Create a new file in `src/config/themes/mytheme.theme.ts`:

```typescript
import type { ThemeConfig } from '@/types/theme.types';
import { featuresConfig, navigationConfig, ... } from '../template.config';

const myTheme: ThemeConfig = {
  id: 'mytheme',
  name: 'My Custom Theme',
  description: 'A custom theme with my brand colors',
  isDark: false,

  colors: {
    // Use oklch color space for consistent colors
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.15 0.05 280)',     // Purple hue
    primary: 'oklch(0.35 0.1 280)',         // Deep purple
    primaryForeground: 'oklch(1 0 0)',
    // ... all other colors
    brandAccent: 'oklch(0.7 0.15 280)',     // Purple accent
    brandHighlight: 'oklch(0.8 0.1 280)',
    // ...
  },

  radius: {
    base: '0.625rem',
    // ...
  },

  // Import or customize other configs
  brand: {
    name: 'MyBrand',
    tagline: 'My Custom Tagline',
    // ...
  },

  features: featuresConfig,
  navigation: navigationConfig,
  // ...
};

export default myTheme;
```

### 2. Register the Theme

Update `src/providers/ThemeProvider.tsx`:

```typescript
import myTheme from '@/config/themes/mytheme.theme';

const themeRegistry: ThemeRegistry = {
  default: defaultTheme,
  dark: darkTheme,
  ocean: oceanTheme,
  mytheme: myTheme,  // Add your theme
};
```

### 3. Use Your Theme

```tsx
// In your component
const { setTheme } = useTheme();
setTheme('mytheme');

// Or in App.tsx
<ThemeProvider defaultTheme="mytheme">
  <App />
</ThemeProvider>
```

## Color System

### OKLCH Color Space

All colors use the OKLCH color space for better color manipulation:

```typescript
// Format: oklch(lightness chroma hue)
// lightness: 0-1 (black to white)
// chroma: 0-0.4 (gray to saturated)
// hue: 0-360 (color wheel)

// Examples:
'oklch(0.35 0.1 142)'  // Deep green
'oklch(0.75 0.18 142)' // Bright green
'oklch(0.35 0.1 240)'  // Deep blue
'oklch(0.6 0.2 25)'    // Coral red
```

### CSS Variables

All theme colors are available as CSS variables:

```css
/* Base colors */
--background, --foreground
--card, --card-foreground
--popover, --popover-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive
--border, --input, --ring

/* Sidebar colors */
--sidebar, --sidebar-foreground
--sidebar-primary, --sidebar-primary-foreground
--sidebar-accent, --sidebar-accent-foreground
--sidebar-border, --sidebar-ring

/* Brand colors */
--brand-accent
--brand-highlight
--brand-success
--brand-warning
--brand-info
```

### Using Colors in Components

```tsx
// Using Tailwind classes (recommended)
<div className="bg-background text-foreground border-border">
<div className="bg-primary text-primary-foreground">
<div className="bg-brand-accent">

// Using CSS variables directly
<div style={{ backgroundColor: 'var(--brand-accent)' }}>
```

## Available Hooks

| Hook | Return Type | Description |
|------|-------------|-------------|
| `useTheme()` | `ThemeContextValue` | Full theme context |
| `useBrand()` | `BrandConfig` | Brand configuration |
| `useFeatures()` | `FeaturesConfig` | Feature flags |
| `useNavigation()` | `NavigationConfig` | Navigation items |
| `useColors()` | `ColorConfig` | Color palette |
| `useStats()` | `StatsItem[]` | Statistics data |
| `useSocialLinks()` | `SocialLink[]` | Social media links |
| `useContact()` | `ContactInfo` | Contact information |
| `useIsDark()` | `boolean` | Is current theme dark |
| `useThemeConfig()` | `ThemeConfig` | Full theme configuration |

## ThemeSwitcher Component

A built-in component for theme switching:

```tsx
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

// Compact (icon only)
<ThemeSwitcher compact />

// With label
<ThemeSwitcher showLabel />

// Positioned dropdown
<ThemeSwitcher position="bottom-left" />
```

## File Structure

```
src/
├── config/
│   ├── template.config.ts      # Central configuration
│   └── themes/
│       ├── default.theme.ts    # SellerHub Green theme
│       ├── dark.theme.ts       # Dark theme
│       └── ocean.theme.ts      # Ocean Blue theme
├── providers/
│   └── ThemeProvider.tsx       # Theme context provider
├── types/
│   └── theme.types.ts          # TypeScript interfaces
└── components/
    └── ui/
        └── ThemeSwitcher.tsx   # Theme switcher component
```

## Best Practices

1. **Use Theme Hooks**: Always use the provided hooks instead of importing configs directly
2. **CSS Variables**: Use CSS variables for dynamic colors instead of hardcoded values
3. **Feature Flags**: Use feature flags to conditionally render features
4. **Consistent Naming**: Follow the established naming conventions for theme properties
5. **Test Themes**: Test your custom theme across all pages and components

## Troubleshooting

### Theme not applying
- Ensure ThemeProvider wraps your app
- Check that CSS variables are defined in index.css
- Verify theme is registered in themeRegistry

### Colors not changing
- Make sure colors use the oklch format
- Check that CSS variables are being applied to :root
- Verify no hardcoded colors in components

### Theme preference not persisting
- Check localStorage for 'sellerhub-theme-preference' key
- Ensure enableSystemPreference is configured correctly
