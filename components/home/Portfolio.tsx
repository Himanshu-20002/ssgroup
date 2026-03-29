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
  { src: '/img/RENDER-01_01.jpg', alt: 'Auto Show', text: 'Auto Show Pavilion' },
  { src: '/img/RENDER-01_02.jpg', alt: 'Health Summit', text: 'Health & Wellness Summit' },
  { src: '/img/RENDER-01_03.jpg', alt: 'Fashion Week', text: 'Fashion Week Backdrop' },
  { src: '/img/RENDER-01_04.jpg', alt: 'Real Estate', text: 'Real Estate Convention' },
  { src: '/img/RENDER-01_05.jpg', alt: 'Gaming Setup', text: 'Gaming Arena Setup' },
  { src: '/img/RENDER-01_06.jpg', alt: 'Corporate Symposium', text: 'Corporate Symposium' },
  { src: '/img/RENDER-01_07.jpg', alt: 'Airshow', text: 'Aviation Airshow Stand' },
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

      {/* Background SVG Animation - Full Section Height */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden rounded-t-3xl sm:rounded-t-[4rem]">
        <svg
          className="w-full h-full object-cover animate-[spin_120s_linear_infinite]"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,500 Q250,200 500,500 T1000,500" fill="none" stroke="#a3e635" strokeWidth="2" />
          <path d="M0,600 Q250,300 500,600 T1000,600" fill="none" stroke="#a3e635" strokeWidth="1" />
          <path d="M0,700 Q250,400 500,700 T1000,700" fill="none" stroke="#a3e635" strokeWidth="1.5" />
          <path d="M0,400 Q250,700 500,400 T1000,400" fill="none" stroke="#a3e635" strokeWidth="1" />
        </svg>
      </div>

      {/* Intro Block - Has normal vertical scroll flow, NOT pinned */}
      <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-32 z-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-7xl mx-auto text-center font-serif pointer-events-none"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.1] font-bold tracking-tight uppercase">
            CRAFTING <span className="text-lime-400 italic">SPACES</span>,<br />
            DEFINING FOR <span className="text-lime-400 italic">BRANDS</span>,<br />
            BRINGING IT ALL TO <span className="text-[#cceb99]">LIFE</span>.<br />
            BUILDING A <span className="text-lime-400 italic">LEGACY</span> IN EXHIBITIONS<br />
            ON AND OFF THE EVENT FLOOR.
          </h2>
          <p className="mt-12 text-lg md:text-xl text-neutral-400 font-sans max-w-2xl mx-auto font-medium tracking-wide">
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

      {/* VERTICAL STACK SECTION FOR MOBILE */}
      <div className="lg:hidden flex flex-col gap-12 px-4 sm:px-6 py-24 z-20 relative">
        <h3 className="text-3xl font-serif text-lime-400 mb-8 italic">Selected Work</h3>
        {portfolioImages.slice(0, 6).map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-sm group">
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="text-xs tracking-widest uppercase font-mono text-neutral-400">{img.text}</div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
