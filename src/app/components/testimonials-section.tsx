import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechStart Solutions',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    content: 'Santa Mesa transformed our lead generation strategy. Within 3 months, we saw a 240% increase in qualified leads. Their AI integration expertise is unmatched.',
    rating: 5,
  },
  {
    name: 'James Chen',
    role: 'Marketing Director, BuildRight',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    content: 'The website optimization work they did improved our conversion rate by 65%. Professional, data-driven, and results-focused. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Founder, GreenLeaf Organics',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    content: 'Working with Santa Mesa was a game-changer. Their ads management expertise helped us achieve 400% ROI on our ad spend. Exceptional service!',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-accent max-w-3xl mx-auto">
            Don't just take our word for it - hear from businesses we've helped transform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-secondary/20" />
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-secondary/30"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-accent">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-accent leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">50+</div>
              <div className="text-accent">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">98%</div>
              <div className="text-accent">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">5+</div>
              <div className="text-accent">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">24/7</div>
              <div className="text-accent">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
