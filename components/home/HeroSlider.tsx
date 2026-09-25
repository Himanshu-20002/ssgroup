'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useContact } from '@/context/ContactContext';

const slides = [
  {
    image: '/hero-1.png',
    badge: 'Custom 3D Wooden Fabrication',
    tag: 'Bespoke Pavilion',
    title: 'Custom Fabricated Exhibition Stalls',
    subtitle: 'High-impact brand pavilions tailored for maximum visitor engagement and footfall.',
    specs: ['Free 3D Design Concept', 'Factory Rate Pricing', 'Turnkey Fabrication'],
  },
  {
    image: '/hero-2.png',
    badge: 'Double Decker & Mezzanine Stands',
    tag: 'Multi-Level Architecture',
    title: 'Two-Story VIP Exhibition Pavilions',
    subtitle: 'Double your expo footprint with private upper-deck buyer lounges and VIP suites.',
    specs: ['Structural Safety Certified', 'Private VIP Lounge', 'Panoramic View'],
  },
  {
    image: '/hero-3.png',
    badge: 'Modular & Hybrid Booths',
    tag: 'Fast Turnaround Setup',
    title: 'Octanorm & Engineered Modular Stalls',
    subtitle: 'Cost-effective, sustainable, and precision-fitted stalls built for fast 24-hr turnaround.',
    specs: ['24-Hour Rapid Setup', 'Eco-Friendly Reusable', 'Seamless Graphic Finish'],
  },
  {
    image: '/hero-stall.png',
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
        <div className="relative h-[250px] sm:h-[320px] lg:h-[380px] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#fbf9f5] via-[#f4eee4] to-[#ebe1d2] border border-amber-900/10 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: -10 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center"
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
                className="object-contain drop-shadow-[0_18px_35px_rgba(55,35,15,0.22)] filter"
                priority={currentSlide === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating Pill Tag inside image */}
          <div className="absolute bottom-3 left-3 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-amber-900/15 text-[11px] font-bold text-[#442c1d] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
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





// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { ShieldCheck, Calculator, ArrowRight, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

// const slides = [
//   {
//     image: '/images/banner/hero-1.webp',
//     mobileImage: '/images/banner/hero-1-mobile.webp',
//     badge: 'Global Multimodal Freight Leader',
//     headline: (
//       <>
//         Air &amp; Ocean <span className="text-[#fe7f25]">Freight</span> Services Worldwide
//       </>
//     ),
//     description:
//       'Reliable air cargo charters and cost-effective ocean freight across all global trade lanes with end-to-end milestone visibility.',
//   },
//   {
//     image: '/images/banner/hero-2.webp',
//     mobileImage: '/images/banner/hero-2-mobile.webp',
//     badge: 'Premier Indian Forwarding Network',
//     headline: (
//       <>
//         Leading Logistics
//         <br />
//         <span className="text-[#22ace3]">Company</span> In India
//       </>
//     ),
//     description:
//       'Tailored multimodal transport, rapid customs clearance, and dedicated logistics frameworks for exporters and enterprises.',
//   },
//   {
//     image: '/images/banner/hero-3.webp',
//     mobileImage: '/images/banner/hero-3-mobile.webp',
//     badge: 'Specialized Project & Heavy Cargo',
//     headline: (
//       <>
//         Project, Defence &amp; <span className="text-[#fe7f25]">ODC Cargo</span> Experts
//       </>
//     ),
//     description:
//       'Precision engineering, turnkey heavy-lift solutions, and secure handling of mission-critical defense shipments.',
//   },
//   {
//     image: '/images/banner/hero-4.webp',
//     mobileImage: '/images/banner/hero-4-mobile.webp',
//     badge: 'Cold Chain & 3PL Logistics',
//     headline: (
//       <>
//         Integrated <span className="text-[#3e47cc]">Supply Chain</span> Solutions
//       </>
//     ),
//     description:
//       'Cold chain reefer networks, pan-India domestic trucking, 3PL warehousing, and supply chain trade finance.',
//   },
// ];

// export default function HeroSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [mountedRemainingSlides, setMountedRemainingSlides] = useState(false);

//   useEffect(() => {
//     // Mount secondary slides after initial render to keep LCP instant
//     const slidePreloadTimer = setTimeout(() => {
//       setMountedRemainingSlides(true);
//     }, 1000);

//     const timer = setInterval(() => {
//       setMountedRemainingSlides(true);
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 6500);

//     return () => {
//       clearTimeout(slidePreloadTimer);
//       clearInterval(timer);
//     };
//   }, [currentSlide]);

//   const goToSlide = (idx: number) => {
//     setMountedRemainingSlides(true);
//     setCurrentSlide(idx);
//   };

//   return (
//     <section
//       id="hero-section"
//       className="relative min-h-[590px] sm:min-h-[520px] lg:h-[620px] lg:min-h-[550px] bg-[#071126] text-white overflow-hidden flex items-center"
//     >
//       {/* Background Images Slider */}
//       {slides.map((slide, index) => {
//         if (index > 0 && !mountedRemainingSlides) return null;
//         return (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none -z-10'
//               }`}
//           >
//             <picture className="w-full h-full block">
//               <source srcSet={slide.mobileImage} media="(max-width: 767px)" />
//               <img
//                 src={slide.image}
//                 alt="Airwave Global Logistics Hero Banner"
//                 className="w-full h-full object-cover object-center"
//                 loading={index === 0 ? 'eager' : 'lazy'}
//                 fetchPriority={index === 0 ? 'high' : 'low'}
//                 decoding={index === 0 ? 'sync' : 'async'}
//               />
//             </picture>
//             {/* Dark cinematic gradient: vertical on mobile for high text contrast; horizontal on desktop */}
//             <div className="absolute inset-0 bg-gradient-to-t from-[#071126]/95 via-[#071126]/75 to-[#071126]/40 md:bg-gradient-to-r md:from-[#071126]/90 md:via-[#071126]/55 md:via-45% md:to-transparent pointer-events-none" />
//           </div>
//         );
//       })}

//       {/* Main Hero Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-10 w-full">
//         <div className="max-w-3xl lg:max-w-4xl space-y-3.5 sm:space-y-5">

//           {/* Pill Badge */}
//           <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-sm font-semibold text-orange-400 shadow-lg max-w-full">
//             <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fe7f25] shrink-0" />
//             <span className="truncate">{slides[currentSlide].badge}</span>
//             <span className="text-white/40 hidden sm:inline">|</span>
//             <span className="text-white font-normal hidden sm:inline-flex items-center gap-1 shrink-0">
//               <Globe className="w-3.5 h-3.5 text-cyan-300" />
//               Airwave Global Logistics
//             </span>
//           </div>

//           {/* Headline & Description */}
//           <div className="min-h-[100px] sm:min-h-[140px] flex items-center">
//             <div className="space-y-2 sm:space-y-3 animate-fade-in">
//               <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase font-display tracking-tight drop-shadow-md">
//                 {slides[currentSlide].headline}
//               </h1>
//               <p className="text-slate-200 text-xs sm:text-base lg:text-lg max-w-2xl leading-relaxed drop-shadow line-clamp-3 sm:line-clamp-none">
//                 {slides[currentSlide].description}
//               </p>
//             </div>
//           </div>

//           {/* Action CTAs */}
//           <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
//             <Link
//               href="#contact-section"
//               data-open-quote-modal="true"
//               onClick={(e) => {
//                 if (typeof window !== 'undefined' && window.innerWidth < 1024) {
//                   e.preventDefault();
//                   window.dispatchEvent(new CustomEvent('open-quote-modal'));
//                 }
//               }}
//               className="btn-shimmer px-4 py-2.5 sm:px-7 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#fe7f25] to-[#f76707] hover:from-[#e0650d] hover:to-[#ea580c] text-white font-extrabold text-xs sm:text-sm transition-all shadow-xl shadow-orange-500/35 flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
//             >
//               <span className="sm:hidden">Get Instant Quote</span>
//               <span className="hidden sm:inline">Get Instant Rate Quote</span>
//               <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//             </Link>
//             <Link
//               href="#services-section"
//               className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
//             >
//               <span className="sm:hidden">Explore Services</span>
//               <span className="hidden sm:inline">Explore All Services</span>
//               <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
//             </Link>
//           </div>

//           {/* Unified Luxury Slide Progress & Navigation Console */}
//           <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-6">
//             {/* Interactive Morphing Progress Pills */}
//             <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 shadow-xl shadow-black/30">
//               {slides.map((_, idx) => {
//                 const isActive = idx === currentSlide;
//                 return (
//                   <button
//                     key={idx}
//                     onClick={() => goToSlide(idx)}
//                     className={`relative h-2 rounded-full transition-all duration-500 overflow-hidden flex items-center cursor-pointer ${isActive
//                       ? 'w-16 sm:w-20 bg-white/20 shadow-[0_0_12px_rgba(254,127,37,0.5)]'
//                       : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/70 hover:scale-110'
//                       }`}
//                     aria-label={`Go to slide ${idx + 1}`}
//                   >
//                     {isActive && (
//                       <div
//                         key={currentSlide}
//                         className="h-full bg-gradient-to-r from-[#fe7f25] via-orange-400 to-[#fe7f25] animate-slide-progress rounded-full"
//                       />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Quick Navigation Arrows */}
//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
//                 className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
//                 aria-label="Previous Slide"
//               >
//                 <ChevronLeft className="w-3.5 h-3.5" />
//               </button>
//               <button
//                 onClick={() => goToSlide((currentSlide + 1) % slides.length)}
//                 className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
//                 aria-label="Next Slide"
//               >
//                 <ChevronRight className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }
