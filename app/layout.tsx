import type { Metadata } from 'next'
import '../src/styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://santamesa.dev'),
  title: {
    default: 'Santa Mesa | AI & Digital Marketing Agency Sydney',
    template: '%s | Santa Mesa',
  },
  description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads. Free 30-min strategy call. Book today.',
  keywords: ['AI integration', 'lead generation', 'digital marketing', 'Google Ads', 'SEO', 'Sydney', 'Australia'],
  authors: [{ name: 'Santa Mesa' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Santa Mesa',
    url: 'https://santamesa.dev',
  },
  twitter: { card: 'summary_large_image' },
  verification: { google: 'F60Ktz9wRtQ9jPuoxBZc4IlufLatFBMDdt5UHw7fofQ' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
