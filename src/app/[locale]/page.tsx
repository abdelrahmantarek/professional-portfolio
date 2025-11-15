import { Hero } from '@/components/organisms/Hero'
import { AboutSection } from '@/components/organisms/AboutSection'
import { ServicesSection } from '@/components/organisms/ServicesSection'
import { ProjectsSection } from '@/components/organisms/ProjectsSection'
import { TestimonialsSection } from '@/components/organisms/TestimonialsSection'
import { ContactSection } from '@/components/organisms/ContactSection'
import { ClientWrapper } from '@/components/ClientWrapper'

export default function HomePage() {
  return (
    <ClientWrapper>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </ClientWrapper>
  )
}