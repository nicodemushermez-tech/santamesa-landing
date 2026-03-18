import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechStart Solutions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    content: 'Santa Mesa transformed our lead generation strategy. Within 3 months, we saw a 240% increase in qualified leads. Their AI integration expertise is unmatched.',
    rating: 5,
    result: '+240% leads',
  },
  {
    name: 'James Chen',
    role: 'Marketing Director, BuildRight',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    content: 'The website optimization work they did improved our conversion rate by 65%. Professional, data-driven, and results-focused. Highly recommend.',
    rating: 5,
    result: '+65% conversions',
  },
  {
    name: 'Emma Thompson',
    role: 'Founder, GreenLeaf Organics',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    content: 'Working with Santa Mesa was a game-changer. Their ads management expertise helped us achieve 400% ROI on our ad spend. Exceptional service.',
    rating: 5,
    result: '400% ROI',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24" style={{ background: '#080C14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4956A' }}>
            Client Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Businesses. Real Growth.
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
            Don't take our word for it — here's what our clients achieved.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-8 relative overflow-hidden transition-all"
              style={{ background: '#0F1623', border: '1px solid #1E2D45' }}
            >
              {/* Result badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                style={{ background: 'rgba(196,149,106,0.12)', color: '#C4956A', border: '1px solid rgba(196,149,106,0.25)' }}>
                {testimonial.result}
              </div>

              <Quote className="absolute top-6 right-6 w-10 h-10 opacity-10" style={{ color: '#C4956A' }} />

              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-sm leading-relaxed mb-8 italic" style={{ color: '#94A3B8' }}>
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover"
                  style={{ border: '2px solid #1E2D45' }}
                />
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs" style={{ color: '#64748B' }}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
