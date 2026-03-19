# SellerHub - E-commerce Seller Platform

A comprehensive seller dashboard for e-commerce platforms built with React, TypeScript, and Tailwind CSS.

## Features

### Authentication
- **Login Page**: Secure seller authentication
- **Multi-step Registration**:
  - Email & Password setup
  - Personal information collection
  - Business information and verification
  - Document upload for business verification
  - Success/confirmation screens

### Dashboard & Analytics
- **Dashboard Overview**: Key metrics, recent orders, top products
- **Analytics Page**: Revenue trends, customer demographics, traffic sources
- **Real-time Statistics**: Sales, orders, conversion rates

### Product Management
- **Products Page**: View, search, and filter products
- **Add Product Page**: Comprehensive product creation with:
  - Basic information and descriptions
  - Pricing and inventory management
  - Image uploads
  - SEO optimization
  - Shipping details

### Order Management
- **Orders Page**: Complete order tracking and management
- **Status Updates**: Pending, processing, shipped, delivered
- **Customer Information**: Contact details and shipping addresses
- **Order Details**: Item breakdown and totals

### Storefront Management
- **Storefront Customization**: Store branding and theme selection
- **Store Preview**: Live preview of customer-facing store
- **Performance Metrics**: Store views, conversion rates, ratings

### Settings & Configuration
- **Account Settings**: Personal and business information
- **Notification Preferences**: Email, SMS, and order notifications
- **Payment Settings**: Payout methods and schedules
- **Security Settings**: Password changes, 2FA, session management

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
src/
├── components/
│   └── layout/
│       ├── DashboardLayout.tsx    # Main dashboard wrapper
│       ├── Header.tsx             # Top navigation bar
│       └── Sidebar.tsx            # Side navigation menu
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx          # Login form
│   │   └── register/              # Multi-step registration
│   │       ├── RegisterPage.tsx           # Main registration container
│   │       ├── RegisterEmailPassword.tsx  # Step 1: Credentials
│   │       ├── RegisterBasicInfo.tsx      # Step 2: Personal info
│   │       ├── RegisterBusinessInfo.tsx   # Step 3: Business details
│   │       ├── RegisterVerification.tsx   # Step 4: Document upload
│   │       └── RegisterSuccess.tsx        # Step 5: Confirmation
│   ├── dashboard/
│   │   └── DashboardPage.tsx      # Main dashboard overview
│   ├── products/
│   │   ├── ProductsPage.tsx       # Product listing and management
│   │   └── AddProductPage.tsx     # Product creation form
│   ├── orders/
│   │   └── OrdersPage.tsx         # Order management
│   ├── storefront/
│   │   └── StorefrontPage.tsx     # Store customization
│   ├── analytics/
│   │   └── AnalyticsPage.tsx      # Performance analytics
│   ├── settings/
│   │   └── SettingsPage.tsx       # Account and business settings
│   └── HomePage.tsx               # Landing page
├── lib/
│   └── utils.ts                   # Utility functions
├── App.tsx                        # Main app component with routing
├── main.tsx                       # App entry point
└── index.css                      # Global styles and theme
```

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

## Key Routes

- `/` - Landing page
- `/login` - Seller login
- `/register` - Multi-step registration
- `/dashboard` - Main dashboard
- `/products` - Product management
- `/products/new` - Add new product
- `/orders` - Order management
- `/storefront` - Store customization
- `/analytics` - Performance analytics
- `/settings` - Account settings

## Design System

The application uses a comprehensive design system built on Tailwind CSS with:
- **Color Palette**: Primary green theme with dark mode support
- **Typography**: Consistent font sizes and weights
- **Components**: Reusable UI components with proper spacing
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG compliant color contrasts and focus states

## License

This project is licensed under the MIT License.
