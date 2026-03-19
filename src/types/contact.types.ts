export interface ContactFormData {
  fullName: string;
  emailAddress: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  fullName?: string;
  emailAddress?: string;
  subject?: string;
  message?: string;
}

export interface ContactSubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export interface ContactMessageRequest {
  subject: string;
  message: string;
}

export interface ContactVendorRequest {
  vendorId: string;
  name: string;
  email: string;
  message: string;
}
