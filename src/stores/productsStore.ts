import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { productsService } from '@/services/products.service';
import type { Product, ProductsQuery, CreateProductRequest, UpdateProductRequest } from '@/types';
import { isProductActive } from '@/lib/product.utils';

// Local storage keys
const ARCHIVED_PRODUCTS_KEY = 'archived_product_ids';

// Helper functions for archived products
const loadArchivedProductIds = (): Set<string> => {
  try {
    const stored = localStorage.getItem(ARCHIVED_PRODUCTS_KEY);
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch (error) {
    console.error('Failed to load archived product IDs:', error);
  }
  return new Set();
};

const saveArchivedProductIds = (ids: Set<string>): void => {
  try {
    localStorage.setItem(ARCHIVED_PRODUCTS_KEY, JSON.stringify([...ids]));
  } catch (error) {
    console.error('Failed to save archived product IDs:', error);
  }
};

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  query: ProductsQuery;
  loadingStep: string | null;
  archivedProductIds: Set<string>;
}

interface ProductsStore extends ProductsState {
  fetchProducts: (query?: Partial<ProductsQuery>, clientFilter?: (product: Product) => boolean) => Promise<void>;
  fetchProduct: (productId: string) => Promise<void>;
  fetchProductDetails: (productId: string) => Promise<void>;
  createProduct: (productData: CreateProductRequest) => Promise<Product>;
  updateProduct: (productData: UpdateProductRequest) => Promise<void>;
  deleteProduct: (productId: string) => Promise<{ success: boolean; wasArchived: boolean }>;
  archiveProduct: (productId: string) => Promise<void>;
  restoreProduct: (productId: string) => Promise<void>;
  toggleProductStatus: (productId: string, isActive: boolean) => Promise<void>;
  setQuery: (query: Partial<ProductsQuery>) => void;
  clearError: () => void;
  clearCurrentProduct: () => void;
  setLoadingStep: (step: string | null) => void;
  reset: () => void;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  pagination: null,
  isLoading: false,
  error: null,
  query: {
    page: 1,
    perPage: 10,
    search: '',
    statusFilter: 'all',
  },
  loadingStep: null,
  archivedProductIds: loadArchivedProductIds(),
};

