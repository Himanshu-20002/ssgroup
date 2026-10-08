'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useContact } from '@/context/ContactContext';

const slides = [
  {
    image: '/img/hero/hero-1.jpg',
    badge: 'Custom 3D Wooden Fabrication',
    tag: 'Bespoke Pavilion',
    title: 'Custom Fabricated Exhibition Stalls',
    subtitle: 'High-impact brand pavilions tailored for maximum visitor engagement and footfall.',
    specs: ['Free 3D Design Concept', 'Factory Rate Pricing', 'Turnkey Fabrication'],
  },
  {
    image: '/img/hero/hero-2.jpg',
    badge: 'Double Decker & Mezzanine Stands',
    tag: 'Multi-Level Architecture',
    title: 'Two-Story Exhibition Pavilions',
    subtitle: 'Double your expo footprint with private upper-deck buyer lounges and VIP suites.',
    specs: ['Structural Safety Certified', 'Private VIP Lounge', 'Panoramic View'],
  },
  {
    image: '/img/hero/hero-3.jpg',
    badge: 'Modular & Hybrid Booths',
    tag: 'Fast Turnaround Setup',
    title: 'Octanorm & Engineered Modular Stalls',
    subtitle: 'Cost-effective, sustainable, and precision-fitted stalls built for fast 24-hr turnaround.',
    specs: ['24-Hour Rapid Setup', 'Eco-Friendly Reusable', 'Seamless Graphic Finish'],
  },
  {
    image: '/img/hero/hero-stall.png',
    badge: 'PAN India Turnkey Execution',
    tag: 'On-Site Setup Support',
    title: 'Complete On-Site Expo Management',
    subtitle: 'Dedicated fabrication, transport, setup, and teardown across Delhi NCR, IEML & Mumbai.',
    specs: ['On-Site Project Manager', 'Pragati Maidan & IEML', '100% On-Time Delivery'],
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openContact } = useContact();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Background Visual Depth Glow (Gold & Lime) */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400/20 via-[#bbff1bff]/20 to-amber-300/20 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none" />

      {/* Main Glassmorphic Showcase Card in Light Theme */}
      <div className="relative rounded-[2rem] border border-amber-900/10 bg-white/95 backdrop-blur-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(50,30,15,0.07)] overflow-hidden">

        {/* Top Header Row: Gold & Lime Badge & Counter */}
        <div className="flex items-center justify-between gap-2 mb-3.5 z-20 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-lime-50/60 border border-amber-200/80 text-xs font-bold text-[#7a5316] shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#88cc00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#88cc00]" />
            </span>
            <span className="truncate">{slides[currentSlide].badge}</span>
          </div>
          {/* <div className="text-xs font-mono font-bold text-[#735338] bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-full">
            0{currentSlide + 1} / 0{slides.length}
          </div> */}
        </div>

        {/* 3D Stall Image Display Stage (Warm Alabaster/Champagne backdrop) */}
        <div className="relative h-[250px] sm:h-[320px] lg:h-[380px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-900 border border-amber-900/10 shadow-inner group">
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
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
                className="object-cover object-center filter brightness-[1.02] contrast-[1.03]"
                priority={currentSlide === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Pill Tag inside image */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#11120f]/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-[#bbff1bff]" />
            <span>{slides[currentSlide].tag}</span>
          </div>
        </div>

        {/* Slide Title, Subtitle, & Feature Pills */}
        <div className="mt-4 space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-xl font-black text-[#24150e] tracking-tight leading-snug">
                {slides[currentSlide].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5e4535] mt-1 line-clamp-2 font-medium">
                {slides[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Quick Specifications Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {slides[currentSlide].specs.map((spec, i) => (
              <span
                key={i}
                className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg bg-[#faf7f2] border border-amber-900/10 text-[#3d2719] font-semibold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-[#88cc00]" />
                {spec}
              </span>
            ))}
          </div>
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
                  className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden cursor-pointer ${isActive ? 'w-12 sm:w-16 bg-amber-200' : 'w-2 sm:w-2.5 bg-stone-200 hover:bg-stone-300'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {isActive && (
                    <motion.div
                      key={currentSlide}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 6, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-[#c59b27] via-[#bbff1bff] to-[#c59b27] rounded-full"
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
              className="w-8 h-8 rounded-full bg-[#bbff1bff] text-[#1a1209] hover:bg-[#a6ec00] transition flex items-center justify-center font-bold active:scale-95 shadow-sm border border-[#a0e800]/40 cursor-pointer"
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



