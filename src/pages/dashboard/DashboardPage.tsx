import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDashboard } from '@/hooks/useDashboard';
import { useSuspensionCheck } from '@/hooks/useSuspensionCheck';
import { useAuthStore } from '@/stores/authStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { dashboardData, isLoading, error, fetchDashboardSummary } = useDashboard();
  const { isSuspended } = useSuspensionCheck();
  const user = useAuthStore((state) => state.user);
  const [salesPeriod, setSalesPeriod] = useState('7');

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

      {/* Welcome Message */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Welcome back, <span className="text-foreground">{user?.fullName || 'Demo Seller'}</span>!
        </h2>
        <p className="text-sm text-muted-foreground">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`₦${(dashboardData?.totalRevenue || 0).toLocaleString()}`}
          emoji="💰"
          growth={23.5}
          gradient="from-green-500 to-green-700"
        />
        <StatCard
          label="Total Orders"
          value={String(dashboardData?.totalOrders || 0)}
          emoji="📦"
          growth={18.2}
          gradient="from-blue-500 to-blue-700"
        />
        <StatCard
          label="Products"
          value={String(dashboardData?.totalProducts || 0)}
          emoji="🏷️"
          growth={8.5}
          gradient="from-purple-500 to-purple-700"
        />
        <StatCard
          label="Customers"
          value="892"
          emoji="👥"
          growth={15.8}
          gradient="from-amber-500 to-amber-700"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/dashboard/products/new" className="block">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📦</div>
              <div className="font-semibold text-foreground text-sm">Add Product</div>
            </div>
          </Link>
          <Link to="/dashboard/orders" className="block">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="text-3xl mb-2">🛒</div>
              <div className="font-semibold text-foreground text-sm">View Orders</div>
            </div>
          </Link>
          <Link to="/dashboard/storefront" className="block">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="text-3xl mb-2">🏪</div>
              <div className="font-semibold text-foreground text-sm">Storefront</div>
            </div>
          </Link>
          <Link to="/dashboard/analytics" className="block">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="text-3xl mb-2">📈</div>
              <div className="font-semibold text-foreground text-sm">Analytics</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Orders + Top Products (side by side) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border">
            <div className="flex justify-between items-center px-6 py-4 border-b border-border">
              <h3 className="text-base font-semibold text-foreground">Recent Orders</h3>
              <Link
                to="/dashboard/orders"
                className="text-sm px-3 py-1 border border-primary text-primary rounded-md hover:bg-primary/10"
              >
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Order</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.recentOrders?.slice(0, 5).map((order) => (
                    <tr key={order.orderNo} className="border-b border-border hover:bg-secondary/50">
                      <td className="px-6 py-3 text-sm font-semibold text-foreground">{order.orderNo}</td>
                      <td className="px-6 py-3 text-sm text-foreground">₦{order.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <Link
                          to="/dashboard/orders"
                          className="text-sm px-3 py-1 border border-primary text-primary rounded-md hover:bg-primary/10"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products (1/3 width) */}
        <div>
          <div className="bg-card rounded-lg border border-border h-full">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-base font-semibold text-foreground">Top Products</h3>
            </div>
            <div className="p-4 space-y-3">
              {dashboardData?.topProducts?.slice(0, 5).map((product, index) => (
                <div
                  key={product.productId}
                  className="flex items-center p-2 rounded-lg bg-secondary/50"
                >
                  <span className="text-muted-foreground mr-3 text-sm">#{index + 1}</span>
                  <img
                    src={product.image || 'https://placehold.co/50x50/e5e7eb/9ca3af?text=No+Image'}
                    alt={product.productName}
                    className="w-[50px] h-[50px] object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate">{product.productName}</div>
                    <small className="text-muted-foreground">{product.totalSold} sales</small>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-primary">
                      ₦{Math.round(product.totalRevenue / product.totalSold).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity + Sales Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card rounded-lg border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
          </div>
          <div className="p-6 space-y-0">
            <div className="flex items-start pb-4 mb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">New order received</div>
                <small className="text-muted-foreground">Order #ORD-2024-0008 from Emeka Okafor</small>
                <div className="text-muted-foreground text-xs mt-1">5 minutes ago</div>
              </div>
            </div>
            <div className="flex items-start pb-4 mb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">Payment confirmed</div>
                <small className="text-muted-foreground">₦380,000 for order #ORD-2024-0007</small>
                <div className="text-muted-foreground text-xs mt-1">1 hour ago</div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">Low stock alert</div>
                <small className="text-muted-foreground">Leather Crossbody Bag (45 units remaining)</small>
                <div className="text-muted-foreground text-xs mt-1">3 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="bg-card rounded-lg border border-border">
          <div className="flex justify-between items-center px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Sales Overview</h3>
            <select
              value={salesPeriod}
              onChange={(e) => setSalesPeriod(e.target.value)}
              className="text-sm px-2 py-1 border border-border rounded-md bg-card text-foreground"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          <div className="p-6">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-primary">₦2,450,000</div>
              <p className="text-muted-foreground mt-2">Total Revenue This Period</p>
              <div className="flex justify-center gap-8 mt-6">
                <div>
                  <div className="text-xl font-semibold text-foreground">156</div>
                  <small className="text-muted-foreground">Orders</small>
                </div>
                <div>
                  <div className="text-xl font-semibold text-foreground">892</div>
                  <small className="text-muted-foreground">Customers</small>
                </div>
                <div>
                  <div className="text-xl font-semibold text-foreground">48</div>
                  <small className="text-muted-foreground">Products</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  emoji,
  growth,
  gradient,
}: {
  label: string;
  value: string;
  emoji: string;
  growth: number;
  gradient: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br ${gradient}`}>
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full" />
      <div className="relative flex justify-between items-start">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm opacity-90">{label}</div>
        </div>
        <div className="text-4xl opacity-80">{emoji}</div>
      </div>
      <div className="relative mt-2">
        <small>+{growth}% from last month</small>
      </div>
    </div>
  );
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'processing':
      return 'bg-blue-100 text-blue-700';
    case 'shipped':
      return 'bg-purple-100 text-purple-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-secondary text-foreground';
  }
}
