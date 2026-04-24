import Image from "next/image"

export function TeamSection() {
  return (
    <section id="team" className="relative bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Über uns
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Zwei Besitzerinnen, ein gemeinsames Ziel
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Wir führen die Fahrschule mit viel Herz, klarer Struktur und persönlicher Betreuung. Uns ist wichtig,
            dass du dich bei uns wohlfühlst und Schritt für Schritt sicher zum Führerschein kommst.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl border border-border/70 bg-muted">
              <Image
                src="/Viola.jpeg"
                alt="Viola Buchhold"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Viola Buchhold</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Inhaberin und Fahrlehrerin für die Klassen A, B/BE und C/CE sowie Erste-Hilfe-Ausbilderin und
              Sehtesterin.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl border border-border/70 bg-muted">
              <Image
                src="/Sophie.jpeg"
                alt="Sophie Buchhold"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Sophie Buchhold</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Inhaberin, Fahrlehrerin für die Klassen B/BE und Ausbildungsfahrlehrerin.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-muted">
              <Image
                src="/team-fahrschule.svg"
                alt="VS Fahrschule"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Unsere Fahrschule</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Hauptstraße 100, 63579 Freigericht. Hier findet Theorie, Beratung und ein großer Teil der Organisation statt –
              persönlich, herzlich und mit viel Leidenschaft fürs Fahren.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
