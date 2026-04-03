"use client"

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const portfolioImages = [
  { src: '/img/RENDER-01.jpg', alt: 'Global Tech Expo', text: 'Global Tech Expo, 2024' },
  { src: '/modular_shell_upgrade_png_1774886735919.png', alt: 'Auto Show', text: 'Auto Show Pavilion' },
  { src: '/double_decker_stall_png_1774886790718.png', alt: 'Health Summit', text: 'Health & Wellness Summit' },
  { src: '/custom_fabricated_stall_png_1774886755662.png', alt: 'Fashion Week', text: 'Fashion Week Backdrop' },
  { src: '/island_corner_stall_png_1774886772675.png', alt: 'Real Estate', text: 'Real Estate Convention' },
  { src: '/product_launch_booth_png_1774886810577.png', alt: 'Gaming Setup', text: 'Gaming Arena Setup' },
  { src: '/conference_seminar_booth_png_1774886833646.png', alt: 'Corporate Symposium', text: 'Corporate Symposium' },
  { src: '/experience_demo_zone_png_1774886856936.png', alt: 'Airshow', text: 'Aviation Airshow Stand' },
]

export function Portfolio() {
  const rootRef = useRef<HTMLElement>(null)
  const scrollSectionRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const entryContainerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    const pinContainer = pinContainerRef.current
    const scrollSection = scrollSectionRef.current
    const entryContainer = entryContainerRef.current
    if (!track || !pinContainer || !scrollSection || !entryContainer || window.innerWidth < 1024) return

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    // Trigger 1: Entry swoop perfectly isolated to an external container so transform math NEVER overlaps
    gsap.fromTo(entryContainer,
      { x: "60vw", y: "35vh", force3D: true },
      {
        x: 0, y: 0, ease: "none", force3D: true,
        scrollTrigger: {
          trigger: scrollSection,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          invalidateOnRefresh: true,
        }
      }
    );

    // Trigger 2: ONE flawless system. Removes conflicting entry durations and perfectly binds to natural scroll.
    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: scrollSection, // Reads positioning from the unpolluted outer wrapper
        start: "top top", // Physical lock
        end: () => `+=${getScrollAmount()}`, // Math is dynamically evaluated by GSAP only
        pin: true, // Master pin
        scrub: 3, // Upped to 1.5. This seamlessly simulates the "Premium Weight / Inertia" WITHOUT breaking native OS behavior (like normalizeScroll does).
        snap: {
          snapTo: 1 / 5, // 6 total flex element blocks - 1 = 5 snap segments!
          duration: { min: 0.2, max: 0.8 }, // Extremely soft snap transitions
          delay: 0.1, // Gives user's mouse wheel priority before snapping evaluates
          ease: "power2.inOut"
        },
        invalidateOnRefresh: true, // Automatically recalculates if screen width is resized
      }
    });

    // Removed inner-card parallax completely to keep 100% image boundaries static

    // Refresh ScrollTrigger when layout shifts
    ScrollTrigger.refresh()

  }, { scope: rootRef })

  return (
    <section id="portfolio" ref={rootRef} className="bg-[#1a1c1a] text-[#e0e0d5] relative z-10 rounded-t-3xl sm:rounded-t-[4rem]">

      {/* Background SVG Animation - Lightweight Minimalist Indian Motif */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden rounded-t-3xl sm:rounded-t-[4rem] flex items-center justify-center">
        <svg
          className="min-w-[150vw] min-h-[150vw] md:min-w-[100vw] md:min-h-[100vw] object-cover animate-[spin_240s_linear_infinite] origin-center mix-blend-screen opacity-50"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#bbff1bff" fill="none" transform="translate(500, 500)">
            {/* Minimal Background Rings */}
            <circle r="250" strokeWidth="0.5" strokeDasharray="3 12" className="opacity-40" />
            <circle r="420" strokeWidth="1" className="opacity-20" />

            {/* 8 Elegant, Widely Spaced Lotus Petals */}
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={`lotus-${i}`} transform={`rotate(${i * 45})`}>
                {/* Thin, graceful outer petal */}
                <path d="M 0,-250 C 40,-320 80,-360 0,-420 C -80,-360 -40,-320 0,-250 Z" strokeWidth="1" className="opacity-50" />

                {/* Minimal inner teardrop stem */}
                <path d="M 0,-150 C 20,-190 30,-220 0,-250 C -30,-220 -20,-190 0,-150 Z" strokeWidth="0.5" className="opacity-40" />

                {/* Delicate accent lines extending outwards */}
                <path d="M 0,-420 L 0,-440" strokeWidth="1" className="opacity-60" />

                {/* Elegant accent dots (retaining user's orange) */}
                <circle cx="0" cy="-455" r="3.5" fill="#ff9d1cff" stroke="none" className="opacity-90" />
                <circle cx="0" cy="-470" r="1.5" fill="#bbff1bff" stroke="none" className="opacity-60" />
              </g>
            ))}

            {/* Simple Central Starburst for focus */}
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={`star-${i}`} transform={`rotate(${i * 45})`} d="M 0,-30 L 0,-100" strokeWidth="0.5" strokeDasharray="1 4" className="opacity-50" />
            ))}
          </g>
        </svg>
      </div>

      {/* Intro Block - Has normal vertical scroll flow, NOT pinned */}
      <div className="relative w-full min-h-[30vh] lg:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-20 z-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-6xl mx-auto text-center font-serif pointer-events-none"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.1] font-bold tracking-tight uppercase">
            {/* CRAFTING <span className="text-lime-400 italic">SPACES</span>,<br />
            DEFINING FOR <span className="text-lime-400 italic">BRANDS</span>,<br />
            BRINGING IT ALL TO <span className="text-[#cceb99]">LIFE</span>.<br /> */}
            BUILDING A <span className="text-lime-400 italic">LEGACY</span> IN EXHIBITIONS<br />
            ON AND OFF THE EVENT FLOOR.
          </h2>
          <p className="mt-6 lg:mt-12 text-base md:text-xl text-neutral-400 font-sans max-w-2xl mx-auto font-medium tracking-wide">
            SS Group creates world-class exhibition stalls combining precision, aesthetics, and structural integrity.
          </p>
        </motion.div>
      </div>

      {/* HORIZONTAL SCROLL SECTION FOR DESKTOP - This is what gets pinned */}
      <div ref={scrollSectionRef} className="relative w-full z-20">
        <div ref={pinContainerRef} className="hidden lg:flex w-full h-screen items-center relative overflow-hidden">
          <div ref={entryContainerRef} className="w-max h-full flex items-center">
            <div ref={trackRef} className="flex flex-nowrap shrink-0 gap-32 px-16 lg:px-32 w-max h-full items-center will-change-transform">

              {/* Gallery Cluster 1 - Smaller Wide */}
              <div className="relative w-[35rem] h-[25rem] shrink-0 flex items-center justify-center mt-12">
                <div className="absolute -top-8 left-0 text-xs tracking-widest uppercase font-mono text-lime-400 drop-shadow-md">{portfolioImages[0].text}</div>
                <div className="w-full h-full relative overflow-hidden group transform-gpu rounded-lg shadow-2xl" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                  <Image src={portfolioImages[0].src} alt={portfolioImages[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>

              {/* Gallery Cluster 2 - Dynamic Double */}
              <div className="relative w-[30rem] h-[45rem] shrink-0 flex flex-col justify-between">
                <div className="relative w-full self-start">
                  <div className="absolute -top-6 right-0 z-10 text-xs tracking-widest uppercase font-mono text-neutral-400">{portfolioImages[1].text}</div>
                  <div className="w-full h-[22rem] relative overflow-hidden group transform-gpu rounded-lg shadow-2xl" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                    <Image src={portfolioImages[1].src} alt={portfolioImages[1].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>

                <div className="relative self-start">
                  <div className="w-[18rem] h-[18rem] relative overflow-hidden group transform-gpu rounded-lg shadow-2xl" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                    <Image src={portfolioImages[2].src} alt={portfolioImages[2].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute top-0 -right-10 z-10 text-xs tracking-widest uppercase font-mono text-[10px] sm:text-xs text-neutral-400 [writing-mode:vertical-rl] tracking-[0.3em]">{portfolioImages[2].text}</div>
                </div>
              </div>

              {/* Quote Block */}
              <div className="w-[30rem] shrink-0 px-8">
                <h3 className="font-serif text-4xl italic text-lime-400 mb-6 drop-shadow-md">"It doesn't matter where you start, it's how you progress from there."</h3>
                <p className="font-mono text-sm tracking-widest text-neutral-500 uppercase">- The SS Group Standard</p>
              </div>

              {/* Gallery Cluster 3 - Massive Hero */}
              <div className="relative w-[50rem] h-[45rem] shrink-0 flex items-center justify-center">
                <div className="absolute top-0 -left-10 text-xs tracking-widest uppercase font-mono text-[10px] sm:text-xs text-neutral-400 [writing-mode:vertical-rl] -rotate-180 tracking-[0.3em]">{portfolioImages[3].text}</div>
                <div className="w-full h-full relative overflow-hidden group transform-gpu rounded-lg shadow-2xl shadow-lime-900/10" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                  <Image src={portfolioImages[3].src} alt={portfolioImages[3].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>

              {/* Gallery Cluster 4 - Asymmetric Tall */}
              <div className="relative w-[28rem] h-[48rem] shrink-0 flex flex-col justify-around">
                <div className="relative self-end">
                  <div className="absolute top-0 -left-10 z-10 text-xs tracking-widest uppercase font-mono text-[10px] sm:text-xs text-neutral-400 [writing-mode:vertical-rl] -rotate-180 tracking-[0.3em]">{portfolioImages[4].text}</div>
                  <div className="w-[20rem] h-[20rem] relative overflow-hidden group transform-gpu rounded-lg shadow-2xl" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                    <Image src={portfolioImages[4].src} alt={portfolioImages[4].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>

                <div className="relative w-full self-start">
                  <div className="w-full h-[22rem] relative overflow-hidden group transform-gpu rounded-lg shadow-2xl" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                    <Image src={portfolioImages[5].src} alt={portfolioImages[5].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute -bottom-8 right-0 z-10 text-xs tracking-widest uppercase font-mono text-neutral-400">{portfolioImages[5].text}</div>
                </div>
              </div>

              {/* Gallery Cluster 5 - Small Accent */}
              <div className="relative w-[22rem] h-[30rem] shrink-0 flex items-center justify-center pr-16 xl:pr-32">
                <div className="relative w-full h-full">
                  <div className="absolute top-4 -right-10 z-10 text-xs tracking-widest uppercase font-mono text-[10px] sm:text-xs text-neutral-400 [writing-mode:vertical-rl] tracking-[0.3em]">{portfolioImages[6].text}</div>
                  <div className="w-full h-full relative overflow-hidden group transform-gpu rounded-lg shadow-2xl" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                    <Image src={portfolioImages[6].src} alt={portfolioImages[6].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL SECTION FOR MOBILE */}
      <div className="lg:hidden flex flex-col gap-6 py-12 z-20 relative overflow-hidden">
        <div className="px-5 flex justify-between items-end">
          <div>
            <h3 className="text-3xl font-serif text-lime-400 italic leading-none">Portfolio</h3>
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-2 font-mono">Our Selected Projects</p>
          </div>
          <div className="flex gap-1 items-center pb-1">
            <div className="w-1 h-1 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Swipe</span>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-5 px-5 pb-8 snap-x snap-mandatory no-scrollbar">
          {portfolioImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="min-w-[82vw] snap-center relative rounded-3xl overflow-hidden aspect-[4/5] bg-neutral-900 border border-white/5 shadow-2xl"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />

              {/* Glassmorphic Card Info */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono text-lime-400 uppercase tracking-widest">Project {String(idx + 1).padStart(2, '0')}</span>
                    <div className="w-8 h-[1px] bg-white/20 mt-2" />
                  </div>
                  <h4 className="text-xl font-serif text-white leading-tight mb-3">{img.text}</h4>
                  <div className="flex items-center gap-2 group/btn">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest group-hover/btn:text-lime-400 transition-colors">View Details</span>
                    <svg className="w-3 h-3 text-lime-400 transform transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
