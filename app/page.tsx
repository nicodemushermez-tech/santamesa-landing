import type { Metadata } from 'next'
import App from '../src/app/App'

export const metadata: Metadata = {
  title: 'Santa Mesa | AI & Digital Marketing Agency Sydney',
  description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads. Free 30-min strategy call. Book today.',
  openGraph: {
    title: 'Santa Mesa | AI & Digital Marketing Agency Sydney',
    description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads. Free 30-min strategy call. Book today.',
    url: 'https://santamesa.dev',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Santa Mesa | AI & Digital Marketing Agency Sydney',
    description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads. Free 30-min strategy call.',
    images: ['/og.jpg'],
  },
  alternates: { canonical: 'https://santamesa.dev' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Santa Mesa',
  description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads.',
  url: 'https://santamesa.dev',
  telephone: '1300 SANTA',
  email: 'hello@santamesa.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Sydney', addressCountry: 'AU' },
  areaServed: 'Sydney',
  serviceType: ['AI Integration', 'Lead Generation', 'Website Optimization', 'Ads Management'],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <App />
    </>
  )
}
