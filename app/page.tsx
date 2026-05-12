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

export default function HomePage() {
  return <App />
}
