"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function Process() {
  const processes = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We understand your vision, goals, and budget',
    },
    {
      step: '02',
      title: 'Design',
      description: 'Creative concepts tailored to your brand',
    },
    {
      step: '03',
      title: 'Fabrication',
      description: 'High-quality construction with precision',
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Professional installation and full support',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
  }

  return (
    <section id="process" className="py-14 sm:py-16 px-4 sm:px-5 lg:px-8 bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-lime-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-lime-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 uppercase tracking-tight text-white">
            Our <span className="text-lime-400">Process</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-xl sm:max-w-2xl mx-auto font-medium leading-relaxed">
            Four simple steps to bring your exhibition vision to life with precision and speed.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-4 gap-2 sm:gap-3 relative"
        >
          <div className="absolute top-14 sm:top-6  max-lg:top-6 left-[5%] sm:left-[6%] right-[5%] sm:right-[6%] h-px bg-neutral-800 -z-10" />

          {processes.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.03, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 12 }}
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900 border border-neutral-800 sm:border-2 group-hover:border-lime-400 text-lime-400 font-bold mb-3 sm:mb-4 text-base sm:text-xl shadow-md transition-colors duration-300 relative z-10 box-border"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 text-white group-hover:text-lime-400 transition-colors duration-300 uppercase tracking-wider">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-[10px] sm:text-xs max-w-36">{item.description}</p>
              </div>
              
            
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
