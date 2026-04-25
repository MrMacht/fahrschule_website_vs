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

  useEffect(() => {
    const c = getConsent()
    setConsentState(c)
    if (!c) setVisible(true)
  }, [])

  function handleChoice(choice: Consent) {
    setConsent(choice)
    setConsentState(choice)
    setVisible(false)
  }

  if (!visible || consent) return null

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 px-6 py-4 shadow-2xl backdrop-blur-sm md:px-8",
        "transition-transform duration-500",
        visible ? "translate-y-0" : "translate-y-full"
      )}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einwilligung"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm leading-relaxed text-foreground">
          <p className="font-semibold">Wir verwenden Cookies</p>
          <p className="mt-1 text-muted-foreground">
            Diese Website nutzt Cookies, um die Nutzererfahrung zu verbessern und bestimmte Funktionen bereitzustellen.
            Detaillierte Informationen findest du in unserer{" "}
            <a href="/datenschutz" className="underline underline-offset-2 hover:text-primary">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
          <button
            onClick={() => handleChoice("necessary")}
            className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted/80"
          >
            Nur notwendige
          </button>
          <button
            onClick={() => handleChoice("all")}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Alle akzeptieren
          </button>
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
