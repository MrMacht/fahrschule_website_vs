"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Klassen", href: "/#klassen" },
  { label: "Standorte", href: "/#standorte" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Wegweiser", href: "/#wegweiser" },
  { label: "Theorie-Kalender", href: "/#kalender" },
  { label: "Kontakt", href: "/#kontakt" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/Header-Logo.png"
            alt="VS-Fahrschule Logo"
            width={140}
            height={40}
            className="h-6 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:015225922006"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            015225922006
          </a>
          <Button asChild>
            <a href="/#kontakt">Jetzt anmelden</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Navigation schließen" : "Navigation öffnen"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href="tel:015225922006"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Phone className="h-4 w-4" />
              015225922006
            </a>
            <Button asChild className="w-full">
              <a href="/#kontakt">Jetzt anmelden</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
