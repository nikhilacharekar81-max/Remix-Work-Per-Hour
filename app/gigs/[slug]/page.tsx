import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SEED_GIGS } from '../../../src/data/completeSeedDataset';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const gig = (SEED_GIGS || []).find((g) => (g.slug || g.id) === slug || g.id === slug);

  if (!gig) {
    return {
      title: 'Gig Not Found | Work Per Hour',
      description: 'The requested freelance service could not be found.',
    };
  }

  const cleanDescription = (gig.description || '').slice(0, 155).replace(/\s+/g, ' ');
  const pageUrl = `https://workperhour.com/gigs/${gig.slug || gig.id}`;

  return {
    title: `${gig.title} by ${gig.freelancerName}`,
    description: cleanDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${gig.title} | Work Per Hour`,
      description: cleanDescription,
      images: [
        {
          url: gig.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop',
          width: 1200,
          height: 630,
          alt: gig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: gig.title,
      description: cleanDescription,
      images: [gig.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop'],
    },
  };
}

export default async function GigDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const gig = (SEED_GIGS || []).find((g) => (g.slug || g.id) === slug || g.id === slug);

  if (!gig) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: gig.title,
    image: gig.image,
    description: gig.description,
    brand: {
      '@type': 'Brand',
      name: gig.freelancerName,
    },
    offers: {
      '@type': 'Offer',
      url: `https://workperhour.com/gigs/${gig.slug || gig.id}`,
      priceCurrency: 'USD',
      price: gig.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: gig.rating || 5,
      reviewCount: gig.reviewsCount || 1,
    },
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs font-semibold text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-indigo-600 transition">Home</Link>
        <span>/</span>
        <span className="text-slate-700">{gig.category}</span>
        <span>/</span>
        <span className="text-slate-900 truncate max-w-xs">{gig.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
            {gig.title}
          </h1>

          <div className="flex items-center gap-3">
            <img
              src={gig.freelancerAvatar}
              alt={gig.freelancerName}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">{gig.freelancerName}</p>
              <p className="text-xs text-slate-500">★ {gig.rating} ({gig.reviewsCount} reviews)</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Service Description</h2>
            <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
              {gig.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 sticky top-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starting Price</span>
              <span className="text-3xl font-extrabold text-slate-900">${gig.price}</span>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <p className="flex justify-between">
                <span>Delivery Time:</span>
                <span className="font-semibold text-slate-900">{gig.deliveryDays} Days</span>
              </p>
              <p className="flex justify-between">
                <span>Escrow Protection:</span>
                <span className="font-semibold text-emerald-600">Included</span>
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition"
            >
              Order Service with Escrow
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
