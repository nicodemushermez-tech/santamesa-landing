import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts, getPost } from '../../../src/app/blog/posts'
import { BlogPost } from '../../../src/app/blog/BlogPost'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://santamesa.dev/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, width: 800, height: 400 }],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    alternates: { canonical: `https://santamesa.dev/blog/${post.slug}` },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  return <BlogPost post={post} />
}
