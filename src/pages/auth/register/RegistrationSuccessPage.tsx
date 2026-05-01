import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Registration Successful!
          </h1>

          <p className="text-muted-foreground mb-6">
            Your seller account has been created successfully. You can now access your dashboard and start managing your store.
          </p>

          <Link
            to="/login"
            className="inline-block w-full px-6 py-3 bg-brand-accent text-primary rounded-md hover:bg-brand-accent/90 transition-colors font-medium"
          >
            Continue to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
