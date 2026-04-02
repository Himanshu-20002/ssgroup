'use client'

import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { ClientsTrust } from '@/components/home/ClientsTrust'
import { StallSolutions } from '@/components/home/StallSolutions'
import { Services } from '@/components/home/Services'
import { Process } from '@/components/home/Process'
import { Stats } from '@/components/home/Stats'
import { Portfolio } from '@/components/home/Portfolio'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Footer } from '@/components/home/Footer'

export default function Home() {
  return (
    <div className="w-full min-h-screen dark bg-background text-foreground overflow-hidden">
      <Header />
      <Hero />
      {/* <ClientsTrust /> */}
      <StallSolutions />
      <Services />
      <Stats />
      <Process />
      <Portfolio />
      <WhyChooseUs />

      <Footer />
    </div>
  )
}
