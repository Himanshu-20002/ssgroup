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
    <section className="relative pt-24 sm:pt-28 lg:pt-28 pb-10 sm:pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden min-h-[calc(100vh-1rem)] lg:min-h-dvh flex items-start sm:items-center bg-gradient-to-b from-white via-[#fcfcfd] to-[#f4f5f7]">
      {/* Background Polish with Crisp Architectural Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* Left Side Content - Crisp Clean Modern Theme */}
          <div className="order-1 lg:order-1 space-y-5 lg:space-y-7 max-lg:pt-10 pt-4 lg:pt-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200 bg-white/90 text-xs sm:text-[13px] font-bold tracking-wide text-stone-700 uppercase shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b88628]" />
              <span>EXHIBITION STALL DESIGN & FABRICATION EXPERTS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight sm:leading-[1.12] text-[#24150e] tracking-tight">
                We build <span className="bg-gradient-to-r from-[#946519] via-[#c59b27] to-[#734c11] bg-clip-text text-transparent">eye-catching</span> exhibition stalls for busy people.
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#5a4234] leading-relaxed tracking-normal max-w-xl font-medium">
                Fast setup + great design. From concept to delivery for Delhi NCR and PAN India.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-amber-900/10 text-[#24150e] shadow-xs">Exhibition Booths</span>
                <span className="text-[#c59b27] font-black">•</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-amber-900/10 text-[#24150e] shadow-xs">Stall Fabrication</span>
                <span className="text-[#c59b27] font-black">•</span>
                <span className="px-2.5 py-1 rounded-lg bg-white/80 border border-amber-900/10 text-[#24150e] shadow-xs">On-site Support</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-[#5a4336] leading-relaxed max-w-xl"
            >
              Looking for <strong className="text-[#24150e] font-bold">exhibition stall designers</strong>? Get complete solutions from <strong className="text-[#946519] font-bold">3D stall design</strong> to fabrication & on-site installation for expos, trade shows and exhibitions.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-2 text-xs sm:text-sm"
            >
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[#3d2719] font-semibold">
                  <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b08518] flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-amber-300/40">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-1 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={openContact}
                  className="w-full sm:w-auto text-sm sm:text-base px-7 h-12 btn-gold-cta rounded-xl font-black cursor-pointer"
                >
                  Plan Your Stall
                </button>
                <a
                  href="#portfolio"
                  className="w-full sm:w-auto text-center text-xs sm:text-sm px-6 h-12 inline-flex items-center justify-center bg-white hover:bg-stone-50 text-stone-800 font-bold rounded-xl border border-stone-200 shadow-xs transition hover:border-[#b88628] hover:scale-[1.02] active:scale-[0.98]"
                >
                  View 3D Stalls
                </a>
              </div>

              <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm font-semibold text-stone-700 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-stone-200 shadow-xs max-w-lg">
                <Star className="w-4 h-4 text-[#b88628] fill-[#b88628] shrink-0 mt-0.5 sm:mt-0" />
                <span className="leading-snug">
                  Trusted by brands for exhibitions in <span className="text-stone-900 font-bold">Pragati Maidan</span>, <span className="text-stone-900 font-bold">India Expo Mart (IEML)</span> & PAN India venues.
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

