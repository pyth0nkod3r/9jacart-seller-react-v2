import { useEffect } from 'react';
import { useVendorProfile } from '@/hooks/useDashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { ProfileImageUpload } from '@/components/profile/ProfileImageUpload';

export default function SettingsPage() {
  const {
    profile,
    isLoading,
    error,
    fetchProfile,
  } = useVendorProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading && !profile) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !profile) {
    return <ErrorMessage message={error} onRetry={fetchProfile} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Account Settings</h2>
        
        <ProfileImageUpload
          currentImageUrl={profile?.account.profileImage}
          onUploadSuccess={fetchProfile}
          storeName={profile?.business.storeName}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={profile?.account.fullName}
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-secondary text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <input
              type="email"
              defaultValue={profile?.account.emailAddress}
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-secondary text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
            <input
              type="tel"
              defaultValue={profile?.account.phoneNumber}
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-secondary text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Business Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Business Name</label>
            <input
              type="text"
              defaultValue={profile?.business.businessName}
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-secondary text-muted-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Store Name</label>
            <input
              type="text"
              defaultValue={profile?.business.storeName}
              disabled
              className="w-full px-3 py-2 border border-border rounded-md bg-secondary text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
