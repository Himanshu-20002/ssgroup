'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
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
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  }

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Decorative background element for the dynamic lime feel */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-6 uppercase tracking-tight">
            Exhibition & <span className="text-primary">Event Services</span>
          </h2>
          <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
            Complete solutions for your brand presence at trade shows, expos and corporate events. We bring the fight to the floor.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesList.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div key={idx} variants={itemVariants} className="h-full">
                <Card className="h-full p-8 md:p-10 border-border/50 bg-card/60 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all duration-300 group rounded-3xl flex flex-col justify-start relative overflow-hidden">
                  
                  {/* Hover gradient effect behind icon */}
                  <div className="absolute top-8 left-8 w-16 h-16 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="mb-8 relative shrink-0">
                    <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center bg-background group-hover:bg-primary z-10 relative transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
