import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '@/services/dashboard.service';
import { formatImageUrl } from '@/lib/image.utils';

export const useBusinessLogo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogo = useCallback(async () => {
    setIsLoading(true);
    try {
      const logo = await dashboardService.getLogo();
      if (logo) {
        setLogoUrl(formatImageUrl(logo));
      }
    } catch (err) {
      console.error('Failed to fetch logo:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  const refreshLogo = useCallback(async () => {
    await fetchLogo();
  }, [fetchLogo]);

  return {
    logoUrl,
    isLoading,
    refreshLogo,
  };
};
