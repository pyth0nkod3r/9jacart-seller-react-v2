export default function StorefrontPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Your Storefront</h2>
        <p className="text-muted-foreground mb-6">
          Preview your customer-facing storefront and manage your store settings.
        </p>
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-4">🏪</p>
          <p>Your storefront preview will appear here.</p>
        </div>
      </div>
    </div>
  );
}
