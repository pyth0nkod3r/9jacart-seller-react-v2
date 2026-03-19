export default function TrailerSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          See How It Works
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Watch our quick demo to see how easy it is to start selling.
        </p>
        <div className="aspect-video bg-card border border-border rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">▶️</div>
            <p className="text-muted-foreground">Video coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}
