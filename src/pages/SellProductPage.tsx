export default function SellProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Sell on SellerHub</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of Nigerian sellers growing their business with SellerHub's powerful e-commerce platform.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Getting Started</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>✅ Create your free seller account</li>
                <li>✅ Complete business verification</li>
                <li>✅ Add your products</li>
                <li>✅ Start selling immediately</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Benefits</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>✅ No setup fees</li>
                <li>✅ BNPL payment options</li>
                <li>✅ Nationwide delivery</li>
                <li>✅ 24/7 seller support</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-brand-accent text-primary font-semibold rounded-lg hover:bg-brand-accent/90 transition-colors text-lg"
            >
              Start Selling Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
