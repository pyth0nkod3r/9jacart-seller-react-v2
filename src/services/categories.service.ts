import { delay, mockCategories } from '@/lib/mock-data';
import type { Category } from '@/types';

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    await delay(200);
    return mockCategories;
  },
};
