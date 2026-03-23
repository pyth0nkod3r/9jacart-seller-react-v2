import { useEffect, useState } from 'react';
import { useVendorProfile } from '@/hooks/useDashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { ProfileImageUpload } from '@/components/profile/ProfileImageUpload';
import { popup } from '@/lib/popup';

type SettingsTab = 'profile' | 'store' | 'payment' | 'notifications' | 'security';

const TABS: { id: SettingsTab; label: string; icon: string }[] = [
  { id: 'profile', label: 'Profile', icon: 'bi-person' },
  { id: 'store', label: 'Store Settings', icon: 'bi-shop' },
  { id: 'payment', label: 'Payment Settings', icon: 'bi-credit-card' },
  { id: 'notifications', label: 'Notifications', icon: 'bi-bell' },
  { id: 'security', label: 'Security', icon: 'bi-shield-lock' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
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
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Sidebar Tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors border-b border-border last:border-b-0 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                <i className={`bi ${tab.icon}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileTab profile={profile} fetchProfile={fetchProfile} />}
          {activeTab === 'store' && <StoreTab profile={profile} />}
          {activeTab === 'payment' && <PaymentTab profile={profile} />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Profile Tab
// ---------------------------------------------------------------------------
function ProfileTab({ profile, fetchProfile }: { profile: any; fetchProfile: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (profile) {
      const nameParts = (profile.account.fullName || '').split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(profile.account.emailAddress || '');
      setPhone(profile.account.phoneNumber || '');
      setAddress(profile.business.businessAddress || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    popup.success('Settings saved successfully!');
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <ProfileImageUpload
              currentImageUrl={profile?.account.profileImage}
              onUploadSuccess={fetchProfile}
              storeName={profile?.business.storeName}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-1">Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-check-lg" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Store Settings Tab
// ---------------------------------------------------------------------------
function StoreTab({ profile }: { profile: any }) {
  const [storeName, setStoreName] = useState('');
  const [storeDescription, setStoreDescription] = useState('Your one-stop shop for quality products at affordable prices.');
  const [businessCategory, setBusinessCategory] = useState('General Merchandise');

  useEffect(() => {
    if (profile) {
      setStoreName(profile.business.storeName || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    popup.success('Settings saved successfully!');
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Store Settings</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Store Description</label>
            <textarea
              rows={3}
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Business Category</label>
            <select
              value={businessCategory}
              onChange={(e) => setBusinessCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Living</option>
              <option>Food & Beverages</option>
              <option>General Merchandise</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-1">Store Logo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-primary file:text-primary-foreground"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-check-lg" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Payment Settings Tab
// ---------------------------------------------------------------------------
function PaymentTab({ profile }: { profile: any }) {
  const [bankName, setBankName] = useState('First Bank of Nigeria');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    if (profile?.accountInfo) {
      setBankName(profile.accountInfo.bank || 'First Bank of Nigeria');
      setAccountNumber(profile.accountInfo.accountNumber || '');
      setAccountName(profile.accountInfo.accountName || '');
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    popup.success('Settings saved successfully!');
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Payment Settings</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Bank Name</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>First Bank of Nigeria</option>
              <option>GTBank</option>
              <option>Access Bank</option>
              <option>UBA</option>
              <option>Zenith Bank</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md flex items-start gap-2">
            <i className="bi bi-info-circle text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Payments will be settled to this account within 48 hours of order delivery.
            </p>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-check-lg" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Notifications Tab
// ---------------------------------------------------------------------------
function NotificationsTab() {
  const [emailOrders, setEmailOrders] = useState(true);
  const [emailPayments, setEmailPayments] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    popup.success('Settings saved successfully!');
  };

  const toggles = [
    { label: 'Email notifications for new orders', checked: emailOrders, onChange: setEmailOrders },
    { label: 'Email notifications for payments', checked: emailPayments, onChange: setEmailPayments },
    { label: 'SMS notifications for urgent updates', checked: smsNotifications, onChange: setSmsNotifications },
    { label: 'Low stock alerts', checked: stockAlerts, onChange: setStockAlerts },
    { label: 'Marketing and promotional emails', checked: marketingEmails, onChange: setMarketingEmails },
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {toggles.map((toggle, idx) => (
            <div key={idx} className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={toggle.checked}
                    onChange={(e) => toggle.onChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-primary transition-colors" />
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="text-sm text-foreground">{toggle.label}</span>
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-check-lg" />
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Security Tab
// ---------------------------------------------------------------------------
function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      popup.error('Passwords do not match');
      return;
    }
    popup.success('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-card rounded-lg border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <i className="bi bi-key" />
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>

          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <div className="relative">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-primary transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-sm text-foreground">Enable Two-Factor Authentication</span>
          </label>

          <button
            type="button"
            className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2"
          >
            <i className="bi bi-shield-check" />
            Setup 2FA
          </button>
        </div>
      </div>
    </div>
  );
}
