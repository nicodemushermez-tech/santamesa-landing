'use client'

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { posts } from './posts';

export function BlogList() {
  return (
    <div className="min-h-screen" style={{ background: '#080C14' }}>
      {/* Header */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center" style={{ borderBottom: '1px solid #1E2D45' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: '#C4956A' }}>
            Resources & Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Santa Mesa Blog</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#64748B' }}>
            Practical advice for Sydney business owners on AI, automation, and getting more clients.
          </p>
        </motion.div>
      </div>

      {/* Posts grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full rounded-2xl overflow-hidden transition-all hover:scale-[1.02]" style={{ background: '#0F1623', border: '1px solid #1E2D45' }}>
                <div className="overflow-hidden" style={{ height: '200px' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(196,149,106,0.1)', color: '#C4956A', border: '1px solid rgba(196,149,106,0.2)' }}>
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: '#475569' }}>
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-[#C4956A] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748B' }}>
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#C4956A' }}>
                    Read article <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
