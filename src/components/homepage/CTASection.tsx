export default function CTASection() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Selling?
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Join thousands of Nigerian sellers already growing their business with SellerHub.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="px-8 py-4 bg-card text-primary font-semibold rounded-lg hover:bg-accent transition-colors"
          >
            Create Free Account
          </a>
          <a
            href="/sell"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
