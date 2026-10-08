"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Contact } from './Contact'
import { useContact } from '@/context/ContactContext'

export function Footer() {
  const { openContact } = useContact()
  return (
    <footer
      className="w-full pt-10 sm:pt-14 pb-3 sm:pb-4 px-3 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        /* Lando‑style gradient – top‑center almost white → deep lime */
        background:
          'radial-gradient(ellipse 90% 75% at 50% 0%, ' +
          '#ffffffff 0%,   /* very pale lime (near‑white) */ ' +
          '#ffffffff 35%,  /* light lime */ ' +
          '#ffffffff 65%,  /* main lime */ ' +
          '#a0e800 100%)',   /* slightly darker edge for depth */
      }}
    >


      {/* Main Dark Footer Container */}
      <div className="relative max-w-7xl py-10 sm:py-14 mx-auto w-full bg-[#11120f] text-white rounded-[2rem] sm:rounded-[3rem] footer-mask">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
          <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <path d="M-100,200 Q 150,50 300,250 T 700,100 T 1100,300" fill="none" stroke="#bbff1bff" strokeWidth="1.5" />
            <path d="M-100,350 Q 250,200 400,400 T 800,250 T 1200,450" fill="none" stroke="#bbff1bff" strokeWidth="1" />
            <path d="M-100,500 Q 300,350 450,550 T 850,400 T 1300,600" fill="none" stroke="#bbff1bff" strokeWidth="1.5" />
            <path d="M-100,650 Q 350,500 500,700 T 900,550 T 1400,750" fill="none" stroke="#bbff1bff" strokeWidth="1" />
            <path d="M-100,800 Q 400,650 550,850 T 950,700 T 1500,900" fill="none" stroke="#bbff1bff" strokeWidth="2" strokeDasharray="5 10" />

            {/* Concentric subtle rings blending in */}
            <circle cx="20%" cy="30%" r="400" fill="none" stroke="#bbff1bff" strokeWidth="0.5" opacity="0.3" />
            <circle cx="80%" cy="80%" r="500" fill="none" stroke="#bbff1bff" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        {/* Center Typography Block */}
        <div className="relative z-10 text-center flex flex-col items-center w-full px-4 mb-16 sm:mb-20">
          {/* Main Massive Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9] tracking-tighter text-white"
          >
            Build exhibition <span className="font-serif italic text-neutral-400 font-medium">stalls </span>that<br />
            <span className="text-[#bbff1bff] font-serif italic md:border-b-[4px] border-[#bbff1bff]/60 font-medium z-10 relative">stand out.</span>
          </motion.h2>
        </div>

        {/* The Central Exhibition Hero Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          onClick={() => openContact()}
          className="absolute top-[28%] sm:top-[33%] left-1/2 -translate-x-1/2 z-20 w-[12rem] h-[16rem] sm:w-[15rem] sm:h-[19rem] md:w-[17rem] md:h-[22rem] rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden border-6 sm:border-8 border-[#11120f] shadow-[0_0_50px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all duration-700 pointer-events-auto group cursor-pointer"
        >
          <Image src="/img/hero/hero-stall.png" fill sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 360px" loading="lazy" alt="Mastering the Show" className="object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#bbff1bff] via-[#bbff1bff]/30 to-transparent flex items-end justify-center pb-5 sm:pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-black text-[#11120f] text-base sm:text-lg tracking-widest uppercase text-center flex flex-col items-center mb-2 sm:mb-3 drop-shadow-[0_0_5px_rgba(187,255,27,0.8)]">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] opacity-80 mb-1 text-[#11120f]">BUILT BY</span>
              ss group
            </span>
          </div>
        </motion.div>

        {/* Left & Right Navigation Columns */}
        <div className="w-full flex justify-between items-end px-5 sm:px-10 lg:px-16 mb-8 sm:mb-12 relative z-30 mt-auto">
          {/* Left Column */}
          <div className="flex flex-col text-left gap-1 sm:gap-1.5">
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#bbff1bff] font-mono mb-1.5 sm:mb-3">PAGES</span>
            <Link href="/" className="text-base sm:text-lg lg:text-xl font-black uppercase text-white hover:text-[#bbff1bff] hover:translate-x-1.5 transition-all duration-300 select-none">HOME</Link>
            <Link href="/#services" className="text-base sm:text-lg lg:text-xl font-black uppercase text-white hover:text-[#bbff1bff] hover:translate-x-1.5 transition-all duration-300 select-none">SERVICES</Link>
            <Link href="/portfolio" className="text-base sm:text-lg lg:text-xl font-black uppercase text-white hover:text-[#bbff1bff] hover:translate-x-1.5 transition-all duration-300 select-none">PORTFOLIO</Link>
            <Link href="/portfolio" className="text-xs sm:text-sm font-black uppercase text-[#11120f] mt-3 sm:mt-4 hover:opacity-100 tracking-wider bg-[#bbff1bff] hover:bg-white py-1.5 px-3.5 rounded-lg w-fit transition-all shadow-[0_0_15px_rgba(187,255,27,0.3)]">EXPLORE STALLS</Link>
          </div>

          {/* Right Column */}
          <div className="flex flex-col text-right gap-1 sm:gap-1.5">
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#bbff1bff] font-mono mb-1.5 sm:mb-3">FOLLOW ON</span>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg lg:text-xl font-black uppercase text-white hover:text-[#bbff1bff] hover:-translate-x-1.5 transition-all duration-300 select-none">INSTAGRAM</Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg lg:text-xl font-black uppercase text-white hover:text-[#bbff1bff] hover:-translate-x-1.5 transition-all duration-300 select-none">LINKEDIN</Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg lg:text-xl font-black uppercase text-white hover:text-[#bbff1bff] hover:-translate-x-1.5 transition-all duration-300 select-none">YOUTUBE</Link>
          </div>
        </div>

        {/* Bottom Partners Logostrip */}
        <div className="w-full relative z-30 px-5 sm:px-10 lg:px-16 hidden sm:block">
          <div className="w-full flex flex-wrap items-center justify-between gap-4 overflow-hidden pb-2 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="font-black text-sm sm:text-lg tracking-tight text-white/50 w-full flex justify-between items-center sm:px-6">
              <span className="hover:text-white transition-colors cursor-pointer tracking-wider">TATA</span>
              <span className="hover:text-white transition-colors cursor-pointer">RELIANCE</span>
              <span className="hover:text-white transition-colors cursor-pointer border border-white/50 px-2 py-0.5 rounded italic">L&T</span>
              <span className="hover:text-white transition-colors cursor-pointer hidden md:block">JIO</span>
              <span className="hover:text-white transition-colors cursor-pointer hidden md:block tracking-widest">BELL</span>
              <span className="hover:text-white transition-colors cursor-pointer hidden lg:block italic pr-2 font-serif text-xl sm:text-2xl font-medium tracking-tight">Mahindra</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Bottom Bright Lime Bar overlapping outside the rounded box */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 text-[#11120f] text-[10px] sm:text-xs font-bold font-mono tracking-tight mt-6 px-4 sm:px-8 relative z-40">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis order-2 md:order-1 text-center md:text-left w-full md:w-auto mt-4 md:mt-0 opacity-80 md:opacity-100">&copy; 2026 SS Group. All rights reserved.</p>

        {/* Central glowing yellow button resting on the bottom edge */}
        <button
          onClick={() => openContact()}
          className="hidden sm:flex absolute left-1/2 -translate-x-1/2 -bottom-5 px-3 sm:px-10 pt-4 pb-4 bg-[#0f110ee1] border border-[#11120f]/10 rounded-full font-black uppercase tracking-widest text-[#abfa0d] hover:bg-black hover:text-[#bbff1bff] transition-all duration-300 group shadow-[0_-10px_30px_rgba(187,255,27,0.3)] items-center gap-2"
        >
          <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap">
            BUSINESS ENQUIRIES <span className="group-hover:translate-x-1 transition-transform">↗</span>
          </span>
        </button>
        <button
          onClick={() => openContact()}
          className="sm:hidden order-1 w-full text-center px-6 pt-3 pb-3 bg-[#11120f] border border-[#11120f]/10 rounded-xl font-black uppercase tracking-widest text-[#bbff1bff] hover:bg-black hover:opacity-80 transition-all duration-300 group items-center justify-center gap-2 flex shadow-xl"
        >
          BUSINESS ENQUIRIES <span className="group-hover:translate-x-1 transition-transform">↗</span>
        </button>

        <div className="flex gap-4 sm:gap-6 whitespace-nowrap order-3 md:order-3 pt-2 md:pt-0 pb-2 md:pb-0">
          <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">PRIVACY POLICY</Link>
          <Link href="#" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">TERMS</Link>
          <Link href="https://github.com/your-dev-handle" target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
            About Founder
          </Link>
          <Link href="https://devportfolio-beta-six.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline opacity-80 hover:opacity-100 transition-opacity">
            About developer
          </Link>
        </div>
      </div>

      {/* Contact Modal */}
      <Contact />
    </footer>
  )
}
