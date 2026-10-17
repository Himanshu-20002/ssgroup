'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useContact } from '@/context/ContactContext';
import { HeroSlide, DEFAULT_HERO_SLIDES } from '@/lib/heroService';
import type { Project } from '@/lib/portfolioService';

interface HeroSliderProps {
  slides?: HeroSlide[];
  projects?: Project[];
}

export default function HeroSlider({ slides: propSlides, projects }: HeroSliderProps) {
  // Use active slides from database, or fallback to defaults
  const activeSlides = propSlides && propSlides.length > 0
    ? propSlides.filter((s) => s.active !== false)
    : DEFAULT_HERO_SLIDES;

  const slides = activeSlides.length > 0 ? activeSlides : DEFAULT_HERO_SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const { openContact } = useContact();

  // Reset currentSlide if it exceeds slides array length
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[currentSlide] || slides[0];

  // Resolve target project slug for the active slide
  const resolveProjectSlug = (slide: HeroSlide): string => {
    if (slide.projectSlug) {
      return slide.projectSlug;
    }

    if (projects && projects.length > 0) {
      const cleanName = (url?: string) => {
        if (!url) return '';
        const base = url.split('/').pop()?.split('?')[0] || '';
        return base.replace(/^\d+-/, '').toLowerCase();
      };

      const slideBase = cleanName(slide.image);
      if (slideBase) {
        const found = projects.find((p) => {
          const pBase = cleanName(p.primaryImage);
          const gMatch = (p.gallery || []).some((g) => cleanName(g) === slideBase);
          return (pBase && pBase === slideBase) || gMatch;
        });
        if (found) return found.slug;
      }

      const slideTitle = (slide.title || '').toLowerCase();
      const titleMatch = projects.find((p) => {
        const pTitle = (p.title || '').toLowerCase();
        const pClient = (p.client || '').toLowerCase();
        return (
          (pClient && slideTitle.includes(pClient)) ||
          (pTitle && (slideTitle.includes(pTitle) || pTitle.includes(slideTitle)))
        );
      });
      if (titleMatch) return titleMatch.slug;

      if (slide.id?.includes('double-decker') || slideTitle.includes('two-story')) {
        const dd = projects.find((p) => p.category === 'double-decker');
        if (dd) return dd.slug;
      }
    }

    return '';
  };

  const projectSlug = resolveProjectSlug(active);
  const detailUrl = projectSlug
    ? (projectSlug.startsWith('/') || projectSlug.startsWith('http')
        ? projectSlug
        : `/portfolio/${encodeURIComponent(projectSlug.trim())}`)
    : '/portfolio';

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Background Visual Depth Glow (Subtle Luxury Shadow) */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-black/5 via-amber-600/10 to-black/5 rounded-[2.5rem] blur-xl opacity-60 pointer-events-none" />

      {/* Main Glassmorphic Showcase Card in Light Theme */}
      <div className="relative rounded-[1.75rem] sm:rounded-[2rem] border border-stone-200/80 bg-white p-3.5 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">

        {/* Top Header Row: Gold Badge & Direct Link */}
        <div className="flex items-center justify-between gap-2 mb-3 z-20 relative">
          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-[11px] sm:text-xs font-bold text-stone-700 shadow-2xs hover:border-[#b88628] hover:text-[#b88628] transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b88628] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b88628]" />
            </span>
            <span className="truncate">{active.badge}</span>
          </Link>

          <Link
            href={detailUrl}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#b88628] hover:underline cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3D Stall Image Display Stage (Direct Click opens Project Details in Portfolio) */}
        <Link
          href={detailUrl}
          className="relative h-[220px] sm:h-[270px] lg:h-[310px] xl:h-[330px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-900 border border-amber-900/10 shadow-inner group cursor-pointer block"
          aria-label={`View ${active.title} details in portfolio`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative w-full h-full overflow-hidden"
            >
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                priority={currentSlide === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Pill Tag inside image */}
          {active.tag && (
            <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#11120f]/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-white shadow-lg pointer-events-none">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{active.tag}</span>
            </div>
          )}

          {/* Floating Hover Cue to View Project */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-stone-900 text-xs font-black shadow-xl transform scale-95 group-hover:scale-100 transition-all duration-300">
              <span>View In Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#b88628]" />
            </span>
          </div>
        </Link>

        {/* Slide Title, Subtitle, & Feature Pills */}
        <div className="mt-3.5 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <Link href={detailUrl} className="group/title block cursor-pointer">
              <h3 className="text-sm sm:text-base lg:text-lg font-black text-[#24150e] tracking-tight leading-snug group-hover/title:text-[#b88628] transition-colors flex items-center gap-1.5">
                <span>{active.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 text-[#b88628] transition-opacity shrink-0" />
              </h3>
              {active.subtitle && (
                <p className="text-xs sm:text-[13px] text-[#5e4535] mt-1 line-clamp-2 font-medium">
                  {active.subtitle}
                </p>
              )}
            </Link>
          </div>

          {/* Quick Specifications Pills */}
          {active.specs && active.specs.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {active.specs.map((spec, i) => (
                <span
                  key={i}
                  className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-[#faf7f2] border border-amber-900/10 text-[#3d2719] font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#88cc00]" />
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Interactive Controls Bar */}
        <div className="mt-5 pt-3.5 border-t border-amber-900/10 flex items-center justify-between gap-4">
          {/* Progress Bar & Indicators (Gold to Lime gradient) */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden cursor-pointer ${
                    isActive ? 'w-12 sm:w-16 bg-amber-200' : 'w-2 sm:w-2.5 bg-stone-200 hover:bg-stone-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {isActive && (
                    <motion.div
                      key={currentSlide}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-[#d4af37] via-[#f7d770] to-[#c59b27] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Prev/Next & Quick CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-[#3d2719] transition active:scale-95 cursor-pointer shadow-2xs"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full btn-gold-icon flex items-center justify-center font-bold cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
