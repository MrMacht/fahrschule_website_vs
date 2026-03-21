import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Impressum | VS-Fahrschule",
  description: "Impressum der VS-Fahrschule",
}

const missingImpressumData = [
  "Telefonnummer (verbindlich)",
  "Falls vorhanden: Handelsregister + Registernummer",
  "Falls vorhanden: USt-IdNr. und/oder Wirtschafts-Identifikationsnummer",
  "Verbraucherstreitbeilegung: Teilnahmeerklärung",
]

export default function ImpressumPage() {
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
        <p className="text-sm leading-relaxed text-muted-foreground">
          Diese Seite ist als rechtssicheres Grundgerüst vorbereitet. Alle mit "[BITTE ERGÄNZEN]" markierten Angaben
          müssen vor Veröffentlichung vervollständigt werden.
        </p>

        <div className="mt-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-5">
          <h2 className="text-base font-semibold text-foreground">Noch fehlende Pflichtangaben</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {missingImpressumData.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
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
              Telefon: folgt<br />
              E-Mail: info@vsfahrschule.com
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Registereintrag (falls vorhanden)</h2>
            <p className="mt-2">
              Handelsregister: folgt kommende Woche<br />
              Registernummer: folgt kommende Woche
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Umsatzsteuer-ID / Wirtschafts-ID</h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: folgt kommende Woche<br />
              Wirtschafts-Identifikationsnummer gemäß § 139c AO: folgt kommende Woche
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
              Fundstellen: https://www.gesetze-im-internet.de/fahrlg_2017/ und
              https://www.gesetze-im-internet.de/fahrschausbo_2012/
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">EU-Streitbeilegung</h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              https://ec.europa.eu/consumers/odr/
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p className="mt-2">
              [BITTE ERGÄNZEN: Erklärung, ob Teilnahme an Streitbeilegungsverfahren gewünscht/gesetzlich verpflichtend
              ist.]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Redaktionell verantwortlich (falls relevant)</h2>
            <p className="mt-2">Viola Buchhold und Sophie Buchhold, Hauptstraße 100, 63579 Freigericht</p>
          </section>
        </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
