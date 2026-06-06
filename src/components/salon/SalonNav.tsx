"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Salon } from "@/data/salons"

interface Props { salon: Salon }

const navLinks = [
  { label: "Services", labelEs: "Servicios", href: "#services" },
  { label: "Gallery", labelEs: "Galería", href: "#gallery" },
  { label: "Reviews", labelEs: "Reseñas", href: "#reviews" },
  { label: "About", labelEs: "Nosotros", href: "#about" },
  { label: "Contact", labelEs: "Contacto", href: "#contact" },
]

export default function SalonNav({ salon }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#FAF7F4]/95 backdrop-blur-md border-b border-[#E2DDD9]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${salon.slug}`} className="font-playfair text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
          {salon.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-light text-[#6B6560] hover:text-[#1A1612] transition-colors duration-200 tracking-wide"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={`tel:${salon.phone}`}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: salon.accentColor, fontFamily: "var(--font-dm-sans)", borderRadius: "3px" }}
        >
          Call Now
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-[#1A1612] transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-[#1A1612] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#1A1612] transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FAF7F4] border-t border-[#E2DDD9] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-light text-[#1A1612] tracking-wide"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {link.label} / {link.labelEs}
            </a>
          ))}
          <a
            href={`tel:${salon.phone}`}
            className="mt-2 inline-flex items-center justify-center py-3 text-sm font-medium text-white"
            style={{ backgroundColor: salon.accentColor, borderRadius: "3px" }}
          >
            {salon.phoneFormatted}
          </a>
        </div>
      )}
    </header>
  )
}
