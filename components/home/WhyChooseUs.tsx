"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Layers, IndianRupee, ShieldCheck } from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    {
      title: 'Precision Execution',
      desc: 'We hand over your stall well before the expo doors open. Zero last-minute scrambles, total peace of mind.',
      icon: Clock,
    },
    {
      title: 'Engineering Aesthetics',
      desc: "Our designs are meticulously engineered for real-world footfall and striking product showcases.",
      icon: Layers,
    },
    {
      title: 'Zero Hidden Costs',
      desc: 'Transparent, bottom-line pricing. No post-show surprise invoices or hidden service fees.',
      icon: IndianRupee,
    },
    {
      title: 'Dedicated Guardians',
      desc: "A single, reliable touchpoint. Dedicated project managers continuously on the venue floor.",
      icon: ShieldCheck,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[linear-gradient(to_bottom,#1a1c1a_0%,#1a1c1a_15%,#232520_25%,#3a3d35_45%,#666a5e_65%,#adb2a7_85%,white_100%)]">
      {/* Mesmerizing Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid line */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#bbff1b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>

        {/* Floating glow blob */}
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -left-1/4 w-[50rem] h-[50rem] bg-[#bbff1bff]/10 rounded-full blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-[#bbff1b] font-mono text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 block font-bold">
              / THE ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tighter leading-[0.95] text-white">
              ENGINEERED <br />
              FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bbff1b] to-white">IMPACT.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-neutral-400 max-w-sm leading-relaxed mb-2"
          >
            We don't just build stalls; we create tactical spaces that dominate the exhibition floor.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                whileTap={{ y: -3, scale: 0.98 }}
                className="group relative cursor-pointer select-none h-[200px] sm:h-[320px] md:h-[340px] p-5 sm:p-6 rounded-2xl sm:rounded-[1.75rem] flex flex-col justify-end bg-[#11120f] border overflow-hidden transition-colors duration-500 border-[#bbff1b]/50 shadow-xl"
              >
                {/* Visual Depth Background */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 group-active:opacity-40 transition-opacity duration-700">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(187,255,27,0.15),transparent_70%)]"></div>
                </div>

                {/* Animated Accent Line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-[#bbff1b] group-hover:w-full group-active:w-full transition-all duration-700"></div>

                <div className="relative z-10">
                  {/* Floating Icon */}
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#bbff1b] group-active:bg-[#bbff1b] group-hover:border-[#bbff1b] group-active:border-[#bbff1b] transition-all duration-500 transform group-hover:scale-110 group-active:scale-110 group-hover:rotate-12 group-active:rotate-12">
                    <Icon className="w-5 sm:w-5.5 h-5 sm:h-5.5 text-white group-hover:text-[#11120f] group-active:text-[#11120f] transition-colors duration-500" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white tracking-tight group-hover:text-[#bbff1b] group-active:text-[#bbff1b] transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed group-hover:text-neutral-200 group-active:text-neutral-200 transition-colors duration-500">
                    {feature.desc}
                  </p>
                </div>

                {/* Index Number */}
                <span className="absolute top-6 right-6 text-white/5 text-4xl sm:text-5xl font-black group-hover:text-[#bbff1b]/10 group-active:text-[#bbff1b]/10 transition-colors">
                  0{idx + 1}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Industrial aesthetic bottom blend */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent opacity-100"></div>
    </section>
  )
}
