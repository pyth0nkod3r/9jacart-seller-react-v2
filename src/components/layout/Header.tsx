import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useSuspensionCheck } from '@/hooks/useSuspensionCheck';
import { useFeatures } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { isSuspended } = useSuspensionCheck();
  const features = useFeatures();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-secondary"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {isSuspended && (
            <div className="hidden sm:block px-3 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
              Account Suspended
            </div>
          )}

          {/* Theme Switcher */}
          {features.enableDarkMode && (
            <ThemeSwitcher compact />
          )}

          {/* Notifications */}
          {features.enableNotifications && (
            <Link
              to="/dashboard/notifications"
              className="p-2 rounded-full hover:bg-secondary transition-colors relative"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Link>
          )}

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">
                  {user?.fullName?.charAt(0) || 'U'}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-muted-foreground transition-transform',
                  isProfileOpen && 'transform rotate-180'
                )}
              />
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border z-20">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.emailAddress}
                    </p>
                  </div>
                  <div className="py-1">
                    {features.enableSettings && (
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-secondary"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
