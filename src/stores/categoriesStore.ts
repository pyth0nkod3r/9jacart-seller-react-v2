import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { categoriesService } from '@/services/categories.service';
import type { Category } from '@/types';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

interface CategoriesStore extends CategoriesState {
  fetchCategories: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const useCategoriesStore = create<CategoriesStore>()(
  devtools((set) => ({
    ...initialState,

    fetchCategories: async () => {
      set({ isLoading: true, error: null });
      try {
        const categories = await categoriesService.getCategories();
        set({
          categories,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
        set({
          categories: [],
          isLoading: false,
          error: errorMessage,
        });
      }
    },

    clearError: () => set({ error: null }),

    reset: () => set(initialState),
  }), {
    name: 'categories-store',
  })
);
