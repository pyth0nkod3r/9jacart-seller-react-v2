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

    // Calculate top products (by stock value)
    const topProducts: TopProduct[] = mockProducts
      .filter(p => p.isActive)
      .sort((a, b) => parseInt(b.stock) - parseInt(a.stock))
      .slice(0, 5)
      .map(product => ({
        productId: product.productId,
        productName: product.productName,
        totalSold: Math.floor(Math.random() * 50) + 10,
        totalRevenue: parseInt(product.unitPrice) * (Math.floor(Math.random() * 50) + 10),
        totalOrders: Math.floor(Math.random() * 20) + 5,
      }));

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
