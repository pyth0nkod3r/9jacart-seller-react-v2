export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REMEMBER_ME: 'remember_me',
  SESSION_START_TIME: 'session_start_time',
  ARCHIVED_PRODUCTS: 'archived_product_ids',
} as const;

export const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

export const DEFAULT_COMMISSION_PERCENTAGE = 5; // Default 5% commission until API provides value
