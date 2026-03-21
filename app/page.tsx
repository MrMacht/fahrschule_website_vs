import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Klassen } from "@/components/klassen"
import { FeaturesSection } from "@/components/features-section"
import { FastLaneSection } from "@/components/fast-lane"
import { AboutSections } from "@/components/about-sections"
import { Wegweiser } from "@/components/wegweiser"
import { Kalender } from "@/components/kalender"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Klassen />
        <FeaturesSection />
        <FastLaneSection />
        <Wegweiser />
        <Kalender />
        <AboutSections />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
