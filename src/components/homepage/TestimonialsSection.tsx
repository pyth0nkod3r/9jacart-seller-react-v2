/**
 * Testimonials Section
 *
 * Backported from bootstrap version (`bootstrap_version/.../index.html` —
 * the "Testimonials" block titled "Why Sellers Love Us").
 */

import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Adewale Johnson',
    role: 'Electronics Seller',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    quote:
      'SellerHub transformed my business. I went from selling locally to reaching customers nationwide. My revenue has tripled in just 6 months!',
  },
  {
    name: 'Ngozi Eze',
    role: 'Fashion Seller',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
    quote:
      'The seller dashboard is so easy to use. I can manage orders, track inventory, and analyze my sales all in one place.',
  },
  {
    name: 'Chidi Nnamdi',
    role: 'Home & Living Seller',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
    quote:
      'Fast payments and excellent customer support. SellerHub truly cares about seller success. Highly recommended!',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Sellers Love Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from successful sellers growing their business with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <p className="text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
