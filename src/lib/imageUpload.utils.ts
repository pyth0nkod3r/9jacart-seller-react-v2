export const validateProductImage = (file: File): string | null => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid image file (JPEG, PNG, or WebP)';
  }
  if (file.size > maxSize) {
    return 'Image size must be less than 5MB';
  }
  return null;
};

export const validateProductImages = (files: File[]): string[] => {
  const errors: string[] = [];
  const maxImages = 5;
  if (files.length === 0) {
    errors.push('At least one product image is required');
    return errors;
  }
  if (files.length > maxImages) {
    errors.push(`Maximum ${maxImages} images allowed`);
  }
  files.forEach((file, index) => {
    const error = validateProductImage(file);
    if (error) {
      errors.push(`Image ${index + 1}: ${error}`);
    }
  });
  return errors;
};

export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeImagePreview = (url: string): void => {
  URL.revokeObjectURL(url);
};

export const createImageFormData = (images: File[]): FormData => {
  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append(`productImage[${index}]`, image);
  });
  return formData;
};
