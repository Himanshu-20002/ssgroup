import React from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, Star, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export function Hero() {
  const benefits = [
    "FREE 3D Stall Design Concept",
    "Octanorm / Wooden / Hybrid Stall Fabrication",
    "On-time Setup + Installation Support",
    "Factory Rate Pricing + Transparent Quote"
  ]

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[100dvh] flex items-center bg-black/100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Side Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#49FF00] bg-primary/10 text-xs sm:text-sm font-semibold tracking-wide text-[#49FF00] uppercase shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>EXHIBITION STALL DESIGN & FABRICATION EXPERTS</span>
            </div>

            {/* Headings */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-balance">
              Exhibition Stall & Fabrication
              <br />
              <span className="text-[#49FF00]  bg-clip-text">Delhi NCR • PAN India</span>
              <br />
              <span className="text-[#49FF00] bg-clip-text  text-5xl sm:text-6xl lg:text-7xl">Execution</span>
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Looking for <strong className="text-foreground font-semibold">exhibition stall designers</strong>? Get complete solutions from <strong className="text-foreground font-semibold">3D stall design</strong> to fabrication & on-site installation for expos, trade shows and exhibitions.
            </p>

            {/* Bullet List */}
            <ul className="space-y-3">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTA Elements */}
            <div className="pt-4 space-y-6">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Get Free Quote
              </Button>

              {/* Trust Badge */}
              <div className="flex items-start sm:items-center gap-3 text-sm font-medium text-muted-foreground bg-card/60 backdrop-blur-sm p-4 rounded-xl border border-border/50 max-w-lg shadow-sm">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 shrink-0 mt-0.5 sm:mt-0" />
                <span className="leading-snug">Trusted by brands for exhibitions in Pragati Maidan, India Expo Mart, IEML & PAN India venues.</span>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="relative aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000 group">
            <Image
              src="/hero-stall.png"
              alt="Premium Exhibition Stall Fabrication"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 lg:hidden"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent text-white hidden lg:block">
              <p className="font-semibold text-lg">Premium 3D Designs</p>
              <p className="text-sm text-white/80">Tailored to perfection for your brand</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
