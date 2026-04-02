'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sparkles, Star, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useContact } from '@/context/ContactContext'

export function Hero() {
  const { openContact } = useContact()
  const benefits = [
    "FREE 3D Stall Design Concept",
    "Octanorm / Wooden / Hybrid Stall Fabrication",
    "On-time Setup + Installation Support",
    "Factory Rate Pricing + Transparent Quote"
  ]

  const heroImages = ["/hero-1.png", "/hero-2.png", "/hero-3.png"]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative pt-16 pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden min-h-[calc(100vh-1rem)] lg:min-h-dvh flex items-start sm:items-center bg-black">
      {/* Background Polish */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] opacity-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left Side Content - Kept original structure & text */}
          <div className="space-y-6 lg:space-y-10 pt-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2  rounded-full border border-primary/30 bg-primary/10 text-xs sm:text-sm font-semibold tracking-wide text-primary uppercase shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 " />
              <span>EXHIBITION STALL DESIGN & FABRICATION EXPERTS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-9 sm:leading-tight text-white tracking-normal">
                We build eye-catching exhibition stalls for busy people.
              </h1>
              <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed tracking-wide max-w-xl">
                Fast setup + great design. From concept to delivery for Delhi NCR and PAN India.
              </p>
              <p className="mt-4 text-lg sm:text-2xl font-black text-primary tracking-wide">
                Exhibition Booths • Stall Fabrication • On-site support
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl"
            >
              Looking for <strong className="text-white font-semibold">exhibition stall designers</strong>? Get complete solutions from <strong className="text-white font-semibold">3D stall design</strong> to fabrication & on-site installation for expos, trade shows and exhibitions.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-2 text-sm sm:text-base"
            >
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 space-y-6"
            >
              <button 
                onClick={openContact}
                className="w-full sm:w-auto text-lg px-10 h-16 bg-primary hover:bg-primary/90 text-black font-extrabold rounded-xl shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                Plan Your Stall
              </button>

              <div className="flex items-start sm:items-center gap-3 text-sm font-medium text-zinc-400 bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 max-w-lg shadow-2xl">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5 sm:mt-0" />
                <span className="leading-snug">Trusted by brands for exhibitions in Pragati Maidan, India Expo Mart, IEML & PAN India venues.</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Flawless 3D Visual Composition */}
          <div className="relative h-[240px] sm:h-[310px] md:h-[460px] lg:h-[850px] w-full flex items-start sm:items-center justify-center pointer-events-none">
            {/* Visual Depth Glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] opacity-30 animate-pulse"></div>

            {/* Main 3D Composition */}
            <div className="relative w-full h-full">
              {/* Secondary Stall (Background) */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50, y: 50 }}
                animate={{ opacity: 0.4, scale: 0.95, x: 30, y: 30 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                className="absolute top-0 right-0 w-3/4 h-3/4 blur-sm opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
              >
                <Image
                  src="/hero-2.png"
                  alt="3D Stall Design Concept"
                  fill
                  className="object-contain"
                />
              </motion.div> */}

              {/* Main Stall (Foreground) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1.45, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -20, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
                    className="relative w-full h-full drop-shadow-[0_0_50px_rgba(73,255,0,0.25)]"
                  >
                    <Image
                      src={heroImages[currentImageIndex]}
                      alt="Premium Exhibition Booth"
                      fill
                      className="object-contain p-8 sm:p-12 lg:p-16"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Decorative Element 3 */}
              {/* <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 0.5, x: -40 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute bottom-10 left-0 w-1/2 h-1/2 mix-blend-screen opacity-20"
              >
                <Image
                  src="/hero-1.png"
                  alt="Modern Design Element"
                  fill
                  className="object-contain"
                />
              </motion.div> */}

              {/* Tech Accents */}
              <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10 border border-primary/20 rounded-full animate-spin animation-duration-[30s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 border border-primary/10 rounded-full animate-spin animation-duration-[20s] direction-reverse"></div>
              </div>
            </div>

            {/* Status Indicator for 3D Visual */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 px-4 py-2 rounded-full z-40">
              <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
              <span className="text-[10px] font-bold text-white tracking-widest uppercase opacity-60">High-Fidelity 3D Design </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

