import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProductsStore } from '@/stores/productsStore';
import { useCategories } from '@/hooks/useCategories';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { popup } from '@/lib/popup';

export default function AddProductPage() {
  const navigate = useNavigate();
  const createProduct = useProductsStore((state) => state.createProduct);
  const isLoading = useProductsStore((state) => state.isLoading);
  const loadingStep = useProductsStore((state) => state.loadingStep);
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
    images: [] as File[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const updateForm = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.productTags.includes(trimmed)) {
      updateForm('productTags', [...formData.productTags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    updateForm(
      'productTags',
      formData.productTags.filter((t) => t !== tag)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    if (!formData.productDescription.trim()) newErrors.productDescription = 'Description is required';
    if (!formData.unitPrice || parseFloat(formData.unitPrice) <= 0) {
      newErrors.unitPrice = 'Valid price is required';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    if (formData.productTags.length === 0) {
      newErrors.productTags = 'At least one tag is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const newProduct = await createProduct({
        productName: formData.productName,
        categoryId: formData.categoryId,
        productDescription: formData.productDescription,
        productTags: formData.productTags,
        unitPrice: formData.unitPrice,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        stock: formData.stock,
        minStock: formData.minStock || '0',
        images: formData.images,
      });

      popup.success('Product created successfully!');
      navigate(`/products/${newProduct.productId}`);
    } catch (err) {
      popup.error(err instanceof Error ? err.message : 'Failed to create product');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Add New Product</h2>
          <p className="text-sm text-muted-foreground">Create a new product listing</p>
        </div>
        <Link
          to="/dashboard/products"
          className="px-4 py-2 border border-border rounded-md hover:bg-accent"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => updateForm('productName', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product name"
                  />
                  {errors.productName && (
                    <p className="mt-1 text-sm text-red-600">{errors.productName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.productDescription}
                    onChange={(e) => updateForm('productDescription', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Describe your product"
                  />
                  {errors.productDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.productDescription}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Unit Price (₦) *
                  </label>
                  <input
                    type="number"
                    value={formData.unitPrice}
                    onChange={(e) => updateForm('unitPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                    min="0"
                  />
                  {errors.unitPrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Discount Type
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => updateForm('discountType', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="0">No Discount</option>
                    <option value="1">Percentage</option>
                    <option value="2">Fixed Amount</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Inventory</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => updateForm('stock', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                    min="0"
                  />
                  {errors.stock && (
                    <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Minimum Stock
                  </label>
                  <input
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => updateForm('minStock', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Category</h3>
              <select
                value={formData.categoryId}
                onChange={(e) => updateForm('categoryId', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags</h3>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-secondary rounded-md hover:bg-accent"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.productTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {errors.productTags && (
                <p className="mt-1 text-sm text-red-600">{errors.productTags}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            to="/dashboard/products"
            className="px-6 py-2 border border-border rounded-md hover:bg-accent"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-[#8DEB6E] text-primary rounded-md hover:bg-[#8DEB6E]/90 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                {loadingStep || 'Creating...'}
              </>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
