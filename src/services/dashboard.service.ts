/**
 * Dashboard Service (Mock)
 * 
 * All API calls replaced with mock data.
 */

import { 
  delay, 
  mockVendorProfile, 
  mockDashboardStats, 
  mockProducts, 
  mockOrders, 
  IMAGES 
} from '@/lib/mock-data';
import type { 
  VendorProfile, 
  DashboardSummary, 
  RecentOrder, 
  TopProduct 
} from '@/types';

let vendorProfile = { ...mockVendorProfile };

export const dashboardService = {
  async getVendorProfile(): Promise<VendorProfile> {
    await delay(300);
    return vendorProfile;
  },

  async updateVendorProfile(data: Partial<VendorProfile>): Promise<VendorProfile> {
    await delay(400);
    vendorProfile = { ...vendorProfile, ...data };
    return vendorProfile;
  },

  async updateAccountInfo(accountInfo: {
    accountName?: string;
    accountNumber?: string;
    bank?: string;
  }): Promise<VendorProfile> {
    await delay(300);
    vendorProfile = {
      ...vendorProfile,
      accountInfo: { ...vendorProfile.accountInfo, ...accountInfo },
    };
    return vendorProfile;
  },

  async changePassword(_params: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await delay(400);
    // Mock: always succeeds
  },

  async getLogo(): Promise<string | null> {
    await delay(200);
    return vendorProfile.account.profileImage || null;
  },

  async uploadLogo(file: File): Promise<string> {
    await delay(600);
    // Mock: return a placeholder URL
    const url = IMAGES.avatars[0];
    vendorProfile.account.profileImage = url;
    return url;
  },

  async getDashboardSummary(): Promise<DashboardSummary> {
    await delay(400);

    // Calculate recent orders (last 5)
    const recentOrders: RecentOrder[] = mockOrders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(order => ({
        orderNo: order.orderNo,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentMethod: order.paymentMethod || 'card',
        createdAt: order.createdAt,
        products: [],
      }));

    // Deterministic sales data matching Bootstrap version
    const salesData: Record<string, number> = {
      'prod-001': 234,  // Wireless Bluetooth Headphones
      'prod-002': 189,  // Smart Watch Pro
      'prod-003': 156,  // Leather Crossbody Bag
      'prod-004': 312,  // Organic Green Tea Set
      'prod-005': 98,   // Minimalist Desk Lamp
      'prod-006': 445,  // Cotton T-Shirt Pack
      'prod-007': 267,  // Portable Power Bank
      'prod-008': 178,  // Yoga Mat Premium
      'prod-009': 134,  // Ceramic Coffee Mug Set
      'prod-010': 201,  // Natural Skincare Set
    };

    // Calculate top products (sorted by sales, matching Bootstrap)
    const topProducts: TopProduct[] = mockProducts
      .filter(p => p.isActive)
      .map(product => {
        const sold = salesData[product.productId] || 0;
        return {
          productId: product.productId,
          productName: product.productName,
          totalSold: sold,
          totalRevenue: parseInt(product.unitPrice) * sold,
          totalOrders: Math.floor(sold / 3),
          image: product.images[0] || '',
        };
      })
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    return {
      totalProducts: mockDashboardStats.totalProducts,
      totalOrders: mockDashboardStats.totalOrders,
      pendingOrders: mockDashboardStats.pendingOrders,
      totalRevenue: mockDashboardStats.totalRevenue,
      recentOrders,
      topProducts,
      accountStatus: 'active',
      isActive: true,
      isSuspended: false,
    };
  },

  async getStats() {
    await delay(300);
    return mockDashboardStats;
  },

  async getCategories() {
    await delay(200);
    return [];
  },

  async getRevenueChart(days: number = 7): Promise<{ date: string; revenue: number }[]> {
    await delay(300);
    
    const data: { date: string; revenue: number }[] = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 500000) + 100000,
      });
    }
    
    return data;
  },

  async getOrdersChart(days: number = 7): Promise<{ date: string; orders: number }[]> {
    await delay(300);
    
    const data: { date: string; orders: number }[] = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        orders: Math.floor(Math.random() * 10) + 1,
      });
    }
    
    return data;
  },
};
