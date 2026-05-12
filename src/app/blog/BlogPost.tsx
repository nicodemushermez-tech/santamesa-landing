'use client'

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';
import type { BlogPost as BlogPostType } from './posts';
import { posts } from './posts';

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">{line.slice(4)}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**') && line.indexOf('**', 2) === line.length - 2) {
      elements.push(<p key={i} className="font-semibold text-white mb-3">{line.slice(2, -2)}</p>);
    } else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-2 mb-4 pl-4">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-base" style={{ color: '#94A3B8' }}>
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C4956A' }} />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith('| ')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        if (!lines[i].includes('---')) tableLines.push(lines[i].trim());
        i++;
      }
      const [header, ...rows] = tableLines;
      const headers = header.split('|').filter(Boolean).map(h => h.trim());
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto mb-6">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1E2D45' }}>
                {headers.map((h, j) => <th key={j} className="text-left py-3 px-4 font-semibold" style={{ color: '#C4956A' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} style={{ borderBottom: '1px solid #0F1623' }}>
                  {row.split('|').filter(Boolean).map((cell, k) => (
                    <td key={k} className="py-3 px-4" style={{ color: '#94A3B8' }}>{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else {
      const html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      elements.push(
        <p key={i} className="text-base leading-relaxed mb-4" style={{ color: '#94A3B8' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    i++;
  }
  return elements;
}

export function BlogPost({ post }: { post: BlogPostType }) {

  const related = posts.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen" style={{ background: '#080C14' }}>
      {/* Back nav */}
      <div className="pt-24 pb-0 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white mb-8" style={{ color: '#64748B' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>

      {/* Hero image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(196,149,106,0.1)', color: '#C4956A', border: '1px solid rgba(196,149,106,0.2)' }}>
              <Tag className="w-3 h-3" />{post.category}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#475569' }}>
              <Clock className="w-3 h-3" />{post.readTime}
            </span>
            <span className="text-xs" style={{ color: '#334155' }}>{new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">{post.title}</h1>
          <p className="text-lg mb-8" style={{ color: '#64748B' }}>{post.description}</p>
          <div className="rounded-2xl overflow-hidden mb-10" style={{ height: '360px' }}>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {renderContent(post.content)}
        </motion.div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(196,149,106,0.1), rgba(196,149,106,0.05))', border: '1px solid rgba(196,149,106,0.2)' }}>
          <h3 className="text-xl font-bold text-white mb-2">Ready to grow your business?</h3>
          <p className="text-sm mb-6" style={{ color: '#64748B' }}>Book a free 30-minute strategy call and we'll map out exactly what would make the biggest difference for you.</p>
          <Link href="/#booking" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #C4956A, #A67850)', color: '#080C14' }}>
            Book My Free Call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-bold text-white mb-6">More Articles</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-xl overflow-hidden transition-all hover:scale-[1.02]" style={{ background: '#0F1623', border: '1px solid #1E2D45' }}>
                  <img src={p.image} alt={p.title} className="w-full object-cover" style={{ height: '140px' }} />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-white group-hover:text-[#C4956A] transition-colors leading-snug">{p.title}</p>
                    <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: '#C4956A' }}>Read <ArrowRight className="w-3 h-3" /></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
