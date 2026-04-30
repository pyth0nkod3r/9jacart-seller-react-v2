import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

export default function HeroSection() {
  const { brand, stats } = useTheme();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              🛍️ E-commerce Seller Platform
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {brand.tagline.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-primary">{brand.name}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {brand.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: 'var(--brand-accent)' }}
              >
                Start Selling Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/sell"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image/Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3" />
              <div className="relative bg-card border border-border rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Mock Dashboard Preview */}
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 bg-primary/20 rounded" />
                    <div
                      className="h-8 w-24 rounded"
                      style={{ backgroundColor: 'var(--brand-accent)' }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">📊</span>
                    </div>
                    <div className="h-24 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-foreground font-bold">📦</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
