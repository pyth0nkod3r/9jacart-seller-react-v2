import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductsStore } from '@/stores/productsStore';
import { useCategories } from '@/hooks/useCategories';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useState, useEffect } from 'react';
import { popup } from '@/lib/popup';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useProductsStore((state) => state.currentProduct);
  const isLoading = useProductsStore((state) => state.isLoading);
  const error = useProductsStore((state) => state.error);
  const fetchProductDetails = useProductsStore((state) => state.fetchProductDetails);
  const updateProduct = useProductsStore((state) => state.updateProduct);

  const { categories, fetchCategories } = useCategories();

  const [formData, setFormData] = useState({
    productName: '',
    categoryId: '',
    productDescription: '',
    unitPrice: '',
    discountType: '0',
    discountValue: '',
    stock: '',
    minStock: '',
    productTags: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
    fetchCategories();
  }, [id]);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || '',
        categoryId: product.categoryId || '',
        productDescription: product.productDescription || '',
        unitPrice: product.unitPrice || '',
        discountType: product.discountType || '0',
        discountValue: product.discountValue || '',
        stock: product.stock || '',
        minStock: product.minStock || '',
        productTags: product.productTags || [],
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);
    try {
      await updateProduct({
        productId: id,
        productName: formData.productName,
        categoryId: formData.categoryId,
        productDescription: formData.productDescription,
        productTags: formData.productTags,
        unitPrice: formData.unitPrice,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        stock: formData.stock,
        minStock: formData.minStock,
      });
      popup.success('Product updated successfully!');
      navigate(`/products/${id}`);
    } catch (err) {
      popup.error(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && !product) {
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/products/${id}`} className="text-muted-foreground hover:text-foreground">
          ← Back to product
        </Link>
      </div>

      <h2 className="text-xl font-bold text-foreground">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Product Name</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description</label>
              <textarea
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Price (₦)</label>
                <input
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to={`/products/${id}`}
            className="px-6 py-2 border border-border rounded-md hover:bg-accent"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#8DEB6E] text-primary rounded-md hover:bg-[#8DEB6E]/90 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
