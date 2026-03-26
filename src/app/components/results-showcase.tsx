import { motion } from 'motion/react';

interface CampaignCard {
  service: string;
  headline: string;
  bigStat: string;
  bigStatLabel: string;
  pills: string[];
}

const CAMPAIGNS: CampaignCard[] = [
  {
    service: 'AI Integration',
    headline: 'Dental chain cut admin time by 70% with AI scheduling in week 1',
    bigStat: '70%',
    bigStatLabel: 'admin time saved',
    pills: ['3hrs/day reclaimed', '98% booking accuracy', 'Week 1 results'],
  },
  {
    service: 'Lead Generation',
    headline: 'Real estate agency: 4.2x more qualified leads in 30 days',
    bigStat: '4.2x',
    bigStatLabel: 'lead volume',
    pills: ['61% lower cost-per-lead', '$180K pipeline added', '30-day turnaround'],
  },
  {
    service: 'Website Optimization',
    headline: 'Medspa doubled conversion rate after CRO overhaul',
    bigStat: '2x',
    bigStatLabel: 'conversions',
    pills: ['+47% organic traffic', '1.8s load time', 'CRO + SEO'],
  },
  {
    service: 'Ads Management',
    headline: 'E-commerce brand: 8.3x ROAS on Meta in 60 days',
    bigStat: '8.3x',
    bigStatLabel: 'ROAS on Meta',
    pills: ['$2.1M revenue attributed', '34% lower CPA', '60-day results'],
  },
];

export function ResultsShowcase() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span
          className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase"
          style={{ color: '#C4956A' }}
        >
          Proof of Performance
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          Real Results.{' '}
          <span style={{ color: '#C4956A' }}>Real Businesses.</span>
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
          Numbers don't lie. Here's what we've delivered across industries.
        </p>
      </motion.div>

      {/* Cards — stacked on mobile, 2-col grid on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAMPAIGNS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{
              y: -6,
              boxShadow: '0 0 40px rgba(196,149,106,0.18)',
            }}
            className="relative rounded-2xl p-8 cursor-default"
            style={{
              background: '#0F1623',
              borderLeft: '4px solid #C4956A',
              border: '1px solid #1E2D45',
              borderLeftWidth: '4px',
              borderLeftColor: '#C4956A',
            }}
          >
            {/* Service tag */}
            <div
              className="inline-block mb-5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(196,149,106,0.1)', color: '#C4956A', border: '1px solid rgba(196,149,106,0.2)' }}
            >
              {card.service}
            </div>

            {/* Big stat */}
            <div
              className="text-6xl font-extrabold leading-none mb-1"
              style={{ color: '#C4956A' }}
            >
              {card.bigStat}
            </div>
            <div className="text-sm mb-5" style={{ color: '#64748B' }}>
              {card.bigStatLabel}
            </div>

            {/* Headline */}
            <p className="text-base font-semibold text-white leading-snug mb-6">
              "{card.headline}"
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2">
              {card.pills.map((pill, j) => (
                <span
                  key={j}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(196,149,106,0.08)',
                    color: '#C4956A',
                    border: '1px solid rgba(196,149,106,0.15)',
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
