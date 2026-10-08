import { Header } from '@/components/home/Header'
import { Hero } from '@/components/home/Hero'
import { StallSolutions } from '@/components/home/StallSolutions'
import { Services } from '@/components/home/Services'
import { Stats } from '@/components/home/Stats'
import { Process } from '@/components/home/Process'
import { Portfolio } from '@/components/home/Portfolio'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Footer } from '@/components/home/Footer'
import { getStoredProjects } from '@/lib/storage/dbStorage'

export const revalidate = 0; // Ensures immediate updates when admin makes changes

export default async function Home() {
  const allProjects = await getStoredProjects();
  const publishedProjects = allProjects.filter((p) => p.status !== 'draft');
  const featured = publishedProjects.filter((p) => p.featured);
  const nonFeatured = publishedProjects.filter((p) => !p.featured);
  // Prioritize featured projects first, then remaining published projects
  const homepageProjects = [...featured, ...nonFeatured];

  return (
    <div className="w-full min-h-screen dark bg-background text-foreground overflow-hidden no-scrollbar">
      <Header />
      <Hero />
      <StallSolutions />
      <Services />
      <Stats />
      <Process />
      <Portfolio projects={homepageProjects} />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}

