'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, CheckCircle2 } from 'lucide-react'
import { useContact } from '@/context/ContactContext'
import HeroSlider from './HeroSlider'

export function Hero() {
  const { openContact } = useContact()
  const benefits = [
    "FREE 3D Stall Design Concept",
    "Octanorm / Wooden / Hybrid Stall Fabrication",
    "On-time Setup + Installation Support",
    "Factory Rate Pricing + Transparent Quote"
  ]

  return (
    <section className="relative pt-28 sm:pt-32 lg:pt-32 pb-14 px-3 sm:px-6 lg:px-8 overflow-hidden min-h-[calc(100vh-1rem)] lg:min-h-dvh flex items-start sm:items-center bg-gradient-to-b from-[#fcfbf9] via-[#f8f5ee] to-[#f0eae0]">
      {/* Background Polish with Gold & Warm Brown Ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-amber-200/20 via-[#bbff1bff]/5 to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-300/15 rounded-full blur-[140px] opacity-70"></div>
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#bbff1bff]/15 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3d27190d_1px,transparent_1px),linear-gradient(to_bottom,#3d27190d_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-14 items-start">

          {/* Left Side Content - Light Theme Polish */}
          <div className="order-1 lg:order-1 space-y-6 lg:space-y-10 pt-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-gradient-to-r from-amber-50 via-white to-lime-50 text-xs sm:text-sm font-bold tracking-wide text-[#7a5316] uppercase shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#c59b27]" />
              <span>EXHIBITION STALL DESIGN & FABRICATION EXPERTS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight sm:leading-[1.1] text-[#24150e] tracking-tight">
                We build <span className="bg-gradient-to-r from-[#946519] via-[#c59b27] to-[#734c11] bg-clip-text text-transparent">eye-catching</span> exhibition stalls for busy people.
              </h1>
              <p className="mt-3.5 text-base sm:text-lg text-[#5a4234] leading-relaxed tracking-normal max-w-xl font-medium">
                Fast setup + great design. From concept to delivery for Delhi NCR and PAN India.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold">
                <span className="px-3 py-1 rounded-lg bg-white/80 border border-amber-900/10 text-[#24150e] shadow-xs">Exhibition Booths</span>
                <span className="text-[#c59b27] font-black">•</span>
                <span className="px-3 py-1 rounded-lg bg-white/80 border border-amber-900/10 text-[#24150e] shadow-xs">Stall Fabrication</span>
                <span className="text-[#88cc00] font-black">•</span>
                <span className="px-3 py-1 rounded-lg bg-white/80 border border-amber-900/10 text-[#24150e] shadow-xs">On-site Support</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-[#5a4336] leading-relaxed max-w-xl"
            >
              Looking for <strong className="text-[#24150e] font-bold">exhibition stall designers</strong>? Get complete solutions from <strong className="text-[#946519] font-bold">3D stall design</strong> to fabrication & on-site installation for expos, trade shows and exhibitions.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-2.5 text-sm sm:text-base"
            >
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-[#3d2719] font-semibold">
                  <div className="w-5 h-5 rounded-full bg-[#bbff1bff] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1b120a]" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-2 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={openContact}
                  className="w-full sm:w-auto text-base sm:text-lg px-9 h-14 bg-[#bbff1bff] hover:bg-[#a8f000] text-[#1a1209] font-black rounded-xl shadow-lg shadow-[#bbff1bff]/30 transition-all hover:scale-105 active:scale-95 border border-[#a0e800]/50"
                >
                  Plan Your Stall
                </button>
                <a
                  href="#portfolio"
                  className="w-full sm:w-auto text-center text-sm sm:text-base px-7 h-14 inline-flex items-center justify-center bg-white hover:bg-stone-50 text-[#3d2719] font-bold rounded-xl border border-amber-900/15 shadow-sm transition hover:border-[#c59b27]"
                >
                  View 3D Stalls
                </a>
              </div>

              <div className="flex items-start sm:items-center gap-3.5 text-sm font-semibold text-[#4a3427] bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-amber-900/10 max-w-lg shadow-sm">
                <Star className="w-5 h-5 text-[#d4af37] fill-[#d4af37] shrink-0 mt-0.5 sm:mt-0" />
                <span className="leading-snug">
                  Trusted by brands for exhibitions in <span className="text-[#24150e] font-bold">Pragati Maidan</span>, <span className="text-[#24150e] font-bold">India Expo Mart (IEML)</span> & PAN India venues.
                </span>
              </div>
            </motion.div>
          </div>

          {/* Exhibition Showcase Slider: Positioned at bottom on mobile (order-2), top-aligned on desktop (lg:order-2 lg:self-start) */}
          <div className="order-2 lg:order-2 w-full lg:self-start lg:sticky lg:top-28 pt-4 lg:pt-0">
            <HeroSlider />
          </div>

        </div>
      </div>
    </section>
  )
}

