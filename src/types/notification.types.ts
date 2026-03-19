export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: 'order' | 'product' | 'payment' | 'system' | 'promotion';
  isRead?: boolean;
  createdAt: string;
}

export interface NotificationsState {
  notifications: NotificationItem[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
}
