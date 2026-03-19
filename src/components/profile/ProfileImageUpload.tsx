import { useState } from 'react';
import { popup } from '@/lib/popup';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  onUploadSuccess: () => void;
  disabled?: boolean;
  storeName?: string;
}

export function ProfileImageUpload({
  currentImageUrl,
  onUploadSuccess,
  disabled = false,
  storeName,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      popup.success('Profile image updated successfully!');
      onUploadSuccess();
    } catch (err) {
      popup.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground mb-2">Profile Image</label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
          {currentImageUrl ? (
            <img src={currentImageUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl text-muted-foreground">{storeName?.charAt(0) || '?'}</span>
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleUpload}
            disabled={disabled || isUploading}
            className="hidden"
            id="profile-image"
          />
          <label
            htmlFor="profile-image"
            className={`px-4 py-2 text-sm border border-border rounded-md cursor-pointer hover:bg-accent ${
              disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? 'Uploading...' : 'Change Image'}
          </label>
        </div>
      </div>
    </div>
  );
}
