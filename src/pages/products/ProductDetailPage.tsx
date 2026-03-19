import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductsStore } from '@/stores/productsStore';
import { useSuspensionCheck } from '@/hooks/useSuspensionCheck';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { popup } from '@/lib/popup';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isSuspended } = useSuspensionCheck();

  const product = useProductsStore((state) => state.currentProduct);
  const isLoading = useProductsStore((state) => state.isLoading);
  const error = useProductsStore((state) => state.error);
  const fetchProductDetails = useProductsStore((state) => state.fetchProductDetails);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const toggleProductStatus = useProductsStore((state) => state.toggleProductStatus);
  const clearCurrentProduct = useProductsStore((state) => state.clearCurrentProduct);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  React.useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
    return () => {
      clearCurrentProduct();
    };
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      const result = await deleteProduct(id);
      if (result.wasArchived) {
        popup.success('Product archived successfully');
      } else {
        popup.success('Product deleted successfully');
      }
      navigate('/products');
    } catch (err) {
      popup.error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleToggleStatus = async () => {
    if (!id || !product) return;
    const isActive = product.isActive === '1' || product.isActive === 1 || product.isActive === true;
    try {
      await toggleProductStatus(id, !isActive);
      popup.success(`Product ${!isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      popup.error(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => id && fetchProductDetails(id)} />;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Product not found</p>
        <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product.productName}</span>
      </nav>

      {/* Product Details */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <img
              src={product.images[0] || 'https://placehold.co/400x400/e5e7eb/9ca3af?text=No+Image'}
              alt={product.productName}
              className="w-full rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">{product.productName}</h1>
            <p className="text-muted-foreground">{product.productDescription}</p>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-xl font-bold text-foreground">₦{parseFloat(product.unitPrice).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <p className="text-xl font-bold text-foreground">{product.stock}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to={`/products/${id}/edit`}
                className="px-4 py-2 bg-[#8DEB6E] text-primary rounded-md hover:bg-[#8DEB6E]/90"
              >
                Edit Product
              </Link>
              <button
                onClick={handleToggleStatus}
                disabled={isSuspended}
                className="px-4 py-2 border border-border rounded-md hover:bg-accent disabled:opacity-50"
              >
                {product.isActive === '1' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isSuspended}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Product</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

import React from 'react';
