import { useOrders } from '@/hooks/useOrders';
import React from 'react';

const statusColors: Record<string, string> = {
  awaiting_pickup: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
  pending: "bg-blue-100 text-blue-700",
  order_confirmed: "bg-purple-100 text-purple-700",
  PENDING: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELED: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { orders, metrics, pagination, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
  const query = { page: 1, perPage: 10 };

  const currentPage = query.page || 1;
  const totalPages = pagination?.totalPages || 1;

  const handleNextPage = () => {
    // Pagination logic
  };

  const handlePrevPage = () => {
    // Pagination logic
  };

  const handlePageClick = (_pageNumber: number) => {
    // Pagination logic
  };

  return (
    <div className="p-4 sm:p-6 text-white min-h-screen">
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-lg">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <p className="mb-4">Order: {selectedOrder.orderNo}</p>
            <button 
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 bg-secondary rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[#182F38]">Orders</h1>
      <p className="text-xs sm:text-sm mb-4 sm:mb-6 text-[#182F38]">
        Organize all ordered products
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <MetricCard title="Total orders" value={metrics?.totalOrders ?? 0} />
        <MetricCard title="Delivered over time" value={metrics?.deliveredOrders ?? 0} />
        <MetricCard title="Returns" value={metrics?.returnedOrders ?? 0} />
        <MetricCard title="Canceled orders" value={metrics?.cancelledOrders ?? 0} />
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white bg-[#1E4700] text-left">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-[#182F38]">
                  Loading orders...
                </td>
              </tr>
            ) : orders?.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-[#182F38]">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.orderNo} className="border-b border-border text-[#333333] hover:bg-accent/50 bg-card">
                  <td className="p-4">{order.orderNo}</td>
                  <td className="p-4">{order.createdAt}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">₦{order.totalAmount?.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      statusColors[order.status] || statusColors[order.status?.toLowerCase()] || "bg-secondary text-foreground"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center sm:justify-end mt-4 sm:mt-6 gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card text-[#182F38] hover:bg-accent disabled:opacity-50"
        >
          ←
        </button>
        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium border ${
                isActive
                  ? "bg-[#1E4700] text-white border-[#1E4700]"
                  : "bg-card text-[#182F38] border-border hover:bg-accent"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card text-[#182F38] hover:bg-accent disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="border border-[#1E4700] p-3 sm:p-4 rounded-2xl bg-[#F9FFF5] flex items-center gap-2 sm:gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm text-[#182F38] truncate">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-[#1E4700]">{value}</p>
      </div>
    </div>
  );
}
