import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Klassen } from "@/components/klassen"
import { FeaturesSection } from "@/components/features-section"
import { TarifeSection } from "@/components/tarife"
import { AboutSections } from "@/components/about-sections"
import { Wegweiser } from "@/components/wegweiser"
import { Kalender } from "@/components/kalender"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default async function Home() {
  const cookieStore = await cookies()
  if (cookieStore.get('site_access')?.value !== 'granted') {
    redirect('/coming-soon')
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Klassen />
        <FeaturesSection />
        <TarifeSection />
        <Wegweiser />
        <Kalender />
        <AboutSections />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
