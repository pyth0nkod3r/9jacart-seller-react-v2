/**
 * Stats Section
 *
 * Backported from bootstrap version (`bootstrap_version/.../index.html` —
 * the "Stats Section" block right after the hero).
 *
 * Content: 98% Seller Satisfaction, 24/7 Customer Support,
 * 36 States Covered, 48hr Average Delivery.
 */

import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '98%', label: 'Seller Satisfaction' },
  { value: '24/7', label: 'Customer Support' },
  { value: '36', label: 'States Covered' },
  { value: '48hr', label: 'Average Delivery' },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
