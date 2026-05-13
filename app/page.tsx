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

const orgLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'MarketingAgency'],
  '@id': 'https://santamesa.dev/#business',
  name: 'Santa Mesa',
  description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads.',
  url: 'https://santamesa.dev',
  logo: 'https://santamesa.dev/logo-light.png',
  image: 'https://santamesa.dev/og.jpg',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -33.8688, longitude: 151.2093 },
  areaServed: [
    { '@type': 'City', name: 'Sydney' },
    { '@type': 'AdministrativeArea', name: 'New South Wales' },
    { '@type': 'Country', name: 'Australia' },
  ],
  knowsAbout: [
    'AI Integration',
    'Lead Generation',
    'Website Optimisation',
    'Google Ads',
    'Conversion Rate Optimisation',
    'CRM Automation',
  ],
  sameAs: [],
}

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://santamesa.dev/#website',
  url: 'https://santamesa.dev',
  name: 'Santa Mesa',
  inLanguage: 'en-AU',
  publisher: { '@id': 'https://santamesa.dev/#business' },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <App />
    </>
  )
}
