import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOHead({
  title = 'Santa Mesa - Elevate Your Vision | AI Integration, Lead Campaigns & Website Optimization',
  description = 'Sydney-based consulting services specializing in AI integration, lead campaigns, website optimization, and ads management. Transform your business with data-driven strategies. Book a consultation today.',
  image = 'https://images.unsplash.com/photo-1558403194-611308249627?w=1200&h=630&fit=crop',
  url = 'https://santamesa.dev',
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="F60Ktz9wRtQ9jPuoxBZc4IlufLatFBMDdt5UHw7fofQ" />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="AI integration, lead generation, website optimization, digital marketing, consulting services Sydney, Google Ads management, Facebook Ads, SEO optimization, conversion rate optimization, business growth Australia" />
      <meta name="author" content="Santa Mesa" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0F172A" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_AU" />
      <meta property="og:site_name" content="Santa Mesa" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="AU-NSW" />
      <meta name="geo.placename" content="Sydney" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data for Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Santa Mesa',
          image: image,
          '@id': url,
          url: url,
          email: 'hello@santamesa.dev',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sydney',
            addressRegion: 'NSW',
            addressCountry: 'AU',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -33.8688,
            longitude: 151.2093,
          },
          sameAs: [],
          description: description,
          areaServed: 'Australia',
          slogan: 'Elevate Your Vision - Where Innovation Meets Growth',
          priceRange: '$$',
          serviceType: [
            'AI Integration',
            'Lead Generation',
            'Website Optimization',
            'Digital Advertising Management',
          ],
        })}
      </script>
    </Helmet>
  );
}
