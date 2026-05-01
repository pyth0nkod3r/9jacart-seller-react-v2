import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useBusinessCategories } from '@/hooks/useBusinessCategories';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { DocumentUpload } from '@/components/document/DocumentUpload';
import { validateRegistrationDocuments } from '@/lib/registration.utils';
import type { RegistrationFormData } from '@/types';

const STEPS = [
  { id: 1, title: 'Account', description: 'Email & Password' },
  { id: 2, title: 'Personal', description: 'Your details' },
  { id: 3, title: 'Business', description: 'Business info' },
  { id: 4, title: 'Documents', description: 'Upload files' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, clearError, isAuthenticated } = useAuth();
  const { categories, fetchCategories, isLoading: categoriesLoading } = useBusinessCategories();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    emailAddress: '',
    password: '',
    fullName: '',
    businessName: '',
    businessCategory: '',
    phoneNumber: '',
    businessRegNumber: '',
    storeName: '',
    businessAddress: '',
    taxIdNumber: '',
    idDocument: undefined as unknown as File,
    businessRegCertificate: null,
  });
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.emailAddress.trim()) {
          errors.emailAddress = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
          errors.emailAddress = 'Please enter a valid email';
        }
        if (!formData.password) {
          errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        }
        break;
      case 2:
        if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
        if (!formData.businessName.trim()) errors.businessName = 'Business name is required';
        if (!formData.businessCategory) errors.businessCategory = 'Business category is required';
        if (!formData.phoneNumber.trim()) {
          errors.phoneNumber = 'Phone number is required';
        }
        break;
      case 3:
        if (!formData.businessRegNumber.trim()) errors.businessRegNumber = 'Business registration number is required';
        if (!formData.storeName.trim()) errors.storeName = 'Store name is required';
        if (!formData.businessAddress.trim()) errors.businessAddress = 'Business address is required';
        if (!formData.taxIdNumber.trim()) errors.taxIdNumber = 'Tax ID is required';
        break;
      case 4:
        const docErrors = validateRegistrationDocuments(formData.idDocument, formData.businessRegCertificate);
        if (docErrors.length > 0) {
          errors.documents = docErrors.join(', ');
        }
        break;
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setSubmitError(null);
    clearError();

    try {
    await register(formData as any);
      navigate('/register/success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const updateFormData = (field: keyof RegistrationFormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepErrors[field]) {
      setStepErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">SellerHub</h1>
          </Link>
          <p className="mt-2 text-muted-foreground">Create your seller account</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          {submitError && <ErrorMessage message={submitError} className="mb-6" />}

          {currentStep === 1 && (
            <Step1EmailPassword
              formData={formData}
              errors={stepErrors}
              onChange={updateFormData}
              isLoading={isLoading}
            />
          )}

          {currentStep === 2 && (
            <Step2BasicInfo
              formData={formData}
              errors={stepErrors}
              categories={categories}
              categoriesLoading={categoriesLoading}
              onChange={updateFormData}
              isLoading={isLoading}
            />
          )}

          {currentStep === 3 && (
            <Step3BusinessInfo
              formData={formData}
              errors={stepErrors}
              onChange={updateFormData}
              isLoading={isLoading}
            />
          )}

          {currentStep === 4 && (
            <Step4Documents
              formData={formData}
              errors={stepErrors}
              onChange={updateFormData}
              isLoading={isLoading}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || isLoading}
              className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="px-6 py-2 bg-brand-accent text-primary rounded-md hover:bg-brand-accent/90 disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-6 py-2 bg-brand-accent text-primary rounded-md hover:bg-brand-accent/90 disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

// Step Components
function Step1EmailPassword({
  formData,
  errors,
  onChange,
  isLoading,
}: {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationFormData, value: string | File | null) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Account Details</h2>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Email Address *</label>
        <input
          type="email"
          value={formData.emailAddress}
          onChange={(e) => onChange('emailAddress', e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        {errors.emailAddress && <p className="mt-1 text-sm text-red-600">{errors.emailAddress}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Password *</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => onChange('password', e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        <p className="mt-1 text-xs text-muted-foreground">Minimum 8 characters</p>
      </div>
    </div>
  );
}

function Step2BasicInfo({
  formData,
  errors,
  categories,
  categoriesLoading,
  onChange,
  isLoading,
}: {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  categories: { id: string; categoryName: string }[];
  categoriesLoading: boolean;
  onChange: (field: keyof RegistrationFormData, value: string | File | null) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Business Name *</label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Business Category *</label>
        <select
          value={formData.businessCategory}
          onChange={(e) => onChange('businessCategory', e.target.value)}
          disabled={isLoading || categoriesLoading}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
        {errors.businessCategory && <p className="mt-1 text-sm text-red-600">{errors.businessCategory}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Phone Number *</label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
          disabled={isLoading}
          placeholder="+234 800 000 0000"
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
      </div>
    </div>
  );
}

function Step3BusinessInfo({
  formData,
  errors,
  onChange,
  isLoading,
}: {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationFormData, value: string | File | null) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Business Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Business Registration Number *</label>
          <input
            type="text"
            value={formData.businessRegNumber}
            onChange={(e) => onChange('businessRegNumber', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          {errors.businessRegNumber && <p className="mt-1 text-sm text-red-600">{errors.businessRegNumber}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Store Name *</label>
          <input
            type="text"
            value={formData.storeName}
            onChange={(e) => onChange('storeName', e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          {errors.storeName && <p className="mt-1 text-sm text-red-600">{errors.storeName}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Business Address *</label>
        <textarea
          value={formData.businessAddress}
          onChange={(e) => onChange('businessAddress', e.target.value)}
          disabled={isLoading}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 resize-none"
        />
        {errors.businessAddress && <p className="mt-1 text-sm text-red-600">{errors.businessAddress}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Tax ID Number *</label>
        <input
          type="text"
          value={formData.taxIdNumber}
          onChange={(e) => onChange('taxIdNumber', e.target.value)}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        {errors.taxIdNumber && <p className="mt-1 text-sm text-red-600">{errors.taxIdNumber}</p>}
      </div>
    </div>
  );
}

function Step4Documents({
  formData,
  errors,
  onChange,
  isLoading,
}: {
  formData: RegistrationFormData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationFormData, value: string | File | null) => void;
  isLoading: boolean;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Upload Documents</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Please upload clear copies of your identification and business registration documents.
      </p>

      <DocumentUpload
        label="ID Document"
        file={formData.idDocument}
        onFileChange={(file) => onChange('idDocument', file)}
        required
        disabled={isLoading}
      />

      <DocumentUpload
        label="Business Registration Certificate"
        file={formData.businessRegCertificate}
        onFileChange={(file) => onChange('businessRegCertificate', file)}
        required
        disabled={isLoading}
      />

      {errors.documents && <p className="text-sm text-red-600">{errors.documents}</p>}
    </div>
  );
}
