/**
 * Notifications Page
 *
 * Backported from bootstrap version (`bootstrap_version/.../notifications.html`
 * + MOCK_NOTIFICATIONS in app.js) which had a richer layout than the previous
 * React stub.
 */

import { useMemo, useState } from 'react';
import { BellOff, CheckCheck } from 'lucide-react';
import { popup } from '@/lib/popup';
import { cn } from '@/lib/utils';

type NotificationType = 'order' | 'payment' | 'product' | 'system';

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

type FilterId = 'all' | 'unread' | 'orders' | 'payments';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-2024-0008 has been placed by Emeka Okafor',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Confirmed',
    message: 'Payment of ₦380,000 for order #ORD-2024-0007 has been confirmed',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'product',
    title: 'Low Stock Alert',
    message: 'Leather Crossbody Bag is running low on stock (45 units remaining)',
    time: '3 hours ago',
    read: false,
  },
  {
    id: 4,
    type: 'order',
    title: 'Order Delivered',
    message: 'Order #ORD-2024-0003 has been successfully delivered',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'system',
    title: 'Profile Updated',
    message: 'Your store profile has been successfully updated',
    time: '1 day ago',
    read: true,
  },
  {
    id: 6,
    type: 'payment',
    title: 'Payout Processed',
    message: 'Your weekly payout of ₦520,000 has been processed',
    time: '2 days ago',
    read: true,
  },
  {
    id: 7,
    type: 'product',
    title: 'Product Approved',
    message: "Your product 'Natural Skincare Set' has been approved for sale",
    time: '3 days ago',
    read: true,
  },
  {
    id: 8,
    type: 'order',
    title: 'Order Cancelled',
    message: 'Order #ORD-2024-0004 has been cancelled by customer',
    time: '4 days ago',
    read: true,
  },
];

const TYPE_ICONS: Record<NotificationType, string> = {
  order: '📦',
  payment: '💳',
  product: '🏷️',
  system: '⚙️',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterId>('all');

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const filtered = useMemo(() => {
    switch (filter) {
      case 'unread':
        return notifications.filter((n) => !n.read);
      case 'orders':
        return notifications.filter((n) => n.type === 'order');
      case 'payments':
        return notifications.filter((n) => n.type === 'payment');
      default:
        return notifications;
    }
  }, [notifications, filter]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    popup.success('All notifications marked as read');
  };

  const tabs: Array<{ id: FilterId; label: string; badge?: number }> = [
    { id: 'all', label: 'All Notifications' },
    { id: 'unread', label: 'Unread', badge: unreadCount },
    { id: 'orders', label: 'Orders' },
    { id: 'payments', label: 'Payments' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center gap-2 rounded-md border border-primary px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCheck className="w-4 h-4" />
          Mark All Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-border">
        <div className="flex flex-wrap gap-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                filter === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <BellOff className="w-12 h-12 mb-3" />
          <p>No notifications found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => markAsRead(n.id)}
              className={cn(
                'w-full text-left bg-card rounded-lg border border-border p-4 transition-colors hover:bg-accent',
                n.read && 'opacity-75'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl flex-shrink-0">
                  {TYPE_ICONS[n.type] || '📢'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      {n.title}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {n.message}
                  </p>
                </div>
                {!n.read && (
                  <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground flex-shrink-0">
                    New
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
