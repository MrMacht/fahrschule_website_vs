import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-background py-12 text-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/Header-Logo.png"
              alt="VS-Fahrschule Logo"
              width={120}
              height={34}
              className="h-5 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Deine moderne Fahrschule für PKW und Motorrad.
              Professionell, flexibel und mit Spaß zum Führerschein.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href="/#klassen" className="transition-colors hover:text-foreground">
                  Führerscheinklassen
                </a>
              </li>
              <li>
                <a href="/#wegweiser" className="transition-colors hover:text-foreground">
                  Führerschein-Wegweiser
                </a>
              </li>
              <li>
                <a href="/#kalender" className="transition-colors hover:text-foreground">
                  Theorie-Kalender
                </a>
              </li>
              <li>
                <a href="/#standorte" className="transition-colors hover:text-foreground">
                  Standorte
                </a>
              </li>
              <li>
                <a href="/#ueber-uns" className="transition-colors hover:text-foreground">
                  Über uns
                </a>
              </li>
              <li>
                <a href="/#kontakt" className="transition-colors hover:text-foreground">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Rechtliches
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href="/impressum" className="transition-colors hover:text-foreground">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz" className="transition-colors hover:text-foreground">
                  Datenschutz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} VS-Fahrschule. Alle Rechte
          vorbehalten.
        </div>
      </div>
    </footer>
  )
}
