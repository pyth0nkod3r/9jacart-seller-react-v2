# Configuration Guide

This guide explains how to customize the SellerHub template **entirely through configuration files**, without touching any source code.

## Quick Start

1. Open `template.config.json` (at project root or in `public/` folder)
2. Modify the values you want to change
3. Refresh your browser - changes apply immediately!

## Configuration File Structure

The `template.config.json` file contains all customizable options:

### Brand Configuration

```json
{
  "brand": {
    "name": "YourBrand",
    "tagline": "Your Tagline Here",
    "description": "Your platform description...",
    "logo": {
      "light": "/your-logo-light.svg",
      "dark": "/your-logo-dark.svg",
      "icon": "/your-icon.svg"
    },
    "copyright": "YourBrand. All rights reserved."
  }
}
```

### Theme Configuration

Define your color themes:

```json
{
  "theme": {
    "default": "default",
    "colors": {
      "default": {
        "name": "My Brand Theme",
        "isDark": false,
        "primary": "#1a5c3a",
        "accent": "#8DEB6E",
        "background": "#ffffff",
        "sidebar": {
          "background": "#182F38",
          "foreground": "#ffffff",
          "accent": "#8DEB6E"
        }
      },
      "dark": {
        "name": "Dark Mode",
        "isDark": true,
        "primary": "#8DEB6E",
        "accent": "#8DEB6E",
        "background": "#0f1a1f",
        "sidebar": {
          "background": "#0a1210",
          "foreground": "#f0f9f5",
          "accent": "#8DEB6E"
        }
      }
    }
  }
}
```

### Feature Flags

Enable or disable features:

```json
{
  "features": {
    "enableAnalytics": true,
    "enableStorefront": true,
    "enableNotifications": true,
    "enableProducts": true,
    "enableOrders": true,
    "enableDarkMode": true,
    "enableContactSupport": true,
    "enableSettings": true
  }
}
```

### Navigation

Customize all navigation menus:

```json
{
  "navigation": {
    "mainNav": [
      { "name": "Home", "href": "/" },
      { "name": "Products", "href": "/products" },
      { "name": "About", "href": "/about" }
    ],
    "dashboardNav": [
      { "name": "Dashboard", "href": "/dashboard", "icon": "📊" },
      { "name": "Products", "href": "/products", "icon": "📦" }
    ],
    "footerNav": [...],
    "legalLinks": [...]
  }
}
```

### Statistics

Customize the stats displayed on the homepage:

```json
{
  "stats": [
    { "value": "50K+", "label": "Active Users" },
    { "value": "1M+", "label": "Products" },
    { "value": "99.9%", "label": "Uptime" }
  ]
}
```

### Contact & Social

```json
{
  "contact": {
    "email": "support@yourbrand.com",
    "phone": "+1 234 567 890",
    "address": "Your City, Country"
  },
  "socialLinks": [
    { "name": "Twitter", "href": "https://twitter.com/yourbrand", "icon": "twitter" },
    { "name": "Facebook", "href": "https://facebook.com/yourbrand", "icon": "facebook" }
  ]
}
```

## Creating a Custom Theme

### Step 1: Add Theme Colors

Add a new theme entry in `theme.colors`:

```json
{
  "theme": {
    "colors": {
      "purple": {
        "name": "Purple Haze",
        "isDark": false,
        "primary": "#6b21a8",
        "primaryForeground": "#ffffff",
        "accent": "#a855f7",
        "background": "#faf5ff",
        "foreground": "#1e1b2e",
        "secondary": "#f3e8ff",
        "muted": "#ede9fe",
        "border": "#e9d5ff",
        "sidebar": {
          "background": "#2e1065",
          "foreground": "#faf5ff",
          "accent": "#a855f7"
        }
      }
    }
  }
}
```

### Step 2: Make Theme Available

Add the theme ID to the available list:

```json
{
  "theme": {
    "available": ["default", "dark", "ocean", "purple"]
  }
}
```

### Step 3: Set as Default (Optional)

```json
{
  "theme": {
    "default": "purple"
  }
}
```

## Color Reference

### Color Properties

| Property | Description |
|----------|-------------|
| `primary` | Main brand color |
| `primaryForeground` | Text color on primary background |
| `accent` | Accent/highlight color for buttons, links |
| `background` | Main page background |
| `foreground` | Main text color |
| `secondary` | Secondary background color |
| `muted` | Subtle background for cards, panels |
| `border` | Border color |
| `sidebar.background` | Sidebar background |
| `sidebar.foreground` | Sidebar text color |
| `sidebar.accent` | Sidebar accent (active items) |

