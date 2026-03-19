import { tokenStorage, userStorage, setRememberMe } from '@/lib/auth.utils';
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types';

export interface LoginOptions {
  rememberMe?: boolean;
}

export interface ForgotPasswordResponse {
  message: string;
  identifier: string;
  verificationId: string;
}

export const authService = {
  async login(credentials: LoginRequest, options?: LoginOptions): Promise<LoginResponse> {
    if (options?.rememberMe !== undefined) {
      setRememberMe(options.rememberMe);
    }

    const mockResponse: LoginResponse = {
      user: {
        userId: 'vendor-mock-001',
        vendorId: 'vendor-mock-001',
        fullName: 'Chukwuemeka Adeyemi',
        emailAddress: credentials.emailAddress,
        phoneNumber: '08012345678',
        businessName: 'Adeyemi Electronics',
        storeName: 'Adeyemi Store',
        businessCategory: 'Electronics',
        isSuspended: false,
        isActive: true,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };

    tokenStorage.set(mockResponse.token);
    userStorage.set(mockResponse.user);

    return mockResponse;
  },

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    const mockResponse: LoginResponse = {
      user: {
        userId: 'vendor-new-' + Date.now(),
        vendorId: 'vendor-new-' + Date.now(),
        fullName: userData.fullName,
        emailAddress: userData.emailAddress,
        phoneNumber: userData.phoneNumber,
        businessName: userData.businessName,
        storeName: userData.storeName,
        businessCategory: userData.businessCategory,
        isSuspended: false,
        isActive: true,
      },
      token: 'mock-jwt-token-' + Date.now(),
    };

    tokenStorage.set(mockResponse.token);
    userStorage.set(mockResponse.user);

    return mockResponse;
  },

  async logout(): Promise<void> {
    try {
      // In production, call logout endpoint
    } finally {
      tokenStorage.remove();
      userStorage.remove();
    }
  },

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    return {
      message: 'OTP sent to your email',
      identifier: email,
      verificationId: 'mock-verification-id-' + Date.now(),
    };
  },

  async resetPassword(data: {
    otp: string;
    identifier: string;
    verificationId: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<void> {
    console.log('Reset password:', data);
  },

  getCurrentToken(): string | null {
    return tokenStorage.get();
  },

  getCurrentUser() {
    return userStorage.get();
  },

  isAuthenticated(): boolean {
    const token = tokenStorage.get();
    return !!token;
  },
};
