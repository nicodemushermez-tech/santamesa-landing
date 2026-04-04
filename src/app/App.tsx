import { useState, useEffect, lazy, Suspense } from 'react';
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
  MapPin,
  Zap,
  Shield,
  BarChart3,
} from 'lucide-react';
import { ServiceCard } from './components/service-card';
import { StatsSection } from './components/stats-section';
import { VideoHero } from './components/video-hero';
import { SEOHead } from './components/seo-head';
import { Toaster } from './components/ui/sonner';
import logoLight from '/logo-light.png';

// Lazy-load below-fold heavy components
const ResultsShowcase = lazy(() => import('./components/results-showcase').then(m => ({ default: m.ResultsShowcase })));
const VoiceDemo = lazy(() => import('./components/voice-demo').then(m => ({ default: m.VoiceDemo })));
const ContactForm = lazy(() => import('./components/contact-form').then(m => ({ default: m.ContactForm })));
const TestimonialsSection = lazy(() => import('./components/testimonials-section').then(m => ({ default: m.TestimonialsSection })));
const ChatWidget = lazy(() => import('./components/chat-widget').then(m => ({ default: m.ChatWidget })));
const CalendlyEmbed = lazy(() => import('./components/calendly-embed').then(m => ({ default: m.CalendlyEmbed })));
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/terms-of-service').then(m => ({ default: m.TermsOfService })));

const SERVICES = [
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Deploy intelligent automation that works around the clock — from custom chatbots to predictive analytics built into your existing systems.',
    features: [
      'Custom AI model development',
      'Chatbot & virtual assistant integration',
      'Predictive analytics & reporting',
      'Workflow automation with AI',
    ],
    color: '#C4956A',
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description: 'Multi-channel campaigns engineered to attract and convert high-quality prospects directly into your CRM pipeline.',
    features: [
      'Multi-channel lead generation',
      'Lead scoring & qualification',
      'GHL CRM integration & automation',
      'Campaign performance tracking',
    ],
    color: '#C4956A',
  },
  {
    icon: TrendingUp,
    title: 'Website Optimization',
    description: 'Turn your website into a conversion machine with data-backed CRO, technical SEO, and UX improvements that compound over time.',
    features: [
      'Conversion rate optimization (CRO)',
      'SEO & technical performance',
      'Page speed & Core Web Vitals',
      'User experience enhancement',
    ],
    color: '#C4956A',
  },
  {
    icon: Megaphone,
    title: 'Ads Management',
    description: 'Full-funnel paid and organic advertising strategy — from creative to optimization — with a relentless focus on ROI.',
    features: [
      'Google Ads & Meta Ads management',
      'Organic social media growth',
      'Retargeting & lookalike campaigns',
      'ROI-focused ad optimization',
    ],
    color: '#C4956A',
  },
];

const BENEFITS = [
  'Data-driven strategies backed by real analytics',
  'Transparent reporting — you always know what\'s happening',
  'Proven track record with measurable results',
  'Customised solutions, not cookie-cutter packages',
  'AI-powered tools that give you an unfair advantage',
  'Ongoing optimization, not set-and-forget',
];

