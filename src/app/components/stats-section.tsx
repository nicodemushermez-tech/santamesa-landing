import { motion } from 'motion/react';

const STATS = [
  { value: '500+', label: 'Clients Served' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '3x', label: 'Average ROI Increase' },
  { value: '24/7', label: 'Support Available' },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {STATS.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-accent">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
