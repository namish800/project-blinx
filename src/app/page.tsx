import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <HeroSection />
    </div>
  )
}