const DIFFERENTIATORS = [
  {
    icon: Zap,
    title: 'AI-First Approach',
    description: 'We don\'t just talk about AI — we build it into everything we do, from lead follow-up to campaign optimization.',
  },
  {
    icon: BarChart3,
    title: 'Results Obsessed',
    description: 'Every decision is backed by data. We track, report, and optimize until the numbers move in your direction.',
  },
  {
    icon: Shield,
    title: 'Boutique, Not Agency',
    description: 'You work directly with senior strategists — no junior handoffs, no bloated teams. Just focused expertise.',
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyBarDismissed, setStickyBarDismissed] = useState(false);

  // Force scroll to top on every fresh page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinkStyle = {
    color: isScrolled ? '#94A3B8' : 'rgba(248,250,252,0.75)',
  };

  return (
    <HelmetProvider>
      <SEOHead />
      <Toaster position="top-right" richColors />
      <div className="min-h-screen" style={{ background: '#080C14' }}>

        {/* VIDEO HERO */}
        <VideoHero />

        {/* NAV */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
          style={{
            background: isScrolled ? 'rgba(8,12,20,0.95)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderBottom: isScrolled ? '1px solid #1E2D45' : '1px solid transparent',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  aria-label="Scroll to top"
                >
                  <img
                    src={logoLight}
                    alt="Santa Mesa"
                    className="h-24 w-auto transition-all duration-300"
                    style={isScrolled ? {} : { filter: 'brightness(0) invert(1)' }}
                  />
                </motion.button>

                {/* DreamBuilds collab badge */}
                <motion.a
                  href="https://dreambuilds.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(200,241,53,0.12)', borderColor: 'rgba(200,241,53,0.3)' }}
                  className="flex items-center gap-3 px-5 py-2 rounded-2xl cursor-pointer transition-all"
                  style={{
                    background: 'rgba(8,12,20,0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Santa Mesa wordmark */}
                  <img
                    src={logoLight}
                    alt="Santa Mesa"
                    style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                  />
                  {/* × separator */}
                  <span className="font-light select-none" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '16px' }}>×</span>
                  {/* DreamBuilds logo */}
                  <img src="/dreambuilds-logo.svg" alt="DreamBuilds" style={{ height: '20px', width: 'auto' }} />
                </motion.a>
              </div>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-8">
                {['services', 'results', 'ai-demo', 'about', 'booking'].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="text-sm font-medium tracking-wide capitalize transition-colors hover:text-white"
                    style={navLinkStyle}
                  >
                    {id === 'about' ? 'Why Us' : id === 'results' ? 'Results' : id === 'ai-demo' ? 'AI Demo' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('booking')}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #C4956A, #A67850)',
                    color: '#080C14',
                    boxShadow: '0 0 20px rgba(196,149,106,0.25)',
                  }}
                >
                  Book a Call
                </motion.button>
              </div>

              {/* Mobile menu btn */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden py-4 space-y-1 border-t"
                style={{ borderColor: '#1E2D45' }}
              >
                {['services', 'results', 'ai-demo', 'about', 'booking'].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className="block w-full text-left px-4 py-3 text-sm rounded-lg capitalize transition-colors"
                    style={{ color: '#94A3B8' }}
                  >
                    {id === 'about' ? 'Why Us' : id === 'results' ? 'Results' : id === 'ai-demo' ? 'AI Demo' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
                <div className="px-4 pt-2">
                  <button
                    onClick={() => scrollToSection('booking')}
                    className="w-full py-3 rounded-full text-sm font-semibold"
                    style={{ background: 'linear-gradient(135deg, #C4956A, #A67850)', color: '#080C14' }}
                  >
                    Book a Call
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* STICKY BOTTOM CTA BAR */}
        {showStickyBar && !stickyBarDismissed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between gap-4"
            style={{ background: 'rgba(8,12,20,0.97)', borderTop: '1px solid #1E2D45', backdropFilter: 'blur(12px)' }}
          >
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C4956A' }} />
              <span className="text-sm font-medium text-white">Ready to grow? Book your free 30-min strategy call.</span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('booking')}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #C4956A, #A67850)', color: '#080C14' }}
              >
                Book a Free Call <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <button
                onClick={() => setStickyBarDismissed(true)}
                className="p-1.5 rounded-full transition-colors"
                style={{ color: '#64748B' }}
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* HERO CONTENT (below video) */}
        <section id="main-content" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#080C14' }}>
          <div className="max-w-7xl mx-auto">

            {/* Stats */}
            <div className="mb-24">
              <StatsSection />
            </div>

            {/* Main hero content grid */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4956A' }}>
                  Sydney, Australia
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                  We Build AI Systems That{' '}
                  <span style={{ color: '#C4956A' }}>Grow Your Business</span>{' '}
                  While You Sleep
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: '#64748B' }}>
                  Santa Mesa is a boutique AI + CRM automation agency. We build the systems, run the campaigns, and integrate the technology — so you can focus on closing deals, not chasing leads.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToSection('booking')}
                    className="px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #C4956A, #A67850)',
                      color: '#080C14',
                      boxShadow: '0 0 30px rgba(196,149,106,0.25)',
                    }}
                  >
                    Schedule Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToSection('services')}
                    className="px-8 py-4 rounded-full font-semibold transition-all"
                    style={{ background: 'transparent', color: '#F8FAFC', border: '1px solid #1E2D45' }}
                  >
                    Explore Services
                  </motion.button>
                </div>
              </motion.div>

              {/* Differentiators */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                {DIFFERENTIATORS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 p-6 rounded-2xl"
                    style={{ background: '#0F1623', border: '1px solid #1E2D45' }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(196,149,106,0.1)', border: '1px solid rgba(196,149,106,0.2)' }}>
                      <item.icon className="w-5 h-5" style={{ color: '#C4956A' }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#080C14', borderTop: '1px solid #1E2D45' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4956A' }}>
                What We Do
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Our Services</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
                End-to-end digital solutions built for scale — from first click to closed deal.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {SERVICES.map((service, index) => (
                <ServiceCard key={index} {...service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* MID-PAGE HOOK BANNER */}
        <section className="py-14 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, rgba(196,149,106,0.08), rgba(196,149,106,0.03))', borderTop: '1px solid rgba(196,149,106,0.15)', borderBottom: '1px solid rgba(196,149,106,0.15)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#C4956A' }}>Limited Spots This Month</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Most businesses are leaving money on the table.<br />
                <span style={{ color: '#C4956A' }}>Is yours one of them?</span>
              </h3>
              <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: '#64748B' }}>
                In 30 minutes we'll show you exactly where your leads are leaking and what it would take to fix it — for free.
              </p>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(196,149,106,0.35)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('booking')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #C4956A, #A67850)', color: '#080C14' }}
              >
                Claim My Free Strategy Call <ArrowRight className="w-4 h-4" />
              </motion.button>
              <p className="text-xs mt-4" style={{ color: '#334155' }}>No obligation. No pitch. Just clarity.</p>
            </motion.div>
          </div>
        </section>

        {/* RESULTS SHOWCASE */}
        <section id="results" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0F1623', borderTop: '1px solid #1E2D45' }}>
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div style={{ height: '600px', background: '#0F1623' }} />}>
              <ResultsShowcase />
            </Suspense>
          </div>
        </section>

        {/* AI VOICE DEMO */}
        <section id="ai-demo" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#080C14', borderTop: '1px solid #1E2D45' }}>
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div style={{ height: '800px', background: '#080C14' }} />}>
              <VoiceDemo />
            </Suspense>
          </div>
        </section>

        {/* WHY US */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#0F1623', borderTop: '1px solid #1E2D45' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4956A' }}>
                  Why Choose Us
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                  We Operate Like a Tech Company,<br />
                  <span style={{ color: '#C4956A' }}>Not an Agency</span>
                </h2>
                <p className="text-lg leading-relaxed mb-8" style={{ color: '#64748B' }}>
                  Most agencies sell you reports. We build systems. Our AI-powered approach means your marketing gets smarter over time — not just louder.
                </p>
                <div className="space-y-4">
                  {BENEFITS.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C4956A' }} />
                      <span className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Visual — dark card with glow */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="rounded-2xl p-10 relative overflow-hidden"
                  style={{ background: '#080C14', border: '1px solid #1E2D45' }}>
                  {/* Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
                    style={{ background: 'radial-gradient(circle, #C4956A, transparent)' }} />
                  
                  <div className="relative z-10 text-center">
                    <div className="text-7xl font-bold mb-2" style={{ color: '#C4956A' }}>3x</div>
                    <div className="text-xl font-semibold text-white mb-2">Average ROI</div>
                    <div className="text-sm mb-10" style={{ color: '#64748B' }}>across all client campaigns</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { val: '500+', lbl: 'Clients' },
                        { val: '95%', lbl: 'Satisfaction' },
                        { val: '$2M+', lbl: 'Ad Spend Managed' },
                        { val: '24/7', lbl: 'Support' },
                      ].map((s, i) => (
                        <div key={i} className="rounded-xl p-4"
                          style={{ background: '#0F1623', border: '1px solid #1E2D45' }}>
                          <div className="text-2xl font-bold text-white">{s.val}</div>
                          <div className="text-xs" style={{ color: '#64748B' }}>{s.lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: '#080C14', borderTop: '1px solid #1E2D45' }}>
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4956A' }}>
                Get Started
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Book Your Free Strategy Call</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#64748B' }}>
                30 minutes. No pitch, no pressure. We'll audit your current setup and show you exactly where the growth is.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <Suspense fallback={<div style={{ height: '320px', background: '#080C14' }} />}>
                <CalendlyEmbed />
              </Suspense>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto w-full"
            >
              <Suspense fallback={<div style={{ height: '480px', background: '#080C14' }} />}>
                <ContactForm />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <Suspense fallback={<div style={{ height: '500px', background: '#080C14' }} />}>
          <TestimonialsSection />
        </Suspense>

        {/* FOOTER */}
        <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: '#080C14', borderTop: '1px solid #1E2D45' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div>
                <img src={logoLight} alt="Santa Mesa" className="h-28 w-auto mb-5" style={{ filter: 'brightness(0) invert(1)' }} />
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  AI-powered marketing and CRM automation for ambitious businesses.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">Navigation</h4>
                <div className="space-y-3">
                  {[['services', 'Services'], ['about', 'Why Choose Us'], ['booking', 'Book a Call']].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className="block text-sm transition-colors hover:text-white"
                      style={{ color: '#64748B' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-5 tracking-wide uppercase">Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm" style={{ color: '#64748B' }}>
                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#C4956A' }} />
                    hello@santamesa.com
                  </div>
                  <div className="flex items-center gap-3 text-sm" style={{ color: '#64748B' }}>
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#C4956A' }} />
                    Sydney, Australia
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: '1px solid #1E2D45' }}>
              <p className="text-xs" style={{ color: '#64748B' }}>
                © 2026 Santa Mesa. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <button onClick={() => setShowPrivacy(true)} className="text-xs hover:text-white transition-colors" style={{ color: '#64748B' }}>
                  Privacy Policy
                </button>
                <button onClick={() => setShowTerms(true)} className="text-xs hover:text-white transition-colors" style={{ color: '#64748B' }}>
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 py-4" style={{ borderTop: '1px solid #1E2D45' }}>
            <span className="text-sm" style={{ color: '#475569' }}>Designed & built by</span>
            <a href="https://dreambuilds.com.au" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
              <img src="/dreambuilds-logo.svg" alt="DreamBuilds" style={{ height: '26px', width: 'auto' }} />
            </a>
          </div>
        </footer>

        {/* Privacy Modal */}
        {showPrivacy && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacy(false)}>
            <div className="rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto" style={{ background: '#0F1623', border: '1px solid #1E2D45' }} onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 px-6 py-4 flex justify-between items-center" style={{ background: '#0F1623', borderBottom: '1px solid #1E2D45' }}>
                <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                <button onClick={() => setShowPrivacy(false)} className="p-2 rounded-lg transition-colors hover:bg-white/5">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-6"><Suspense fallback={null}><PrivacyPolicy /></Suspense></div>
            </div>
          </div>
        )}

        {/* Chat Widget */}
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowTerms(false)}>
            <div className="rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto" style={{ background: '#0F1623', border: '1px solid #1E2D45' }} onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 px-6 py-4 flex justify-between items-center" style={{ background: '#0F1623', borderBottom: '1px solid #1E2D45' }}>
                <h2 className="text-xl font-bold text-white">Terms of Service</h2>
                <button onClick={() => setShowTerms(false)} className="p-2 rounded-lg transition-colors hover:bg-white/5">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="p-6"><Suspense fallback={null}><TermsOfService /></Suspense></div>
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default App;
