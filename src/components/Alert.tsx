import { cn } from '@/lib/utils';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success';
  className?: string;
}

export function Alert({ children, variant = 'default', className }: AlertProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        {
          'bg-background text-foreground': variant === 'default',
          'border-red-200 bg-red-50 text-red-700': variant === 'destructive',
          'border-green-200 bg-green-50 text-green-700': variant === 'success',
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function AlertTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)}>{children}</h5>;
}

export function AlertDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('text-sm [&_p]:leading-relaxed', className)}>{children}</div>;
}
