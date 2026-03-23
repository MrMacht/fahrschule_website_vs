import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Impressum | VS Fahrschule",
  description: "Impressum der VS Fahrschule",
}

export default async function ImpressumPage() {
  const cookieStore = await cookies()
  if (cookieStore.get('site_access')?.value !== 'granted') {
    redirect('/coming-soon')
  }

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <section className="relative bg-[#14181f] pb-12 pt-28 md:pt-32">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Rechtliches</p>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Impressum</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Alle Pflichtangaben nach § 5 TMG und ergänzende rechtliche Informationen auf einen Blick.
            </p>
            <a href="/" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">
              Zurück zur Startseite
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-20 pt-10 md:pt-12">
        <div className="mt-2 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              VS Fahrschule UG (haftungsbeschränkt)<br />
              Hauptstraße 100<br />
              63579 Freigericht
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Vertreten durch</h2>
            <p className="mt-2">Viola Buchhold und Sophie Buchhold (gleichberechtigte Inhaberinnen)</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
            <p className="mt-2">
              Telefon: <a href="tel:015225922006" className="hover:text-foreground transition-colors">015225922006</a><br />
              E-Mail: <a href="mailto:info@vsfahrschule.com" className="hover:text-foreground transition-colors">info@vsfahrschule.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Registereintrag</h2>
            <p className="mt-2">
              Handelsregister: HRB 101052
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Steuernummer</h2>
            <p className="mt-2">
              Steuernummer: 1924765209
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Aufsichtsbehörde</h2>
            <p className="mt-2">
              Regierungspräsidium Darmstadt<br />
              Wilhelminenstraße 1-3, 64278 Darmstadt
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Berufsrechtliche Angaben (Fahrschule)</h2>
            <p className="mt-2">
              Es gelten insbesondere folgende berufsrechtliche Regelungen:<br />
              Fahrlehrergesetz (FahrlG), Fahrschüler-Ausbildungsordnung (FahrschAusbO), ggf. weitere landesrechtliche
              Vorschriften.<br />
              Fundstellen:{" "}
              <a href="https://www.gesetze-im-internet.de/fahrlg_2017/" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                Fahrlehrergesetz
              </a>{" "}und{" "}
              <a href="https://www.gesetze-im-internet.de/fahrschausbo_2012/" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                FahrschAusbO
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">EU-Streitbeilegung</h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Redaktionell verantwortlich</h2>
            <p className="mt-2">Viola Buchhold und Sophie Buchhold, Hauptstraße 100, 63579 Freigericht</p>
          </section>
        </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
