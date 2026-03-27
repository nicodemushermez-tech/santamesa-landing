import { motion } from 'motion/react';

export function PrivacyPolicy() {
  return (
    <div className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-accent mb-6">
            <strong>Last Updated:</strong> March 13, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-accent mb-4">
              Santa Mesa ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-accent mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-accent space-y-2 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Business information and consultation details</li>
              <li>Calendar booking information</li>
              <li>Communication preferences</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-accent mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-accent space-y-2 mb-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Schedule and manage consultation appointments</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you technical notices, updates, and administrative messages</li>
              <li>Communicate with you about services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
            <p className="text-accent mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-accent space-y-2 mb-4">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in our operations (under strict confidentiality)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-accent mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
            <p className="text-accent mb-4">Under Australian Privacy Principles (APPs), you have the right to:</p>
            <ul className="list-disc pl-6 text-accent space-y-2 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with the Office of the Australian Information Commissioner</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
            <p className="text-accent mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-accent mb-2"><strong>Email:</strong> privacy@santamesa.com.au</p>

              <p className="text-accent"><strong>Location:</strong> Sydney, NSW, Australia</p>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
