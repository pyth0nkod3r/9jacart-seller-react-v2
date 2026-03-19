import { environment } from '@/config/environment';

export const getVendorStorefrontUrl = (vendorId: string): string => {
  return `${environment.buyerAppUrl}/store/${vendorId}`;
};
