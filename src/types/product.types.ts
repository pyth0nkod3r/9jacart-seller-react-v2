export interface Product {
  productId: string;
  productName: string;
  categoryId: string;
  categoryName: string | null;
  productDescription: string;
  productTags: string[];
  unitPrice: string;
  discountType: string;
  discountValue: string;
  discountPrice: string;
  stock: string;
  minStock: string;
  images: string[];
  isActive: string | number | boolean;
  /** Stock-keeping unit — backported from bootstrap add-product form */
  sku?: string;
  /** Shipping weight in kilograms — backported from bootstrap add-product form */
  weight?: string;
  vendorId?: string;
  vendorStorefrontUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsApiResponse {
  data: Product[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface ProductsResponse {
  data: Product[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface ProductsQuery {
  page?: number;
  perPage?: number;
  search?: string;
  categoryId?: string;
  isActive?: string;
  statusFilter?: 'all' | 'active' | 'deactivated' | 'out_of_stock' | 'archived';
}

export interface CreateProductRequest {
  productName: string;
  categoryId: string;
  productDescription: string;
  productTags: string[];
  unitPrice: string;
  discountType?: string;
  discountValue?: string;
  stock: string;
  minStock: string;
  images: File[];
  isActive?: string;
  /** Optional SKU — bootstrap parity */
  sku?: string;
  /** Optional shipping weight in kg — bootstrap parity */
  weight?: string;
}

export interface CreateProductPayload {
  productName: string;
  productCategory: string;
  unitPrice: number;
  discountType?: number;
  discountValue?: number;
  productDescription: string;
  stock: number;
  minStock: number;
  tag: string[];
  sku?: string;
  weight?: number;
}

export interface UploadProductImagesRequest {
  productId: string;
  images: File[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  productId: string;
}

export interface EditProductPayload {
  productName?: string;
  productCategory?: string;
  unitPrice?: number;
  discountType?: number;
  discountValue?: number;
  productDescription?: string;
  stock?: number;
  minStock?: number;
  tag?: string[];
  sku?: string;
  weight?: number;
}

export interface ProductsState {
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
}
