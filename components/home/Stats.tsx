"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { Box, Users, Contact, Award } from 'lucide-react'

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const spring = useSpring(0, { stiffness: 30, damping: 15 })
  const displayValue = useTransform(spring, (current) => Math.floor(current).toLocaleString())

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, value, spring])

  return <motion.span ref={ref}>{displayValue}</motion.span>
}

export function Stats() {
  const stats = [
    {
      label: 'Stalls Delivered',
      value: 150,
      icon: Box,
      suffix: '+'
    },
    {
      label: 'Happy Corporate Clients',
      value: 287,
      icon: Users,
      suffix: ''
    },
    {
      label: 'Expert Team Members',
      value: 25,
      icon: Contact,
      suffix: ''
    },
    {
      label: 'Years of Experience',
      value: 7,
      icon: Award,
      suffix: '+'
    }
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[30rem] bg-[#bbff1bff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-[#f8f9f6] border border-neutral-100 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_20px_40px_-20px_rgba(187,255,27,0.3)] hover:-translate-y-2 overflow-hidden"
              >
                {/* Interactive Background Glow */}
                <div className="absolute inset-0 bg-[#bbff1bff] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500"></div>

                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center mb-6 group-hover:bg-[#bbff1bff] transition-all duration-500 shadow-sm group-hover:rotate-[10deg]">
                  <Icon className="w-7 h-7 text-neutral-400 group-hover:text-[#11120f] transition-colors duration-500" strokeWidth={1.5} />
                </div>

                {/* Big Animated Number */}
                <h3 className="text-4xl sm:text-5xl font-black text-[#11120f] mb-3 tracking-tighter flex items-center gap-0.5">
                  <AnimatedNumber value={stat.value} />
                  <span className="text-[#bbff1bff]">{stat.suffix}</span>
                </h3>

                {/* Label */}
                <p className="text-neutral-500 text-xs sm:text-sm font-bold uppercase tracking-widest leading-tight">
                  {stat.label}
                </p>

                {/* Subtle Progress Bar Decoration */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#bbff1bff] w-0 group-hover:w-full transition-all duration-700"></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
