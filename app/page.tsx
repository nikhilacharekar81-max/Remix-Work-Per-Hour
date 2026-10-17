import React from 'react';
import Link from 'next/link';
import { SEED_GIGS, SEED_PROJECTS } from '../src/data/completeSeedDataset';

export default function HomePage() {
  const featuredGigs = (SEED_GIGS || []).slice(0, 6);
  const recentProjects = (SEED_PROJECTS || []).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                W
              </span>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                WorkPerHour
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link href="/gigs" className="hover:text-indigo-600 transition">Browse Gigs</Link>
              <Link href="/projects" className="hover:text-indigo-600 transition">Find Projects</Link>
              <Link href="/freelancers" className="hover:text-indigo-600 transition">Top Freelancers</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              Post a Project
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-indigo-200 text-xs font-bold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Escrow-Protected Marketplace
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Hire Expert Freelancers for Any Job, Paid on Results.
          </h1>
          <p className="text-base md:text-lg text-indigo-200 max-w-2xl mx-auto">
            From design systems to full-stack engineering. Your payments stay funded safely in escrow until you approve the final delivery.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/gigs"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition"
            >
              Explore Top Gigs
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-sm font-bold rounded-xl backdrop-blur-xs transition"
            >
              Browse Open Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Gigs Grid (Server Pre-Rendered for SEO) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Trending Services & Gigs</h2>
            <p className="text-sm text-slate-500 mt-1">Pre-packaged services with clear delivery deadlines and escrow guarantee.</p>
          </div>
          <Link href="/gigs" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition">
            View All ({SEED_GIGS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGigs.map((gig) => (
            <Link
              key={gig.id}
              href={`/gigs/${gig.slug || gig.id}`}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition flex flex-col"
            >
              <div className="aspect-video bg-slate-100 overflow-hidden relative">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded-lg text-[10px] font-bold text-slate-700">
                  {gig.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={gig.freelancerAvatar}
                      alt={gig.freelancerName}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-xs font-medium text-slate-600">{gig.freelancerName}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2">
                    {gig.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">★ {gig.rating} ({gig.reviewsCount})</span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">STARTING AT</span>
                    <span className="text-base font-extrabold text-slate-900">${gig.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Architecture Showcase Banner */}
      <section className="bg-white border-y border-slate-200 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900">Next.js SSR & Crawlability</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every gig and profile has static & SSR HTML pre-rendered with Schema.org JSON-LD and OpenGraph tags for search engines and social platforms.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900">Express Escrow & Financial Ledger</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Double-entry ledger with automated fee splits, buyer 3-day review window, and cryptographic session protection.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-slate-900">Real-Time Workstream Engine</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Authenticated WebSocket channels for instant delivery notifications, revisions, live messaging, and review lifecycles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
