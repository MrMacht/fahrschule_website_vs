"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Minus,
  Sparkles,
  Star,
  Car,
  Bike,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type VehicleType = "pkw" | "motorrad"

type PkwPackageKey = "basic" | "premium" | "premiumFastlane"
type MotorradPackageKey = "basic" | "premiumFastlane"
type PackageKey = PkwPackageKey | MotorradPackageKey

type PackageValue = boolean | string

interface FeatureRow {
  label: string
  detail?: string
  basic: PackageValue
  premium?: PackageValue
  premiumFastlane: PackageValue
}

interface FeatureGroup {
  id: string
  title: string
  previewCount: number
  features: FeatureRow[]
}

// ─── PKW Data ─────────────────────────────────────────────────────────────────

const pkwPackages: { key: PkwPackageKey; label: string; sublabel: string }[] = [
  {
    key: "basic",
    label: "Basic",
    sublabel: "Alles was du brauchst",
  },
  {
    key: "premium",
    label: "Premium",
    sublabel: "Mehr Service & Komfort",
  },
  {
    key: "premiumFastlane",
    label: "Premium Fastlane",
    sublabel: "Maximale Unterstützung",
  },
]

const pkwFeatureGroups: FeatureGroup[] = [
  {
    id: "grundleistungen",
    title: "Grundleistungen",
    previewCount: 2,
    features: [
      {
        label: "Antrags- & Behördenservice",
        detail: "Wir übernehmen die Organisation für deinen Führerscheinantrag.",
        basic: false,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Theorieunterricht im Block",
        basic: true,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Wiederholer Grundbetrag kostenfrei",
        detail:
          "Bei Nichtbestehen der Theorieprüfung: weitere Teilnahme am Theorieunterricht kostenfrei.",
        basic: false,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Preisgarantie",
        detail: "Die Preisgarantie gilt für 12 Monate nach Vertragsunterzeichnung.",
        basic: false,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Jokerkarten (kurzfristige Absage)",
        detail:
          "Jokerkarten, mit denen du entgegen der AGB eine Fahrstunde à 45 Minuten auch bei kurzer Benachrichtigungsfrist kostenfrei absagen kannst.",
        basic: false,
        premium: "1 Joker",
        premiumFastlane: "2 Joker",
      },
      {
        label: "Expressantrag für deinen Führerschein",
        detail:
          "Wir sorgen, sofern möglich, für schnellstmögliche Bearbeitung deines Führerscheinantrages.",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
      {
        label: "Ausbildung in 14 Tagen möglich",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
    ],
  },
  {
    id: "extras",
    title: "Extras & Lernmaterial",
    previewCount: 2,
    features: [
      {
        label: "Erste-Hilfe-Kurs",
        detail: "Pflichtnachweis vor der Theorieprüfung – 9 Stunden, 1 Kurstag.",
        basic: "optional",
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Lernpaket",
        detail: "Spannende App für dein Smartphone, premium Workbook und E-Book.",
        basic: "optional",
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Passbild & Sehtest",
        detail: "Passbilder für den Führerscheinantrag und Sehtest vor Ort.",
        basic: "optional",
        premium: true,
        premiumFastlane: true,
      },
    ],
  },
  {
    id: "fahrstunden",
    title: "Fahrstunden-Service",
    previewCount: 2,
    features: [
      {
        label: "Neuer Fahrstundenpreis",
        detail:
          "Grundbetrag bleibt gleich, aber der Fahrstundenpreis kann für zukünftige Fahrstunden angepasst werden.",
        basic: true,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Pick Up Service",
        detail:
          "Deine Fahrstunde beginnt und endet an einem mit dem Fahrlehrer ausgemachten Wunschort in einem Umkreis von 5 km der Fahrschule.",
        basic: false,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Priorisierte Fahrstundenvergabe",
        detail:
          "Du wirst bei der Vergabe der Übungsstunden, Sonderfahrten sowie Prüfungsplätze bevorzugt.",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
      {
        label: "Mindestens 2 Fahrstunden am Tag",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
      {
        label: "Alle Pflichtstunden am Stück",
        detail: "Überlandfahrt, Autobahnfahrt und Nachtfahrt jeweils All-in-one buchbar.",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
    ],
  },
  {
    id: "pruefung",
    title: "Prüfungsvorbereitung",
    previewCount: 2,
    features: [
      {
        label: "Zahlungsabwicklung TÜV übernommen",
        detail:
          "Für die Teilnahme an einer Prüfung fallen Gebühren für den TÜV an. Die Fahrschule übernimmt die Abwicklung der Zahlung mit dem TÜV und begleicht die Gebühr im Namen des jeweiligen Schülers.",
        basic: true,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Prüfungssimulation Theorie",
        detail:
          "Wir führen mit dir unter den Vorgaben der theoretischen Prüfung eine Simulation in der Fahrschule durch.",
        basic: false,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Persönliche Betreuung am Prüfungstag",
        detail:
          "Wir begleiten dich zur (Theorie-)prüfung und betreuen dich vor Ort bei der Prüforganisation.",
        basic: false,
        premium: true,
        premiumFastlane: true,
      },
      {
        label: "Begleitung zur Theorieprüfung",
        detail: "Wir begleiten dich persönlich zur Theorieprüfung.",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
      {
        label: "Warm-up vor der Prüfung",
        detail:
          "Fahrt unmittelbar vor deiner praktischen Fahrerlaubnisprüfung zur Eingewöhnung.",
        basic: false,
        premium: "15 Minuten",
        premiumFastlane: "30 Minuten",
      },
      {
        label: "Priorisierte Terminvergabe Prüfung",
        basic: false,
        premium: false,
        premiumFastlane: true,
      },
      {
        label: "Testfahrt**",
        detail:
          "Intensive Vor- und Nachbesprechung, 15 Minuten Testfahrt & Nachweis über verantwortungsvolle und umweltbewusste Fahrweise.",
        basic: "optional",
        premium: "optional",
        premiumFastlane: "optional",
      },
    ],
  },
]

// ─── Motorrad Data ────────────────────────────────────────────────────────────

const motorradPackages: { key: MotorradPackageKey; label: string; sublabel: string }[] = [
  {
    key: "basic",
    label: "Basic",
    sublabel: "Alles was du brauchst",
  },
  {
    key: "premiumFastlane",
    label: "Premium Fastlane",
    sublabel: "Maximale Unterstützung",
  },
]

const motorradFeatureGroups: FeatureGroup[] = [
  {
    id: "grundleistungen",
    title: "Grundleistungen",
    previewCount: 2,
    features: [
      {
        label: "Antrags- & Behördenservice",
        detail: "Wir übernehmen die Organisation für deinen Führerscheinantrag.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Theorieunterricht im Block",
        basic: true,
        premiumFastlane: true,
      },
      {
        label: "Wiederholer Grundbetrag kostenfrei",
        detail:
          "Bei Nichtbestehen der Theorieprüfung: weitere Teilnahme am Theorieunterricht kostenfrei.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Preisgarantie",
        detail: "Die Preisgarantie gilt für 12 Monate nach Vertragsunterzeichnung.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Jokerkarten (kurzfristige Absage)",
        detail:
          "Jokerkarten, mit denen du entgegen der AGB eine Fahrstunde auch bei kurzer Benachrichtigungsfrist kostenfrei absagen kannst.",
        basic: false,
        premiumFastlane: "2 Joker",
      },
      {
        label: "Expressantrag für deinen Führerschein",
        detail:
          "Wir sorgen, sofern möglich, für schnellstmögliche Bearbeitung deines Führerscheinantrages.",
        basic: false,
        premiumFastlane: true,
      },
    ],
  },
  {
    id: "extras",
    title: "Extras & Lernmaterial",
    previewCount: 2,
    features: [
      {
        label: "Erste-Hilfe-Kurs",
        detail: "Pflichtnachweis vor der Theorieprüfung – 9 Stunden, 1 Kurstag.",
        basic: "optional",
        premiumFastlane: true,
      },
      {
        label: "Lernpaket",
        detail: "Spannende App für dein Smartphone, premium Workbook und E-Book.",
        basic: "optional",
        premiumFastlane: true,
      },
      {
        label: "Passbild & Sehtest",
        detail: "Passbilder für den Führerscheinantrag und Sehtest vor Ort.",
        basic: "optional",
        premiumFastlane: true,
      },
    ],
  },
  {
    id: "fahrstunden",
    title: "Fahrstunden-Service",
    previewCount: 2,
    features: [
      {
        label: "Neuer Fahrstundenpreis",
        detail:
          "Grundbetrag bleibt gleich, aber der Fahrstundenpreis kann für zukünftige Fahrstunden angepasst werden.",
        basic: true,
        premiumFastlane: true,
      },
      {
        label: "Pick Up Service",
        detail:
          "Deine Fahrstunde beginnt und endet an einem mit dem Fahrlehrer ausgemachten Wunschort in einem Umkreis von 5 km der Fahrschule.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Priorisierte Fahrstundenvergabe",
        detail:
          "Du wirst bei der Vergabe der Übungsstunden, Sonderfahrten sowie Prüfungsplätze bevorzugt.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Mindestens 2 Fahrstunden am Tag",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Alle Pflichtstunden am Stück",
        detail: "Überlandfahrt, Autobahnfahrt und Nachtfahrt jeweils All-in-one buchbar.",
        basic: false,
        premiumFastlane: true,
      },
    ],
  },
  {
    id: "pruefung",
    title: "Prüfungsvorbereitung",
    previewCount: 2,
    features: [
      {
        label: "Zahlungsabwicklung TÜV übernommen",
        detail:
          "Für die Teilnahme an einer Prüfung fallen Gebühren für den TÜV an. Die Fahrschule übernimmt die Abwicklung der Zahlung mit dem TÜV und begleicht die Gebühr im Namen des jeweiligen Schülers.",
        basic: true,
        premiumFastlane: true,
      },
      {
        label: "Prüfungssimulation Theorie",
        detail:
          "Wir führen mit dir unter den Vorgaben der theoretischen Prüfung eine Simulation in der Fahrschule durch.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Persönliche Betreuung am Prüfungstag",
        detail:
          "Wir begleiten dich zur (Theorie-)prüfung und betreuen dich vor Ort bei der Prüforganisation.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Begleitung zur Theorieprüfung",
        detail: "Wir begleiten dich persönlich zur Theorieprüfung.",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Warm-up vor der Prüfung",
        detail:
          "Fahrt unmittelbar vor deiner praktischen Fahrerlaubnisprüfung zur Eingewöhnung.",
        basic: false,
        premiumFastlane: "30 Minuten",
      },
      {
        label: "Priorisierte Terminvergabe Prüfung",
        basic: false,
        premiumFastlane: true,
      },
      {
        label: "Testfahrt**",
        detail:
          "Intensive Vor- und Nachbesprechung, 15 Minuten Testfahrt & Nachweis über verantwortungsvolle und umweltbewusste Fahrweise.",
        basic: "optional",
        premiumFastlane: "optional",
      },
    ],
  },
]

// ─── Helper ───────────────────────────────────────────────────────────────────

function ValueCell({
  value,
  highlighted,
}: {
  value: PackageValue
  highlighted?: boolean
}) {
  if (value === true) {
    return (
      <CheckCircle2
        className={cn(
          "h-5 w-5 flex-shrink-0",
          highlighted ? "text-primary" : "text-primary/80"
        )}
      />
    )
  }
  if (value === false) {
    return <Minus className="h-4 w-4 flex-shrink-0 text-muted-foreground/40" />
  }
  if (value === "optional") {
    return (
      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        optional
      </span>
    )
  }
  // String: custom note
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
        highlighted
          ? "bg-primary/15 text-primary"
          : "bg-muted text-muted-foreground"
      )}
    >
      {value}
    </span>
  )
}

// ─── Mobile Single-Package View ───────────────────────────────────────────────

function FeatureRowItem({
  feature,
  pkg,
  highlighted,
  striped,
}: {
  feature: FeatureRow
  pkg: PackageKey
  highlighted: boolean
  striped: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-2 py-2.5",
        striped && "bg-muted/30"
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-foreground">{feature.label}</span>
        {feature.detail && (
          <span className="text-xs leading-relaxed text-muted-foreground">
            {feature.detail}
          </span>
        )}
      </div>
      <div className="flex flex-shrink-0 items-center justify-center">
        <ValueCell value={feature[pkg]} highlighted={highlighted} />
      </div>
    </div>
  )
}

function MobilePackageView({
  pkg,
  vehicleType,
}: {
  pkg: PackageKey
  vehicleType: VehicleType
}) {
  const highlighted = pkg === "premium" || pkg === "premiumFastlane"
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const groups = vehicleType === "pkw" ? pkwFeatureGroups : motorradFeatureGroups

  function toggleExpand(id: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <Accordion type="multiple" defaultValue={groups.map((g) => g.id)} className="w-full">
      {groups.map((group) => {
        const isExpanded = expandedGroups.has(group.id)
        const preview = group.features.slice(0, group.previewCount)
        const hidden = group.features.slice(group.previewCount)
        const hasMore = hidden.length > 0
        return (
          <AccordionItem key={group.id} value={group.id} className="border-b border-border">
            <AccordionTrigger className="py-3 text-sm font-semibold text-foreground hover:no-underline">
              {group.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <div className="flex flex-col gap-0">
                {preview.map((feature, i) => (
                  <FeatureRowItem
                    key={i}
                    feature={feature}
                    pkg={pkg}
                    highlighted={highlighted}
                    striped={i % 2 !== 0}
                  />
                ))}
                {isExpanded &&
                  hidden.map((feature, i) => (
                    <FeatureRowItem
                      key={preview.length + i}
                      feature={feature}
                      pkg={pkg}
                      highlighted={highlighted}
                      striped={(preview.length + i) % 2 !== 0}
                    />
                  ))}
              </div>
              {hasMore && (
                <button
                  onClick={() => toggleExpand(group.id)}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/5"
                >
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                  {isExpanded
                    ? "Weniger anzeigen"
                    : `${hidden.length} weitere anzeigen`}
                </button>
              )}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

// ─── Desktop Comparison Grid ──────────────────────────────────────────────────

function DesktopComparisonGrid({ vehicleType }: { vehicleType: VehicleType }) {
  const packages = vehicleType === "pkw" ? pkwPackages : motorradPackages
  const groups = vehicleType === "pkw" ? pkwFeatureGroups : motorradFeatureGroups
  const colCount = packages.length
  const gridCols = colCount === 2 ? "grid-cols-[2fr_1fr_1fr]" : "grid-cols-[2fr_1fr_1fr_1fr]"

  const [openGroups, setOpenGroups] = useState<string[]>(groups.map((g) => g.id))
  const [expandedContent, setExpandedContent] = useState<Set<string>>(new Set())

  function toggleGroup(id: string) {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    )
  }

  function toggleExpand(id: string) {
    setExpandedContent((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const highlightedPkg = colCount === 3 ? "premium" : "premiumFastlane"

  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border lg:block">
      {/* Header row */}
      <div className={cn("grid border-b border-border bg-muted/30", gridCols)}>
        <div className="px-5 py-4" />
        {packages.map((pkg) => (
          <div
            key={pkg.key}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-4 py-4 text-center",
              pkg.key === highlightedPkg && "bg-primary/10"
            )}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-foreground">{pkg.label}</span>
              {pkg.key === highlightedPkg && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                  <Star className="h-2.5 w-2.5" />
                  Top
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{pkg.sublabel}</span>
          </div>
        ))}
      </div>

      {/* Feature groups */}
      {groups.map((group) => {
        const isOpen = openGroups.includes(group.id)
        return (
          <div key={group.id} className="border-b border-border last:border-b-0">
            {/* Group header — acts as accordion trigger */}
            <button
              onClick={() => toggleGroup(group.id)}
              className={cn("grid w-full items-center transition-colors hover:bg-muted/20", gridCols)}
            >
              <div className="flex items-center gap-2 px-5 py-3.5">
                <svg
                  className={cn(
                    "h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-90"
                  )}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="text-sm font-semibold text-foreground">{group.title}</span>
              </div>
              {packages.map((pkg) => (
                <div
                  key={pkg.key}
                  className={cn(
                    "px-4 py-3.5",
                    pkg.key === highlightedPkg && "bg-primary/5"
                  )}
                />
              ))}
            </button>

            {/* Feature rows */}
            {isOpen && (() => {
              const isExpanded = expandedContent.has(group.id)
              const preview = group.features.slice(0, group.previewCount)
              const hidden = group.features.slice(group.previewCount)
              const hasMore = hidden.length > 0
              const visible = isExpanded ? group.features : preview
              return (
                <div>
                  {visible.map((feature, i) => (
                    <div
                      key={i}
                      className={cn(
                        "grid items-center border-t border-border/40",
                        gridCols,
                        i % 2 === 0 ? "bg-background" : "bg-muted/20"
                      )}
                    >
                      <div className="px-5 py-3">
                        <p className="text-sm text-foreground">{feature.label}</p>
                        {feature.detail && (
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {feature.detail}
                          </p>
                        )}
                      </div>
                      {packages.map((pkg) => (
                        <div
                          key={pkg.key}
                          className={cn(
                            "flex items-center justify-center px-4 py-3",
                            pkg.key === highlightedPkg && "bg-primary/5"
                          )}
                        >
                          <ValueCell
                            value={feature[pkg.key]}
                            highlighted={pkg.key === highlightedPkg}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  {hasMore && (
                    <div className={cn("grid border-t border-border/40", gridCols)}>
                      <div className={cn("px-5 py-2", colCount === 2 ? "col-span-3" : "col-span-4")}>
                        <button
                          onClick={() => toggleExpand(group.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-200",
                              isExpanded && "rotate-180"
                            )}
                          />
                          {isExpanded
                            ? "Weniger anzeigen"
                            : `${hidden.length} weitere anzeigen`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )
      })}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TarifeSection() {
  const [vehicleType, setVehicleType] = useState<VehicleType>("pkw")
  const [activeTab, setActiveTab] = useState<PackageKey>("premium")

  const packages = vehicleType === "pkw" ? pkwPackages : motorradPackages

  return (
    <section className="relative bg-background py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Dein Paket
          </span>
          <h2 className="mb-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Unsere <span className="text-primary">Tarife</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            Basic, Premium oder Premium Fastlane – wähle das Paket, das zu dir und
            deinem Tempo passt.
          </p>
        </div>

        {/* Vehicle type switcher */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-border bg-muted/40 p-1">
            <button
              onClick={() => {
                setVehicleType("pkw")
                setActiveTab("premium")
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                vehicleType === "pkw"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Car className="h-4 w-4" />
              Klasse B
            </button>
            <button
              onClick={() => {
                setVehicleType("motorrad")
                setActiveTab("premiumFastlane")
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                vehicleType === "motorrad"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bike className="h-4 w-4" />
              Motorrad
            </button>
          </div>
        </div>

        {/* ── Mobile: Tab switcher + single-package view ── */}
        <div className="lg:hidden">
          {/* Sticky tab bar */}
          <div className="sticky top-16 z-20 -mx-6 bg-background/95 px-6 pb-3 pt-2 backdrop-blur-sm">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Tarif auswählen
            </p>
            <div className="flex rounded-xl border border-border bg-muted/40 p-1">
              {packages.map((pkg) => (
                <button
                  key={pkg.key}
                  onClick={() => setActiveTab(pkg.key)}
                  className={cn(
                    "flex-1 rounded-lg px-2 py-2.5 text-xs font-semibold transition-all",
                    activeTab === pkg.key
                      ? pkg.key === "premium" || pkg.key === "premiumFastlane"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {pkg.label}
                  {(pkg.key === "premium" || pkg.key === "premiumFastlane") && activeTab !== pkg.key && (
                    <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {packages.find((p) => p.key === activeTab)?.sublabel}
            </p>
          </div>

          <MobilePackageView pkg={activeTab} vehicleType={vehicleType} />
        </div>

        {/* ── Desktop: Comparison grid ── */}
        <DesktopComparisonGrid vehicleType={vehicleType} />

        {/* Footnotes */}
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          * auf Wunsch &nbsp;&nbsp; ** nur bei der Schlüsselzahl B197 notwendig
        </p>

        {/* CTA bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:flex-row">
          <div>
            <p className="font-semibold text-foreground">
              Noch Fragen zu den Paketen?
            </p>
            <p className="text-sm text-muted-foreground">
              Ruf uns an oder schreib uns – wir beraten dich kostenlos und persönlich.
            </p>
          </div>
          <Button
            className="whitespace-nowrap bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
            onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
          >
            Jetzt beraten lassen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bottom jagged edge divider */}
      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 bg-muted/30 md:h-16 [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100_100%)]"
      />
    </section>
  )
}
