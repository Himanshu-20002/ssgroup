'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Award, Clock, Phone, Search } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { useContact } from '@/context/ContactContext';

interface PortfolioHeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalProjects: number;
}

export function PortfolioHero({ searchQuery, onSearchChange, totalProjects }: PortfolioHeroProps) {
  const { openContact } = useContact();

  return (
    <section className="relative pt-32 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fcfbf9] via-[#f8f5ee] to-[#f0eae0] border-b border-amber-900/10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 right-0 w-[550px] h-[550px] bg-gradient-to-l from-amber-200/30 via-[#bbff1bff]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-amber-300/20 blur-[130px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3d27190d_1px,transparent_1px),linear-gradient(to_bottom,#3d27190d_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-amber-50 via-white to-lime-50 text-xs sm:text-sm font-bold tracking-wide text-[#7a5316] uppercase shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
            <span>FABRICATION CASE STUDIES & GALLERY</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#24150e] tracking-tight leading-tight"
          >
            Our Real-World <span className="bg-gradient-to-r from-[#946519] via-[#c59b27] to-[#734c11] bg-clip-text text-transparent">Exhibition Stalls</span> & Pavilions
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#5a4234] leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Explore our turnkey builds across Pragati Maidan, IEML Greater Noida, BIEC, and major expos across India. Designed for high footfall, built with zero-compromise precision.
          </motion.p>

          {/* Key Metrics Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-[#3d2719]"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-amber-900/10 shadow-2xs">
              <Award className="w-4 h-4 text-[#c59b27]" />
              <span>150+ Stalls Delivered</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-amber-900/10 shadow-2xs">
              <Clock className="w-4 h-4 text-[#88cc00]" />
              <span>100% On-Time Handover</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-amber-900/10 shadow-2xs">
              <MapPin className="w-4 h-4 text-[#c59b27]" />
              <span>Delhi NCR & PAN India</span>
            </div>
          </motion.div>

          {/* Fast Contact & Share Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="https://wa.me/919661378767?text=Hi%20SS%20Group,%20I%20am%20reviewing%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20stall%20design%20for%20our%20upcoming%20expo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              onClick={openContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#24150e] hover:bg-[#3d2719] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#bbff1bff]" />
              <span>Request Custom 3D Concept</span>
            </button>
          </motion.div>

          {/* Search Input Bar */}
          <div className="pt-4 max-w-lg mx-auto relative">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={`Search ${totalProjects} stalls by venue, client, size, or material...`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-amber-900/15 text-sm text-[#24150e] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c59b27]/50 shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
