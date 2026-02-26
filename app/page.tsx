import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Klassen } from "@/components/klassen"
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
        <Wegweiser />
        <Kalender />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
