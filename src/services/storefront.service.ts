/**
 * Storefront Service (Mock)
 * 
 * All API calls replaced with mock data.
 */

import { 
  delay, 
  mockProducts, 
  mockCategories, 
  mockStorefrontProducts,
  IMAGES 
} from '@/lib/mock-data';
import type { StorefrontProduct, StorefrontCategory } from '@/types';

export const storefrontService = {
  async getProducts(query?: {
    page?: number;
    perPage?: number;
    categoryId?: string;
    search?: string;
  }): Promise<{
    data: StorefrontProduct[];
    pagination: {
      currentPage: number;
      perPage: number;
      totalPages: number;
      totalItems: number;
    };
  }> {
    await delay(400);

    let filtered = mockProducts.filter(p => p.isActive);

    if (query?.categoryId) {
      filtered = filtered.filter(p => p.categoryId === query.categoryId);
    }

    if (query?.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.productName.toLowerCase().includes(search) ||
          p.productDescription.toLowerCase().includes(search)
      );
    }

    const page = query?.page || 1;
    const perPage = query?.perPage || 12;
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const start = (page - 1) * perPage;

    const storefrontProducts: StorefrontProduct[] = filtered
      .slice(start, start + perPage)
      .map(p => ({
        productId: p.productId,
        productName: p.productName,
        productDescription: p.productDescription,
        unitPrice: parseFloat(p.unitPrice),
        discountPrice: parseFloat(p.discountPrice) || parseFloat(p.unitPrice),
        images: p.images,
        categoryName: p.categoryName,
        inStock: parseInt(p.stock) > 0,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100) + 5,
      }));

    return {
      data: storefrontProducts,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalItems,
      },
    };
  },

  async getBestSellers(): Promise<StorefrontProduct[]> {
    await delay(300);

    return mockProducts
      .filter(p => p.isActive)
      .slice(0, 4)
      .map(p => ({
        productId: p.productId,
        productName: p.productName,
        productDescription: p.productDescription,
        unitPrice: parseFloat(p.unitPrice),
        discountPrice: parseFloat(p.discountPrice) || parseFloat(p.unitPrice),
        images: p.images,
        categoryName: p.categoryName,
        inStock: parseInt(p.stock) > 0,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100) + 5,
      }));
  },

  async getCategories(): Promise<StorefrontCategory[]> {
    await delay(200);

    return mockCategories.map(cat => ({
      id: cat.id,
      categoryName: cat.categoryName,
      description: cat.description,
      image: cat.image || IMAGES.placeholder,
      productCount: mockProducts.filter(p => p.categoryId === cat.id && p.isActive).length,
    }));
  },

  async getProduct(productId: string): Promise<StorefrontProduct | null> {
    await delay(300);

    const product = mockProducts.find(p => p.productId === productId && p.isActive);
    if (!product) return null;

    return {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      unitPrice: parseFloat(product.unitPrice),
      discountPrice: parseFloat(product.discountPrice) || parseFloat(product.unitPrice),
      images: product.images,
      categoryName: product.categoryName,
      inStock: parseInt(product.stock) > 0,
      rating: 4 + Math.random(),
      reviewCount: Math.floor(Math.random() * 100) + 5,
    };
  },

  async sendContactMessage(_data: {
    vendorId: string;
    name: string;
    email: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    await delay(500);
    return { success: true, message: 'Message sent successfully' };
  },

  async getStorefrontSettings(): Promise<{
    storeName: string;
    description: string;
    logo: string | null;
    banner: string | null;
    socialLinks: { platform: string; url: string }[];
  }> {
    await delay(300);

    return {
      storeName: 'Adeyemi Tech Hub',
      description: 'Your one-stop shop for premium electronics and accessories in Nigeria.',
      logo: IMAGES.logos[0],
      banner: IMAGES.hero,
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/adeyemitech' },
        { platform: 'twitter', url: 'https://twitter.com/adeyemitech' },
        { platform: 'facebook', url: 'https://facebook.com/adeyemitech' },
      ],
    };
  },

  async updateStorefrontSettings(data: Partial<{
    storeName: string;
    description: string;
    logo: File;
    banner: File;
  }>): Promise<{ success: boolean }> {
    await delay(500);
    console.log('Updating storefront:', data);
    return { success: true };
  },
};
