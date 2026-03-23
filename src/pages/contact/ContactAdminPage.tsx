import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactAdminPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ subject: '', message: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Form / Success */}
      <div className="lg:col-span-2">
        {submitted ? (
          <div className="bg-card rounded-lg border border-border p-6 text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">We'll get back to you as soon as possible.</p>
            <Button onClick={() => setSubmitted(false)} className="mt-4">
              Send Another Message
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Contact Support</h2>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-6">
                Have questions or need help? Send us a message and we'll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  <i className="bi bi-send" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar - Contact Info & Business Hours */}
      <div className="space-y-6">
        <div className="bg-card rounded-lg border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-foreground">
              <i className="bi bi-envelope text-primary" />
              <span>support@sellerhub.com</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <i className="bi bi-telephone text-primary" />
              <span>+234 123 456 7890</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <i className="bi bi-geo-alt text-primary" />
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
          </div>
          <div className="p-6 space-y-2 text-foreground text-sm">
            <p>Monday - Friday: 9:00 AM - 6:00 PM (WAT)</p>
            <p>Saturday: 10:00 AM - 4:00 PM (WAT)</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
