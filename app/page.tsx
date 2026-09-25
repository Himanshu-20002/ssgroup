import dynamic from 'next/dynamic'
import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { StallSolutions } from '@/components/home/StallSolutions'
import { Services } from '@/components/home/Services'

// Below-the-fold components code-split to reduce Total Blocking Time (TBT)
const Stats = dynamic(() => import('@/components/home/Stats').then((mod) => mod.Stats))
const Process = dynamic(() => import('@/components/home/Process').then((mod) => mod.Process))
const Portfolio = dynamic(() => import('@/components/home/Portfolio').then((mod) => mod.Portfolio))
const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs').then((mod) => mod.WhyChooseUs))
const Footer = dynamic(() => import('@/components/home/Footer').then((mod) => mod.Footer))

export default function Home() {
  return (
    <div className="w-full min-h-screen dark bg-background text-foreground overflow-hidden">
      <Header />
      <Hero />
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
