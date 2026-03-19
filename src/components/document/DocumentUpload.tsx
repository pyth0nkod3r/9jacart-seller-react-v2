import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { validateRegistrationDocument } from '@/lib/registration.utils';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  required?: boolean;
  disabled?: boolean;
}

export function DocumentUpload({
  label,
  file,
  onFileChange,
  required = false,
  disabled = false,
}: DocumentUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validationError = validateRegistrationDocument(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onFileChange(selectedFile);
  };

  const handleRemove = () => {
    onFileChange(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
        onChange={handleFileSelect}
        disabled={disabled || !!file}
        className="hidden"
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={cn(
            "w-full px-4 py-8 border-2 border-dashed rounded-lg transition-colors text-center",
            disabled
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-primary hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <div className="text-2xl mb-2">📄</div>
          <p className="text-sm font-medium text-foreground">Click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">
            JPG, PNG, WebP, or PDF (max 10MB)
          </p>
        </button>
      ) : (
        <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-secondary/50">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <span className="text-sm text-foreground truncate max-w-[200px]">{file.name}</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className="p-1 hover:bg-red-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
