import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle2, ArrowRight, Coffee, MapPin } from 'lucide-react';

const CALENDLY_STRATEGY_URL = 'https://calendly.com/nicodemushermez';
const CALENDLY_COFFEE_URL = 'https://calendly.com/nicodemushermez/coffee-chat-merrylands';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const PERKS = [
  '30-minute strategy session, no fluff',
  'Free audit of your current marketing setup',
  'Clear growth roadmap you keep regardless',
  'No sales pressure — just honest advice',
];

export function CalendlyEmbed() {
  const [tab, setTab] = useState<'call' | 'coffee'>('call');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const openCalendly = () => {
    const url = tab === 'coffee' ? CALENDLY_COFFEE_URL : CALENDLY_STRATEGY_URL;
    window.Calendly?.initPopupWidget({ url });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab switcher */}
      <div className="flex justify-center mb-6">
        <div
          className="inline-flex rounded-full p-1"
          style={{ background: '#0F1623', border: '1px solid #1E2D45' }}
        >
          <button
            onClick={() => setTab('call')}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: tab === 'call' ? 'linear-gradient(135deg, #C4956A, #A67850)' : 'transparent',
              color: tab === 'call' ? '#080C14' : '#64748B',
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            Strategy Call
          </button>
          <button
            onClick={() => setTab('coffee')}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: tab === 'coffee' ? 'linear-gradient(135deg, #C4956A, #A67850)' : 'transparent',
              color: tab === 'coffee' ? '#080C14' : '#64748B',
            }}
          >
            <Coffee className="w-3.5 h-3.5" />
            Coffee Chat
          </button>
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid #1E2D45', background: '#0F1623' }}
      >
        <div className="grid md:grid-cols-2">
          {/* Left — perks */}
          <div className="p-10 flex flex-col justify-center" style={{ borderRight: '1px solid #1E2D45' }}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6 w-fit"
              style={{ background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.2)', color: '#C4956A' }}
            >
              <Calendar className="w-3.5 h-3.5" />
              Free Consultation
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              30 Minutes That Could Change<br />
              <span style={{ color: '#C4956A' }}>Everything</span>
            </h3>
            <p className="text-sm mb-8" style={{ color: '#64748B' }}>
              We'll dig into your business, find the gaps, and map out exactly what needs to happen to hit your growth goals.
            </p>

            <div className="space-y-3">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C4956A' }} />
                  <span className="text-sm" style={{ color: '#94A3B8' }}>{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="p-10 flex flex-col items-center justify-center text-center gap-6">
            {/* Big time visual */}
            <div
              className="w-28 h-28 rounded-full flex flex-col items-center justify-center relative"
              style={{
                background: 'rgba(196,149,106,0.08)',
                border: '2px solid rgba(196,149,106,0.2)',
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '2px solid #C4956A' }}
                animate={{ scale: [1, 1.15], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Clock className="w-8 h-8 mb-1" style={{ color: '#C4956A' }} />
              <span className="text-xs font-semibold" style={{ color: '#C4956A' }}>30 min</span>
            </div>

            {tab === 'coffee' ? (
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <MapPin className="w-4 h-4" style={{ color: '#C4956A' }} />
                  <div className="text-white font-semibold text-lg">Merrylands, Western Sydney</div>
                </div>
                <div className="text-sm" style={{ color: '#64748B' }}>Main Ln, Merrylands NSW · 9am–12pm only</div>
                <div className="text-xs mt-1 font-medium" style={{ color: '#C4956A' }}>In-person only · No Zoom</div>
              </div>
            ) : (
              <div>
                <div className="text-white font-semibold text-lg mb-1">Pick a time that works</div>
                <div className="text-sm" style={{ color: '#64748B' }}>Instant confirmation · Zoom or phone call</div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(196,149,106,0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={openCalendly}
              className="w-full py-4 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'linear-gradient(135deg, #C4956A, #A67850)',
                color: '#080C14',
              }}
            >
              {tab === 'coffee' ? (
                <><Coffee className="w-4 h-4" /> Book a Coffee Chat</>
              ) : (
                <>Book My Free Call <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>

            <p className="text-xs" style={{ color: '#1E2D45' }}>
              {tab === 'coffee' ? 'Face-to-face · Western Sydney locals only · No obligation' : 'No credit card · No obligation · Cancel anytime'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
