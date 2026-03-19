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
