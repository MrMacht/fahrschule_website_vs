'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight, Loader2, Flag, Phone, Mail, MapPin } from 'lucide-react'

const OPENING = new Date('2026-04-25T14:00:00+02:00')

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function ComingSoon() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const countdown = useCountdown(OPENING)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/unlock', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0f172a] px-6">
      {/* Hintergrund-Farbakzente */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#e91e8c]/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#4cc8e0]/15 blur-[100px]"
      />

      <div className="relative z-10 w-full max-w-md space-y-5 text-center">
        {/* Logo / Markenname */}
        <div className="space-y-1.5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#e91e8c]/10 ring-1 ring-[#e91e8c]/30">
            <Lock className="h-5 w-5 text-[#e91e8c]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            VS Fahrschule
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e91e8c]">
            Coming Soon
          </p>
        </div>

        {/* Eröffnungs-Countdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-white/50">
            <Flag className="h-3 w-3 text-[#e91e8c]" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Eröffnung&nbsp;·&nbsp;25. April · 14–18 Uhr
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: countdown.days, label: 'Tage' },
              { value: countdown.hours, label: 'Std' },
              { value: countdown.minutes, label: 'Min' },
              { value: countdown.seconds, label: 'Sek' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-xl bg-white/5 py-2.5 ring-1 ring-white/10"
              >
                <span className="text-xl font-bold tabular-nums text-white sm:text-2xl">
                  {String(value).padStart(2, '0')}
                </span>
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-white/50">
            Ab dem 25.04. wird durchgestartet – mit VS‑Fahrschule.
          </p>
        </div>

        {/* Info-Text */}
        <p className="text-sm leading-relaxed text-white/50">
          Unsere Website ist noch nicht ganz fertig. Gib das Passwort ein, um
          schon jetzt einen Blick hinter die Kulissen zu werfen.
        </p>

        {/* Kontakt-Karten */}
        <div className="flex flex-col gap-2">
          <a
            href="tel:+4915225922006"
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-[#e91e8c]/40"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e91e8c]/15">
              <Phone className="h-4 w-4 text-[#e91e8c]" />
            </div>
            <span className="text-sm font-medium text-white/80">+49 152 2592 2006</span>
          </a>
          <a
            href="mailto:info@vsfahrschule.com"
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-[#e91e8c]/40"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e91e8c]/15">
              <Mail className="h-4 w-4 text-[#e91e8c]" />
            </div>
            <span className="text-sm font-medium text-white/80">info@vsfahrschule.com</span>
          </a>
          <a
            href="https://maps.google.com/?q=Hauptstraße+100,+63579+Freigericht"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-[#e91e8c]/40"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e91e8c]/15">
              <MapPin className="h-4 w-4 text-[#e91e8c]" />
            </div>
            <span className="text-sm font-medium text-white/80">Hauptstraße 100, 63579 Freigericht</span>
          </a>
        </div>

        {/* Passwort-Formular */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Passwort"
              autoComplete="current-password"
              className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none ring-0 transition-all focus:ring-2 ${
                error
                  ? 'border-red-500/60 focus:ring-red-500/40'
                  : 'border-white/10 focus:border-[#e91e8c]/60 focus:ring-[#e91e8c]/30'
              }`}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              Falsches Passwort. Bitte versuche es erneut.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e91e8c] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#e91e8c]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Weiter zur Website
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-white/25">
        © {new Date().getFullYear()} VS Fahrschule. Alle Rechte vorbehalten.
      </p>
    </div>
  )
}
