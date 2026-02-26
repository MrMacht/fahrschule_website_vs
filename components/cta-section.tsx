import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section id="kontakt" className="relative bg-[#14181f] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - CTA */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Kontakt
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
              Bereit fur deinen Fuhrerschein?
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-zinc-300">
              Melde dich jetzt an oder vereinbare einen kostenlosen
              Beratungstermin. Wir freuen uns auf dich!
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" asChild>
                <a href="tel:+4901234567890">
                  Jetzt anrufen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:info@vs-fahrschule.de">E-Mail schreiben</a>
              </Button>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="flex flex-col gap-6 rounded-2xl border border-zinc-700/50 bg-[linear-gradient(#1b1f2800_22%,#1b1f28e6_43%,#1b1f28_52%)] p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-white">
              Unsere Kontaktdaten
            </h3>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Telefon
                  </p>
                  <a
                    href="tel:+4901234567890"
                    className="text-base font-semibold text-zinc-100 transition-colors hover:text-primary"
                  >
                    0123 456 789 0
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    E-Mail
                  </p>
                  <a
                    href="mailto:info@vs-fahrschule.de"
                    className="text-base font-semibold text-zinc-100 transition-colors hover:text-primary"
                  >
                    info@vs-fahrschule.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Adresse
                  </p>
                  <p className="text-base font-semibold text-zinc-100">
                    Hauptstrasse 1, 12345 Musterstadt
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 rounded-lg bg-zinc-500/60 p-4">
              <p className="text-sm text-zinc-300">
                <span className="font-semibold text-white">
                  Offnungszeiten:
                </span>{" "}
                Mo - Fr: 09:00 - 18:00 Uhr | Sa: 10:00 - 14:00 Uhr
              </p>
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
