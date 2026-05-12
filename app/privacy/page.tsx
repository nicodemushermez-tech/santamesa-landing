import type { Metadata } from 'next'
import { PrivacyPolicy } from '../../src/app/pages/privacy-policy'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Santa Mesa — AI & Digital Marketing Agency Sydney.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://santamesa.dev/privacy' },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ background: '#080C14' }}>
      <PrivacyPolicy />
    </div>
  )
}
