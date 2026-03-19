export default function FAQs() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We've got answers.
          </p>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">How do I become a seller?</h3>
            <p className="text-muted-foreground">Simply create an account, complete your profile, and start adding products. It takes less than 10 minutes.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">What are the fees?</h3>
            <p className="text-muted-foreground">We charge a small commission on each sale. No setup fees, no monthly costs. Pay only when you sell.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">How do I receive payments?</h3>
            <p className="text-muted-foreground">Payments are deposited directly to your Nigerian bank account within 24-48 hours after order delivery.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Do I need a registered business?</h3>
            <p className="text-muted-foreground">While a registered business is preferred, individuals can also sell on our platform. We verify all sellers for buyer protection.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
