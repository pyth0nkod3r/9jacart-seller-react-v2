
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Analytics</h2>
        <p className="text-muted-foreground mb-6">
          View detailed analytics about your store performance, sales, and customer behavior.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-primary">₦0</p>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-primary">0</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </div>
          <div className="bg-primary/5 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-primary">0%</p>
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
          </div>
        </div>

        <div className="text-center py-12 text-muted-foreground">
          <p>Charts and detailed analytics coming soon...</p>
        </div>
      </div>
    </div>
  );
}
