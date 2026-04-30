import { delay, mockProducts, mockCategories } from '@/lib/mock-data';
import type { Product, ProductsQuery, ProductsResponse, CreateProductPayload, UploadProductImagesRequest, Category } from '@/types';
import { formatImageUrls } from '@/lib/image.utils';

export const productsService = {
  async getProducts(query?: ProductsQuery): Promise<ProductsResponse> {
    await delay(400);

    let filtered = [...mockProducts];

    // Apply filters
    if (query?.categoryId) {
      filtered = filtered.filter((p) => p.categoryId === query.categoryId);
    }

    if (query?.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.productName.toLowerCase().includes(search) ||
          p.productDescription.toLowerCase().includes(search) ||
          p.productTags.some((t) => t.toLowerCase().includes(search))
      );
    }

    if (query?.statusFilter) {
      switch (query.statusFilter) {
        case 'active':
          filtered = filtered.filter((p) => p.isActive === true || p.isActive === '1' || p.isActive === 1);
          break;
        case 'deactivated':
          filtered = filtered.filter((p) => p.isActive === false || p.isActive === '0' || p.isActive === 0);
          break;
        case 'out_of_stock':
          filtered = filtered.filter((p) => parseInt(p.stock) <= 0);
          break;
      }
    }

    // Pagination
    const page = query?.page || 1;
    const perPage = query?.perPage || 10;
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const start = (page - 1) * perPage;
    const paged = filtered.slice(start, start + perPage);

    // Format image URLs
    const formattedProducts = paged.map((product) => ({
      ...product,
      images: formatImageUrls(product.images),
    }));

    return {
      data: formattedProducts,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalItems,
      },
    };
  },

  async getProduct(productId: string): Promise<Product> {
    await delay(300);
    const product = mockProducts.find((p) => p.productId === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return {
      ...product,
      images: formatImageUrls(product.images),
    };
  },

  async getProductDetails(productId: string): Promise<Product> {
    return this.getProduct(productId);
  },

  async createProduct(data: CreateProductPayload): Promise<Product> {
    await delay(500);

    const newProduct: Product = {
      productId: 'prod-' + Date.now(),
      productName: data.productName,
      categoryId: data.productCategory,
      categoryName: 'Category', // Would be fetched from categories
      productDescription: data.productDescription,
      productTags: data.tag,
      unitPrice: data.unitPrice.toString(),
      discountType: data.discountType?.toString() || '0',
      discountValue: data.discountValue?.toString() || '0',
      discountPrice: data.unitPrice.toString(),
      stock: data.stock.toString(),
      minStock: data.minStock.toString(),
      images: [],
      isActive: true,
      sku: data.sku,
      weight: data.weight !== undefined ? data.weight.toString() : undefined,
      vendorId: 'vendor-mock-001',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProducts.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(data: { productId: string } & Partial<CreateProductPayload>): Promise<Product> {
    await delay(500);

    const index = mockProducts.findIndex((p) => p.productId === data.productId);
    if (index === -1) {
      throw new Error('Product not found');
    }

    const existing = mockProducts[index];
    const updated: Product = {
      ...existing,
      ...(data.productName && { productName: data.productName }),
      ...(data.productCategory && { categoryId: data.productCategory }),
      ...(data.unitPrice !== undefined && { unitPrice: data.unitPrice.toString() }),
      ...(data.discountType !== undefined && { discountType: data.discountType.toString() }),
      ...(data.discountValue !== undefined && { discountValue: data.discountValue.toString() }),
      ...(data.productDescription && { productDescription: data.productDescription }),
      ...(data.stock !== undefined && { stock: data.stock.toString() }),
      ...(data.minStock !== undefined && { minStock: data.minStock.toString() }),
      ...(data.tag && { productTags: data.tag }),
      updatedAt: new Date().toISOString(),
    };

    mockProducts[index] = updated;
    return updated;
  },

  async deleteProduct(productId: string): Promise<{ success: boolean; wasArchived: boolean }> {
    await delay(400);

    const index = mockProducts.findIndex((p) => p.productId === productId);
    if (index === -1) {
      throw new Error('Product not found');
    }

    // Check if product has orders (mock check)
    const hasOrders = Math.random() > 0.5; // 50% chance for demo

    if (hasOrders) {
      // Archive instead of delete
      return { success: true, wasArchived: true };
    }

    mockProducts.splice(index, 1);
    return { success: true, wasArchived: false };
  },

  async archiveProduct(productId: string): Promise<void> {
    await delay(300);
    console.log('Archiving product:', productId);
  },

  async restoreProduct(productId: string): Promise<void> {
    await delay(300);
    console.log('Restoring product:', productId);
  },

  async toggleProductStatus(productId: string, isActive: boolean): Promise<Product> {
    await delay(300);

    const index = mockProducts.findIndex((p) => p.productId === productId);
    if (index === -1) {
      throw new Error('Product not found');
    }

    mockProducts[index] = {
      ...mockProducts[index],
      isActive: isActive ? '1' : '0',
      updatedAt: new Date().toISOString(),
    };

    return mockProducts[index];
  },

  async uploadProductImages(data: UploadProductImagesRequest): Promise<{ success: boolean }> {
    await delay(800);
    console.log('Uploading images for product:', data.productId);
    return { success: true };
  },

  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },
};
