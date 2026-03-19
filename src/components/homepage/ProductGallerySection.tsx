export default function ProductGallerySection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Products You Can Sell
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sell almost anything on SellerHub - from electronics to fashion, home goods to groceries.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Food & Groceries', 'Sports', 'Books', 'Automotive'].map((category) => (
            <div
              key={category}
              className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">
                {category === 'Electronics' && '📱'}
                {category === 'Fashion' && '👗'}
                {category === 'Home & Living' && '🏠'}
                {category === 'Beauty' && '💄'}
                {category === 'Food & Groceries' && '🛒'}
                {category === 'Sports' && '⚽'}
                {category === 'Books' && '📚'}
                {category === 'Automotive' && '🚗'}
              </div>
              <span className="text-sm font-medium text-foreground">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
