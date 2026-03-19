import { useState, useCallback } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import type { DashboardSummary, VendorProfile } from '@/types';

interface UseDashboardReturn {
  dashboardData: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;
  fetchDashboardSummary: () => Promise<void>;
  refreshDashboard: () => Promise<void>;
}

export const useDashboard = (): UseDashboardReturn => {
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getDashboardSummary();
      setDashboardData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshDashboard = useCallback(async () => {
    await fetchDashboardSummary();
  }, [fetchDashboardSummary]);

  return {
    dashboardData,
    isLoading,
    error,
    fetchDashboardSummary,
    refreshDashboard,
  };
};

interface UseVendorProfileReturn {
  profile: VendorProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<VendorProfile>) => Promise<void>;
  updateAccountInfo: (accountInfo: {
    accountName?: string;
    accountNumber?: string;
    bank?: string;
  }) => Promise<void>;
  changePassword: (params: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export const useVendorProfile = (): UseVendorProfileReturn => {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getVendorProfile();
      setProfile(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (profileData: Partial<VendorProfile>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProfile = await dashboardService.updateVendorProfile(profileData);
      setProfile(updatedProfile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAccountInfo = useCallback(async (accountInfo: {
    accountName?: string;
    accountNumber?: string;
    bank?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProfile = await dashboardService.updateAccountInfo(accountInfo);
      setProfile(updatedProfile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update account information';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (params: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      await dashboardService.changePassword(params);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    refreshProfile,
    updateProfile,
    updateAccountInfo,
    changePassword,
  };
};
