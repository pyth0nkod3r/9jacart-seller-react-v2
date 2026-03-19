export interface User {
  userId?: string;
  vendorId?: string;
  fullName: string;
  emailAddress: string;
  phoneNumber?: string;
  businessName?: string;
  storeName?: string;
  businessCategory?: string;
  avatarUrl?: string;
  location?: string;
  isSuspended?: boolean | number | string;
  isActive?: boolean | number | string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  emailAddress: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  message?: string;
}

export interface RegisterRequest {
  emailAddress: string;
  password: string;
  fullName: string;
  businessName: string;
  businessCategory: string;
  phoneNumber: string;
  businessRegNumber: string;
  storeName: string;
  businessAddress: string;
  taxIdNumber: string;
  idDocument: File;
  businessRegCertificate: File;
}

export interface RegisterResponse {
  user: User;
  token: string;
  message?: string;
}

export interface ForgotPasswordResponse {
  message: string;
  identifier: string;
  verificationId: string;
}
