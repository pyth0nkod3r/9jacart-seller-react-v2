import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  return {
    // State
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    // Actions
    login: store.login,
    register: store.register,
    logout: store.logout,
    clearError: store.clearError,
    forgotPassword: store.forgotPassword,
    resetPassword: store.resetPassword,
  };
};
