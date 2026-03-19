export default function Experience() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The SellerHub Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building the future of e-commerce in Nigeria, one seller at a time.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Setup</h3>
            <p className="text-sm text-muted-foreground">Get your store running in under 10 minutes</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">BNPL Options</h3>
            <p className="text-sm text-muted-foreground">Let customers buy now and pay later</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Growth Tools</h3>
            <p className="text-sm text-muted-foreground">Analytics and insights to grow faster</p>
          </div>
        </div>
      </div>
    </section>
  );
}
