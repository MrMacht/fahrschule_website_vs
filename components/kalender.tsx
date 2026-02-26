"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Lesson {
  date: Date
  time: string
  topic: string
  title: string
  location: string
  type: "grund" | "zusatz"
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

// Generate lessons for the next 3 months
function generateLessons(): Lesson[] {
  const lessons: Lesson[] = []
  const today = new Date()
  const lessonTemplate = [
    {
      weekday: 1,
      time: "18:30 - 20:00",
      topic: "Lektion 1",
      title: "Persönliche Voraussetzungen",
      type: "grund" as const,
    },
    {
      weekday: 2,
      time: "18:30 - 20:00",
      topic: "Lektion 2",
      title: "Risikofaktor Mensch",
      type: "grund" as const,
    },
    {
      weekday: 3,
      time: "18:30 - 20:00",
      topic: "Lektion 3",
      title: "Rechtliche Rahmenbedingungen",
      type: "grund" as const,
    },
    {
      weekday: 4,
      time: "18:30 - 20:00",
      topic: "Lektion 4",
      title: "Strassenverkehrssystem",
      type: "grund" as const,
    },
    {
      weekday: 5,
      time: "17:00 - 18:30",
      topic: "Lektion 5",
      title: "Grundregel & Vorfahrt",
      type: "grund" as const,
    },
    {
      weekday: 6,
      time: "10:00 - 11:30",
      topic: "Zusatz B",
      title: "Klassenspezifisch B",
      type: "zusatz" as const,
    },
  ]

  for (let i = 0; i < 90; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const weekday = date.getDay()

    const lesson = lessonTemplate.find((l) => l.weekday === weekday)
    if (lesson) {
      lessons.push({
        date,
        time: lesson.time,
        topic: lesson.topic,
        title: lesson.title,
        location: "Filiale Hauptstrasse",
        type: lesson.type,
      })
    }
  }

  return lessons
}

export function Kalender() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const lessons = generateLessons()

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const getLessonsForDate = (date: Date) => {
    return lessons.filter(
      (lesson) =>
        lesson.date.getDate() === date.getDate() &&
        lesson.date.getMonth() === date.getMonth() &&
        lesson.date.getFullYear() === date.getFullYear()
    )
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    )
  }
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    )
  }

  const selectedLessons = selectedDate ? getLessonsForDate(selectedDate) : []

  return (
    <section id="kalender" className="relative bg-background py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Theorie-Kalender
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Dein Theorieplan auf einen Blick
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Klicke ein Datum an, um die Lektionen für diesen Tag zu sehen.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Calendar */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            {/* Calendar Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-card-foreground">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevMonth}
                  className="h-7 w-7"
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextMonth}
                  className="h-7 w-7"
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Weekday Headers */}
            <div className="mb-1 grid grid-cols-7 gap-1">
              {weekdayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
                const dayLessons = getLessonsForDate(date)
                const hasLessons = dayLessons.length > 0
                const isSelected =
                  selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth.getMonth() &&
                  selectedDate.getFullYear() === currentMonth.getFullYear()
                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentMonth.getMonth() &&
                  new Date().getFullYear() === currentMonth.getFullYear()

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(hasLessons ? date : null)}
                    disabled={!hasLessons}
                    className={`group relative aspect-square rounded-md p-1 text-xs transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold"
                        : hasLessons
                          ? "bg-background hover:bg-muted cursor-pointer text-foreground font-medium"
                          : "text-muted-foreground/40 cursor-not-allowed"
                    } ${isToday && !isSelected ? "ring-2 ring-primary ring-offset-1" : ""}`}
                  >
                    <span className="flex h-full w-full items-center justify-center">
                      {day}
                    </span>
                    {hasLessons && (
                      <div className="absolute bottom-0.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                        {dayLessons.map((lesson, idx) => (
                          <span
                            key={idx}
                            className={`h-0.5 w-0.5 rounded-full ${
                              isSelected
                                ? "bg-primary-foreground"
                                : lesson.type === "grund"
                                  ? "bg-primary"
                                  : "bg-accent"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Grundstoff
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Zusatzstoff
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-md border-2 border-primary" />
                Heute
              </div>
            </div>
          </div>

          {/* Selected Day Lessons */}
          <div>
            {selectedDate ? (
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <h4 className="mb-3 text-sm font-semibold text-card-foreground">
                  {weekdayNames[selectedDate.getDay()]},{" "}
                  {selectedDate.getDate()}.{selectedDate.getMonth() + 1}.
                  {selectedDate.getFullYear()}
                </h4>

                <div className="flex flex-col gap-3">
                  {selectedLessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-border bg-background p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <Badge
                          className={
                            lesson.type === "grund"
                              ? "bg-primary text-primary-foreground text-xs"
                              : "bg-accent text-accent-foreground text-xs"
                          }
                        >
                          {lesson.topic}
                        </Badge>
                      </div>

                      <h5 className="mb-2 text-sm font-semibold text-card-foreground">
                        {lesson.title}
                      </h5>

                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {lesson.time}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {lesson.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
                <p className="text-xs text-muted-foreground">
                  Wähle ein Datum mit Lektionen aus
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-px left-0 right-0 h-12 md:h-16 bg-[#14181f] [clip-path:polygon(0_100%,0_72%,10%_100%,20%_72%,30%_100%,40%_72%,50%_100%,60%_72%,70%_100%,80%_72%,90%_100%,100%_72%,100%_100%)]"
      />
    </section>
  )
}
