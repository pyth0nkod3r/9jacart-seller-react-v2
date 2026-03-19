import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
} from "axios";

import { popup } from "@/lib/popup";
import { apiConfig } from "./config";
import { tokenStorage, isTokenExpired } from "@/lib/auth.utils";
import { useAuthStore } from "@/stores/authStore";

import type { ApiResponse, ApiError } from "@/types";

import type {
  ApiClientError,
  RequestConfig,
  ExtendedAxiosConfig,
} from "./types";

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(apiConfig);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const extendedConfig = config as ExtendedAxiosConfig;
        const requiresAuth = extendedConfig?.requiresAuth;

        if (requiresAuth) {
          const token = tokenStorage.get();
          if (token && !isTokenExpired(token)) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        return response;
      },
      (error: AxiosError<ApiError>) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError<ApiError>): Promise<never> {
    const apiError: ApiClientError = new Error(
      error.response?.data?.message || error.message || 'An error occurred'
    ) as ApiClientError;

    apiError.status = error.response?.status;
    apiError.data = error.response?.data;
    apiError.response = error.response;

    // Handle 401 errors
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      if (authStore.isAuthenticated) {
        popup.error('Session expired. Please login again.');
        authStore.logout();
      }
    }

    return Promise.reject(apiError);
  }

  async request<T>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.request<ApiResponse<T>>({
      method,
      url,
      data,
      ...config,
      requiresAuth: config?.requiresAuth,
      headers: config?.isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : config?.customHeaders,
    } as ExtendedAxiosConfig);

    return response.data.data as T;
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export const apiClient = new ApiClient();
