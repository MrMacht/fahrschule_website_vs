import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"

const benefits = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Garantierte Fahrstunden",
    desc: "Deine gebuchten Stunden sind fest reserviert - kein Warten, kein Verschieben.",
    accent: true,
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Persönlicher Fahrlehrer",
    desc: "Du arbeitest durchgehend mit demselben Fahrlehrer für maximalen Lernfortschritt.",
    accent: false,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Schnellerer Fortschritt",
    desc: "Intensive Einheiten bringen dich messbar schneller zur Prüfungsreife.",
    accent: true,
  },
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    title: "Flexibler Stundenplan",
    desc: "Termine nach deiner Verfügbarkeit - auch abends und am Wochenende.",
    accent: false,
  },
]

const infoPoints = [
  {
    icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
    text: "Maximaler Lernerfolg in kürzester Zeit",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
    text: "Direkter Draht zu deinem Fahrlehrer",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
    text: "Prüfungsvorbereitung im Fokus",
  },
  {
    icon: <AlertCircle className="h-4 w-4 text-accent" />,
    text: "Hohe zeitliche Flexibilität erforderlich",
  },
  {
    icon: <AlertCircle className="h-4 w-4 text-accent" />,
    text: "Investition höher als Standardpaket",
  },
]

export function FastLaneSection() {
  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Premium-Paket
          </span>
          <h2 className="mb-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Fast-<span className="text-primary">Lane</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            Für alle, die schnell ans Ziel wollen - mit voller Unterstützung,
            engem Kontakt und garantierten Fahrstunden.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7 lg:h-full">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:h-full">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/35"
                >
                  <div
                    className={`absolute left-0 right-0 top-0 h-0.5 ${
                      item.accent ? "bg-primary" : "bg-accent"
                    }`}
                  />
                  <div
                    className={`mb-3 inline-flex rounded-xl p-2 ${
                      item.accent ? "bg-primary/12" : "bg-accent/12"
                    }`}
                  >
                    <span
                      className={item.accent ? "text-primary" : "text-accent"}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="mb-1 text-sm font-semibold leading-tight text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-2xl border border-zinc-700/70 bg-[#14181f] shadow-[0_18px_40px_-30px_rgba(15,23,42,0.9)] lg:col-span-5">
            <div className="relative overflow-hidden bg-[#14181f] px-6 pb-8 pt-6">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/25" />
              <div className="absolute -right-2 top-8 h-14 w-14 rounded-full bg-accent/20" />
              <p className="relative mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                Wichtig zu wissen
              </p>
              <h3 className="relative text-balance text-lg font-bold leading-snug text-white">
                Fast-Lane ist intensiv - und das ist Absicht.
              </h3>
            </div>

            <div className="flex flex-1 flex-col justify-between border-t border-zinc-700/70 bg-[#1b1f28] px-6 py-4">
              <div className="mb-4 space-y-2">
                {infoPoints.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="text-sm text-zinc-200">{item.text}</span>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-3 text-xs text-zinc-400">
                  Preis auf Anfrage - individuelle Pakete verfügbar
                </p>
                <Button className="flex h-9 w-full items-center justify-center gap-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                  Jetzt Fast-Lane anfragen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4 sm:flex-row">
          <div>
            <p className="font-semibold text-foreground">
              Bereit für die Überholspur?
            </p>
            <p className="text-sm text-muted-foreground">
              Ruf uns an oder schreib uns - wir erklären dir alles persönlich.
            </p>
          </div>
          <Button
            className="whitespace-nowrap bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
          >
            Kontakt aufnehmen
          </Button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-[#14181f] [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]"
      />
    </section>
  )
}