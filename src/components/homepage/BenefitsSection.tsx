import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Shield, Clock, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Fast Delivery Integration',
    description: 'Connect with reliable logistics partners for seamless order fulfillment across Nigeria.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your earnings are protected with our secure payment gateway and fraud prevention systems.',
  },
  {
    icon: Clock,
    title: 'Real-time Analytics',
    description: 'Track your sales, inventory, and customer behavior with powerful real-time dashboards.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is always available to help you grow your business.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">SellerHub</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to succeed as an online seller in Nigeria.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 bg-brand-accent text-primary font-semibold rounded-lg hover:bg-brand-accent/90 transition-colors"
          >
            Start Selling Today
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
