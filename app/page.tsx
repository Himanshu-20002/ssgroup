import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { StallSolutions } from '@/components/home/StallSolutions'
import { Services } from '@/components/home/Services'
import { Stats } from '@/components/home/Stats'
import { Process } from '@/components/home/Process'
import { Portfolio } from '@/components/home/Portfolio'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Footer } from '@/components/home/Footer'


export default function Home() {
  return (
    <div className="w-full min-h-screen dark bg-background text-foreground overflow-hidden no-scrollbar">
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
