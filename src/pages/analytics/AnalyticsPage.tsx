/**
 * Analytics Page
 *
 * Backported from bootstrap version (`bootstrap_version/.../analytics.html`)
 * which had a richer layout than the previous React stub.
 */

import { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  ShoppingCart,
  Receipt,
  TrendingUp,
  Download,
} from 'lucide-react';

interface RevenueStat {
  label: string;
  value: string;
  growth: number;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

interface CategoryShare {
  name: string;
  share: number;
  barClass: string;
}

interface TopProduct {
  name: string;
  image: string;
  sales: number;
  revenue: string;
}

interface CityShare {
  name: string;
  share: number;
}

const revenueStats: RevenueStat[] = [
  {
    label: 'Total Revenue',
    value: '₦2,450,000',
    growth: 23.5,
    isPositive: true,
    icon: <DollarSign className="w-6 h-6" />,
    iconBg: 'bg-brand-success/10',
    iconColor: 'text-brand-success',
  },
  {
    label: 'Total Orders',
    value: '156',
    growth: 18.2,
    isPositive: true,
    icon: <ShoppingCart className="w-6 h-6" />,
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    label: 'Avg. Order Value',
    value: '₦15,705',
    growth: 4.5,
    isPositive: true,
    icon: <Receipt className="w-6 h-6" />,
    iconBg: 'bg-brand-warning/10',
    iconColor: 'text-brand-warning',
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    growth: 0.8,
    isPositive: false,
    icon: <TrendingUp className="w-6 h-6" />,
    iconBg: 'bg-brand-info/10',
    iconColor: 'text-brand-info',
  },
];

const revenueChartDays = [
  { day: 'Mon', height: 120 },
  { day: 'Tue', height: 180 },
  { day: 'Wed', height: 150 },
  { day: 'Thu', height: 220 },
  { day: 'Fri', height: 200 },
  { day: 'Sat', height: 280 },
  { day: 'Sun', height: 160 },
];

const salesByCategory: CategoryShare[] = [
  { name: 'Electronics', share: 45, barClass: 'bg-primary' },
  { name: 'Fashion', share: 25, barClass: 'bg-brand-info' },
  { name: 'Home & Living', share: 15, barClass: 'bg-brand-warning' },
  { name: 'Beauty', share: 10, barClass: 'bg-destructive' },
  { name: 'Others', share: 5, barClass: 'bg-muted-foreground' },
];

const topProducts: TopProduct[] = [
  {
    name: 'Cotton T-Shirt Pack',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=40&h=40&fit=crop',
    sales: 445,
    revenue: '₦8,232,500',
  },
  {
    name: 'Organic Green Tea Set',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=40&h=40&fit=crop',
    sales: 312,
    revenue: '₦3,900,000',
  },
  {
    name: 'Portable Power Bank',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=40&h=40&fit=crop',
    sales: 267,
    revenue: '₦4,135,500',
  },
  {
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop',
    sales: 234,
    revenue: '₦10,530,000',
  },
  {
    name: 'Natural Skincare Set',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=40&h=40&fit=crop',
    sales: 201,
    revenue: '₦5,728,500',
  },
];

const customerCities: CityShare[] = [
  { name: 'Lagos', share: 42 },
  { name: 'Abuja', share: 18 },
  { name: 'Port Harcourt', share: 12 },
  { name: 'Kano', share: 8 },
  { name: 'Others', share: 20 },
];

const dateRangeOptions = [
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
  { value: 'year', label: 'This Year' },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30');

  const maxBarHeight = Math.max(...revenueChartDays.map((d) => d.height));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {dateRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-lg border border-border p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`rounded-full p-3 ${stat.iconBg} ${stat.iconColor}`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              {stat.isPositive ? (
                <span className="inline-flex items-center text-brand-success">
                  <ArrowUp className="w-4 h-4" />
                  {stat.growth}%
                </span>
              ) : (
                <span className="inline-flex items-center text-destructive">
                  <ArrowDown className="w-4 h-4" />
                  {stat.growth}%
                </span>
              )}
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">
              Revenue Overview
            </h2>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-between gap-2" style={{ minHeight: '300px' }}>
              {revenueChartDays.map(({ day, height }) => (
                <div key={day} className="flex-1 text-center">
                  <div
                    className="bg-primary rounded mx-auto"
                    style={{
                      height: `${(height / maxBarHeight) * 280}px`,
                      maxWidth: '40px',
                    }}
                    aria-label={`${day} revenue bar`}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">{day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-card rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">
              Sales by Category
            </h2>
          </div>
          <div className="p-5 space-y-4">
            {salesByCategory.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{cat.name}</span>
                  <span className="font-semibold text-foreground">
                    {cat.share}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.barClass}`}
                    style={{ width: `${cat.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products & Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-card rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">
              Top Selling Products
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Sales
                  </th>
                  <th className="px-5 py-3 font-medium text-muted-foreground">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="border-b border-border last:border-0">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="text-foreground">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-foreground">{p.sales}</td>
                    <td className="px-5 py-3 text-foreground">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="bg-card rounded-lg border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">
              Customer Insights
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 text-center mb-6">
              <div>
                <p className="text-2xl font-bold text-primary">892</p>
                <p className="text-xs text-muted-foreground">Total Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-info">156</p>
                <p className="text-xs text-muted-foreground">New This Month</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-warning">45</p>
                <p className="text-xs text-muted-foreground">Repeat Buyers</p>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-foreground mb-3">
              Customer Locations
            </h3>
            <div className="space-y-3">
              {customerCities.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{c.share}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${c.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
