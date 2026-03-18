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

export function ServiceCard({ icon: Icon, title, description, features, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, boxShadow: '0 0 40px rgba(196,149,106,0.12)' }}
      className="p-8 rounded-2xl transition-all relative overflow-hidden group"
      style={{
        background: '#0F1623',
        border: '1px solid #1E2D45',
      }}
    >
      {/* Subtle top glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(90deg, transparent, #C4956A60, transparent)' }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
        style={{ background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.2)' }}
      >
        <Icon className="w-7 h-7" style={{ color: '#C4956A' }} />
      </div>

      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748B' }}>{description}</p>

      <ul className="space-y-2.5">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C4956A' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm" style={{ color: '#94A3B8' }}>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
