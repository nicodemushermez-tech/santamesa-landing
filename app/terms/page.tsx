import type { Metadata } from 'next'
import { TermsOfService } from '../../src/app/pages/terms-of-service'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Santa Mesa — AI & Digital Marketing Agency Sydney.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://santamesa.dev/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ background: '#080C14' }}>
      <TermsOfService />
    </div>
  )
}
