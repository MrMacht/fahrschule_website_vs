import {
  BadgeCheck,
  BookOpenCheck,
  Camera,
  Eye,
  HeartPulse,
  MapPin,
} from "lucide-react"

const onSiteServices = [
  {
    icon: <HeartPulse className="h-5 w-5 text-primary" />,
    title: "Erste-Hilfe-Kurs",
    description:
      "Den verpflichtenden Kurs kannst du unkompliziert direkt bei uns absolvieren.",
  },
  {
    icon: <Eye className="h-5 w-5 text-primary" />,
    title: "Sehtest vor Ort",
    description:
      "Auch den Sehtest bieten wir direkt in der Fahrschule an.",
  },
  {
    icon: <Camera className="h-5 w-5 text-primary" />,
    title: "Passbild direkt bei uns",
    description:
      "Dein Passbild für den Führerscheinantrag machst du direkt bei uns.",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative bg-[#14181f] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Deine Vorteile
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            Fahrschule - smarter organisiert
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-300">
            Wir bieten dir die klassischen Fahrschul-Leistungen - aber so
            strukturiert, dass du Theorie und Unterlagen möglichst schnell an
            einem Stück abschließen kannst.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* ── Kachel 1: Blockunterricht ── */}
          <article className="flex flex-col rounded-2xl border border-white/20 bg-white/[0.04] p-6 shadow-lg md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <BookOpenCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-white">
              Theorie im Blockunterricht
            </h3>
            <p className="text-base leading-relaxed text-zinc-300">
              Unsere Theoriestunden laufen gebündelt im Blockformat – so kommst du schnell und ohne lange Pausen durch den gesamten Stoff.
            </p>
          </article>

          {/* ── Kachel 2: Leistungen vor Ort ── */}
          <article className="flex flex-col rounded-2xl border border-white/20 bg-white/[0.04] p-6 shadow-lg md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Alles aus einer Hand
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              {onSiteServices.map((service) => (
                <div key={service.title}>
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    {service.icon}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-white">
                    {service.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-primary/55 bg-primary/20 p-4 shadow-md md:p-5">
          <p className="flex items-start gap-2 text-sm text-zinc-100 md:text-base">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Kurze Wege, klare Abläufe: Theorie, Erste Hilfe, Sehtest und Passbild aus einer
            Hand - für einen schnellen Start in deine Fahrstunden.
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 bg-white [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)] md:h-16"
      />
    </section>
  )
}
