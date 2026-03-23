import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Pagination } from '@/components/ui/Pagination';
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, Power } from 'lucide-react';
import { popup } from '@/lib/popup';

export default function ProductsPage() {
  const {
    products,
    pagination,
    isLoading,
    error,
    query,
    fetchProducts,
    deleteProduct,
    toggleProductStatus,
    setQuery,
  } = useProducts();

  const [search, setSearch] = useState(query.search || '');
  const [statusFilter, setStatusFilter] = useState<string>(query.statusFilter || 'all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchProducts({ ...query, statusFilter: statusFilter as 'all' | 'active' | 'deactivated' | 'out_of_stock' | 'archived' });
  }, [statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== query.search) {
        setQuery({ search, page: 1 });
        fetchProducts({ search, page: 1, statusFilter: statusFilter as 'all' | 'active' | 'deactivated' | 'out_of_stock' | 'archived' });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (productId: string) => {
    try {
      const result = await deleteProduct(productId);
      if (result.wasArchived) {
        popup.success('Product archived because it has active orders');
      } else {
        popup.success('Product deleted successfully');
      }
      setShowDeleteConfirm(null);
    } catch (err) {
      popup.error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleToggleStatus = async (productId: string, currentStatus: string) => {
    const isActive = String(currentStatus) === '1' || String(currentStatus) === 'true';
    try {
      await toggleProductStatus(productId, !isActive);
      popup.success(`Product ${!isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      popup.error(err instanceof Error ? err.message : 'Failed to update product status');
    }
  };

  const handlePageChange = (page: number) => {
    setQuery({ page });
    fetchProducts({ page, search, statusFilter: statusFilter as 'all' | 'active' | 'deactivated' | 'out_of_stock' | 'archived' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Products</h2>
          <p className="text-sm text-muted-foreground">Manage your product inventory</p>
        </div>
        <Link
          to="/dashboard/products/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-[#8DEB6E] text-primary rounded-md hover:bg-[#8DEB6E]/90 font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Products</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && <ErrorMessage message={error} onRetry={() => fetchProducts()} />}

      {/* Products Grid/Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {search || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first product'}
          </p>
          {!search && statusFilter === 'all' && (
            <Link
              to="/dashboard/products/new"
              className="inline-flex items-center px-4 py-2 bg-[#8DEB6E] text-primary rounded-md hover:bg-[#8DEB6E]/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {products.map((product) => (
                    <tr key={product.productId} className="hover:bg-secondary">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={product.images[0] || 'https://placehold.co/100x100/e5e7eb/9ca3af?text=No+Image'}
                            alt={product.productName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-foreground">{product.productName}</p>
                            <p className="text-xs text-muted-foreground">{product.categoryName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        ₦{parseFloat(product.unitPrice).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {product.stock}
                        {parseInt(product.stock) <= parseInt(product.minStock) && (
                          <span className="ml-2 text-xs text-yellow-600">(Low)</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            product.isActive === '1' || product.isActive === 1 || product.isActive === true
                              ? 'bg-green-100 text-green-700'
                              : 'bg-secondary text-foreground'
                          }`}
                        >
                          {product.isActive === '1' || product.isActive === 1 || product.isActive === true ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === product.productId ? null : product.productId)}
                          className="p-2 hover:bg-secondary rounded-full"
                        >
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {activeMenuId === product.productId && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-10"
                          >
                            <Link
                              to={`/dashboard/products/${product.productId}`}
                              className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-secondary"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                            <Link
                              to={`/dashboard/products/${product.productId}/edit`}
                              className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-secondary"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleToggleStatus(product.productId, String(product.isActive))}
                              className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-secondary"
                            >
                              <Power className="w-4 h-4 mr-2" />
                              {product.isActive === '1' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => setShowDeleteConfirm(product.productId)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {pagination && (
            <Pagination
              currentPage={query.page || 1}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              perPage={query.perPage || 10}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Product</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Package({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
