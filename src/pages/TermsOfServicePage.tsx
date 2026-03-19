export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using SellerHub, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
          <p className="text-muted-foreground">
            Permission is granted to temporarily use SellerHub for personal or commercial business purposes subject to the restrictions in these terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Seller Responsibilities</h2>
          <p className="text-muted-foreground">
            As a seller, you are responsible for maintaining accurate product listings, fulfilling orders promptly, and providing quality products to customers.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Prohibited Activities</h2>
          <p className="text-muted-foreground">
            You may not use the platform for illegal purposes, sell prohibited items, or engage in fraudulent activities.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Termination</h2>
          <p className="text-muted-foreground">
            We reserve the right to terminate or suspend your account at any time for violations of these terms.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Contact</h2>
          <p className="text-muted-foreground">
            For questions about these Terms, please contact us at support@sellerhub.ng
          </p>
        </div>
      </div>
    </div>
  );
}
