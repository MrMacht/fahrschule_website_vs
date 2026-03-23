import type { Metadata } from "next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Datenschutz | VS Fahrschule",
  description: "Datenschutzerklärung der VS Fahrschule",
}

export default async function DatenschutzPage() {
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
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Datenschutz</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
              Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO für diese Website.
            </p>
            <a href="/" className="mt-5 inline-block text-sm font-semibold text-primary hover:underline">
              Zurück zur Startseite
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-20 pt-10 md:pt-12">
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Verantwortliche Stelle</h2>
            <p className="mt-2">
              VS Fahrschule UG (haftungsbeschränkt)<br />
              Hauptstraße 100<br />
              63579 Freigericht<br />
              E-Mail: info@vsfahrschule.com<br />
              Telefon: folgt
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Verarbeitung beim Besuch der Website</h2>
            <p className="mt-2">
              Beim Aufruf der Website werden technisch erforderliche Verbindungsdaten verarbeitet (z. B. IP-Adresse,
              Datum/Uhrzeit, Browsertyp, Betriebssystem, Referrer und aufgerufene Seiten).
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und stabilen Betrieb der
              Website).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Kontaktaufnahme (E-Mail und Telefon)</h2>
            <p className="mt-2">
              Wenn ihr uns kontaktiert, verarbeiten wir eure Angaben zur Bearbeitung der Anfrage und für mögliche
              Anschlussfragen.
            </p>
            <p className="mt-2">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche Kommunikation) bzw. Art. 6
              Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Hosting</h2>
            <p className="mt-2">
              Diese Website wird technisch bei einem Hosting-Anbieter betrieben. Im Rahmen des Hostings werden die für
              den Betrieb erforderlichen Daten verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Cookies und Tracking</h2>
            <p className="mt-2">
              Aktuell werden auf dieser Website keine Analyse- oder Marketing-Trackingtools eingesetzt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Rechte betroffener Personen</h2>
            <p className="mt-2">
              Ihr habt das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Zudem besteht ein Beschwerderecht
              bei einer Datenschutz-Aufsichtsbehörde.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Stand und Aktualisierung</h2>
            <p className="mt-2">
              Stand: 9. März 2026.<br />
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich technische oder rechtliche
              Anforderungen ändern.
            </p>
          </section>
        </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
