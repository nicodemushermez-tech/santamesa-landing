import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const STATS = [
  { value: 500, suffix: '+', label: 'Clients Served' },
  { value: 95, suffix: '%', label: 'Client Satisfaction' },
  { value: 3, suffix: 'x', label: 'Average ROI Increase' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
      style={{ background: '#1E2D45', border: '1px solid #1E2D45' }}>
      {STATS.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-center py-10 px-6"
          style={{ background: '#080C14' }}
        >
          <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: '#C4956A' }}>
            <CountUp target={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm tracking-wide" style={{ color: '#64748B' }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
