import Image from "next/image"

export function AboutSections() {
  return (
    <>
      <section id="standorte" className="relative bg-[#14181f] py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Unsere Standorte</p>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-white md:text-3xl">
              Unsere Fahrschule in Freigericht
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-300">
              Vor Ort erwarten dich moderne Räume, klare Abläufe und kurze Wege.
            </p>
          </div>

          <article className="overflow-hidden rounded-2xl border border-white/20 bg-white/[0.04] shadow-lg">
            <div className="grid gap-2 p-2 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/20 bg-white/[0.03]">
                <Image
                  src="/VS_ZoomedOut.jpeg"
                  alt="Außenansicht der Fahrschule"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/20 bg-white/[0.03]">
                <Image
                  src="/FahrschuleAussen2.png"
                  alt="Weitere Außenansicht der Fahrschule"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid gap-3 p-5 md:grid-cols-[2fr_1fr] md:items-start md:gap-6">
              <p className="text-sm leading-relaxed text-zinc-300">
                Moderne Unterrichtsflächen und persönliche Ansprechpartnerinnen sorgen dafür, dass du dich fachlich
                und menschlich gut aufgehoben fühlst.
              </p>
              <ul className="space-y-1.5 text-sm text-zinc-100">
                <li>• Hauptstraße 100, 63579 Freigericht</li>
              </ul>
            </div>
          </article>
        </div>

        <div
          className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 bg-background [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)] md:h-16"
        />
      </section>

      <section id="ueber-uns" className="relative bg-background py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Über uns</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Hey, wir sind die VS Fahrschule
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
              Schön, dass du hier bist. Wir möchten uns kurz vorstellen: Wir arbeiten mit viel Herz, klarer Struktur
              und persönlicher Begleitung, damit dein Weg zum Führerschein entspannt, transparent und gut planbar
              bleibt.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:justify-items-center">
            <article className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/70 bg-muted">
                <Image
                  src="/Viola.jpeg"
                  alt="Viola Buchhold"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">Viola Buchhold</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Inhaberin und Fahrlehrerin für die Klassen A, B/BE und C/CE sowie Erste-Hilfe-Ausbilderin und
                Sehtesterin.
              </p>
            </article>

            <article className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/70 bg-muted">
                <Image
                  src="/Sophie.jpeg"
                  alt="Sophie Buchhold"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">Sophie Buchhold</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Inhaberin, Fahrlehrerin für die Klassen B/BE und Ausbildungsfahrlehrerin.
              </p>
            </article>
          </div>
        </div>

        <div
          className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 bg-[#14181f] [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)] md:h-16"
        />
      </section>
    </>
  )
}
