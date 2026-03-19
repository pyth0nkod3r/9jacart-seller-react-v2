export default function Incentive() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Sellers Love Us
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're committed to helping Nigerian entrepreneurs succeed in e-commerce.
            Our platform is designed to make selling easy, profitable, and stress-free.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-1">0%</div>
              <div className="text-sm text-muted-foreground">Setup Fee</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-1">Fast</div>
              <div className="text-sm text-muted-foreground">Payouts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
