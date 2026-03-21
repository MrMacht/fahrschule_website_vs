import { BadgeCheck, BookOpenCheck, Eye, HeartPulse } from "lucide-react"

const features = [
  {
    icon: <BookOpenCheck className="h-5 w-5 text-primary" />,
    title: "Theorie im Blockunterricht",
    description:
      "Unsere Theoriestunden laufen gebundelt im Blockformat - so kommst du schnell und ohne lange Pausen durch den gesamten Stoff.",
  },
  {
    icon: <HeartPulse className="h-5 w-5 text-primary" />,
    title: "Erste-Hilfe-Kurs direkt bei uns",
    description:
      "Den verpflichtenden Erste-Hilfe-Kurs kannst du unkompliziert direkt in der Fahrschule absolvieren - ohne externe Termine.",
  },
  {
    icon: <Eye className="h-5 w-5 text-primary" />,
    title: "Sehtest vor Ort",
    description:
      "Auch den Sehtest bieten wir direkt vor Ort an. Damit hast du alle wichtigen Nachweise schnell an einem Ort erledigt.",
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

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-white/20 bg-white/[0.04] p-5 shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-primary/55 bg-primary/20 p-4 shadow-md md:p-5">
          <p className="flex items-start gap-2 text-sm text-zinc-100 md:text-base">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Kurze Wege, klare Abläufe: Theorie, Erste Hilfe und Sehtest aus einer
            Hand - für einen schnellen Start in deine Fahrstunden.
          </p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-white [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]"
      />
    </section>
  )
}