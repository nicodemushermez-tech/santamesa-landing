import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import {
  Brain,
  Target,
  TrendingUp,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { ServiceCard } from './components/service-card';
import { BookingCalendar } from './components/booking-calendar';
import { StatsSection } from './components/stats-section';
import { VideoHero } from './components/video-hero';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { SEOHead } from './components/seo-head';
import { ContactForm } from './components/contact-form';
import { TestimonialsSection } from './components/testimonials-section';
import { Toaster } from './components/ui/sonner';
import { PrivacyPolicy } from './pages/privacy-policy';
import { TermsOfService } from './pages/terms-of-service';
import logoImage from '/logo.png';

const SERVICES = [
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Leverage cutting-edge AI technology to automate processes and gain competitive advantages.',
    features: [
      'Custom AI model development',
      'Chatbot & virtual assistant integration',
      'Predictive analytics implementation',
      'Process automation with AI',
    ],
    color: '#10A37F', // ChatGPT green
  },
  {
    icon: Target,
    title: 'Lead Campaigns',
    description: 'Generate high-quality leads with targeted campaigns that convert prospects into customers.',
    features: [
      'Multi-channel lead generation',
      'Lead scoring & qualification',
      'CRM integration & management',
      'Campaign performance tracking',
    ],
    color: '#1877F2', // Facebook blue
  },
  {
    icon: TrendingUp,
    title: 'Website Optimization',
    description: 'Maximize your website performance with data-driven optimization strategies.',
    features: [
      'Conversion rate optimization (CRO)',
      'SEO & technical improvements',
      'Page speed optimization',
      'User experience enhancement',
    ],
    color: '#0078D7', // Internet Explorer light blue
  },
  {
    icon: Megaphone,
    title: 'Ads Management',
    description: 'Drive results with expertly managed organic and paid advertising campaigns.',
    features: [
      'Google Ads & Facebook Ads management',
      'Organic social media growth',
      'Retargeting campaigns',
      'ROI-focused ad optimization',
    ],
    color: '#EA4335', // Google Chrome orange/red
  },
];

const BENEFITS = [
  'Data-driven strategies backed by analytics',
  'Transparent reporting and communication',
  'Proven track record of success',
  'Customized solutions for your business',
  'Ongoing optimization and support',
  'Latest tools and technologies',
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <HelmetProvider>
      <SEOHead />
      <Toaster position="top-right" richColors />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Video Hero */}
        <VideoHero />

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-background shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="cursor-pointer"
                aria-label="Scroll to top"
              >
                <img
                  src={logoImage}
                  alt="Santa Mesa Logo"
                  className={`h-24 w-auto transition-all duration-300 ${
                    isScrolled ? '' : 'brightness-0 invert'
                  }`}
                />
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => scrollToSection('services')}
                  className={`transition-colors ${
                    isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-secondary'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className={`transition-colors ${
                    isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-secondary'
                  }`}
                >
                  Why Choose Us
                </button>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-colors"
                >
                  Book a Call
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden py-4 space-y-4"
              >
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg"
                >
                  Why Choose Us
                </button>
                <button
                  onClick={() => scrollToSection('booking')}
                  className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent"
                >
                  Book a Call
                </button>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section id="main-content" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
                  Transform Your Business with
                  <span className="text-primary"> AI-Powered </span>
                  Marketing
                </h1>
                <p className="text-xl text-accent mb-8">
                  Drive growth, optimize campaigns, and maximize ROI with our expert digital marketing and AI integration services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('booking')}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-accent transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection('services')}
                    className="px-8 py-4 bg-white border-2 border-primary text-primary rounded-full font-semibold hover:bg-secondary/30 transition-colors"
                  >
                    Explore Services
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758518727707-b023e285b709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBtb2Rlcm4lMjBvZmZpY2V8ZW58MXx8fHwxNzczMTU4OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Professional business consultation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
                </div>
                
                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-2 border-secondary"
                >
                  <div className="text-3xl font-bold text-primary mb-1">500+</div>
                  <div className="text-accent">Happy Clients</div>
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <div className="mt-24">
              <StatsSection />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">Our Services</h2>
              <p className="text-xl text-accent max-w-3xl mx-auto">
                Comprehensive digital solutions tailored to accelerate your business growth
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">Why Choose Us?</h2>
                <p className="text-xl text-accent mb-8">
                  We combine cutting-edge technology with proven marketing strategies to deliver measurable results that matter to your bottom line.
                </p>
                
                <div className="space-y-4">
                  {BENEFITS.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <span className="text-lg text-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1765594938412-62402448a58a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwdGVhbSUyMG1lZXRpbmclMjBzeWRuZXl8ZW58MXx8fHwxNzczMjg2ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Professional team collaboration"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1758518731468-98e90ffd7430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9uJTIwbW9kZXJufGVufDF8fHx8MTc3MzI4Njg0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Business team strategy"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1545005785-a4a5554b8efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBidXNpbmVzcyUyMGxlYWRlcnMlMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzczMjg2ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Confident business leaders"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjB0ZWFtJTIwc3RyYXRlZ2ljJTIwcGxhbm5pbmclMjBvZmZpY2V8ZW58MXx8fHwxNzczMjg2ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Executive team planning"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary/30 to-muted/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">Book Your Free Consultation</h2>
              <p className="text-xl text-accent max-w-3xl mx-auto">
                Let's discuss how we can help grow your business. Select a time that works for you, and we'll send you a Zoom link.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <BookingCalendar />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Footer */}
        <footer className="bg-accent text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <img
                  src={logoImage}
                  alt="Santa Mesa"
                  className="h-24 w-auto mb-4 brightness-0 invert"
                />
                <p className="text-muted">
                  Empowering businesses with AI-driven marketing solutions and expert consultation.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block text-muted hover:text-secondary transition-colors"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block text-muted hover:text-secondary transition-colors"
                  >
                    Why Choose Us
                  </button>
                  <button
                    onClick={() => scrollToSection('booking')}
                    className="block text-muted hover:text-secondary transition-colors"
                  >
                    Book a Call
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <div className="space-y-3 text-muted">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>hello@santamesa.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>1300 SANTA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Sydney, Australia</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-primary pt-8 text-center text-muted">
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <button 
                  onClick={() => setShowPrivacy(true)}
                  className="hover:text-secondary transition-colors text-sm underline"
                >
                  Privacy Policy
                </button>
                <span>|</span>
                <button 
                  onClick={() => setShowTerms(true)}
                  className="hover:text-secondary transition-colors text-sm underline"
                >
                  Terms of Service
                </button>
              </div>
              <p>&copy; 2026 Santa Mesa. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Privacy Policy Modal */}
        {showPrivacy && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacy(false)}>
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Privacy Policy</h2>
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close privacy policy"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <PrivacyPolicy />
              </div>
            </div>
          </div>
        )}

        {/* Terms of Service Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTerms(false)}>
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Terms of Service</h2>
                <button 
                  onClick={() => setShowTerms(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close terms of service"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <TermsOfService />
              </div>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
