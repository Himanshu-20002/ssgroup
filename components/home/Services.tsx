'use client'

import React from 'react'
import { Hammer, Layout, Wrench, Headset, MonitorPlay, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function Services() {
  const servicesList = [
    {
      icon: Layout,
      title: 'Custom Stall Design',
      description: 'Premium 3D stall concepts focused on visibility, product display and visitor movement.',
    },
    {
      icon: Hammer,
      title: 'Fabrication & Branding',
      description: 'In-house fabrication, printing and branding to maintain quality and timelines.',
    },
    {
      icon: Wrench,
      title: 'Pan-India Execution',
      description: 'Experienced teams across Delhi NCR, Mumbai, Bengaluru, Hyderabad and major expo cities.',
    },
    {
      icon: MonitorPlay,
      title: 'AV & Technology',
      description: 'LED walls, interactive screens and demo counters that make your stall stand out.',
    },
    {
      icon: Users,
      title: 'Event Manpower',
      description: 'Hosts, promoters and technicians to manage registrations, demos and engagement.',
    },
    {
      icon: Headset,
      title: 'Corporate Events',
      description: 'Dealer meets, product launches and annual conferences with complete event management.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  }

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 px-3 sm:px-6 lg:px-8 bg-[#0d0e0c] relative overflow-hidden">
      {/* Refined Background Texture */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-[#bbff1bff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#bbff1b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20 text-center"
        >
          <span className="text-[#bbff1bff] font-mono text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-3 sm:mb-6 block font-black">
            / CORE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 md:mb-8 uppercase tracking-tighter text-white leading-tight">
            ENGINEERED <span className="text-[#bbff1bff]">SERVICES.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-500 max-w-3xl mx-auto font-medium">
            We provide a complete tactical ecosystem for brand dominance at every major expo venue across India.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesList.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative cursor-pointer select-none"
              >
                {/* 3-Column Wide Rectangles */}
                <div className="h-full p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] bg-[#11120f] border border-white/5 hover:border-[#bbff1bff]/50 active:border-[#bbff1bff]/50 transition-all duration-500 shadow-lg md:shadow-2xl overflow-hidden flex flex-col gap-3 sm:gap-4 md:gap-6">
                  
                  {/* Top Bar: Icon + Index */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-lg sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#bbff1bff] group-active:bg-[#bbff1bff] transition-all duration-500 group-hover:rotate-12 group-active:rotate-12">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-neutral-400 group-hover:text-[#11120f] group-active:text-[#11120f] transition-colors duration-500" />
                    </div>
                    <span className="text-white/5 text-2xl sm:text-3xl md:text-4xl font-black group-hover:text-[#bbff1bff]/10 group-active:text-[#bbff1bff]/10 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white tracking-tight sm:tracking-widest uppercase group-hover:text-[#bbff1bff] group-active:text-[#bbff1bff] transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed font-medium group-hover:text-neutral-300 group-active:text-neutral-300 transition-colors duration-300 italic text-xs sm:text-sm">
                      {service.description}
                    </p>
                  </div>

                  {/* Aesthetic Scanning Accents */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#bbff1bff]/5 to-transparent rounded-tr-[2rem] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>

                {/* Bottom Highlight Line */}
                <div className="absolute bottom-0 left-10 right-10 h-1 bg-[#bbff1bff] transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 origin-center transition-transform duration-700 rounded-full blur-[1px]"></div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