export const useProductsStore = create<ProductsStore>()(
  devtools((set, get) => ({
    ...initialState,

    fetchProducts: async (queryPayload?: Partial<ProductsQuery>, clientFilter?: (product: Product) => boolean) => {
      set({ isLoading: true, error: null });
      try {
        const currentQuery = { ...get().query, ...queryPayload };
        const response = await productsService.getProducts(currentQuery);

        let allProducts = response.data || [];
        const archivedIds = get().archivedProductIds;

        let filteredProducts: Product[];

        if (currentQuery.statusFilter === 'archived') {
          filteredProducts = allProducts.filter(
            product => archivedIds.has(product.productId)
          );
        } else {
          filteredProducts = allProducts.filter(
            product => !archivedIds.has(product.productId)
          );
        }

        if (clientFilter) {
          filteredProducts = filteredProducts.filter(clientFilter);
        }

        // Apply text search
        const normalizedSearch = currentQuery.search?.trim().toLowerCase() || '';
        if (normalizedSearch) {
          filteredProducts = filteredProducts.filter((product) => {
            const searchableFields = [
              product.productName,
              product.productDescription,
              product.categoryName || '',
            ];
            const tags = Array.isArray(product.productTags) ? product.productTags : [];
            return (
              searchableFields.some((field) =>
                field?.toLowerCase().includes(normalizedSearch)
              ) ||
              tags.some((tag) => tag.toLowerCase().includes(normalizedSearch))
            );
          });
        }

        const perPage = currentQuery.perPage || response.pagination?.perPage || 10;
        const basePagination = response.pagination || {
          currentPage: currentQuery.page || 1,
          perPage,
          totalPages: 1,
          totalItems: filteredProducts.length,
        };

        const paginationData = normalizedSearch
          ? {
              ...basePagination,
              totalItems: filteredProducts.length,
              totalPages: Math.max(1, Math.ceil(filteredProducts.length / perPage)),
            }
          : basePagination;

        set({
          products: filteredProducts,
          pagination: paginationData,
          query: currentQuery,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
        set({
          products: [],
          pagination: null,
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    fetchProduct: async (productId: string) => {
      set({ isLoading: true, error: null });
      try {
        const product = await productsService.getProduct(productId);
        set({
          currentProduct: product,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product';
        set({
          currentProduct: null,
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    fetchProductDetails: async (productId: string) => {
      set({ isLoading: true, error: null });
      try {
        const product = await productsService.getProductDetails(productId);
        set({
          currentProduct: product,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product details';
        set({
          currentProduct: null,
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    createProduct: async (productData: CreateProductRequest): Promise<Product> => {
      set({ isLoading: true, error: null, loadingStep: 'Creating product...' });
      try {
        set({ loadingStep: 'Creating product...' });
        const newProduct = await productsService.createProduct({
          productName: productData.productName,
          productCategory: productData.categoryId,
          unitPrice: parseFloat(productData.unitPrice),
          discountType: productData.discountType ? parseInt(productData.discountType) : undefined,
          discountValue: productData.discountValue ? parseFloat(productData.discountValue) : undefined,
          productDescription: productData.productDescription,
          stock: parseInt(productData.stock),
          minStock: parseInt(productData.minStock),
          tag: productData.productTags,
        });

        const currentState = get();
        if (currentState.query.page === 1) {
          set({
            products: [newProduct, ...currentState.products],
            isLoading: false,
            loadingStep: null,
            error: null,
          });
        } else {
          set({
            isLoading: false,
            loadingStep: null,
            error: null,
          });
        }
        return newProduct;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create product';
        set({
          isLoading: false,
          loadingStep: null,
          error: errorMessage,
        });
        throw error;
      }
    },

    updateProduct: async (productData: UpdateProductRequest) => {
      set({ isLoading: true, error: null, loadingStep: 'Updating product...' });
      try {
        if (productData.images && productData.images.length > 0) {
          set({ loadingStep: 'Uploading new images...' });
        }

        const updatedProduct = await productsService.updateProduct({
          productId: productData.productId,
          productName: productData.productName,
          productCategory: productData.categoryId,
          unitPrice: productData.unitPrice ? parseFloat(productData.unitPrice) : undefined,
          discountType: productData.discountType ? parseInt(productData.discountType) : undefined,
          discountValue: productData.discountValue ? parseFloat(productData.discountValue) : undefined,
          productDescription: productData.productDescription,
          stock: productData.stock ? parseInt(productData.stock) : undefined,
          minStock: productData.minStock ? parseInt(productData.minStock) : undefined,
          tag: productData.productTags,
        });

        const currentState = get();
        const updatedProducts = currentState.products.map((product) =>
          product.productId === updatedProduct.productId ? updatedProduct : product
        );

        set({
          products: updatedProducts,
          currentProduct: updatedProduct,
          isLoading: false,
          loadingStep: null,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update product';
        set({
          isLoading: false,
          loadingStep: null,
          error: errorMessage,
        });
        throw error;
      }
    },

    deleteProduct: async (productId: string) => {
      set({ isLoading: true, error: null });
      try {
        const result = await productsService.deleteProduct(productId);
        const currentState = get();

        if (result.wasArchived) {
          const newArchivedIds = new Set(currentState.archivedProductIds);
          newArchivedIds.add(productId);
          saveArchivedProductIds(newArchivedIds);

          set({
            products: currentState.products,
            archivedProductIds: newArchivedIds,
            currentProduct: currentState.currentProduct,
            isLoading: false,
            error: null,
          });
        } else {
          const filteredProducts = currentState.products.filter(
            (product) => product.productId !== productId
          );
          set({
            products: filteredProducts,
            currentProduct:
              currentState.currentProduct?.productId === productId
                ? null
                : currentState.currentProduct,
            isLoading: false,
            error: null,
          });
        }

        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete product';
        set({
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    archiveProduct: async (productId: string) => {
      set({ isLoading: true, error: null });
      try {
        await productsService.archiveProduct(productId);

        const currentState = get();
        const newArchivedIds = new Set(currentState.archivedProductIds);
        newArchivedIds.add(productId);
        saveArchivedProductIds(newArchivedIds);

        const filteredProducts = currentState.products.filter(
          (product) => product.productId !== productId
        );

        set({
          products: filteredProducts,
          archivedProductIds: newArchivedIds,
          currentProduct: currentState.currentProduct,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to archive product';
        set({
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    restoreProduct: async (productId: string) => {
      set({ isLoading: true, error: null });
      try {
        await productsService.restoreProduct(productId);

        const currentState = get();
        const newArchivedIds = new Set(currentState.archivedProductIds);
        newArchivedIds.delete(productId);
        saveArchivedProductIds(newArchivedIds);

        set({
          archivedProductIds: newArchivedIds,
        });

        const currentQuery = get().query;
        await get().fetchProducts(currentQuery);

        set({
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to restore product';
        set({
          isLoading: false,
          error: errorMessage,
        });
        throw error;
      }
    },

    toggleProductStatus: async (productId: string, isActive: boolean) => {
      try {
        const updatedProduct = await productsService.toggleProductStatus(productId, isActive);

        const normalizedIsActive = isProductActive(updatedProduct.isActive) ? '1' : '0';

        const currentState = get();
        const updatedProducts = currentState.products.map((product) => {
          if (product.productId === productId) {
            return {
              ...product,
              ...updatedProduct,
              isActive: normalizedIsActive,
              productName: updatedProduct.productName || product.productName,
              productDescription: updatedProduct.productDescription || product.productDescription,
              images: updatedProduct.images || product.images || [],
            };
          }
          return product;
        });

        set({
          products: updatedProducts,
          currentProduct:
            currentState.currentProduct?.productId === productId
              ? { ...currentState.currentProduct, ...updatedProduct, isActive: normalizedIsActive }
              : currentState.currentProduct,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update product status';
        throw new Error(errorMessage);
      }
    },

    setQuery: (query: Partial<ProductsQuery>) => {
      const currentQuery = get().query;
      set({ query: { ...currentQuery, ...query } });
    },

    clearError: () => {
      set({ error: null });
    },

    clearCurrentProduct: () => {
      set({ currentProduct: null });
    },

    setLoadingStep: (step: string | null) => {
      set({ loadingStep: step });
    },

    reset: () => {
      set({ ...initialState, loadingStep: null, archivedProductIds: loadArchivedProductIds() });
    },
  }), {
    name: 'products-store',
  })
);
