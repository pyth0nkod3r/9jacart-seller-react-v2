import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from '@/hooks/useDashboard';
import { useSuspensionCheck } from '@/hooks/useSuspensionCheck';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Package, ShoppingBag, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { dashboardData, isLoading, error, fetchDashboardSummary } = useDashboard();
  const { isSuspended } = useSuspensionCheck();

  useEffect(() => {
    fetchDashboardSummary();
  }, [fetchDashboardSummary]);

  if (isLoading && !dashboardData) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !dashboardData) {
    return <ErrorMessage message={error} onRetry={fetchDashboardSummary} />;
  }

  return (
    <div className="space-y-6">
      {/* Suspension Warning */}
      {isSuspended && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-800">Account Suspended</h3>
              <p className="text-sm text-red-600">
                Your account has been suspended. Please contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={dashboardData?.totalProducts || 0}
          icon={<Package className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={dashboardData?.totalOrders || 0}
          icon={<ShoppingBag className="w-6 h-6" />}
          color="bg-green-500"
        />
        <StatCard
          title="Pending Orders"
          value={dashboardData?.pendingOrders || 0}
          icon={<ShoppingBag className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Total Revenue"
          value={`₦${(dashboardData?.totalRevenue || 0).toLocaleString()}`}
          icon={<TrendingUp className="w-6 h-6" />}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/products/new"
            className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Package className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">Add Product</span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <ShoppingBag className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">View Orders</span>
          </Link>
          <Link
            to="/storefront"
            className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <svg className="w-8 h-8 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm font-medium text-foreground">Storefront</span>
          </Link>
          <Link
            to="/analytics"
            className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium text-foreground">Analytics</span>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      {dashboardData?.recentOrders && dashboardData.recentOrders.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <Link to="/orders" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-sm font-medium text-muted-foreground">Order</th>
                  <th className="text-left py-2 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-2 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.orderNo} className="border-b border-border">
                    <td className="py-3 text-sm font-medium text-foreground">{order.orderNo}</td>
                    <td className="py-3 text-sm text-foreground">₦{order.totalAmount.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-secondary text-foreground'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Products */}
      {dashboardData?.topProducts && dashboardData.topProducts.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Products</h2>
          <div className="space-y-3">
            {dashboardData.topProducts.slice(0, 5).map((product, index) => (
              <div key={product.productId} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{product.productName}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    ₦{product.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.totalSold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
