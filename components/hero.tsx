import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative h-[110vh] overflow-hidden md:h-[120vh]">
      <div className="relative h-full">
        <div className="absolute inset-0">
          <Image
            src="/HeroNewHyundaiTucson.jpg"
            alt="VS-Fahrschule Fahrzeug"
            fill
            priority
            className="h-full w-full scale-110 object-cover object-[68%_center] md:object-[88%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 md:from-black/60 md:via-black/20 md:to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-56 md:items-center md:pb-0">
          <div className="max-w-2xl space-y-8 text-white">
            <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
              VS-Fahrschule • Sicher ans Ziel
            </p>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Dein Führerschein. Modern lernen. Sicher fahren.
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Persönliche Betreuung, moderne Fahrzeuge und flexible
              Fahrstunden. Wir begleiten dich Schritt für Schritt zu deinem
              Führerschein.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="#kontakt">
                  Jetzt anmelden
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <a href="#kalender">Theorie-Termine ansehen</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-sm text-white/80">
              <span>Flexible Fahrstunden</span>
              <span className="text-white/40">·</span>
              <span>Erfahrene Fahrlehrer</span>
              <span className="text-white/40">·</span>
              <span>Schneller zum Führerschein</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-background [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]"
      />
    </section>
  )
}
