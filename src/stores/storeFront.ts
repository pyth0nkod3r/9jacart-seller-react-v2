import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StorefrontProduct, StorefrontCategory, StorefrontQuery } from '@/types';

interface StorefrontState {
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

interface StorefrontStore extends StorefrontState {
  fetchProducts: (query?: Partial<StorefrontQuery>) => Promise<void>;
  fetchBestSellers: (_vendorId: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setQuery: (query: Partial<StorefrontQuery>) => void;
  sendContactMessage: (_data: { vendorId: string; name: string; email: string; message: string }) => Promise<void>;
  resetContact: () => void;
  reset: () => void;
}

const initialState: StorefrontState = {
  products: [],
  bestSellers: [],
  categories: [],
  pagination: null,
  query: {
    page: 1,
    perPage: 12,
    search: '',
    category: '',
    sort: 'newest',
  },
  isLoading: false,
  error: null,
  isContactSending: false,
  contactSuccess: false,
};

export const useStorefrontStore = create<StorefrontStore>()(
  devtools((set, get) => ({
    ...initialState,

    fetchProducts: async (queryPayload?: Partial<StorefrontQuery>) => {
      set({ isLoading: true, error: null });
      try {
        const currentQuery = { ...get().query, ...queryPayload };
        set({
          products: [],
          query: currentQuery,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        set({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch products',
        });
      }
    },

    fetchBestSellers: async () => {
      set({ bestSellers: [] });
    },

    fetchCategories: async () => {
      set({ categories: [] });
    },

    setQuery: (query: Partial<StorefrontQuery>) => {
      const currentQuery = get().query;
      set({ query: { ...currentQuery, ...query } });
    },

    sendContactMessage: async () => {
      set({ isContactSending: true, contactSuccess: false });
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({
        isContactSending: false,
        contactSuccess: true,
      });
    },

    resetContact: () => {
      set({ isContactSending: false, contactSuccess: false });
    },

    reset: () => set(initialState),
  }), {
    name: 'storefront-store',
  })
);
