import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Order, OrderItem, OrdersMetrics, OrdersQuery, Pagination } from "@/types";

interface OrdersState {
  orders: Order[];
  metrics: OrdersMetrics | null;
  orderItems: OrderItem[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  query: OrdersQuery;
}

interface OrdersStore extends OrdersState {
  fetchOrders: (query?: Partial<OrdersQuery>) => Promise<void>;
  fetchOrderItems: (orderId: string) => Promise<void>;
  fetchMetrics: () => Promise<void>;
  setQuery: (query: Partial<OrdersQuery>) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState: OrdersState = {
  orders: [],
  metrics: null,
  orderItems: [],
  pagination: null,
  isLoading: false,
  error: null,
  query: {
    page: 1,
    perPage: 10,
    status: 'all',
    sortBy: 'recent',
  },
};

export const useOrdersStore = create<OrdersStore>()(
  devtools((set, get) => ({
    ...initialState,

    fetchOrders: async (queryPayload?: Partial<OrdersQuery>) => {
      set({ isLoading: true, error: null });
      try {
        const currentQuery = { ...get().query, ...queryPayload };

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));

        set({
          orders: [],
          pagination: {
            currentPage: currentQuery.page || 1,
            perPage: currentQuery.perPage || 10,
            totalPages: 1,
            totalItems: 0,
          },
          query: currentQuery,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch orders";
        set({
          orders: [],
          isLoading: false,
          error: message,
        });
      }
    },

    fetchMetrics: async () => {
      try {
        set({ metrics: { totalOrders: 0, deliveredOrders: 0, returnedOrders: 0, cancelledOrders: 0, pendingOrders: 0 } });
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    },

    fetchOrderItems: async (_orderId: string) => {
      set({ isLoading: true, error: null });
      try {
        set({
          orderItems: [],
          isLoading: false,
          error: null,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch order items";
        set({
          orderItems: [],
          isLoading: false,
          error: message,
        });
      }
    },

    setQuery: (payload) =>
      set((state) => {
        const newQuery = { ...state.query, ...payload };
        return { query: newQuery };
      }),

    clearError: () => set({ error: null }),

    reset: () => set(initialState),
  }), {
    name: 'orders-store',
  })
);
