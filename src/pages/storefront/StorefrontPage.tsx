import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { popup } from '@/lib/popup';

export default function StorefrontPage() {
  const [storeName, setStoreName] = useState('Demo Store');
  const [storeDescription, setStoreDescription] = useState(
    'Your one-stop shop for quality products at affordable prices. We offer a wide range of electronics, fashion, home items, and more!'
  );
  const [businessCategory, setBusinessCategory] = useState('General Merchandise');
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [returnPolicy, setReturnPolicy] = useState('14 days return');
  const [shippingTime, setShippingTime] = useState('1-2 business days');
  const [freeShipping, setFreeShipping] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    popup.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header with View Store button */}
      <div className="flex items-center justify-between">
        <div />
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors text-sm"
        >
          <i className="bi bi-box-arrow-up-right" />
          View Store
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store Preview */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Store Preview</h2>
            </div>
            <div>
              {/* Banner */}
              <div className="relative h-[150px] bg-gradient-to-br from-primary to-primary/80">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop"
                  alt="Store Banner"
                  className="w-full h-full object-cover opacity-30"
                />
              </div>

              {/* Store Info */}
              <div className="px-6 pb-6" style={{ marginTop: '-50px', position: 'relative' }}>
                <div className="flex items-end gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=100&h=100&fit=crop"
                    alt="Store Logo"
                    className="w-20 h-20 rounded border-4 border-background shadow"
                  />
                  <div className="mb-1">
                    <h3 className="text-xl font-bold text-foreground">{storeName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {businessCategory} &bull; {location}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-3">{storeDescription}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>
                    <i className="bi bi-star-fill text-yellow-500 mr-1" />
                    4.8 (156 reviews)
                  </span>
                  <span>
                    <i className="bi bi-box mr-1" />
                    48 products
                  </span>
                  <span>
                    <i className="bi bi-clock mr-1" />
                    Usually ships in 24hrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Information Form */}
          <div className="bg-card rounded-lg border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Store Information</h2>
            </div>
            <div className="p-6">
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Store Name</label>
                  <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Store Description</label>
                  <Textarea
                    rows={3}
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Business Category</label>
                    <select
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-foreground text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>General Merchandise</option>
                      <option>Home & Living</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Store Logo</label>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=80&h=80&fit=crop"
                      alt="Logo"
                      className="w-[60px] h-[60px] rounded object-cover"
                    />
                    <Button type="button" variant="outline" size="sm">
                      Change Logo
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Store Banner</label>
                  <div className="border border-dashed border-border rounded-md p-3 text-center">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=100&fit=crop"
                      alt="Banner"
                      className="w-full rounded mb-2 max-h-[100px] object-cover"
                    />
                    <Button type="button" variant="outline" size="sm">
                      Change Banner
                    </Button>
                  </div>
                </div>

                <Button type="submit">
                  <i className="bi bi-check-lg" />
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Store Performance */}
          <div className="bg-card rounded-lg border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Store Performance</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Store Views</span>
                <span className="font-bold text-foreground">12,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Product Views</span>
                <span className="font-bold text-foreground">34,789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Conversion Rate</span>
                <span className="font-bold text-foreground">3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Follower Count</span>
                <span className="font-bold text-foreground">892</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Store Rating</span>
                <span className="font-bold text-foreground">
                  <i className="bi bi-star-fill text-yellow-500 mr-1" />
                  4.8
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card rounded-lg border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Social Links</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <i className="bi bi-instagram mr-2" />
                  Instagram
                </label>
                <Input placeholder="@yourstore" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <i className="bi bi-facebook mr-2" />
                  Facebook
                </label>
                <Input placeholder="facebook.com/yourstore" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <i className="bi bi-twitter mr-2" />
                  Twitter
                </label>
                <Input placeholder="@yourstore" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <i className="bi bi-globe mr-2" />
                  Website
                </label>
                <Input placeholder="https://yourwebsite.com" />
              </div>
            </div>
          </div>

          {/* Store Policies */}
          <div className="bg-card rounded-lg border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Store Policies</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Return Policy</label>
                <select
                  value={returnPolicy}
                  onChange={(e) => setReturnPolicy(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-foreground text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option>7 days return</option>
                  <option>14 days return</option>
                  <option>30 days return</option>
                  <option>No returns</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Shipping Time</label>
                <select
                  value={shippingTime}
                  onChange={(e) => setShippingTime(e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-input bg-transparent text-foreground text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option>Same day</option>
                  <option>1-2 business days</option>
                  <option>3-5 business days</option>
                  <option>5-7 business days</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeShipping}
                  onChange={(e) => setFreeShipping(e.target.checked)}
                  className="rounded border-input"
                />
                <span className="text-sm text-foreground">
                  Offer free shipping on orders over ₦10,000
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
