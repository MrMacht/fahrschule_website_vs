"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import kalenderTermine from "@/lib/kalender-termine.json"

interface KalenderEvent {
  datum: string
  standort: string
  farbe: string
  hex: string
  inhalt: string
}

interface KalenderDaten {
  jahr: number
  lehrplan_info: string
  kalender_events: KalenderEvent[]
}

const weekdayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
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
  if (cleaned.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`
  }

  const r = Number.parseInt(cleaned.slice(0, 2), 16)
  const g = Number.parseInt(cleaned.slice(2, 4), 16)
  const b = Number.parseInt(cleaned.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getContrastTextColor(hexColor: string) {
  const cleaned = hexColor.replace("#", "")
  if (cleaned.length !== 6) {
    return "#111827"
  }

  const r = Number.parseInt(cleaned.slice(0, 2), 16)
  const g = Number.parseInt(cleaned.slice(2, 4), 16)
  const b = Number.parseInt(cleaned.slice(4, 6), 16)
  const luminance = (r * 299 + g * 587 + b * 114) / 1000

  return luminance >= 140 ? "#111827" : "#F9FAFB"
}

export function Kalender() {
  const daten = kalenderTermine as KalenderDaten
  const firstEventDate = daten.kalender_events[0]?.datum ?? `${daten.jahr}-01-01`

  const [currentMonth, setCurrentMonth] = useState(parseIsoDate(firstEventDate))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const getEintraegeForDate = (date: Date) => {
    return daten.kalender_events.filter((entry) => isSameDay(parseIsoDate(entry.datum), date))
  }

  const getLegendLabel = (event: KalenderEvent) => {
    const inhalt = event.inhalt.toLowerCase()

    if (inhalt.includes("ferienkurs")) {
      return "Ferienkurs"
    }

    if (inhalt.includes("a-kurs") || inhalt.includes("zusatzunterricht")) {
      return "A-Kurs"
    }

    return event.standort
  }

  const getDetailBadgeLabel = (event: KalenderEvent) => {
    const inhalt = event.inhalt.toLowerCase()
    const topicMatch = event.inhalt.match(/\(([^)]+)\)/)

    if (topicMatch?.[1]) {
      return topicMatch[1].trim()
    }

    if (inhalt.includes("ferienkurs")) {
      return "Ferienkurs"
    }

    if (inhalt.includes("a-kurs") || inhalt.includes("zusatzunterricht")) {
      return "A-Kurs"
    }

    return event.standort
  }

  const legendEntries = useMemo(() => {
    const map = new Map<string, { label: string; hex: string }>()

    for (const event of daten.kalender_events) {
      const label = getLegendLabel(event)
      const key = `${label}-${event.hex}`
      if (!map.has(key)) {
        map.set(key, { label, hex: event.hex })
      }
    }

    return Array.from(map.values())
  }, [daten.kalender_events])

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const selectedEintraege = selectedDate ? getEintraegeForDate(selectedDate) : []

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
          <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-md">
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

            <div className="mb-1 grid grid-cols-7 gap-1">
              {weekdayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                const dayEntries = getEintraegeForDate(date)
                const hasEvents = dayEntries.length > 0
                const firstEntry = dayEntries[0]

                const isSelected =
                  selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth.getMonth() &&
                  selectedDate.getFullYear() === currentMonth.getFullYear()

                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentMonth.getMonth() &&
                  new Date().getFullYear() === currentMonth.getFullYear()

                const dayStyle = hasEvents
                  ? {
                      backgroundColor: hexToRgba(firstEntry.hex, isSelected ? 0.8 : 0.28),
                      borderColor: hexToRgba(firstEntry.hex, 0.88),
                    }
                  : undefined

                return (
                  <button
                    key={toIsoDate(date)}
                    onClick={() => setSelectedDate(hasEvents ? date : null)}
                    disabled={!hasEvents}
                    style={dayStyle}
                    className={`group relative aspect-square rounded-md border p-1 text-xs transition-all ${
                      hasEvents
                        ? "cursor-pointer text-foreground font-semibold hover:brightness-95"
                        : "cursor-not-allowed border-border/40 text-muted-foreground/40"
                    } ${isSelected ? "ring-2 ring-primary ring-offset-1" : ""} ${isToday && !isSelected ? "ring-2 ring-primary/50 ring-offset-1" : ""}`}
                  >
                    <span className="flex h-full w-full items-center justify-center">{day}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
              {legendEntries.map((entry) => (
                <div key={`${entry.label}-${entry.hex}`} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.hex }} />
                  {entry.label}
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-md border-2 border-primary" />
                Heute
              </div>
            </div>
          </div>

          <div>
            {selectedDate ? (
              <div className="rounded-2xl border border-border/80 bg-card p-4 shadow-md">
                <h4 className="mb-3 text-sm font-semibold text-card-foreground">
                  {weekdayNames[selectedDate.getDay()]},{" "}
                  {selectedDate.getDate()}.{selectedDate.getMonth() + 1}.
                  {selectedDate.getFullYear()}
                </h4>

                <div className="flex flex-col gap-3">
                  {selectedEintraege.map((entry, idx) => (
                    <div key={`${idx}-${entry.datum}-${entry.standort}`} className="rounded-lg border border-border/80 bg-muted/35 p-3 shadow-sm">
                      {(() => {
                        const detailBadgeLabel = getDetailBadgeLabel(entry)
                        const showBadge = detailBadgeLabel.toLowerCase() !== entry.inhalt.toLowerCase()

                        return (
                      <div className="mb-2 flex items-center justify-between gap-2">
                        {showBadge ? (
                          <Badge
                            className="text-xs"
                            style={{
                              backgroundColor: entry.hex,
                              color: getContrastTextColor(entry.hex),
                              border: "none",
                            }}
                          >
                            {detailBadgeLabel}
                          </Badge>
                        ) : null}
                      </div>
                        )
                      })()}

                      <h5 className="mb-2 text-sm font-semibold text-card-foreground">
                        {entry.inhalt}
                      </h5>

                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {entry.standort}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          Tagesinhalt laut Lehrplan
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedEintraege.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Für dieses Datum sind keine Termine hinterlegt.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/50 p-8 text-center">
                <p className="text-xs text-muted-foreground">
                  Wähle ein Datum mit Unterricht aus
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
