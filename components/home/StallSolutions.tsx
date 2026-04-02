"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function StallSolutions() {
  const [showAll, setShowAll] = useState(false)
  const hiddenIndices = [3, 4, 6]

  const solutions = [
    {
      title: 'Modular Shell Scheme Upgrades',
      img: '/modular_shell_upgrade_png_1774886735919.png',
      tag: 'Adaptive'
    },
    {
      title: 'Custom Fabricated Stalls',
      img: '/custom_fabricated_stall_png_1774886755662.png',
      tag: 'Bespoke'
    },
    {
      title: 'Island & Corner Stalls',
      img: '/island_corner_stall_png_1774886772675.png',
      tag: 'Strategic'
    },
    {
      title: 'Double-Decker Stalls',
      img: '/double_decker_stall_png_1774886790718.png',
      tag: 'Maximum Impact'
    },
    {
      title: 'Product Launch Booths',
      img: '/product_launch_booth_png_1774886810577.png',
      tag: 'Event Focus'
    },
    {
      title: 'Conference & Seminar Booths',
      img: '/conference_seminar_booth_png_1774886833646.png',
      tag: 'Engagement'
    },
    {
      title: 'Experience & Demo Zones',
      img: '/experience_demo_zone_png_1774886856936.png',
      tag: 'Interactive'
    },
    {
      title: 'Roadshow & Mall ',
      img: '/roadshow_mall_kiosk_png_1774887097490.png',
      tag: 'Versatile'
    }
  ]

  const mobileVisibleSolutions = showAll
    ? solutions
    : solutions.filter((_, index) => !hiddenIndices.includes(index))

  const displaySolutions = solutions

  return (
    <section className="py-32 bg-[#1c1d1a] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Mesmerizing Elements (Themes with overall site) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-[#bbff1bff]/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-neutral-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
        {/* Minimal Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#bbff1b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-full md:max-w-2xl"
          >
            <span className="text-[#bbff1bff] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 block font-bold">
              / EXHIBITION STALL SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-3">
              DOMINATING THE EXHIBITION <span className="text-[#bbff1bff]">FLOOR.</span>
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg font-medium max-w-full md:max-w-xl">
              We specialize in engineering high-impact spaces tailored precisely to your brand's presence and conversion goals.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displaySolutions.map((solution, idx) => {
            const originalIndex = solutions.findIndex((s) => s.title === solution.title)
            const isMobileHidden = !showAll && hiddenIndices.includes(originalIndex)
            const mobileIndex = mobileVisibleSolutions.findIndex((s) => s.title === solution.title)
            const displayIndex = showAll ? originalIndex : mobileIndex
            const formattedIndex = displayIndex >= 0 ? displayIndex + 1 : originalIndex + 1

            return (
              <motion.div
                key={originalIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative min-h-[200px] sm:h-[260px] md:h-[420px] lg:h-[400px] xl:h-[450px] rounded-2xl sm:rounded-[2rem] overflow-hidden bg-[#11120f] border border-white/5 hover:border-[#bbff1bff]/40 transition-all duration-700 shadow-lg md:shadow-2xl ${isMobileHidden ? 'hidden sm:block' : ''}`}>

                {/* Image with subtle zoom and parallax feel */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={solution.img}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                  />
                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11120f] via-[#11120f]/60 to-transparent group-hover:via-[#11120f]/40 transition-all duration-700"></div>
                </div>

                {/* Tag - Premium Look */}
              <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20">
                <span className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[#bbff1bff] font-mono text-[8px] sm:text-[10px] tracking-widest uppercase font-bold group-hover:bg-[#bbff1bff] group-hover:text-[#11120f] transition-all duration-500">
                  {solution.tag}
                </span>
              </div>

              {/* Text Overlay - Mobile optimized */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 md:p-10 z-20">
                  {/* Index Number */}
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 sm:mb-3 block group-hover:text-[#bbff1bff]/10 transition-colors duration-700 text-white/10">
                    {formattedIndex < 10 ? `0${formattedIndex}` : formattedIndex}
                  </span>

                <h3 className="text-sm sm:text-base md:text-xl lg:text-2xl font-black text-white leading-tight tracking-tight group-hover:text-[#bbff1bff] transition-colors duration-500 uppercase">
                  {solution.title}
                </h3>
              </div>

                {/* Hover Glow Scan Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#bbff1bff] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 text-center sm:text-left">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex sm:hidden items-center justify-center px-8 py-3 text-sm font-bold tracking-wide text-black bg-[#bbff1bff] rounded-full shadow-lg hover:bg-[#bbff1bff]/90 transition-all duration-300"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  )
}
