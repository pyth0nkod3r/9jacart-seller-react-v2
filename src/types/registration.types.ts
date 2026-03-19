export interface RegistrationStep1Data {
  emailAddress: string;
  password: string;
}

export interface RegistrationStep2Data {
  fullName: string;
  businessName: string;
  businessCategory: string;
  phoneNumber: string;
}

export interface RegistrationStep3Data {
  emailAddress: string;
  businessRegNumber: string;
  storeName: string;
  businessAddress: string;
  taxIdNumber: string;
  idDocument: File;
  businessRegCertificate: File;
}

export interface RegistrationFormData extends RegistrationStep1Data, RegistrationStep2Data {
  businessRegNumber: string;
  storeName: string;
  businessAddress: string;
  taxIdNumber: string;
  idDocument: File | null;
  businessRegCertificate: File | null;
}

export interface RegistrationState {
  currentStep: number;
  formData: RegistrationFormData;
  isSubmitting: boolean;
  error: string | null;
  isRegistrationComplete: boolean;
}
