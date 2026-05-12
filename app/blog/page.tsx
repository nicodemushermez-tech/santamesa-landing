import type { Metadata } from 'next'
import { BlogList } from '../../src/app/blog/BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical advice for Sydney business owners on AI, automation, and getting more clients.',
  openGraph: {
    title: 'The Santa Mesa Blog',
    description: 'Practical advice for Sydney business owners on AI, automation, and getting more clients.',
    url: 'https://santamesa.dev/blog',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Santa Mesa Blog' }],
  },
  twitter: {
    title: 'The Santa Mesa Blog',
    description: 'Practical advice for Sydney business owners on AI, automation, and getting more clients.',
    images: ['/og.jpg'],
  },
  alternates: { canonical: 'https://santamesa.dev/blog' },
}

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://santamesa.dev/blog',
  url: 'https://santamesa.dev/blog',
  name: 'The Santa Mesa Blog',
  description: 'Practical advice for Sydney business owners on AI, automation, and getting more clients.',
  inLanguage: 'en-AU',
  isPartOf: { '@id': 'https://santamesa.dev/#website' },
  publisher: { '@id': 'https://santamesa.dev/#business' },
}

const breadcrumbsLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://santamesa.dev' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://santamesa.dev/blog' },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }} />
      <BlogList />
    </>
  )
}
