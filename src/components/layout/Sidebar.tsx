import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useBusinessLogo } from '@/hooks/useBusinessLogo';
import { useTheme, useNavigation, useFeatures } from '@/providers/ThemeProvider';
import Logo from '@/assets/logo.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const { logoUrl } = useBusinessLogo();
  const { brand } = useTheme();
  const navigation = useNavigation();
  const features = useFeatures();
  const [logoError, setLogoError] = useState(false);

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    setLogoError(false);
  }, [logoUrl]);

  // Filter navigation items based on features
  const filteredNav = navigation.dashboardNav.filter((item) => {
    if (item.href.includes('analytics') && !features.enableAnalytics) return false;
    if (item.href.includes('storefront') && !features.enableStorefront) return false;
    if (item.href.includes('notifications') && !features.enableNotifications) return false;
    if (item.href.includes('contact-admin') && !features.enableContactSupport) return false;
    if (item.href.includes('settings') && !features.enableSettings) return false;
    return true;
  });

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 w-[260px] min-h-screen transform transition-transform duration-300 ease-in-out flex flex-col
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{
        backgroundColor: 'var(--sidebar)',
        color: 'var(--sidebar-foreground)',
      }}
    >
      {/* Header — matches Bootstrap: .sidebar-brand { padding: 1.5rem; font-size: 1.5rem; font-weight: 700 } */}
      <div
        className="flex items-center justify-between px-6 py-6"
      >
        <Link to="/dashboard" className="flex items-center space-x-2" onClick={onClose}>
          <img src={Logo} alt={`${brand.name} Logo`} className="h-10 w-10" />
          <span className="text-2xl font-bold text-white">{brand.name}</span>
        </Link>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md"
          style={{ color: 'var(--sidebar-foreground)' }}
        >
          <span className="text-xl">✕</span>
        </button>
      </div>

      {/* Navigation — matches Bootstrap: .sidebar .nav-link { padding: 0.75rem 1.25rem; border-radius: var(--radius); margin: 0.25rem 0.75rem } */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: isActive ? 'var(--sidebar-primary)' : undefined,
                color: isActive ? 'white' : 'var(--sidebar-foreground)',
                margin: '0.25rem 0',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '';
                }
              }}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile — matches Bootstrap sidebar footer */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ backgroundColor: 'var(--sidebar-primary)', border: '2px solid var(--sidebar-primary)' }}
          >
            {logoUrl && !logoError ? (
              <img
                src={logoUrl}
                alt="Business Logo"
                className="w-full h-full object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-sm font-medium text-white">
                {user ? getInitials(user.fullName) : 'U'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate text-white"
            >
              {user?.fullName || 'User'}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: 'var(--sidebar-foreground)', opacity: 0.7 }}
            >
              {user?.storeName || user?.businessName || 'Store'}
            </p>
            <p
              className="text-xs truncate"
              style={{ color: 'var(--sidebar-foreground)', opacity: 0.5 }}
            >
              {user?.emailAddress || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
