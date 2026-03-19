export interface StorefrontProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  imageUrl?: string;
  description?: string;
  shortDescription?: string;
  inStock?: boolean;
  reviewsAverage?: number;
  reviewsTotal?: number;
  category?: string;
  tags?: string[];
}

export interface StorefrontCategory {
  id: string;
  name: string;
  productCount?: number;
  image?: string;
}

export interface StorefrontQuery {
  vendorId?: string;
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  sort?: string;
}

export interface StorefrontState {
  products: StorefrontProduct[];
  bestSellers: StorefrontProduct[];
  categories: StorefrontCategory[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  } | null;
  query: StorefrontQuery;
  isLoading: boolean;
  error: string | null;
  isContactSending: boolean;
  contactSuccess: boolean;
}
