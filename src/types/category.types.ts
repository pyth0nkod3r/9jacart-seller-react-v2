export interface Category {
  id: string;
  categoryId?: string;
  categoryName: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}
