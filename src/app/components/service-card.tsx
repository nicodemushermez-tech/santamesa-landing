import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  index: number;
  color?: string;
}

export function ServiceCard({ icon: Icon, title, description, features, index, color = '#0F172A' }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-secondary/30"
    >
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-8 h-8" style={{ color }} />
      </div>
      
      <h3 className="text-2xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-accent mb-6">{description}</p>
      
      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <svg
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              style={{ color }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
