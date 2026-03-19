import type { Product } from '@/types';

export const isProductActive = (isActive: Product['isActive']): boolean => {
  if (isActive === true || isActive === '1' || isActive === 1) return true;
  return false;
};

export const getProductStatus = (product: Product): 'active' | 'deactivated' | 'out_of_stock' | 'archived' => {
  // Check if archived first
  const isArchived = (product as unknown as Record<string, unknown>).isArchived;
  if (isArchived) return 'archived';
  
  // Check stock
  if (parseInt(product.stock) <= 0) return 'out_of_stock';
  
  // Check active status
  if (isProductActive(product.isActive)) return 'active';
  
  return 'deactivated';
};

export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(numPrice);
};

export const calculateDiscountPrice = (
  unitPrice: string,
  discountType: string,
  discountValue: string
): number => {
  const price = parseFloat(unitPrice);
  const discount = parseFloat(discountValue);
  
  if (discountType === '0' || !discount) return price;
  
  if (discountType === '1') {
    // Percentage discount
    return price - (price * discount / 100);
  }
  
  if (discountType === '2') {
    // Fixed discount
    return Math.max(0, price - discount);
  }
  
  return price;
};
