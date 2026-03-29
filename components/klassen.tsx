"use client"

import { useState } from "react"
import { Car, Bike, Info, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickFact {
  label: string
  value: string
}

interface ClassInfo {
  id: string
  code: string
  name: string
  tagline: string
  quickFacts: QuickFact[]
  description: string
  details: string[]
  note?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const pkwClasses: ClassInfo[] = [
  {
    id: "b",
    code: "B",
    name: "Klasse B",
    tagline: "Der Standard-PKW-Führerschein",
    quickFacts: [
      { label: "Mindestalter", value: "17 (BF17) / 18 J." },
      { label: "Fahrzeug", value: "bis 3.500 kg" },
      { label: "Getriebe", value: "Schalt & Automatik" },
    ],
    description:
      "Der meistgemachte Führerschein in Deutschland. Klasse B berechtigt zum Fahren von PKW und leichten Transportern bis 3.500 kg – egal ob Schalt- oder Automatikgetriebe. Pflicht für alle, die eigenständig mobil sein wollen.",
    details: [
      "Gilt für alle PKW und leichten Transporter bis 3.500 kg",
      "Schalt- und Automatikfahrzeuge eingeschlossen",
      "Bis zu 8 Sitzplätze (ohne Fahrersitz)",
      "Kleinanhänger bis 750 kg ohne Zusatzprüfung erlaubt",
      "Begleitetes Fahren ab 17 Jahren (BF17) möglich",
      "Theorieprüfung und praktische Fahrprüfung erforderlich",
      "EU-weit gültig, alle 15 Jahre zu erneuern (inhaltlich unbefristet)",
    ],
  },
  {
    id: "b197",
    code: "B §197",
    name: "PKW-Führerschein",
    tagline: "Schalt- & Automatikgetriebe",
    quickFacts: [
      { label: "Mindestalter", value: "17 (BF17) / 18 J." },
      { label: "Fahrzeug", value: "bis 3.500 kg" },
      { label: "Anhänger", value: "bis 750 kg inkl." },
    ],
    description:
      "Der Standard-PKW-Führerschein – gilt für Fahrzeuge mit Schalt- und Automatikgetriebe. Mit BF17 kannst du bereits ab 17 Jahren begleitet starten und bist mit 18 voll eigenständig unterwegs.",
    details: [
      "Fahrzeuge bis 3.500 kg zulässiger Gesamtmasse",
      "Bis zu 8 Sitzplätze (ohne Fahrer)",
      "Kleinanhänger bis 750 kg ohne Zusatzprüfung",
      "Begleitetes Fahren ab 17 Jahren (BF17) möglich",
      "Theorieprüfung + praktische Fahrprüfung erforderlich",
      "EU-Führerschein alle 15 Jahre zu erneuern (inhaltlich unbegrenzt)",
    ],
  },
  {
    id: "b78",
    code: "B §78",
    name: "Automatik-Führerschein",
    tagline: "Nur Automatikgetriebe",
    quickFacts: [
      { label: "Mindestalter", value: "17 (BF17) / 18 J." },
      { label: "Gültig für", value: "nur Automatik" },
      { label: "Upgrade", value: "jederzeit möglich" },
    ],
    description:
      "Wer ausschließlich Automatikfahrzeuge fahren möchte, spart sich das Schalten und kommt oft schneller zum Führerschein. Ideal für den Einstieg oder wer nie ein Schaltfahrzeug plane.",
    details: [
      "Führerschein trägt Schlüsselzahl '78' (nur Automatikgetriebe)",
      "Weniger Koordinationsaufwand – kein manuelles Schalten",
      "Oft kürzere Ausbildungsdauer als §197",
      "Upgrade auf §197 (Schaltgetriebe) jederzeit mit Zusatzstunden möglich",
      "Gleiche Fahrzeugklassen und Gewichtsgrenzen wie B §197",
      "Zunehmend populär durch E-Autos (die immer Automatik sind)",
    ],
    note:
      "Tipp: Da E-Fahrzeuge und viele Neuwagen inzwischen Automatikgetriebe haben, ist B §78 eine smarte und oft günstigere Wahl.",
  },
  {
    id: "b96",
    code: "B96",
    name: "Anhänger­erweiterung",
    tagline: "Gespanne bis 4.250 kg",
    quickFacts: [
      { label: "Mindestalter", value: "18 J." },
      { label: "Gespann", value: "bis 4.250 kg" },
      { label: "Prüfung", value: "keine – nur Kurs" },
    ],
    description:
      "Die unkomplizierte Erweiterung des B-Führerscheins für größere Anhänger. Kein separater Prüfungstermin – nur ein kurzer Ausbildungskurs, und du bist startklar.",
    details: [
      "Zulässige Gesamtmasse des Gespanns bis 4.250 kg",
      "Voraussetzung: vorhandener Klasse-B-Führerschein",
      "Ausbildung: mindestens 7 Fahrstunden",
      "Keine Theorieprüfung, keine praktische Prüfung",
      "Nachweis als Schulungsbescheinigung (kein separater Führerschein)",
      "Ideal für größere Pferdeanhänger, Boote bis ca. 2 t, Motorradanhänger",
    ],
  },
  {
    id: "be",
    code: "BE",
    name: "Führerschein mit Anhänger",
    tagline: "Gespanne bis 7.000 kg",
    quickFacts: [
      { label: "Mindestalter", value: "18 J." },
      { label: "Anhänger", value: "bis 3.500 kg" },
      { label: "Gespann", value: "bis 7.000 kg" },
    ],
    description:
      "Für alle, die größere Anhänger ziehen – schwere Wohnwagen, Pferdetransporter oder Maschinenanhänger. Erfordert eine eigene praktische Prüfung.",
    details: [
      "Anhänger bis 3.500 kg zulässiger Gesamtmasse",
      "Gespann (Zugfahrzeug + Anhänger) bis 7.000 kg",
      "Praktische Prüfung (inkl. Rückwärtsrangieren mit Anhänger) erforderlich",
      "Voraussetzung: vorhandener Klasse-B-Führerschein",
      "Ideal für Wohnwagen, schwere Pferdeanhänger, Maschinenanhänger",
      "Keine separate Theorieprüfung wenn B bereits vorhanden",
    ],
  },
]

const motorradClasses: ClassInfo[] = [
  {
    id: "a1",
    code: "A1",
    name: "Leichtkraftrad",
    tagline: "bis 125 ccm & 11 kW",
    quickFacts: [
      { label: "Mindestalter", value: "16 J." },
      { label: "Motor", value: "max. 125 ccm / 11 kW" },
      { label: "Upgrade", value: "auf A2 ab 18 J." },
    ],
    description:
      "Der perfekte Einstieg in die Motorradwelt – schon ab 16 Jahren. A1 berechtigt zum Fahren von Leichtkrafträdern bis 125 ccm und 11 kW (ca. 15 PS).",
    details: [
      "Motorräder bis 125 ccm Hubraum und 11 kW (ca. 15 PS)",
      "Einstiegsalter: 16 Jahre",
      "Dreiphasige Ausbildung: Grundfahren, Sicherheitstraining, Straßenfahrt",
      "Theorie- und Fahrprüfung erforderlich",
      "Gilt auch für 3-rädrige Leichtkraftfahrzeuge bis 15 kW",
      "Upgrade auf A2 ab 18 Jahren mit reduzierter Prüfung möglich",
    ],
  },
  {
    id: "a2",
    code: "A2",
    name: "Mittelschweres Motorrad",
    tagline: "bis 35 kW (ca. 47 PS)",
    quickFacts: [
      { label: "Mindestalter", value: "18 J." },
      { label: "Leistung", value: "max. 35 kW" },
      { label: "Upgrade", value: "auf A nach 2 Jahren" },
    ],
    description:
      "Mittelschwere Maschinen bis 35 kW – der beliebteste Einstieg für Volljährige. Nach zwei Jahren A2-Erfahrung steht das unbeschränkte offene A offen.",
    details: [
      "Motorräder bis 35 kW (ca. 47 PS) und max. 0,2 kW/kg Leistungsgewicht",
      "Direkteinstieg ab 18 Jahren möglich",
      "Bei Upgrade von A1: neues Motorrad darf max. doppelte Leistung haben",
      "Nach mindestens 2 Jahren A2: Aufstieg auf offenes A möglich (nur Fahrprüfung)",
      "Theorie- und praktische Prüfung erforderlich",
      "Sehr breite Modellauswahl in dieser Klasse verfügbar",
    ],
  },
  {
    id: "a",
    code: "A",
    name: "Unbeschränktes Motorrad",
    tagline: "A80 · Alle Maschinen ohne Limit",
    quickFacts: [
      { label: "Mindestalter", value: "20 J. (nach A2) / 24 J." },
      { label: "Leistung", value: "unbegrenzt" },
      { label: "Weg", value: "progressiv oder direkt" },
    ],
    description:
      "Das offene A – alle Motorräder ohne Einschränkung. Erreichbar ab 20 Jahren nach 2 Jahren A2 oder als Direkteinstieg ab 24 Jahren.",
    details: [
      "Alle Motorräder ohne Leistungs- oder Hubraumbeschränkung",
      "Progressiver Weg: 2 Jahre A2 → offenes A ab 20 Jahren (nur Fahrprüfung)",
      "Direkteinstieg ab 24 Jahren (Theorie + Fahrprüfung)",
      "Gilt auch für Trikes über 15 kW",
      "Inkl. aller Superbikes, Tourenmotorräder, Big-Trails ohne Einschränkung",
    ],
    note:
      "Hinweis: 'A80' ist kein offizieller Begriff – er bezeichnet traditionell das unbeschränkte offene A (früher auf 80 kW limitiert). Die aktuelle Klasse heißt einfach 'A'.",
  },
  {
    id: "b196",
    code: "B196",
    name: "125er mit B-Führerschein",
    tagline: "Motorrad auf Basis des B-Scheins",
    quickFacts: [
      { label: "Mindestalter", value: "25 J." },
      { label: "B-Erfahrung", value: "mind. 5 Jahre" },
      { label: "Prüfung", value: "keine – nur Kurs" },
    ],
    description:
      "Für erfahrene Autofahrer: Wer seit mindestens 5 Jahren den B-Führerschein hat und 25 oder älter ist, kann nach einem kurzen Fahrkurs Motorrad bis 125 ccm fahren – ganz ohne Prüfung.",
    details: [
      "Voraussetzung: B-Führerschein seit mind. 5 Jahren + Mindestalter 25 Jahre",
      "Berechtigt zum Fahren von Motorrädern bis 125 ccm und 11 kW",
      "Ausbildung: mind. 13,5 Stunden (Theorie + Praxis)",
      "Keine Führerscheinprüfung – nur Kurszertifikat nötig",
      "Schlüsselzahl '196' wird in den bestehenden B-Führerschein eingetragen",
      "Achtung: gilt nur in Deutschland – für Auslandsfahrten auf dem Motorrad wird ein vollwertiger A-Führerschein benötigt",
    ],
    note:
      "Wichtig: B196 gilt ausschließlich in Deutschland. Für Motorradfahrten im Ausland (z. B. Österreich, Schweiz) ist ein vollwertiger Motorradführerschein erforderlich.",
  },
]

// ─── Card Component ───────────────────────────────────────────────────────────

function ClassChip({ cls, onClick }: { cls: ClassInfo; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group h-full w-full text-left rounded-2xl border border-border bg-card transition-colors hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="flex h-full flex-col gap-2 p-3.5 sm:gap-3 sm:p-5">
        {/* Badge + arrow */}
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-xl bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            {cls.code}
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Name + tagline */}
        <div>
          <p className="text-sm font-bold leading-tight text-foreground sm:text-base">{cls.name}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{cls.tagline}</p>
        </div>

        {/* Description – only sm+ */}
        <p className="hidden sm:line-clamp-2 sm:block text-xs leading-relaxed text-muted-foreground">
          {cls.description}
        </p>

        {/* Quick facts – only sm+ */}
        <div className="mt-auto hidden sm:flex flex-wrap gap-1.5 pt-1">
          {cls.quickFacts.slice(0, 2).map((fact) => (
            <div key={fact.label} className="rounded-lg bg-muted/60 px-2 py-1">
              <p className="text-[9px] uppercase tracking-wide text-muted-foreground leading-none">{fact.label}</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </button>
  )
}

// ─── Detail Dialog ────────────────────────────────────────────────────────────

function ClassDetailDialog({
  cls,
  open,
  onClose,
}: {
  cls: ClassInfo | null
  open: boolean
  onClose: () => void
}) {
  if (!cls) return null
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="mb-1">
          <span className="inline-block w-fit rounded-lg bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
            {cls.code}
          </span>
          <DialogTitle className="mt-2 text-xl font-bold text-foreground">
            {cls.name}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{cls.tagline}</p>
        </DialogHeader>

        {/* Quick Facts */}
        <div className="flex flex-wrap gap-2">
          {cls.quickFacts.map((fact) => (
            <div key={fact.label} className="rounded-xl bg-muted/60 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {fact.label}
              </p>
              <p className="text-sm font-semibold text-foreground">{fact.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {cls.description}
        </p>

        {/* Details */}
        <ul className="flex flex-col gap-2.5">
          {cls.details.map((detail) => (
            <li key={detail} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {detail}
            </li>
          ))}
        </ul>

        {/* Note */}
        {cls.note && (
          <div className="flex gap-2.5 rounded-xl bg-primary/5 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">{cls.note}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


// ─── Main Export ──────────────────────────────────────────────────────────────

const categoryInfo = {
  pkw: {
    icon: <Car className="h-5 w-5 text-primary" />,
    headline: "PKW-Führerscheine",
    description:
      "Der Klasse-B-Führerschein ist der beliebteste Führerschein in Deutschland – und der erste Schritt in die Mobilität. Bei uns lernst du mit modernen Fahrzeugen, flexiblen Zeiten und einer persönlichen Betreuung. Egal ob du mit 17 über BF17 startest, nur Automatik brauchst oder später noch einen Anhänger draufpacken willst – wir haben die passende Klasse für dich.",
  },
  motorrad: {
    icon: <Bike className="h-5 w-5 text-primary" />,
    headline: "Motorrad-Führerscheine",
    description:
      "Vom Leichtkraftrad mit 16 bis zur unbeschränkten Maschine ohne Limit – der Weg zum Motorradführerschein hat viele Stufen. Wir begleiten dich durch alle Klassen: ob du gezielt mit A1 einsteigst, über A2 progressiv aufsteigst oder als erfahrener Autofahrer schnell und unkompliziert mit B196 auf ein 125er umsteigst.",
  },
}

export function Klassen() {
  const [tab, setTab] = useState<"pkw" | "motorrad">("pkw")
  const [selected, setSelected] = useState<ClassInfo | null>(null)

  const classes = tab === "pkw" ? pkwClasses : motorradClasses
  const cat = categoryInfo[tab]

  return (
    <section id="klassen" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Unsere Klassen
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Finde die passende Führerscheinklasse
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Wähle eine Kategorie und klick auf eine Klasse für alle Details.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-8 inline-flex rounded-xl border border-border bg-muted/40 p-1">
          <button
            onClick={() => setTab("pkw")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === "pkw"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Car className="h-4 w-4" />
            PKW
          </button>
          <button
            onClick={() => setTab("motorrad")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === "motorrad"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Bike className="h-4 w-4" />
            Motorrad
          </button>
        </div>

        {/* Category Intro */}
        <div className="mb-8 flex items-start gap-4 rounded-2xl border border-border bg-card px-5 py-5">
          <div className="mt-0.5 shrink-0 rounded-xl bg-primary/10 p-2.5">
            {cat.icon}
          </div>
          <div>
            <h3 className="mb-1 text-base font-bold text-foreground">{cat.headline}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
          </div>
        </div>

        {/* Class Cards */}
        <div
          className={cn(
            "grid grid-cols-2 gap-3 sm:gap-4",
            classes.length <= 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5"
          )}
        >
          {classes.map((cls, i) => {
            const isOrphan = i === classes.length - 1 && classes.length % 2 === 1
            return (
              <div
                key={cls.id}
                className={cn(isOrphan && "col-span-2 sm:col-span-1")}
              >
                <ClassChip cls={cls} onClick={() => setSelected(cls)} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail Dialog */}
      <ClassDetailDialog
        cls={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />

      <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-[#14181f] [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]" />
    </section>
  )
}
