export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            SellerHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect information you provide directly, such as your name, email address, phone number, business information, and payment details when you register or use our services.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            We use your information to provide and maintain our service, process transactions, communicate with you, and improve our platform.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at support@sellerhub.ng
          </p>
        </div>
      </div>
    </div>
  );
}
