import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Banknote, Users, Package, BadgeCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-4">
              <BadgeCheck className="w-4 h-4 mr-2" />
              SELLER PLATFORM
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Designed for <span className="text-primary">Growing</span> Your Business
            </h2>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Everything You Need to Succeed</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Banknote className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Guaranteed Revenue</h4>
                    <p className="text-muted-foreground">
                      Receive full payments upfront while customers pay in installments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Expanded Customer Base</h4>
                    <p className="text-muted-foreground">
                      Tap into customers who prefer flexible payment options.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Streamlined Operations</h4>
                    <p className="text-muted-foreground">
                      Comprehensive dashboard for inventory, orders, and analytics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">Platform Performance</h3>
                <p className="text-muted-foreground">Real results for sellers like you</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Platform Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Secure Payments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Sellers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">1 min</div>
                  <div className="text-sm text-muted-foreground">Support Response</div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-3 bg-[#8DEB6E] text-primary font-semibold rounded-lg hover:bg-[#8DEB6E]/90 transition-colors"
                >
                  Join Sellers Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
