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
              Deine moderne Fahrschule fur PKW, Motorrad und LKW.
              Professionell, flexibel und mit Spass zum Fuhrerschein.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a href="#klassen" className="transition-colors hover:text-foreground">
                  Fuhrerscheinklassen
                </a>
              </li>
              <li>
                <a href="#wegweiser" className="transition-colors hover:text-foreground">
                  Fuhrerschein-Wegweiser
                </a>
              </li>
              <li>
                <a href="#kalender" className="transition-colors hover:text-foreground">
                  Theorie-Kalender
                </a>
              </li>
              <li>
                <a href="#kontakt" className="transition-colors hover:text-foreground">
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
                <a href="#" className="transition-colors hover:text-foreground">
                  Impressum
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  AGB
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
