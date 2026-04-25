"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type Consent = "necessary" | "all" | null

function getConsent(): Consent {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|; )vs_consent=([^;]*)/)
  const val = match ? decodeURIComponent(match[1]) : ""
  return val === "necessary" || val === "all" ? val : null
}

function setConsent(value: Consent) {
  if (typeof document === "undefined") return
  const maxAge = 60 * 60 * 24 * 365 // 1 Jahr
  document.cookie = `vs_consent=${encodeURIComponent(value ?? "")}; path=/; max-age=${maxAge}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`
}

export function CookieConsent() {
  const [consent, setConsentState] = useState<Consent>(null)
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const c = getConsent()
    setConsentState(c)
    if (!c) setVisible(true)
  }, [])

  useEffect(() => {
    function handleOpen() {
      setVisible(true)
      setConsentState(null)
    }
    window.addEventListener("open-cookie-settings", handleOpen)
    return () => window.removeEventListener("open-cookie-settings", handleOpen)
  }, [])

  function handleChoice(choice: Consent) {
    setConsent(choice)
    setConsentState(choice)
    setVisible(false)
    setShowDetails(false)
  }

  function handleWithdraw() {
    setConsent(null)
    setConsentState(null)
    setVisible(true)
  }

  if (!visible || consent) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einwilligung"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Banner */}
      <div className="relative w-full max-w-2xl sm:mx-4 sm:rounded-2xl">
        <div className="border-t border-border bg-background px-6 py-5 shadow-2xl sm:border sm:px-8 sm:py-6">
          {!showDetails ? (
            <>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Wir verwenden Cookies
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    Diese Website nutzt Cookies und ähnliche Technologien. Einige sind
                    für den Betrieb der Seite technisch notwendig. Mit Ihrer Einwilligung
                    können wir zusätzlich anonyme Statistiken erheben, um die Website
                    kontinuierlich zu verbessern. Detaillierte Informationen finden Sie in
                    unserer{" "}
                    <a
                      href="/datenschutz"
                      className="underline underline-offset-2 hover:text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Datenschutzerklärung
                    </a>
                    .
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-xs font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground sm:text-sm"
                  >
                    Cookie-Einstellungen anpassen
                  </button>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => handleChoice("necessary")}
                      className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      Nur essenzielle
                    </button>
                    <button
                      onClick={() => handleChoice("all")}
                      className="rounded-lg border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Alle akzeptieren
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-3 text-base font-semibold text-foreground">
                Cookie-Einstellungen
              </h3>

              <div className="mb-4 flex flex-col gap-3">
                {/* Notwendig */}
                <div className="flex items-start justify-between gap-3 rounded-lg border border-border bg-muted/30 p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Essenzielle Cookies
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Technisch notwendig für den Betrieb der Website. Können nicht
                      deaktiviert werden.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Aktiv
                  </span>
                </div>

                {/* Statistik */}
                <div className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Statistik & Analyse
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Helfen uns zu verstehen, wie Besucher mit der Website interagieren,
                      indem Informationen anonym gesammelt werden.
                    </p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Marketing & Personalisierung
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Werden von uns oder Drittanbietern verwendet, um personalisierte
                      Werbung anzuzeigen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Zurück
                </button>
                <button
                  onClick={() => handleChoice("necessary")}
                  className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Nur essenzielle
                </button>
                <button
                  onClick={() => handleChoice("all")}
                  className="rounded-lg border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Alle akzeptieren
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function useCookieConsent(): Consent {
  const [consent, setConsentState] = useState<Consent>(null)

  useEffect(() => {
    setConsentState(getConsent())
  }, [])

  return consent
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"))
  }
}
