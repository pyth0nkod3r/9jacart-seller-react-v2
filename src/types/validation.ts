// Contact form validation utilities
import type { ContactFormData, ContactFormErrors } from '@/types';

export const validateContactField = (fieldName: string, value: string): string | undefined => {
  switch (fieldName) {
    case 'fullName':
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Full name must be at least 2 characters';
      return undefined;

    case 'emailAddress':
      if (!value.trim()) return 'Email address is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
      return undefined;

    case 'subject':
      if (!value.trim()) return 'Subject is required';
      if (value.trim().length < 3) return 'Subject must be at least 3 characters';
      return undefined;

    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      return undefined;

    default:
      return undefined;
  }
};

export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const fullNameError = validateContactField('fullName', data.fullName);
  if (fullNameError) errors.fullName = fullNameError;

  const emailError = validateContactField('emailAddress', data.emailAddress);
  if (emailError) errors.emailAddress = emailError;

  const subjectError = validateContactField('subject', data.subject);
  if (subjectError) errors.subject = subjectError;

  const messageError = validateContactField('message', data.message);
  if (messageError) errors.message = messageError;

  return errors;
};
