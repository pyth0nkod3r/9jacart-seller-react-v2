import type { RegistrationStep3Data } from '@/types';

export const createRegistrationFormData = (data: RegistrationStep3Data): FormData => {
  const formData = new FormData();
  formData.append('emailAddress', data.emailAddress);
  formData.append('businessRegNumber', data.businessRegNumber);
  formData.append('storeName', data.storeName);
  formData.append('businessAddress', data.businessAddress);
  formData.append('taxIdNumber', data.taxIdNumber);
  formData.append('idDocument', data.idDocument);
  formData.append('businessRegCertificate', data.businessRegCertificate);
  return formData;
};

export const validateRegistrationDocument = (file: File): string | null => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf'
  ];
  if (!allowedTypes.includes(file.type)) {
    return 'Please select a valid document file (JPEG, PNG, WebP, or PDF)';
  }
  if (file.size > maxSize) {
    return 'Document size must be less than 10MB';
  }
  return null;
};

export const validateRegistrationDocuments = (
  idDocument: File | null,
  businessRegCertificate: File | null
): string[] => {
  const errors: string[] = [];
  if (!idDocument) {
    errors.push('ID document is required');
  } else {
    const idError = validateRegistrationDocument(idDocument);
    if (idError) {
      errors.push(`ID Document: ${idError}`);
    }
  }
  if (!businessRegCertificate) {
    errors.push('Business registration certificate is required');
  } else {
    const certError = validateRegistrationDocument(businessRegCertificate);
    if (certError) {
      errors.push(`Business Certificate: ${certError}`);
    }
  }
  return errors;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('0')) {
    return '+234' + cleaned.substring(1);
  }
  if (cleaned.startsWith('234')) {
    return '+' + cleaned;
  }
  if (cleaned.startsWith('+234')) {
    return cleaned;
  }
  return '+234' + cleaned;
};
