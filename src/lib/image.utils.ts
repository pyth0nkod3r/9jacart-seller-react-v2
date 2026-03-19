import { environment } from '@/config/environment';

export const formatImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  if (imageUrl.startsWith('/')) {
    return `${environment.apiBaseUrl}${imageUrl}`;
  }
  return `${environment.apiBaseUrl}/${imageUrl}`;
};

export const formatImageUrls = (imageUrls: string[]): string[] => {
  return imageUrls.map(formatImageUrl).filter(Boolean);
};

export const getPlaceholderImage = (width = 300, height = 300): string => {
  return `https://via.placeholder.com/${width}x${height}/e5e7eb/9ca3af?text=No+Image`;
};

export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
