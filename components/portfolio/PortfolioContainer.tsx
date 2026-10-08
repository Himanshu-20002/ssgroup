'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Project } from '@/lib/portfolioService';
import { PortfolioHero } from './PortfolioHero';
import { PortfolioFilters } from './PortfolioFilters';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

interface PortfolioContainerProps {
  initialProjects: Project[];
  defaultSlug?: string;
}

export function PortfolioContainer({ initialProjects, defaultSlug }: PortfolioContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    if (defaultSlug) {
      return initialProjects.find((p) => p.slug === defaultSlug) || null;
    }
    return null;
  });

  // Sync query parameter `?project=slug` or pathname slug on mount/navigation
  useEffect(() => {
    if (isDismissed) return;
    const projectSlug = searchParams.get('project') || defaultSlug;
    if (projectSlug) {
      const found = initialProjects.find((p) => p.slug === projectSlug);
      if (found) {
        setSelectedProject(found);
      }
    }
  }, [searchParams, defaultSlug, initialProjects, isDismissed]);

  // Handle browser back/forward buttons cleanly
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/portfolio\/([^/]+)/);
      if (match) {
        const slug = match[1];
        const found = initialProjects.find((p) => p.slug === slug);
        setIsDismissed(false);
        setSelectedProject(found || null);
      } else {
        setIsDismissed(true);
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [initialProjects]);

  // Handle open modal and update URL
  const handleOpenDetails = (project: Project) => {
    setIsDismissed(false);
    setSelectedProject(project);
    window.history.pushState({}, '', `/portfolio/${project.slug}`);
  };

  // Handle close modal and update URL
  const handleCloseDetails = () => {
    setIsDismissed(true);
    setSelectedProject(null);
    if (defaultSlug) {
      router.push('/portfolio');
    } else {
      window.history.pushState({}, '', '/portfolio');
    }
  };

  // Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProjects.length };
    initialProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [initialProjects]);

  // Filtered & Searched Projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category check
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesClient = project.client.toLowerCase().includes(query);
        const matchesVenue = project.venue.toLowerCase().includes(query);
        const matchesDesc = project.shortDescription.toLowerCase().includes(query);
        const matchesCategory = project.categoryLabel.toLowerCase().includes(query);
        const matchesMaterials = project.materials.some((m) => m.toLowerCase().includes(query));

        if (
          !matchesTitle &&
          !matchesClient &&
          !matchesVenue &&
          !matchesDesc &&
          !matchesCategory &&
          !matchesMaterials
        ) {
          return false;
        }
      }

      return true;


      
    });
  }, [initialProjects, activeCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-[#fcfbf9] text-[#24150e]">
      {/* Hero Section */}
      <PortfolioHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalProjects={initialProjects.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {/* Filter Navigation */}
        <PortfolioFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
        />

        {/* Results Counter / Active Filters Bar */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-500 border-b border-neutral-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#24150e]">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'Stall' : 'Stalls'}
            </span>
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-[#7a5316] font-semibold text-xs">
                Filter: {activeCategory}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800 font-semibold text-xs">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard
                    project={project}
                    onOpenDetails={handleOpenDetails}
                    priority={idx < 4}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-neutral-200 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-[#c59b27]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#24150e]">No Stalls Found</h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              We couldn&apos;t find any fabricated stalls matching your criteria. Try adjusting your search query or category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#24150e] text-white text-xs font-bold hover:bg-[#3d2719] transition-all cursor-pointer"
            >
              Show All Stalls
            </button>
          </div>
        )}
      </main>

      {/* Lightbox / Detail Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseDetails} />
    </div>
  );
}
