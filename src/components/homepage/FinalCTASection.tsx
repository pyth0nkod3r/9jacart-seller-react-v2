import { Link } from 'react-router-dom';

export default function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Start Your Seller Journey Today
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Create your free account and start selling in minutes. No setup fees, no monthly costs.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center px-8 py-4 bg-[#8DEB6E] text-primary font-semibold rounded-lg hover:bg-[#8DEB6E]/90 transition-colors text-lg"
        >
          Get Started Free
        </Link>
      </div>
    </section>
  );
}
