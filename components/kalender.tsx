"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import kalenderTermine from "@/lib/kalender-termine.json"

interface KalenderTermin {
  datum: string
  kurs_typ: string
  block_id: string
  block_tag: number
  lektionen: number[]
}

interface KursTyp {
  id: string
  label: string
  hex: string
  lektionen_gesamt: number
  beschreibung: string
}

interface Lektion {
  nummer: number
  thema: string
  kurs_typ: string
}

interface KalenderDaten {
  jahr: number
  lehrplan_info: string
  kurs_typen: KursTyp[]
  lehrplan: Lektion[]
  termine: KalenderTermin[]
}

const weekdayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
const monthNames = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
]

function parseIsoDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}

function hexToRgba(hexColor: string, alpha: number) {
  const cleaned = hexColor.replace("#", "")
  if (cleaned.length !== 6) return `rgba(0, 0, 0, ${alpha})`
  const r = Number.parseInt(cleaned.slice(0, 2), 16)
  const g = Number.parseInt(cleaned.slice(2, 4), 16)
  const b = Number.parseInt(cleaned.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getContrastTextColor(hexColor: string) {
  const cleaned = hexColor.replace("#", "")
  if (cleaned.length !== 6) return "#111827"
  const r = Number.parseInt(cleaned.slice(0, 2), 16)
  const g = Number.parseInt(cleaned.slice(2, 4), 16)
  const b = Number.parseInt(cleaned.slice(4, 6), 16)
  const luminance = (r * 299 + g * 587 + b * 114) / 1000
  return luminance >= 140 ? "#111827" : "#F9FAFB"
}

function formatShortDate(date: Date) {
  return `${date.getDate()}. ${monthNames[date.getMonth()].slice(0, 3)}.`
}

export function Kalender() {
  const daten = kalenderTermine as KalenderDaten

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Lookup maps
  const kursTypMap = useMemo(() => {
    const map = new Map<string, KursTyp>()
    for (const kt of daten.kurs_typen) map.set(kt.id, kt)
    return map
  }, [daten.kurs_typen])

  const lehrplanMap = useMemo(() => {
    const map = new Map<number, Lektion>()
    for (const l of daten.lehrplan) map.set(l.nummer, l)
    return map
  }, [daten.lehrplan])

  // Block metadata: block_id -> { startDatum, endDatum, gesamtTage }
  const blockMetaMap = useMemo(() => {
    const map = new Map<string, { startDatum: string; endDatum: string; gesamtTage: number }>()
    for (const termin of daten.termine) {
      const existing = map.get(termin.block_id)
      if (!existing) {
        map.set(termin.block_id, { startDatum: termin.datum, endDatum: termin.datum, gesamtTage: 1 })
      } else {
        if (termin.datum < existing.startDatum) existing.startDatum = termin.datum
        if (termin.datum > existing.endDatum) existing.endDatum = termin.datum
        existing.gesamtTage++
      }
    }
    return map
  }, [daten.termine])

  // Termine indexed by ISO date for O(1) lookup
  const terminByDate = useMemo(() => {
    const map = new Map<string, KalenderTermin>()
    for (const t of daten.termine) map.set(t.datum, t)
    return map
  }, [daten.termine])

  // Upcoming blocks from today
  const upcomingBlocks = useMemo(() => {
    const today = toIsoDate(new Date())
    const seen = new Set<string>()
    const result: Array<{
      block_id: string
      kurs_typ: string
      startDatum: string
      endDatum: string
      gesamtTage: number
      hex: string
      label: string
    }> = []

    for (const termin of daten.termine) {
      if (termin.datum >= today && !seen.has(termin.block_id)) {
        seen.add(termin.block_id)
        const meta = blockMetaMap.get(termin.block_id)
        const kt = kursTypMap.get(termin.kurs_typ)
        if (meta && kt) {
          result.push({
            block_id: termin.block_id,
            kurs_typ: termin.kurs_typ,
            startDatum: meta.startDatum,
            endDatum: meta.endDatum,
            gesamtTage: meta.gesamtTage,
            hex: kt.hex,
            label: kt.label,
          })
        }
      }
      if (result.length >= 6) break
    }
    return result
  }, [daten.termine, blockMetaMap, kursTypMap])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    return { daysInMonth: lastDay.getDate(), startingDayOfWeek: firstDay.getDay() }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))

  const selectedTermin = selectedDate ? (terminByDate.get(toIsoDate(selectedDate)) ?? null) : null
  const selectedKursTyp = selectedTermin ? kursTypMap.get(selectedTermin.kurs_typ) : null
  const selectedBlockMeta = selectedTermin ? blockMetaMap.get(selectedTermin.block_id) : null

  return (
    <section id="kalender" className="relative bg-background py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Theorie-Kalender {daten.jahr}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dein Theorieplan auf einen Blick
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {daten.lehrplan_info}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* ── Kalender ── */}
          <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-md">
            {/* Monatsnavigation */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-card-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={prevMonth} className="h-7 w-7">
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} className="h-7 w-7">
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Wochentage */}
            <div className="mb-1 grid grid-cols-7 gap-1">
              {weekdayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Tage */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                const iso = toIsoDate(date)
                const termin = terminByDate.get(iso) ?? null
                const hasEvent = termin !== null
                const hex = hasEvent ? (kursTypMap.get(termin.kurs_typ)?.hex ?? "#888888") : undefined

                const isSelected = selectedDate !== null && isSameDay(selectedDate, date)
                const isToday = isSameDay(new Date(), date)

                const dayStyle =
                  hasEvent && hex
                    ? {
                        backgroundColor: hexToRgba(hex, isSelected ? 0.75 : 0.4),
                        borderColor: hex,
                        color: "#111827",
                      }
                    : undefined

                return (
                  <button
                    key={iso}
                    onClick={() => setSelectedDate(hasEvent ? date : null)}
                    disabled={!hasEvent}
                    style={dayStyle}
                    className={`relative aspect-square rounded-md border p-0.5 text-xs transition-all
                      ${hasEvent ? "cursor-pointer font-semibold hover:brightness-95" : "cursor-not-allowed border-border text-muted-foreground/50"}
                      ${isSelected ? "ring-2 ring-primary ring-offset-1" : ""}
                      ${isToday && !isSelected ? "ring-2 ring-primary ring-offset-1" : ""}`}
                  >
                    <span className="flex h-full w-full flex-col items-center justify-center">
                      <span className="text-sm font-bold">{day}</span>
                      {hasEvent && termin && termin.block_id.startsWith("B-") && (
                        <span className="mt-0.5 text-[7px] leading-none opacity-60">
                          {termin.block_tag}/7
                        </span>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Legende */}
            <div className="mt-4 flex flex-wrap items-start gap-x-4 gap-y-2 border-t border-border pt-4 text-xs">
              {daten.kurs_typen.map((kt) => (
                <div key={kt.id} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: kt.hex }}
                  />
                  <span className="font-medium text-foreground/80">{kt.label}</span>
                  {kt.lektionen_gesamt > 0 && (
                    <span className="text-muted-foreground/60">· {kt.lektionen_gesamt} Lekt.</span>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-sm border-2 border-primary" />
                Heute
              </div>
            </div>
          </div>

          {/* ── Seitenbereich ── */}
          <div>
            {selectedDate && selectedTermin && selectedKursTyp ? (
              /* Detail-Panel */
              <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-md">
                {/* Datum + Badge */}
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-card-foreground">
                    {weekdayNames[selectedDate.getDay()]},{" "}
                    {selectedDate.getDate()}. {monthNames[selectedDate.getMonth()].slice(0, 3)}.{" "}
                    {selectedDate.getFullYear()}
                  </h4>
                  <Badge
                    className="shrink-0 text-xs"
                    style={{
                      backgroundColor: selectedKursTyp.hex,
                      color: getContrastTextColor(selectedKursTyp.hex),
                      border: "none",
                    }}
                  >
                    {selectedKursTyp.label}
                  </Badge>
                </div>

                {/* Block-Fortschritt */}
                {selectedBlockMeta && (
                  <div className="mb-4 rounded-lg bg-muted/40 p-3">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{selectedTermin.block_id}</span>
                      <span className="text-muted-foreground">
                        Tag {selectedTermin.block_tag} von {selectedBlockMeta.gesamtTage}
                      </span>
                    </div>
                    {/* Fortschrittsbalken */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(selectedTermin.block_tag / selectedBlockMeta.gesamtTage) * 100}%`,
                          backgroundColor: selectedKursTyp.hex,
                        }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {formatShortDate(parseIsoDate(selectedBlockMeta.startDatum))} –{" "}
                      {formatShortDate(parseIsoDate(selectedBlockMeta.endDatum))}
                    </p>
                  </div>
                )}

                {/* Lektionen des Tages */}
                {selectedTermin.lektionen.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Heutige Lektionen
                    </p>
                    {selectedTermin.lektionen.map((nr) => {
                      const lektion = lehrplanMap.get(nr)
                      return (
                        <div
                          key={nr}
                          className="flex items-start gap-2 rounded-md border border-border/60 bg-muted/25 p-2.5"
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                            style={{
                              backgroundColor: hexToRgba(selectedKursTyp.hex, 0.2),
                              color: selectedKursTyp.hex,
                            }}
                          >
                            {nr}
                          </span>
                          <p className="text-xs font-medium leading-snug text-card-foreground">
                            {lektion?.thema ?? `Lektion ${nr}`}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="rounded-md bg-muted/30 p-3">
                    <p className="text-xs font-semibold text-foreground/80">{selectedKursTyp.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{selectedKursTyp.beschreibung}</p>
                  </div>
                )}
              </div>
            ) : (
              /* Nächste Kurse */
              <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-md">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-card-foreground">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Nächste Kurse
                </h4>

                {upcomingBlocks.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {upcomingBlocks.map((block) => (
                      <div
                        key={block.block_id}
                        className="flex items-start gap-2.5 rounded-lg border border-border/60 px-2.5 py-2"
                      >
                        <div
                          className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-sm"
                          style={{ backgroundColor: block.hex }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold leading-snug text-foreground">
                            {block.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatShortDate(parseIsoDate(block.startDatum))} –{" "}
                            {formatShortDate(parseIsoDate(block.endDatum))}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {block.gesamtTage} Termin{block.gesamtTage !== 1 ? "e" : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Keine weiteren Termine in diesem Jahr.
                  </p>
                )}

                <p className="mt-3 text-xs text-muted-foreground/50">
                  Klicke auf einen farbigen Tag für Details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 bg-[#14181f] [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)] md:h-16"
      />
    </section>
  )
}
