import type { Metadata, Viewport } from 'next'
import '../src/styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://santamesa.dev'),
  title: {
    default: 'Santa Mesa | AI & Digital Marketing Agency Sydney',
    template: '%s | Santa Mesa',
  },
  description: 'Sydney agency helping local businesses get more clients with AI automation, lead generation & ads. Free 30-min strategy call. Book today.',
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

export const viewport: Viewport = {
  themeColor: '#080C14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  )
}
