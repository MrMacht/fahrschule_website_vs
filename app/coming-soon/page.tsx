'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight, Loader2 } from 'lucide-react'

export default function ComingSoon() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

      <div className="relative z-10 w-full max-w-md space-y-10 text-center">
        {/* Logo / Markenname */}
        <div className="space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e91e8c]/10 ring-1 ring-[#e91e8c]/30">
            <Lock className="h-7 w-7 text-[#e91e8c]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            VS-Fahrschule
          </h1>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e91e8c]">
            Coming Soon
          </p>
        </div>

        {/* Info-Text */}
        <p className="text-base leading-relaxed text-white/60">
          Wir arbeiten gerade an unserer neuen Website. Gib das Passwort ein,
          um eine Vorschau zu sehen.
        </p>

        {/* Passwort-Formular */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className={`w-full rounded-xl border bg-white/5 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none ring-0 transition-all focus:ring-2 ${
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
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e91e8c] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#e91e8c]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
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
        © {new Date().getFullYear()} VS-Fahrschule. Alle Rechte vorbehalten.
      </p>
    </div>
  )
}
