/**
 * Notification Service (Mock)
 * 
 * All API calls replaced with mock data.
 */

import { delay, mockNotifications } from '@/lib/mock-data';
import type { NotificationItem } from '@/types';

let notifications = [...mockNotifications];

export const notificationService = {
  async getNotifications(query?: {
    page?: number;
    perPage?: number;
    unreadOnly?: boolean;
  }): Promise<{
    data: NotificationItem[];
    pagination: {
      currentPage: number;
      perPage: number;
      totalPages: number;
      totalItems: number;
      unreadCount: number;
    };
  }> {
    await delay(300);

    let filtered = [...notifications];

    if (query?.unreadOnly) {
      filtered = filtered.filter(n => !n.isRead);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const page = query?.page || 1;
    const perPage = query?.perPage || 20;
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);

    return {
      data: paged,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalItems,
        unreadCount: notifications.filter(n => !n.isRead).length,
      },
    };
  },

  async getNotification(id: string): Promise<NotificationItem | null> {
    await delay(200);
    return notifications.find(n => n.id === id) || null;
  },

  async markAsRead(notificationId: string): Promise<void> {
    await delay(200);
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  },

  async markAllAsRead(): Promise<void> {
    await delay(300);
    notifications.forEach(n => {
      n.isRead = true;
    });
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await delay(200);
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications.splice(index, 1);
    }
  },

  async clearAllNotifications(): Promise<void> {
    await delay(300);
    notifications = [];
  },

  async getUnreadCount(): Promise<number> {
    await delay(100);
    return notifications.filter(n => !n.isRead).length;
  },

  // Simulate receiving a new notification
  async createNotification(data: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>): Promise<NotificationItem> {
    await delay(200);
    
    const newNotification: NotificationItem = {
      ...data,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    notifications.unshift(newNotification);
    return newNotification;
  },
};
