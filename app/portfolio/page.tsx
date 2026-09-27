import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/home/Header';
import { Footer } from '@/components/home/Footer';
import { PortfolioContainer } from '@/components/portfolio/PortfolioContainer';
import { getStoredProjects } from '@/lib/storage/dbStorage';

export const revalidate = 0; // Ensures fresh data after admin mutations

export const metadata: Metadata = {
  title: 'Portfolio & Fabrication Showcase | SS Group Exhibition Stalls',
  description:
    'Explore 150+ turnkey exhibition stalls, custom 3D wooden pavilions, double-decker VIP stands, and modular stalls fabricated across Pragati Maidan, IEML Greater Noida, and PAN India.',
  keywords: [
    'Exhibition Stall Portfolio',
    'Stall Fabrication Showcase',
    'Pragati Maidan Stall Contractor',
    'IEML Greater Noida Booth Fabrication',
    'Custom Exhibition Stands',
    'SS Group Portfolio',
  ],
  openGraph: {
    title: 'Exhibition Stall Fabrication Portfolio | SS Group',
    description:
      'High-impact custom wooden stalls, double decker booths, and modular exhibition architecture fabricated across India.',
    type: 'website',
    url: 'https://ssgroup.com/portfolio',
    images: [
      {
        url: '/img/RENDER-01.jpg',
        width: 1200,
        height: 630,
        alt: 'SS Group Exhibition Stall Fabrication Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exhibition Stall Fabrication Portfolio | SS Group',
    description:
      'Explore our real-world custom exhibition stalls and booths fabricated across Pragati Maidan & PAN India.',
    images: ['/img/RENDER-01.jpg'],
  },
};

export default async function PortfolioPage() {
  const allProjects = await getStoredProjects();
  const projects = allProjects.filter((p) => p.status !== 'draft');

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] text-[#24150e]">
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen pt-40 text-center text-sm font-bold text-neutral-500">
            Loading Exhibition Showcase...
          </div>
        }
      >
        <PortfolioContainer initialProjects={projects} />
      </Suspense>
      <Footer />
    </div>
  );
}
