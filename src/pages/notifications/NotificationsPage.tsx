import { useEffect } from 'react';
import { useOrders } from '@/hooks/useOrders';

export default function NotificationsPage() {
  const { fetchOrders } = useOrders();

  useEffect(() => {
    fetchOrders({ page: 1, perPage: 10 });
  }, [fetchOrders]);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Notifications</h2>
        <p className="text-muted-foreground mb-6">
          Stay updated with your store activities and important alerts.
        </p>

        <div className="space-y-4">
          {/* Sample notifications */}
          <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-2xl">🔔</div>
            <div>
              <p className="font-medium text-foreground">Welcome to SellerHub!</p>
              <p className="text-sm text-muted-foreground">
                Get started by adding your first product.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-medium text-foreground">Account Verified</p>
              <p className="text-sm text-muted-foreground">
                Your seller account has been verified successfully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
