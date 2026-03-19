import { useState, useRef } from 'react';
import { validateProductImage, createImagePreview, revokeImagePreview } from '@/lib/imageUpload.utils';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  disabled?: boolean;
  disabledMessage?: string;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  disabled = false,
  disabledMessage,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (images.length + newFiles.length >= maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      const validationError = validateProductImage(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      newFiles.push(file);
      newPreviews.push(createImagePreview(file));
    });

    if (newFiles.length > 0) {
      onImagesChange([...images, ...newFiles]);
      setPreviews([...previews, ...newPreviews]);
      setError(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    if (previews[index]) {
      revokeImagePreview(previews[index]);
    }
    
    onImagesChange(newImages);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        multiple
        className="hidden"
        disabled={disabled}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || images.length >= maxImages}
        className={cn(
          "w-full px-4 py-6 border-2 border-dashed rounded-lg transition-colors",
          disabled || images.length >= maxImages
            ? "border-gray-200 bg-gray-50 cursor-not-allowed"
            : "border-primary hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm font-medium text-foreground">
            Click to upload images
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {images.length}/{maxImages} images selected
          </p>
        </div>
      </button>

      {disabled && disabledMessage && (
        <p className="text-sm text-orange-600">{disabledMessage}</p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
