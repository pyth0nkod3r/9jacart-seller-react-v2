/**
 * Orders Service (Mock)
 * 
 * All API calls replaced with mock data.
 */

import { delay, mockOrders, mockOrdersMetrics, mockOrderItems, mockProducts, IMAGES } from '@/lib/mock-data';
import type { Order, OrdersQuery, ApiResponse, OrderItem, OrdersMetrics } from '@/types';

export const ordersService = {
  async getOrders(query?: OrdersQuery): Promise<ApiResponse<Order[]>> {
    await delay(400);

    let filtered = [...mockOrders];

    // Apply status filter
    if (query?.status && query.status !== 'all') {
      filtered = filtered.filter((o) => o.status === query.status);
    }

    // Apply search filter
    if (query?.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.orderNo.toLowerCase().includes(search) ||
          o.customerName.toLowerCase().includes(search)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const page = query?.page || 1;
    const perPage = query?.perPage || 10;
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);

    return {
      status: 200,
      error: false,
      message: 'Orders fetched successfully',
      data: paged,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalItems,
      },
    };
  },

  async getOrder(orderNo: string): Promise<Order | null> {
    await delay(300);
    return mockOrders.find((o) => o.orderNo === orderNo) || null;
  },

  async getOrderItems(orderNo: string): Promise<ApiResponse<OrderItem[]>> {
    await delay(300);
    
    const items = mockOrderItems[orderNo] || [];
    
    return {
      data: items,
      status: 200,
      error: false,
      message: 'Order items fetched successfully',
    };
  },

  async getOrdersSummary(): Promise<ApiResponse<OrdersMetrics>> {
    await delay(300);
    
    return {
      data: mockOrdersMetrics,
      status: 200,
      error: false,
      message: 'Orders summary fetched successfully',
    };
  },

  async updateOrderStatus(orderNo: string, status: Order['status']): Promise<Order> {
    await delay(400);
    
    const order = mockOrders.find((o) => o.orderNo === orderNo);
    if (!order) {
      throw new Error('Order not found');
    }
    
    order.status = status;
    return order;
  },

  async getRecentOrders(limit: number = 5): Promise<Order[]> {
    await delay(300);
    
    return mockOrders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },
};