### Supported Formats

All colors should be in hex format: `#RRGGBB`

Examples:
- `#1a5c3a` - Dark green
- `#8DEB6E` - Light green
- `#1e4d7a` - Ocean blue

## Complete Example

Here's a complete `template.config.json` for a custom brand:

```json
{
  "version": "1.0.0",
  
  "brand": {
    "name": "TechMart",
    "tagline": "Sell Smarter, Grow Faster",
    "description": "The ultimate platform for tech sellers to reach millions of customers.",
    "logo": {
      "light": "/techmart-logo.svg",
      "dark": "/techmart-logo-dark.svg",
      "icon": "/techmart-icon.svg"
    },
    "favicon": "/techmart-favicon.ico",
    "copyright": "TechMart Inc. All rights reserved."
  },

  "theme": {
    "default": "default",
    "available": ["default", "dark"],
    
    "colors": {
      "default": {
        "name": "TechMart Blue",
        "isDark": false,
        "primary": "#0066cc",
        "primaryForeground": "#ffffff",
        "accent": "#00a3ff",
        "background": "#ffffff",
        "foreground": "#1a1a2e",
        "secondary": "#f0f7ff",
        "muted": "#e8f4ff",
        "border": "#cce4ff",
        "sidebar": {
          "background": "#0a1628",
          "foreground": "#ffffff",
          "accent": "#00a3ff"
        }
      },
      "dark": {
        "name": "TechMart Dark",
        "isDark": true,
        "primary": "#00a3ff",
        "primaryForeground": "#0a1628",
        "accent": "#00a3ff",
        "background": "#0a1628",
        "foreground": "#f0f7ff",
        "secondary": "#1a2a3e",
        "muted": "#152238",
        "border": "#2a4060",
        "sidebar": {
          "background": "#060d18",
          "foreground": "#f0f7ff",
          "accent": "#00a3ff"
        }
      }
    }
  },

  "features": {
    "enableAnalytics": true,
    "enableStorefront": true,
    "enableNotifications": true,
    "enableProducts": true,
    "enableOrders": true,
    "enableContactSupport": true,
    "enableSettings": true,
    "enableDarkMode": true
  },

  "navigation": {
    "mainNav": [
      { "name": "Home", "href": "/" },
      { "name": "Sell on TechMart", "href": "/sell" },
      { "name": "Pricing", "href": "/pricing" },
      { "name": "Contact", "href": "/contact" }
    ],
    "dashboardNav": [
      { "name": "Dashboard", "href": "/dashboard", "icon": "📊" },
      { "name": "Products", "href": "/products", "icon": "📦" },
      { "name": "Orders", "href": "/orders", "icon": "🛒" },
      { "name": "Analytics", "href": "/analytics", "icon": "📈" },
      { "name": "Settings", "href": "/settings", "icon": "⚙️" }
    ],
    "footerNav": [
      { "name": "Home", "href": "/" },
      { "name": "About", "href": "/about" },
      { "name": "Contact", "href": "/contact" }
    ],
    "legalLinks": [
      { "name": "Privacy Policy", "href": "/privacy-policy" },
      { "name": "Terms of Service", "href": "/terms-of-service" }
    ]
  },

  "stats": [
    { "value": "100K+", "label": "Tech Sellers" },
    { "value": "5M+", "label": "Products Listed" },
    { "value": "50+", "label": "Countries" }
  ],

  "contact": {
    "email": "hello@techmart.com",
    "phone": "+1 (555) 123-4567",
    "address": "San Francisco, CA",
    "supportHours": "24/7 Support Available"
  },

  "socialLinks": [
    { "name": "Twitter", "href": "https://twitter.com/techmart", "icon": "twitter" },
    { "name": "LinkedIn", "href": "https://linkedin.com/company/techmart", "icon": "linkedin" }
  ]
}
```

## Tips

1. **JSON Validation**: Use a JSON validator to ensure your config is valid
2. **IDE Support**: The `config.schema.json` file provides autocomplete in most IDEs
3. **Backups**: Keep a backup of your config file before making changes
4. **Hot Reload**: The dev server will pick up changes to `public/template.config.json` automatically

## Troubleshooting

### Config not loading?
- Check that `template.config.json` is in the `public/` folder
- Validate your JSON syntax
- Check browser console for errors

### Colors not applying?
- Ensure all required color properties are present
- Use valid hex color format (#RRGGBB)
- Clear browser cache and refresh

### Theme not switching?
- Verify the theme ID exists in `theme.colors`
- Check that the theme ID is in `theme.available`
- Clear localStorage and refresh
