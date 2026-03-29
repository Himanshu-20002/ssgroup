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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
  }

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-lime-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-lime-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-6 uppercase tracking-tight text-white">
            Our <span className="text-lime-400">Process</span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-medium">
            Four simple steps to bring your exhibition vision to life with precision and speed.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-neutral-800 -z-10" />

          {processes.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center justify-center w-20 h-20 rounded-full bg-neutral-900 border-2 border-neutral-800 group-hover:border-lime-400 text-lime-400 font-bold mb-6 text-2xl shadow-lg transition-colors duration-300 relative z-10 box-border"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-lime-400 transition-colors duration-300 uppercase tracking-wide">{item.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">{item.description}</p>
              </div>
              
              {/* Arrow indicators for mobile */}
              {idx < 3 && (
                <div className="md:hidden flex justify-center mt-6">
                  <ChevronRight className="w-8 h-8 text-neutral-700" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
