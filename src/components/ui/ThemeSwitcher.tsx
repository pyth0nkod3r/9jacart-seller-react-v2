/**
 * Theme Switcher Component
 * 
 * A dropdown component to switch between available themes.
 * Displays theme name and indicates current selection.
 */

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Palette, Check, ChevronDown, Grape, Sunset } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeSwitcherProps {
  /** Show theme name next to icon */
  showLabel?: boolean;
  /** Compact mode - only show icon */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Position of dropdown */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

// Theme icons
const themeIcons: Record<string, React.ReactNode> = {
  default: <Sun className="w-4 h-4" />,
  dark: <Moon className="w-4 h-4" />,
  ocean: <Palette className="w-4 h-4" />,
  purple: <Grape className="w-4 h-4" />,
  sunset: <Sunset className="w-4 h-4" />,
};

export default function ThemeSwitcher({
  showLabel = false,
  compact = false,
  className,
  position = 'bottom-right',
}: ThemeSwitcherProps) {
  const { themeId, availableThemes, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle theme selection
  const handleSelectTheme = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Get position classes
  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-md transition-colors',
          compact
            ? 'p-2 hover:bg-secondary'
            : 'px-3 py-2 bg-secondary hover:bg-secondary/80'
        )}
        aria-label="Switch theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {themeIcons[themeId] || <Palette className="w-4 h-4" />}
        {showLabel && !compact && (
          <span className="text-sm font-medium">
            {availableThemes.find((t) => t.id === themeId)?.name || 'Theme'}
          </span>
        )}
        {!compact && (
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              isOpen && 'transform rotate-180'
            )}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[180px] rounded-lg border border-border bg-popover shadow-lg',
            positionClasses[position]
          )}
          role="listbox"
          aria-label="Available themes"
        >
          <div className="p-1">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={cn(
                  'flex items-center w-full gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                  'hover:bg-accent text-foreground',
                  themeId === theme.id && 'bg-accent/50'
                )}
                role="option"
                aria-selected={themeId === theme.id}
              >
                <span className="flex-shrink-0">
                  {themeIcons[theme.id] || <Palette className="w-4 h-4" />}
                </span>
                <span className="flex-1 text-left">{theme.name}</span>
                {themeId === theme.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
                {theme.isDark && (
                  <Moon className="w-3 h-3 text-muted-foreground" />
                )}
              </button>
            ))}
          </div>

          {/* Footer info */}
          <div className="border-t border-border px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Theme preference is saved automatically
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Compact Theme Switcher - Icon only
 */
export function CompactThemeSwitcher({ className }: { className?: string }) {
  return <ThemeSwitcher compact className={className} />;
}

/**
 * Inline Theme Switcher - Shows current theme name
 */
export function InlineThemeSwitcher({ className }: { className?: string }) {
  return <ThemeSwitcher showLabel className={className} />;
}
