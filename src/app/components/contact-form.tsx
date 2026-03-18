import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const inputStyle = {
  background: '#080C14',
  border: '1px solid #1E2D45',
  color: '#F8FAFC',
  borderRadius: '0.75rem',
  padding: '12px 16px 12px 44px',
  width: '100%',
  fontSize: '14px',
  outline: 'none',
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-8"
      style={{ background: '#0F1623', border: '1px solid #1E2D45' }}
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Send a Message</h3>
        <p className="text-sm" style={{ color: '#64748B' }}>Can't find a time? Drop us a message instead.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
            Name <span style={{ color: '#C4956A' }}>*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#64748B' }} />
            <input
              name="name" type="text" value={formData.name} onChange={handleChange}
              placeholder="Your full name" required style={inputStyle}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
            Email <span style={{ color: '#C4956A' }}>*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#64748B' }} />
            <input
              name="email" type="email" value={formData.email} onChange={handleChange}
              placeholder="you@company.com" required style={inputStyle}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>Phone (Optional)</label>
          <input
            name="phone" type="tel" value={formData.phone} onChange={handleChange}
            placeholder="0400 000 000"
            style={{ ...inputStyle, paddingLeft: '16px' }}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: '#64748B' }}>
            Message <span style={{ color: '#C4956A' }}>*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4" style={{ color: '#64748B' }} />
            <textarea
              name="message" value={formData.message} onChange={handleChange}
              placeholder="Tell us about your project..."
              required rows={5}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            background: 'linear-gradient(135deg, #C4956A, #A67850)',
            color: '#080C14',
            boxShadow: '0 0 20px rgba(196,149,106,0.2)',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
          ) : (
            <><Mail className="w-4 h-4" /> Send Message</>
          )}
        </motion.button>

        <p className="text-xs text-center" style={{ color: '#1E2D45' }}>
          By submitting, you agree to our Privacy Policy and Terms of Service.
        </p>
      </form>
    </motion.div>
  );
}
