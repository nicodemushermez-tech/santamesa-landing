import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts, getPost, type BlogPost as BlogPostType } from '../../../src/app/blog/posts'
import { BlogPost } from '../../../src/app/blog/BlogPost'

// Unsplash URLs include sizing query params — rewrite to a proper 1200x630 OG crop
// so LinkedIn/FB/Twitter render the card at the standard aspect ratio.
function ogImageUrl(image: string): string {
  if (image.includes('images.unsplash.com')) {
    return image
      .replace(/([?&])w=\d+/, '$1w=1200')
      .replace(/([?&])h=\d+/, '$1h=630')
  }
  return image
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const og = ogImageUrl(post.image)
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://santamesa.dev/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['Santa Mesa'],
      section: post.category,
      images: [{ url: og, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [og],
    },
    alternates: { canonical: `https://santamesa.dev/blog/${post.slug}` },
  }
}

function buildJsonLd(post: BlogPostType) {
  const url = `https://santamesa.dev/blog/${post.slug}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: post.title,
    description: post.description,
    image: ogImageUrl(post.image),
    author: { '@type': 'Organization', name: 'Santa Mesa', url: 'https://santamesa.dev' },
    publisher: {
      '@type': 'Organization',
      name: 'Santa Mesa',
      url: 'https://santamesa.dev',
      logo: { '@type': 'ImageObject', url: 'https://santamesa.dev/logo-light.png' },
    },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-AU',
    articleSection: post.category,
    url,
  }
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://santamesa.dev' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://santamesa.dev/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }
  return { article, breadcrumbs }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { article, breadcrumbs } = buildJsonLd(post)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <BlogPost post={post} />
    </>
  )
}
