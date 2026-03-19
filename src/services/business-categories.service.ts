import { delay, mockBusinessCategories } from '@/lib/mock-data';
import type { BusinessCategory } from '@/types';

export const businessCategoriesService = {
  async getBusinessCategories(): Promise<BusinessCategory[]> {
    await delay(300);
    return mockBusinessCategories;
  },
};
