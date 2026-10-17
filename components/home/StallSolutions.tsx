"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useContact } from '@/context/ContactContext'

export function StallSolutions() {
  const [showAll, setShowAll] = useState(false)
  const { openContact } = useContact()
  const hiddenIndices = [4, 5, 6, 7]

  const solutions = [
    {
      title: 'Custom Wooden Fabricated Stalls',
      img: '/img/solutions/custom-fabricated-stall.png',
      tag: 'Bespoke'
    },
    {
      title: 'Island Stalls (4-Side Open)',
      img: '/img/solutions/island-corner-stall.png',
      tag: 'Strategic'
    },
    {
      title: 'Double-Decker Stalls',
      img: '/img/solutions/double-decker-stall.png',
      tag: 'Maximum Impact'
    },
    {
      title: 'Peninsula & Corner Stalls',
      img: '/img/solutions/peninsula-corner-stall.jpg',
      tag: 'Strategic'
    },
    {
      title: 'Tech & Interactive Booths',
      img: '/img/solutions/experience-demo-zone.png',
      tag: 'Interactive'
    },
    {
      title: 'Octanorm Modular Stalls',
      img: '/img/solutions/modular-shell-upgrade.png',
      tag: 'Octanorm'
    },
    {
      title: 'Heavy Machinery & Industrial',
      img: '/img/solutions/machinery-industrial-stall.jpg',
      tag: 'Engineered'
    },
    {
      title: 'Pharma & Healthcare Pavilions',
      img: '/img/solutions/pharma-healthcare-stall.jpg',
      tag: 'Clinical'
    }
  ]

  const displaySolutions = solutions

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#1c1d1a] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Mesmerizing Elements (Themes with overall site) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-[#bbff1bff]/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-neutral-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4"></div>
        {/* Minimal Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#bbff1b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-full md:max-w-2xl"
          >
            <span className="text-[#bbff1bff] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 block font-bold">
              / EXHIBITION STALL SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.08] mb-2.5">
              DOMINATING THE EXHIBITION <span className="text-[#bbff1bff]">FLOOR.</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base font-medium max-w-full md:max-w-xl">
              We specialize in engineering high-impact spaces tailored precisely to your brand's presence and conversion goals.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displaySolutions.map((solution, idx) => {
            const isMobileHidden = !showAll && hiddenIndices.includes(idx)

            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openContact(`Hi SS Group, I am interested in getting a 3D design concept & quote for ${solution.title}.`)}
                className={`group relative min-h-[190px] sm:h-[250px] md:h-[340px] lg:h-[360px] xl:h-[390px] rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-[#11120f] border border-white/5 hover:border-[#bbff1bff]/40 transition-all duration-700 shadow-lg md:shadow-2xl cursor-pointer ${isMobileHidden ? 'hidden sm:block' : ''}`}
              >
                {/* Image without darkness: clear and vivid */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={solution.img}
                    alt={solution.title}
                    fill
                    priority={idx < 4}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  {/* Subtle bottom-only gradient to ensure text readability without dimming the stall */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11120f]/90 via-[#11120f]/25 via-35% to-transparent transition-all duration-700"></div>
                </div>

                {/* Tag - Premium Look */}
                <div className="absolute top-3.5 sm:top-6 left-3.5 sm:left-6 z-20">
                  <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[#bbff1bff] font-mono text-[8px] sm:text-[10px] tracking-widest uppercase font-bold group-hover:bg-[#bbff1bff] group-hover:text-[#11120f] transition-all duration-500">
                    {solution.tag}
                  </span>
                </div>

                {/* Text Overlay - Mobile optimized */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-7 z-20">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-black text-white leading-tight tracking-tight group-hover:text-[#bbff1bff] transition-colors duration-500 uppercase">
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
            className="inline-flex sm:hidden items-center justify-center px-8 py-3 text-sm font-bold tracking-wide rounded-full btn-gold-cta cursor-pointer"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  )
}

