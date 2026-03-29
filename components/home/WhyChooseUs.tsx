import React from 'react'
import { Card } from '@/components/ui/card'

export function WhyChooseUs() {
  const features = [
    { title: 'Custom Solutions', desc: 'Tailored to your unique needs' },
    { title: 'Expert Team', desc: 'Decades of combined experience' },
    { title: 'Quality Guaranteed', desc: 'Premium materials and craftsmanship' },
    { title: '24/7 Support', desc: 'Always available when you need us' },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose SS Group</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What sets us apart in exhibition design and fabrication
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="p-6 border-border bg-card/40 hover:bg-card/80 rounded-2xl transition"
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent mb-4"></div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
