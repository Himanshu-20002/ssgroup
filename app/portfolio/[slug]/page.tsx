import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/home/Header';
import { Footer } from '@/components/home/Footer';
import { PortfolioContainer } from '@/components/portfolio/PortfolioContainer';
import { getStoredProjects } from '@/lib/storage/dbStorage';

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const allProjects = await getStoredProjects();
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) {
    return { title: 'Exhibition Stall | SS Group Portfolio' };
  }
  return {
    title: `${project.title} | SS Group Exhibition Stalls`,
    description: project.shortDescription || project.description,
    openGraph: {
      title: `${project.title} | SS Group Exhibition Stalls`,
      description: project.shortDescription || project.description,
      images: [project.primaryImage],
    },
  };
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;
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
        <PortfolioContainer initialProjects={projects} defaultSlug={slug} />
      </Suspense>
      <Footer />
    </div>
  );
}
