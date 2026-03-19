import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { sessionStartTimeStorage } from '@/lib/auth.utils';
import { SESSION_TIMEOUT_MS } from '@/lib/constants';

/**
 * Hook to check session timeout and automatically logout user after 1 hour
 */
export function useSessionTimeout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const checkCountRef = useRef(0);
  const isLoggingOutRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      checkCountRef.current = 0;
      isLoggingOutRef.current = false;
      return;
    }

    if (isLoggingOutRef.current) {
      return;
    }

    if (location.pathname === '/login') {
      return;
    }

    const checkSessionTimeout = async () => {
      const sessionStartTime = sessionStartTimeStorage.get();

      if (!sessionStartTime) {
        checkCountRef.current++;
        if (checkCountRef.current >= 3) {
          console.warn('⚠️ No session start time found after multiple checks, logging out for safety');
          isLoggingOutRef.current = true;
          await logout();
          navigate('/login', { replace: true });
        }
        return;
      }

      checkCountRef.current = 0;
      const currentTime = Date.now();
      const elapsedTime = currentTime - sessionStartTime;

      // If 1 hour has passed, logout silently
      if (elapsedTime >= SESSION_TIMEOUT_MS) {
        console.log('⏰ Session expired after 1 hour, logging out...');
        isLoggingOutRef.current = true;
        await logout();
        navigate('/login', { replace: true });
      }
    };

    const initialDelay = checkCountRef.current === 0 ? 2000 : 0;
    const timeoutId = setTimeout(() => {
      checkSessionTimeout();
    }, initialDelay);

    const interval = setInterval(checkSessionTimeout, 30000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [isAuthenticated, logout, navigate, location.pathname]);
}
