import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface KlasseCardProps {
  badge: string
  title: string
  description: string
  features: string[]
  imageSrc: string
  imageAlt: string
  reverse?: boolean
}

function KlasseRow({
  badge,
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  reverse = false,
}: KlasseCardProps) {
  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative ${reverse ? "lg:[direction:ltr]" : ""}`}>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Info Card */}
      <div className={`flex flex-col gap-5 ${reverse ? "lg:[direction:ltr]" : ""}`}>
        <div className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1">
          <span className="text-xs font-semibold text-primary">{badge}</span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="leading-relaxed text-muted-foreground">{description}</p>

        <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>

        <Button asChild className="mt-2 w-fit">
          <a href="#kontakt">Beratung anfragen</a>
        </Button>
      </div>
    </div>
  )
}

export function Klassen() {
  return (
    <section id="klassen" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Unsere Klassen
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Finde die passende Führerscheinklasse
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Vom PKW über das Motorrad - bei uns findest du das
            passende Angebot für deinen Führerschein.
          </p>
        </div>

        {/* Rows - Zigzag Layout */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {/* Row 1: PKW - Image Left, Text Right */}
          <KlasseRow
            badge="Klasse B"
            title="PKW-Führerschein"
            description="Der Klassiker - mit dem Klasse B Führerschein bist du unabhängig und mobil. Unsere modernen Cupra Formentor machen jede Fahrstunde zum Erlebnis."
            features={[
              "Ab 17 Jahren (begleitetes Fahren) oder ab 18 Jahren",
              "Moderne Fahrzeuge mit aktueller Sicherheitstechnik",
              "Flexible Fahrstundenplanung nach deinem Zeitplan",
              "Intensivkurse und Ferienkurse verfügbar",
            ]}
            imageSrc="/2026HyundaiTucson.jpg"
            imageAlt="VS Fahrschule PKW - Cupra Formentor mit Fahrschul-Branding"
          />

          {/* Row 2: Motorrad - Text Left, Image Right */}
          <KlasseRow
            badge="Klasse A / A2 / A1"
            title="Motorrad-Führerschein"
            description="Freiheit auf zwei Rädern! Ob Leichtkraftrad oder schwere Maschine - wir bringen dich sicher durch den Verkehr."
            features={[
              "Alle Motorradklassen: A1, A2 und offenes A",
              "Schrittweise Ausbildung vom Grundfahrzeug aufwärts",
              "Sicherheitstraining inklusive",
              "Moderne Sportmaschinen mit VS-Branding",
            ]}
            imageSrc="/IMG_0226.PNG"
            imageAlt="VS Fahrschule Motorrad mit Fahrschul-Branding"
            reverse
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-[#14181f] [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]"
      />
    </section>
  )
}
