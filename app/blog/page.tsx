import type { Metadata } from 'next'
import { BlogList } from '../../src/app/blog/BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical advice for Sydney business owners on AI, automation, and getting more clients.',
  openGraph: {
    title: 'The Santa Mesa Blog',
    description: 'Practical advice for Sydney business owners on AI, automation, and getting more clients.',
    url: 'https://santamesa.dev/blog',
  },
  alternates: { canonical: 'https://santamesa.dev/blog' },
}

export default function BlogPage() {
  return <BlogList />
}
