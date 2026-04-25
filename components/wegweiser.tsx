"use client"

import { useState } from "react"
import {
  ClipboardList,
  FileText,
  BookOpen,
  Car,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Anmeldung",
    description:
      "Melde dich bei uns an – telefonisch oder direkt vor Ort. Wir beraten dich kostenlos und unverbindlich.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Unterlagen einreichen",
    description:
      "Sehtest, Erste-Hilfe-Kurs, Passbild - wir sagen dir genau, was du brauchst und wo du es bekommst.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Theorieunterricht",
    description:
      "Besuche unsere Theoriestunden nach deinem eigenen Zeitplan. 14 Pflichtlektionen, flexibel einteilbar.",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Praktische Fahrstunden",
    description:
      "Ab auf die Straße! Mit modernen Fahrzeugen und erfahrenen Fahrlehrern lernst du sicher und entspannt.",
    icon: Car,
  },
  {
    number: "05",
    title: "Prüfung bestehen",
    description:
      "Erst Theorie, dann Praxis - und schon hast du deinen Führerschein in der Tasche. Wir drücken dir die Daumen!",
    icon: Award,
  },
]

export function Wegweiser() {
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <section id="wegweiser" className="relative bg-[#14181f] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Führerschein-Wegweiser
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            In 5 Schritten zum Führerschein
          </h2>
        </div>

        {/* Horizontal step indicators */}
        <div className="relative mb-8">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-5 h-px bg-white/10" />
          <div
            className="absolute left-0 top-5 h-px bg-primary transition-all duration-300"
            style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
          />

          <div className="relative flex justify-between">
            {steps.map((s, i) => (
              <button
                key={s.number}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-200 ${
                    i === active
                      ? "border-primary bg-primary text-primary-foreground scale-110"
                      : i < active
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-white/30 bg-white/[0.03] text-white/45 group-hover:border-white/60 group-hover:text-white/80"
                  }`}
                >
                  {s.number}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:block transition-colors ${
                    i === active ? "text-white" : "text-white/40 group-hover:text-white/60"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active step content */}
        <div className="rounded-2xl border border-white/20 bg-white/[0.04] p-6 shadow-lg md:p-8">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Schritt {step.number}
              </p>
              <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
              <p className="leading-relaxed text-zinc-300">{step.description}</p>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronLeft className="h-4 w-4" />
              Zurück
            </button>
            <span className="text-xs text-white/30">
              {active + 1} / {steps.length}
            </span>
            <button
              onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
              disabled={active === steps.length - 1}
              className="flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-25"
            >
              Weiter
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-background [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]"
      />
    </section>
  )
}
