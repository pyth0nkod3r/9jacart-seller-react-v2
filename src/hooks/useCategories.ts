import { useCategoriesStore } from '@/stores/categoriesStore';

export const useCategories = () => {
  const store = useCategoriesStore();
  return {
    // State
    categories: store.categories || [],
    isLoading: store.isLoading,
    error: store.error,
    // Actions
    fetchCategories: store.fetchCategories,
    clearError: store.clearError,
    reset: store.reset,
  };
};

export const useCategoriesState = () => {
  const categories = useCategoriesStore((state) => state.categories || []);
  const isLoading = useCategoriesStore((state) => state.isLoading);
  const error = useCategoriesStore((state) => state.error);
  return {
    categories,
    isLoading,
    error,
  };
};

export const useCategoriesActions = () => {
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  const clearError = useCategoriesStore((state) => state.clearError);
  const reset = useCategoriesStore((state) => state.reset);
  return {
    fetchCategories,
    clearError,
    reset,
  };
};
