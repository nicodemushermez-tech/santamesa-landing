import { motion } from 'motion/react';

export function TermsOfService() {
  return (
    <div className="bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-accent mb-6">
              <strong>Last Updated:</strong> March 13, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-accent mb-4">
                By accessing and using Santa Mesa's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
              <p className="text-accent mb-4">
                Santa Mesa provides consulting services including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-accent space-y-2 mb-4">
                <li>AI Integration and implementation</li>
                <li>Lead generation campaigns</li>
                <li>Website optimization services</li>
                <li>Advertising campaign management (organic and paid)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Booking and Consultations</h2>
              <p className="text-accent mb-4">
                When you book a consultation through our calendar system:
              </p>
              <ul className="list-disc pl-6 text-accent space-y-2 mb-4">
                <li>You agree to provide accurate and complete information</li>
                <li>You may cancel or reschedule appointments with at least 24 hours notice</li>
                <li>We reserve the right to cancel appointments with reasonable notice</li>
                <li>Initial consultations may be complimentary; paid services require separate agreement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Contact Information</h2>
              <p className="text-accent mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg">
                <p className="text-accent mb-2"><strong>Email:</strong> legal@santamesa.com.au</p>

                <p className="text-accent"><strong>Location:</strong> Sydney, NSW, Australia</p>
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
