import type { Metadata, Viewport } from 'next';
import React from 'react';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://workperhour.com'),
  title: {
    default: 'Remix Work Per Hour | Freelance Marketplace & Escrow Platform',
    template: '%s | Work Per Hour',
  },
  description:
    'A feature-rich PeoplePerHour clone with gig marketplace, custom project proposals, escrow payments, real-time messaging, and buyer/seller dashboards.',
  applicationName: 'Work Per Hour',
  authors: [{ name: 'Work Per Hour Platform' }],
  keywords: [
    'freelance marketplace',
    'escrow payments',
    'hire freelancers',
    'sell gigs',
    'project proposals',
    'remote work',
  ],
  creator: 'Work Per Hour',
  publisher: 'Work Per Hour Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://workperhour.com',
    siteName: 'Work Per Hour',
    title: 'Remix Work Per Hour | Freelance Marketplace & Escrow Platform',
    description:
      'A feature-rich PeoplePerHour clone with gig marketplace, custom project proposals, escrow payments, real-time messaging, and buyer/seller dashboards.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Work Per Hour Freelance Marketplace Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remix Work Per Hour | Freelance Marketplace & Escrow Platform',
    description:
      'A feature-rich PeoplePerHour clone with gig marketplace, custom project proposals, escrow payments, real-time messaging, and buyer/seller dashboards.',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop'],
    creator: '@workperhour',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://workperhour.com/#organization',
        name: 'Work Per Hour',
        url: 'https://workperhour.com',
        logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop',
        sameAs: [
          'https://twitter.com/workperhour',
          'https://linkedin.com/company/workperhour',
          'https://github.com/workperhour',
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://workperhour.com/#webapp',
        name: 'Work Per Hour Marketplace',
        url: 'https://workperhour.com',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        description:
          'A feature-rich PeoplePerHour clone with gig marketplace, custom project proposals, escrow payments, real-time messaging, and buyer/seller dashboards.',
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '5',
          highPrice: '10000',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
